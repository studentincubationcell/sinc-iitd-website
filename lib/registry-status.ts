export function listingStatus(entry: { deep?: unknown } | null | undefined): string {
  return entry?.deep ? "Listed · full profile" : "Listed · basic details";
}

export function padRegistryId(id: number): string {
  return String(id).padStart(3, "0");
}

export function sectorLabel(entry: {
  sector: string;
  sectorOther?: string;
}): string {
  if (entry.sector === "Other" && entry.sectorOther?.trim()) {
    return `Other — ${entry.sectorOther.trim()}`;
  }
  return entry.sector;
}
