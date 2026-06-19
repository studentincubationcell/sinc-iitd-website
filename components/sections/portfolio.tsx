import Link from "next/link";
import { Rocket, Filter } from "lucide-react";
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
            className="group block h-full framer-card p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-framer-hover)]"
          >
            <Badge variant="outline">{startup.sector}</Badge>
            <h3 className="mt-4 text-xl font-semibold group-hover:text-primary transition-colors">
              {startup.name}
            </h3>
            <p className="mt-2 text-sm text-muted line-clamp-2">{startup.tagline}</p>
            <p className="mt-4 text-xs text-muted">Founder: {startup.founder}</p>
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
          className={`rounded-sm px-4 py-1.5 text-sm font-medium transition-all capitalize ${
            active === sector
              ? "bg-club-gold text-club-purple font-semibold"
              : "bg-card border border-border hover:border-club-lavender/40"
          }`}
        >
          {sector === "all" ? "All" : sector}
        </button>
      ))}
    </div>
  );
}
