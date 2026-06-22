"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BookOpen, ArrowUpRight, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/sections/cta-page-header";
import { StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { resources } from "@/lib/data";
import type { Resource } from "@/lib/schemas";

const CATEGORY_LABELS: Record<Resource["category"], string> = {
  legal: "Legal",
  fundraising: "Fundraising",
  incorporation: "Incorporation",
  operations: "Operations",
  schemes: "Govt schemes",
};

const categories = ["all", ...Object.keys(CATEGORY_LABELS)] as const;

function ResourceLink({ resource }: { resource: Resource }) {
  const isExternal = /^https?:\/\//.test(resource.href);
  const className =
    "group flex h-full flex-col framer-card p-6 transition-all hover:shadow-[var(--shadow-framer-hover)]";

  const inner = (
    <>
      <div className="flex items-start justify-between">
        <span className="inline-flex border-2 border-border-ink bg-accent-tint px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider">
          {CATEGORY_LABELS[resource.category]}
        </span>
        {isExternal ? (
          <ExternalLink className="h-4 w-4 text-muted group-hover:text-foreground transition-colors" />
        ) : (
          <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-foreground transition-colors" />
        )}
      </div>
      <h3 className="mt-4 text-lg font-black tracking-tight group-hover:text-primary transition-colors">
        {resource.title}
      </h3>
      <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{resource.description}</p>
      {resource.readingTime && (
        <p className="mt-4 font-mono text-xs text-muted">{resource.readingTime} read</p>
      )}
    </>
  );

  if (isExternal) {
    return (
      <a href={resource.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={resource.href} className={className}>
      {inner}
    </Link>
  );
}

export function ResourcesGrid() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? resources
        : resources.filter((r) => r.category === filter),
    [filter]
  );

  return (
    <>
      <PageHeader
        variant="club"
        badge="Resources"
        title="Learn before you launch"
        description="Open knowledge for early-stage founders — legal basics, incorporation, fundraising, and government schemes."
      />

      <section className="py-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10">
            <BookOpen className="h-5 w-5 text-muted self-center mr-2" />
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-none border-2 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide transition-all ${
                  filter === cat
                    ? "border-foreground bg-accent-lime text-on-accent brutal-shadow"
                    : "border-border-ink bg-card text-muted hover:bg-accent-tint hover:text-foreground"
                }`}
              >
                {cat === "all" ? "All" : CATEGORY_LABELS[cat as Resource["category"]]}
              </button>
            ))}
          </div>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((resource) => (
              <StaggerItem key={resource.id}>
                <ResourceLink resource={resource} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
