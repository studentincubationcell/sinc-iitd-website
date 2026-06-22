"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SiteEvent } from "@/lib/schemas";
import { EVENT_CATEGORY_LABELS } from "@/lib/schemas";

const GROUPS: {
  id: string;
  title: string;
  description: string;
  match: (e: SiteEvent) => boolean;
}[] = [
  {
    id: "founder-meets",
    title: "Biweekly founder meets",
    description: "Standing rhythm for cohort and SInC founders — progress, blockers, peer feedback.",
    match: (e) => e.category === "founder-meet",
  },
  {
    id: "funding",
    title: "Funding & Demo Day",
    description: "Investor sessions, pitch nights, and cohort Demo Day.",
    match: (e) => e.category === "funding",
  },
  {
    id: "networking",
    title: "Networking",
    description: "Founder dinners, community mixers, and informal intros.",
    match: (e) => e.category === "networking",
  },
  {
    id: "workshops",
    title: "Workshops & hackathons",
    description: "Skill-building, selection sprint, and campus build events.",
    match: (e) =>
      ["workshop", "hackathon", "other"].includes(e.category) && !e.cohortOnly,
  },
  {
    id: "deadlines",
    title: "Government schemes & deadlines",
    description: "DPIIT, Startup India seed fund, BIRAC, NIDHI-EIR, and other scheme windows.",
    match: (e) => e.category === "deadline" && !e.cohortOnly,
  },
  {
    id: "cohort",
    title: "Cohort 01 milestones",
    description: "Application close, monthly gates, and cohort-only checkpoints.",
    match: (e) => Boolean(e.cohortOnly),
  },
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function EventRow({ event }: { event: SiteEvent }) {
  const catLabel = EVENT_CATEGORY_LABELS[event.category] ?? "Event";
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col gap-2 border-b border-border py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            {catLabel}
          </span>
          {event.recurring && (
            <span className="text-xs text-muted">↻ {event.recurring}</span>
          )}
        </div>
        <h4 className="font-semibold tracking-tight group-hover:text-primary transition-colors">
          {event.title}
        </h4>
        <p className="mt-1 text-sm text-muted line-clamp-2">{event.description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0 sm:pl-6">
        <time className="text-sm font-medium tabular-nums text-foreground">
          {formatDate(event.date)}
        </time>
        <ArrowUpRight className="h-4 w-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}

export function EventsGrouped({ events }: { events: SiteEvent[] }) {
  const sorted = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const sections = GROUPS.map((group) => ({
    ...group,
    items: sorted.filter(group.match),
  })).filter((s) => s.items.length > 0);

  if (sections.length === 0) {
    return (
      <p className="text-center text-muted py-12 soft-card">
        No events match your filters. Try clearing the date or cohort filter.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <section key={section.id} className="soft-card overflow-hidden">
          <div className="border-b border-border bg-card/80 px-6 py-5 sm:px-8">
            <h3 className="text-lg font-bold tracking-tight">{section.title}</h3>
            <p className="mt-1 text-sm text-muted">{section.description}</p>
            <span className="mt-2 inline-block text-xs font-medium text-muted">
              {section.items.length} {section.items.length === 1 ? "item" : "items"}
            </span>
          </div>
          <div className="px-6 sm:px-8">
            {section.items.map((event) => (
              <EventRow key={event.slug} event={event} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
