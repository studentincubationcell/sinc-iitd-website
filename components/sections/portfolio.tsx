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
            className="group relative flex h-full flex-col framer-card p-6 transition-all hover:shadow-[var(--shadow-framer-hover)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-none bg-foreground font-mono text-lg font-black text-background transition-transform duration-300 group-hover:scale-110">
                {startup.name.charAt(0)}
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-none border border-border text-muted transition-all duration-300 group-hover:border-foreground group-hover:bg-inverse group-hover:text-inverse-foreground">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <h3 className="mt-5 text-xl font-semibold group-hover:text-primary transition-colors">
              {startup.name}
            </h3>
            <p className="mt-2 text-sm text-muted line-clamp-2 flex-1">{startup.tagline}</p>
            <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
              <span className="text-xs text-muted">Founder: {startup.founder}</span>
              <Badge variant="outline" className="capitalize">{startup.sector}</Badge>
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
    <div className="flex flex-wrap gap-2 mb-10">
      <Filter className="h-5 w-5 text-muted self-center mr-2" />
      {all.map((sector) => (
        <button
          key={sector}
          type="button"
          onClick={() => onChange(sector)}
          className={`rounded-none border px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide transition-all ${
            active === sector
              ? "border-foreground bg-accent-lime text-foreground"
              : "border-border bg-card text-muted hover:border-foreground hover:text-foreground"
          }`}
        >
          {sector === "all" ? "All" : sector}
        </button>
      ))}
    </div>
  );
}
