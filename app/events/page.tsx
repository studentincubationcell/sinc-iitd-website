"use client";

import { useState, useMemo } from "react";
import { List, LayoutGrid, Layers } from "lucide-react";
import { PageHeader } from "@/components/sections/cta-page-header";
import { EventsGrid } from "@/components/sections/events";
import { EventsTimeline } from "@/components/sections/events-timeline";
import { EventsGrouped } from "@/components/sections/events-grouped";
import { CalendarMonthPicker } from "@/components/sections/calendar-month-picker";
import { CalendarSubscribe } from "@/components/sections/calendar-subscribe";
import { PageGuide } from "@/components/sections/page-guide";
import { events } from "@/lib/data";

type ViewMode = "organized" | "timeline" | "grid";

export default function EventsPage() {
  const [cohortOnly, setCohortOnly] = useState(false);
  const [view, setView] = useState<ViewMode>("organized");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const baseFiltered = useMemo(() => {
    let list = events;
    if (cohortOnly) {
      list = list.filter((e) => e.cohortOnly);
    }
    return list;
  }, [cohortOnly]);

  const filtered = useMemo(() => {
    let list = baseFiltered;
    if (selectedDate) {
      list = list.filter((e) => e.date.slice(0, 10) === selectedDate);
    }
    return [...list].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [baseFiltered, selectedDate]);

  return (
    <>
      <PageHeader
        variant="club"
        badge="Master calendar"
        title="Events, meets & deadlines"
        description="Biweekly founder meets, funding, networking, government scheme cutoffs, and Cohort 01 milestones — grouped by purpose."
      />
      <section className="py-12 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageGuide title="How this calendar is organized">
            <p>
              <strong>Month view</strong> — click a day to filter. Colored dots show event types.
            </p>
            <p>
              <strong>Organized view</strong> — same items grouped: founder meets → funding → networking → workshops → scheme deadlines → cohort milestones.
            </p>
            <p>
              Toggle <strong>Cohort 01</strong> to see only cohort-specific dates.
            </p>
          </PageGuide>

          <CalendarSubscribe />

          <CalendarMonthPicker
            events={baseFiltered}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setCohortOnly(false)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  !cohortOnly
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted hover:text-foreground"
                }`}
              >
                Everything
              </button>
              <button
                type="button"
                onClick={() => setCohortOnly(true)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  cohortOnly
                    ? "border-foreground bg-pop-pink/30 text-foreground"
                    : "border-border bg-card text-muted hover:text-foreground"
                }`}
              >
                Cohort 01 only
              </button>
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
              {(
                [
                  { mode: "organized" as const, icon: Layers, label: "Organized" },
                  { mode: "timeline" as const, icon: List, label: "Timeline" },
                  { mode: "grid" as const, icon: LayoutGrid, label: "Grid" },
                ] as const
              ).map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setView(mode)}
                  title={label}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors ${
                    view === mode
                      ? "bg-foreground text-background"
                      : "text-muted hover:text-foreground hover:bg-accent-tint/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <p className="mb-6 text-sm text-muted">
              Filtered to{" "}
              <strong className="text-foreground">
                {new Date(selectedDate).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </strong>
              {" · "}
              <button
                type="button"
                onClick={() => setSelectedDate(null)}
                className="underline hover:text-foreground"
              >
                Clear date
              </button>
            </p>
          )}

          {view === "organized" && <EventsGrouped events={filtered} />}
          {view === "timeline" && (
            <EventsTimeline
              events={filtered}
              emptyReason={events.length > 0 ? "filtered" : "all"}
            />
          )}
          {view === "grid" && (
            <EventsGrid
              events={filtered}
              emptyReason={events.length > 0 ? "filtered" : "all"}
            />
          )}
        </div>
      </section>
    </>
  );
}
