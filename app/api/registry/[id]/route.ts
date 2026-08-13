import { NextResponse } from "next/server";
import { registryDeepSchema } from "@/lib/schemas";
import { attachDeepProfile } from "@/lib/registry-store";
import { sendRegistryConfirmation } from "@/lib/registry-mail";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await context.params;
    const id = Number(idParam);
    if (!Number.isFinite(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    const body = await request.json();
    const parsed = registryDeepSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const entry = await attachDeepProfile(id, parsed.data);
    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }
    const mailed = await sendRegistryConfirmation(entry, "profile");
    return NextResponse.json({ entry, mailed });
  } catch (e) {
    console.error("registry PATCH", e);
    return NextResponse.json({ error: "Could not update entry" }, { status: 500 });
  }
}
