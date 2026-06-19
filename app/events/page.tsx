"use client";

import { useState } from "react";
import { PageHeader } from "@/components/sections/cta-page-header";
import { EventsGrid } from "@/components/sections/events";
import { events } from "@/lib/data";

const categories = ["all", "workshop", "hackathon", "networking", "other"] as const;

export default function EventsPage() {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? events
      : events.filter((e) => e.category === filter);

  return (
    <>
      <PageHeader
        variant="club"
        badge="Events"
        title="Workshops, hackathons & more"
        description="Build skills, meet founders, and grow your network at SInC events."
      />
      <section className="py-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-none border-2 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide transition-all ${
                  filter === cat
                    ? "border-foreground bg-accent-lime text-foreground shadow-[3px_3px_0_0_#0a0a0a]"
                    : "border-border-ink bg-card text-muted hover:bg-accent-tint hover:text-foreground"
                }`}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
          <EventsGrid
            events={filtered}
            emptyReason={events.length > 0 && filter !== "all" ? "filtered" : "all"}
          />
        </div>
      </section>
    </>
  );
}
