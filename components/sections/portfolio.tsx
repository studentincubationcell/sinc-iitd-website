import Link from "next/link";
import { Rocket, Filter, ArrowUpRight } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { ClubEmptyState } from "@/components/ui/club-empty-state";
import type { Startup } from "@/lib/schemas";

export function PortfolioEmptyState({ filtered = false }: { filtered?: boolean }) {
  if (filtered) {
    return (
      <ClubEmptyState
        icon={Rocket}
        title="No startups in this sector"
        description="Try another sector filter or browse the full portfolio."
        action={{ href: "/portfolio", label: "View all startups", variant: "outline" }}
      />
    );
  }

  return (
    <ClubEmptyState
      icon={Rocket}
      title="Portfolio launching soon"
      description="Our founders are building. This space will showcase IIT Delhi startups incubated through SInC."
      hint="Add startups in data/startups.json"
      action={{ href: "/apply", label: "Be the first featured startup" }}
    />
  );
}

export function PortfolioGrid({
  startups,
  sectorFilter,
}: {
  startups: Startup[];
  sectorFilter?: string;
}) {
  const filtered =
    sectorFilter && sectorFilter !== "all"
      ? startups.filter((s) => s.sector.toLowerCase() === sectorFilter.toLowerCase())
      : startups;

  if (filtered.length === 0) {
    return (
      <PortfolioEmptyState
        filtered={startups.length > 0 && sectorFilter !== "all" && sectorFilter !== undefined}
      />
    );
  }

  return (
    <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((startup) => (
        <StaggerItem key={startup.slug}>
          <Link
            href={`/portfolio/${startup.slug}`}
            className="group soft-card flex h-full flex-col overflow-hidden transition-transform hover:-translate-y-1"
          >
            {/* Header band */}
            <div className="signal-grid relative flex items-end gap-3 border-b border-brand-blue bg-accent-tint p-5 pb-4">
              {startup.logo ? (
                <div className="h-14 w-14 shrink-0 rounded-xl border border-border bg-background p-1.5 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={startup.logo} alt={startup.name} className="h-full w-full object-contain" />
                </div>
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-foreground font-mono text-xl font-bold text-background shadow-sm">
                  {startup.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {startup.name}
                </h3>
                <Badge variant="outline" className="mt-1 capitalize text-[10px] font-medium">
                  {startup.sector}
                </Badge>
              </div>
              <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-muted group-hover:text-foreground transition-colors" />
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">
              <p className="text-sm font-medium text-foreground/90 line-clamp-2">
                {startup.tagline}
              </p>
              {startup.idea && (
                <p className="mt-2 flex-1 text-sm text-muted line-clamp-2">{startup.idea}</p>
              )}

              {/* Stats row */}
              <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
                <div className="bg-card p-3">
                  <span className="text-[10px] uppercase tracking-widest text-muted">Founder</span>
                  <p className="truncate text-sm font-semibold">{startup.founder}</p>
                </div>
                <div className="bg-card p-3">
                  <span className="text-[10px] uppercase tracking-widest text-muted">Stage</span>
                  <p className="truncate text-sm font-semibold">{startup.valuation ?? "—"}</p>
                </div>
              </div>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

export function SectorFilters({
  sectors,
  active,
  onChange,
}: {
  sectors: string[];
  active: string;
  onChange: (s: string) => void;
}) {
  const all = ["all", ...sectors];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-10">
      <Filter className="h-4 w-4 text-muted self-center mr-1" />
      {all.map((sector) => (
        <button
          key={sector}
          type="button"
          onClick={() => onChange(sector)}
          className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
            active === sector
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-card text-muted hover:text-foreground"
          }`}
        >
          {sector === "all" ? "All" : sector}
        </button>
      ))}
    </div>
  );
}
