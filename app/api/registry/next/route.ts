import { NextResponse } from "next/server";
import { nextRegistryNumber } from "@/lib/registry-store";

export const runtime = "nodejs";

export async function GET() {
  try {
    return NextResponse.json({ nextId: await nextRegistryNumber() });
  } catch (e) {
    console.error("registry next", e);
    return NextResponse.json({ nextId: 1 }, { status: 200 });
  }
}
