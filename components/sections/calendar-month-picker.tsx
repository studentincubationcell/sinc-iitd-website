"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SiteEvent } from "@/lib/schemas";
import { EVENT_CATEGORY_LABELS } from "@/lib/schemas";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function toDateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function categoryDot(category: SiteEvent["category"]) {
  if (category === "deadline") return "bg-pop-pink";
  if (category === "founder-meet") return "bg-pop-peach";
  if (category === "funding") return "bg-brand-blue";
  return "bg-accent-lime";
}

export function CalendarMonthPicker({
  events,
  selectedDate,
  onSelectDate,
}: {
  events: SiteEvent[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
}) {
  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const eventsByDate = useMemo(() => {
    const map = new Map<string, SiteEvent[]>();
    for (const e of events) {
      const key = e.date.slice(0, 10);
      const list = map.get(key) ?? [];
      list.push(e);
      map.set(key, list);
    }
    return map;
  }, [events]);

  const { gridDays, monthLabel } = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const startPad = (first.getDay() + 6) % 7;
    const days: (Date | null)[] = [];
    for (let i = 0; i < startPad; i++) days.push(null);
    for (let d = 1; d <= last.getDate(); d++) {
      days.push(new Date(year, month, d));
    }
    const label = viewMonth.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
    return { gridDays: days, monthLabel: label };
  }, [viewMonth]);

  function prevMonth() {
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  }

  function nextMonth() {
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  }

  return (
    <div className="soft-card p-6 sm:p-8 mb-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-mono text-sm font-bold uppercase tracking-[0.16em]">
          {monthLabel}
        </h3>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={prevMonth}
            className="flex h-9 w-9 items-center justify-center border-2 border-border-ink bg-background hover:bg-accent-lime transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="flex h-9 w-9 items-center justify-center border-2 border-border-ink bg-background hover:bg-accent-lime transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          {selectedDate && (
            <button
              type="button"
              onClick={() => onSelectDate(null)}
              className="ml-2 border-2 border-border-ink px-3 font-mono text-[10px] font-bold uppercase tracking-wide hover:bg-pop-pink transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center font-mono text-[10px] font-bold uppercase tracking-wider text-muted py-1"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {gridDays.map((day, i) => {
          if (!day) {
            return <div key={`empty-${i}`} className="aspect-square" />;
          }
          const key = toDateKey(day);
          const dayEvents = eventsByDate.get(key) ?? [];
          const isSelected = selectedDate === key;
          const hasEvents = dayEvents.length > 0;

          return (
            <button
              key={key}
              type="button"
              disabled={!hasEvents}
              onClick={() => onSelectDate(isSelected ? null : key)}
              className={`relative aspect-square flex flex-col items-center justify-center border-2 font-mono text-sm font-semibold transition-all ${
                isSelected
                  ? "border-foreground bg-accent-lime text-on-accent brutal-shadow"
                  : hasEvents
                    ? "border-border-ink bg-background hover:bg-accent-tint cursor-pointer"
                    : "border-transparent text-muted/40 cursor-default"
              }`}
            >
              {day.getDate()}
              {hasEvents && (
                <span className="absolute bottom-1 flex gap-0.5">
                  {dayEvents.slice(0, 3).map((e) => (
                    <span
                      key={e.slug}
                      className={`h-1.5 w-1.5 border border-border-ink ${categoryDot(e.category)}`}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 font-mono text-[10px] font-semibold uppercase tracking-wide text-muted">
        {(["founder-meet", "funding", "deadline", "workshop"] as const).map((cat) => (
          <span key={cat} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 border border-border-ink ${categoryDot(cat)}`} />
            {EVENT_CATEGORY_LABELS[cat]}
          </span>
        ))}
      </div>
    </div>
  );
}
