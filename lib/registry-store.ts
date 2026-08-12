/**
 * Startup Registry persistence (Prisma + SQLite locally; Postgres via DATABASE_URL).
 */
import { prisma } from "@/lib/db";
import type { RegistryEntry, RegistryCreate, RegistryDeep } from "./schemas";
import {
  REGISTRY_SECTORS,
  REGISTRY_STAGES,
} from "./schemas";

function mapRow(row: {
  id: number;
  name: string;
  email: string;
  venture: string;
  pitch: string;
  stage: string;
  sector: string;
  link: string | null;
  referral: string | null;
  deepJson: string | null;
  createdAt: Date;
}): RegistryEntry {
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
    : REGISTRY_SECTORS[0];

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    venture: row.venture,
    pitch: row.pitch,
    stage,
    sector,
    link: row.link ?? undefined,
    referral: row.referral ?? undefined,
    timestamp: row.createdAt.toISOString(),
    deep,
  };
}

export async function listRegistryEntries(): Promise<RegistryEntry[]> {
  const rows = await prisma.registryEntry.findMany({
    orderBy: { id: "asc" },
  });
  return rows.map(mapRow);
}

export async function nextRegistryNumber(): Promise<number> {
  const agg = await prisma.registryEntry.aggregate({ _max: { id: true } });
  return (agg._max.id ?? 0) + 1;
}

export async function createRegistryEntry(
  input: RegistryCreate
): Promise<RegistryEntry> {
  const row = await prisma.registryEntry.create({
    data: {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      venture: input.venture.trim(),
      pitch: input.pitch.trim(),
      stage: input.stage,
      sector: input.sector,
      link: input.link?.trim() || null,
      referral: input.referral?.trim() || null,
    },
  });
  return mapRow(row);
}

export async function attachDeepProfile(
  id: number,
  deep: RegistryDeep
): Promise<RegistryEntry | null> {
  const existing = await prisma.registryEntry.findUnique({ where: { id } });
  if (!existing) return null;

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
  return mapRow(row);
}

export function checkRegistryPasscode(code: string): boolean {
  const expected = process.env.REGISTRY_PASSCODE || "sinc2026";
  return code.length > 0 && code === expected;
}
