"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/sections/cta-page-header";
import { PortfolioGrid, SectorFilters } from "@/components/sections/portfolio";
import { PageGuide } from "@/components/sections/page-guide";
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
        badge="Startup portfolio"
        title="Campus ventures"
        description="Founder name, background, one-line pitch, logo, idea, and valuation — add startups in data/startups.json."
      />
      <section className="py-12 pb-24">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <PageGuide title="Each startup profile includes">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Founder</strong> — name + short background</li>
              <li><strong>Pitch</strong> — one-line tagline on the card; full idea on the detail page</li>
              <li><strong>Logo</strong> — add in <code className="text-xs">data/startups.json</code> when ready</li>
              <li><strong>Valuation</strong> — stage label (Pre-seed, Undisclosed, etc.)</li>
            </ul>
            <p className="pt-2">Edit all startups in <code className="text-xs">data/startups.json</code>.</p>
          </PageGuide>
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
