import Link from "next/link";
import { Rocket, Filter } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Startup } from "@/lib/schemas";

export function PortfolioEmptyState() {
  return (
    <div className="framer-card border-dashed p-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
        <Rocket className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Portfolio launching soon</h3>
      <p className="text-muted max-w-md mx-auto mb-2">
        Our founders are building. This space will showcase IIT Delhi startups
        incubated through SInC.
      </p>
      <p className="text-sm text-muted/70 mb-8">
        Add startups in <code className="text-primary">data/startups.json</code>
      </p>
      <Link href="/apply">
        <Button>Be the first featured startup</Button>
      </Link>
    </div>
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
    return <PortfolioEmptyState />;
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
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all capitalize ${
            active === sector
              ? "bg-primary text-white shadow-lg shadow-primary/25"
              : "bg-card border border-border hover:border-primary/30"
          }`}
        >
          {sector === "all" ? "All" : sector}
        </button>
      ))}
    </div>
  );
}
