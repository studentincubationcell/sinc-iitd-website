"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/sections/cta-page-header";
import { PortfolioGrid, SectorFilters } from "@/components/sections/portfolio";
import { startups } from "@/lib/data";

export default function PortfolioPage() {
  const [sector, setSector] = useState("all");

  const sectors = useMemo(
    () => [...new Set(startups.map((s) => s.sector))],
    []
  );

  return (
    <>
      <PageHeader
        variant="club"
        badge="Portfolio"
        title="Campus startups"
        description="Founders building from IIT Delhi with SInC support."
      />
      <section className="py-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {sectors.length > 0 && (
            <SectorFilters
              sectors={sectors}
              active={sector}
              onChange={setSector}
            />
          )}
          <PortfolioGrid startups={startups} sectorFilter={sector} />
        </div>
      </section>
    </>
  );
}
