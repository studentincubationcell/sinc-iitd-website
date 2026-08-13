import { NextResponse } from "next/server";
import { registryCreateSchema } from "@/lib/schemas";
import {
  createRegistryEntry,
  listRegistryEntries,
  checkRegistryPasscode,
  nextRegistryNumber,
} from "@/lib/registry-store";
import { sendRegistryConfirmation } from "@/lib/registry-mail";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const passcode =
      request.headers.get("x-registry-passcode") ||
      new URL(request.url).searchParams.get("passcode") ||
      "";

    if (!checkRegistryPasscode(passcode)) {
      return NextResponse.json(
        { error: "Unauthorized", nextId: await nextRegistryNumber() },
        { status: 401 }
      );
    }

    const entries = await listRegistryEntries();
    return NextResponse.json({ entries });
  } catch (e) {
    console.error("registry GET", e);
    return NextResponse.json({ error: "Could not load registry" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registryCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const entry = await createRegistryEntry(parsed.data);
    const mailed = await sendRegistryConfirmation(entry, "listing");
    return NextResponse.json({ entry, mailed }, { status: 201 });
  } catch (e) {
    console.error("registry POST", e);
    return NextResponse.json({ error: "Could not save entry" }, { status: 500 });
  }
}
