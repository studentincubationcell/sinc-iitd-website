import { NextResponse } from "next/server";
import { registryDeepSchema } from "@/lib/schemas";
import {
  attachDeepProfileByToken,
  getRegistryEntryByToken,
} from "@/lib/registry-store";
import { sendRegistryConfirmation } from "@/lib/registry-mail";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ token: string }> };

export async function GET(_request: Request, context: Ctx) {
  try {
    const { token } = await context.params;
    const entry = await getRegistryEntryByToken(token);
    if (!entry) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ entry });
  } catch (e) {
    console.error("registry manage GET", e);
    return NextResponse.json({ error: "Could not load listing" }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: Ctx) {
  try {
    const { token } = await context.params;
    const body = await request.json();
    const parsed = registryDeepSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const entry = await attachDeepProfileByToken(token, parsed.data);
    if (!entry) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const mailed = await sendRegistryConfirmation(entry, "profile");
    return NextResponse.json({ entry, mailed });
  } catch (e) {
    console.error("registry manage PATCH", e);
    return NextResponse.json({ error: "Could not update listing" }, { status: 500 });
  }
}
