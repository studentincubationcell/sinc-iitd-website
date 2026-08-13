/**
 * Startup Registry persistence (Prisma + SQLite locally; Postgres via DATABASE_URL).
 */
import { prisma } from "@/lib/db";
import type { RegistryEntry, RegistryCreate, RegistryDeep } from "./schemas";
import {
  REGISTRY_SECTORS,
  REGISTRY_STAGES,
} from "./schemas";
import { newManageToken } from "./registry-token";

type Row = {
  id: number;
  name: string;
  email: string;
  venture: string;
  pitch: string;
  stage: string;
  sector: string;
  sectorOther?: string | null;
  link: string | null;
  referral: string | null;
  phone: string | null;
  whatsapp: string | null;
  linkedin: string | null;
  deepJson: string | null;
  manageToken: string | null;
  createdAt: Date;
};

function mapRow(row: Row, includeToken = false): RegistryEntry {
  let deep: RegistryEntry["deep"];
  if (row.deepJson) {
    try {
      deep = JSON.parse(row.deepJson) as RegistryEntry["deep"];
    } catch {
      deep = undefined;
    }
  }

  const stage = REGISTRY_STAGES.includes(row.stage as (typeof REGISTRY_STAGES)[number])
    ? (row.stage as RegistryEntry["stage"])
    : REGISTRY_STAGES[0];
  const sector = REGISTRY_SECTORS.includes(row.sector as (typeof REGISTRY_SECTORS)[number])
    ? (row.sector as RegistryEntry["sector"])
    : "Other";

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    venture: row.venture,
    pitch: row.pitch,
    stage,
    sector,
    sectorOther:
      sector === "Other"
        ? (row.sectorOther ?? (row.sector !== "Other" ? row.sector : undefined))
        : undefined,
    link: row.link ?? undefined,
    referral: row.referral ?? undefined,
    phone: row.phone ?? undefined,
    whatsapp: row.whatsapp ?? undefined,
    linkedin: row.linkedin ?? undefined,
    timestamp: row.createdAt.toISOString(),
    deep,
    ...(includeToken && row.manageToken ? { manageToken: row.manageToken } : {}),
  };
}

async function withToken(row: Row): Promise<Row> {
  if (row.manageToken) return row;
  return prisma.registryEntry.update({
    where: { id: row.id },
    data: { manageToken: newManageToken() },
  });
}

export async function listRegistryEntries(): Promise<RegistryEntry[]> {
  const rows = await prisma.registryEntry.findMany({
    orderBy: { id: "asc" },
  });
  return rows.map((row) => mapRow(row, false));
}

export async function nextRegistryNumber(): Promise<number> {
  const agg = await prisma.registryEntry.aggregate({ _max: { id: true } });
  return (agg._max.id ?? 0) + 1;
}

export async function createRegistryEntry(
  input: RegistryCreate
): Promise<RegistryEntry> {
  const data = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    venture: input.venture.trim(),
    pitch: input.pitch.trim(),
    stage: input.stage,
    sector: input.sector,
    sectorOther: input.sector === "Other" ? input.sectorOther?.trim() || null : null,
    link: input.link?.trim() || null,
    referral: input.referral?.trim() || null,
    phone: input.phone.trim(),
    whatsapp: input.whatsapp?.trim() || null,
    linkedin: input.linkedin?.trim() || null,
    manageToken: newManageToken(),
  };
  const row = await prisma.registryEntry.create({
    data: data as never,
  });
  return mapRow(row, true);
}

export async function getRegistryEntryByToken(
  token: string
): Promise<RegistryEntry | null> {
  const trimmed = token.trim();
  if (trimmed.length < 16) return null;
  const found = await prisma.registryEntry.findUnique({
    where: { manageToken: trimmed },
  });
  if (!found) return null;
  const row = await withToken(found);
  return mapRow(row, true);
}

export async function attachDeepProfile(
  id: number,
  deep: RegistryDeep
): Promise<RegistryEntry | null> {
  const existing = await prisma.registryEntry.findUnique({ where: { id } });
  if (!existing) return null;
  return saveDeep(existing.id, deep);
}

export async function attachDeepProfileByToken(
  token: string,
  deep: RegistryDeep
): Promise<RegistryEntry | null> {
  const trimmed = token.trim();
  if (trimmed.length < 16) return null;
  const existing = await prisma.registryEntry.findUnique({
    where: { manageToken: trimmed },
  });
  if (!existing) return null;
  return saveDeep(existing.id, deep);
}

async function saveDeep(id: number, deep: RegistryDeep): Promise<RegistryEntry> {
  const payload = {
    problem: deep.problem?.trim() || undefined,
    solution: deep.solution?.trim() || undefined,
    funds: deep.funds?.trim() || undefined,
    deck: deep.deck?.trim() || undefined,
    revenue: deep.revenue?.trim() || undefined,
    future: deep.future?.trim() || undefined,
  };

  const row = await prisma.registryEntry.update({
    where: { id },
    data: { deepJson: JSON.stringify(payload) },
  });
  return mapRow(row, true);
}

export function checkRegistryPasscode(code: string): boolean {
  const expected = process.env.REGISTRY_PASSCODE;
  if (!expected) {
    if (process.env.NODE_ENV === "production") return false;
    return code.length > 0 && code === "sinc2026";
  }
  return code.length > 0 && code === expected;
}
