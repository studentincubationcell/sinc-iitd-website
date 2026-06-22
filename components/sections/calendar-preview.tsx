"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { events } from "@/lib/data";
import { EVENT_CATEGORY_LABELS } from "@/lib/schemas";

export function CalendarPreview() {
  const upcoming = [...events]
    .filter((e) => new Date(e.date) >= new Date("2026-06-01"))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  return (
    <section className="section-padding border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-2xl">
            <SectionHeading
              label="Master calendar"
              title="Meets, funding & deadlines"
              description="Biweekly founder meets, networking, funding events, and government scheme cutoffs."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/events">
              <Button variant="outline" className="gap-2 bg-card">
                Open calendar <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Reveal>
        </div>

        <div className="space-y-3">
          {upcoming.map((event) => (
            <Reveal key={event.slug}>
              <Link
                href={`/events/${event.slug}`}
                className="group soft-card flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 sm:p-5 transition-colors hover:bg-accent-tint/25"
              >
                <div className="flex items-center gap-3 sm:w-40 shrink-0">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-accent-tint/60">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <time className="font-mono text-xs font-semibold uppercase tracking-wide text-muted">
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </time>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="rounded-md border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                      {EVENT_CATEGORY_LABELS[event.category]}
                    </span>
                    {event.cohortOnly && (
                      <span className="rounded-md bg-pop-pink/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                        Cohort
                      </span>
                    )}
                    {event.recurring && (
                      <span className="text-[10px] text-muted">
                        ↻ {event.recurring}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold tracking-tight truncate">{event.title}</h3>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
