const KEY = "sinc-registry-manage";

export type CachedListing = {
  token: string;
  id: number;
  venture: string;
};

export function readCachedListing(): CachedListing | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedListing;
    if (!parsed?.token || !parsed.venture) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeCachedListing(listing: CachedListing): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(listing));
  } catch {
    // private mode / quota
  }
}

export function managePath(token: string, hash?: "profile"): string {
  return hash === "profile"
    ? `/registry/m/${token}#profile`
    : `/registry/m/${token}`;
}
