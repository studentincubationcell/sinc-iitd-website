export function listingStatus(entry: { deep?: unknown } | null | undefined): string {
  return entry?.deep ? "Listed · full profile" : "Listed · basic details";
}

export function padRegistryId(id: number): string {
  return String(id).padStart(3, "0");
}

export function listedAt(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export const REGISTRY_DEEP_LABELS: { key: keyof NonNullable<import("./schemas").RegistryEntry["deep"]>; label: string }[] =
  [
    { key: "problem", label: "Problem" },
    { key: "solution", label: "Solution" },
    { key: "funds", label: "Funds raised" },
    { key: "deck", label: "Deck / demo" },
    { key: "revenue", label: "Revenue / customers" },
    { key: "future", label: "Next 6–12 months" },
  ];

export function sectorLabel(entry: {
  sector: string;
  sectorOther?: string;
}): string {
  if (entry.sector === "Other" && entry.sectorOther?.trim()) {
    return `Other — ${entry.sectorOther.trim()}`;
  }
  return entry.sector;
}
