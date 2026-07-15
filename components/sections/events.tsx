"use client";

import Link from "next/link";
import {
  Calendar, ArrowUpRight, ArrowRight, Mic, Utensils, Rocket, Zap, Compass,
  Lightbulb, Banknote, BookOpen, Scale, Handshake, BarChart3, ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ClubEmptyState } from "@/components/ui/club-empty-state";
import type { SiteEvent } from "@/lib/schemas";
import { EVENT_CATEGORY_LABELS } from "@/lib/schemas";

/* ─── Marquee config ─────────────────────────────────────── */
const ROW_A = [
  { label: "Pitch Nights", icon: Mic },
  { label: "Founder Dinners", icon: Utensils },
  { label: "Demo Days", icon: Rocket },
  { label: "Hackathons", icon: Zap },
  { label: "Mentor Hours", icon: Compass },
  { label: "Ideation Sprints", icon: Lightbulb },
];
const ROW_B = [
  { label: "Funding Frenzy", icon: Banknote },
  { label: "Startup 101", icon: BookOpen },
  { label: "Legal Clinics", icon: Scale },
  { label: "Investor Connect", icon: Handshake },
  { label: "VC Workshops", icon: BarChart3 },
  { label: "IP & Patents", icon: ShieldCheck },
];

type MarqueeItem = { label: string; icon: LucideIcon };

function MarqueeRow({ items, reverse = false, speed = "26s" }: { items: MarqueeItem[]; reverse?: boolean; speed?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden py-1">
      <div
        className="flex gap-3 whitespace-nowrap"
        style={{ animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed} linear infinite` }}
      >
        {doubled.map((item, i) => {
          const Icon = item.icon;
          return (
            <span
              key={i}
              className="group inline-flex cursor-default items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-accent-tint/50"
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              {item.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Category styling ───────────────────────────────────── */
function getCategoryLabel(category: string) {
  return (
    EVENT_CATEGORY_LABELS[category as keyof typeof EVENT_CATEGORY_LABELS] ??
    "Event"
  );
}

/* ─── Marquee section ───────────────────────────────────── */
export function EventsMarquee() {
  return (
    <section className="section-padding border-t border-border bg-background overflow-hidden">
      <div className="mx-auto mb-10 max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-muted">
                Community
              </span>
              <h2 className="editorial-display text-3xl text-foreground sm:text-4xl">
                Events that build{" "}
                <span className="lime-mark">founders.</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Workshops, hackathons, investor nights — curated for builders, not spectators.
              </p>
            </div>
            <Link href="/events" className="shrink-0">
              <Button variant="outline" className="gap-2 bg-card">
                All events <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="relative space-y-2 border-y border-border py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
        <MarqueeRow items={ROW_A} speed="32s" />
        <MarqueeRow items={ROW_B} reverse speed="38s" />
      </div>
    </section>
  );
}

/* ─── Events grid (for /events page) ────────────────────── */
export function EventsGrid({
  events,
  showEmpty = true,
  emptyReason = "all",
}: {
  events: SiteEvent[];
  showEmpty?: boolean;
  emptyReason?: "all" | "filtered";
}) {
  if (events.length === 0 && showEmpty) {
    return (
      <ClubEmptyState
        icon={Calendar}
        title={emptyReason === "filtered" ? "No events in this category" : "No events yet"}
        description={
          emptyReason === "filtered"
            ? "Try another filter or check back soon."
            : "Workshops, hackathons, and founder meetups coming soon. Follow SInC on socials."
        }
        hint={emptyReason === "all" ? "Add events in data/events.json" : undefined}
        action={{ href: "/contact", label: "Get notified", variant: "outline" }}
      />
    );
  }

  return (
    <StaggerContainer className="grid border-l border-t border-border-ink sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => {
        const catLabel = getCategoryLabel(event.category);
        return (
          <StaggerItem key={event.slug}>
            <Link href={`/events/${event.slug}`} className="group block h-full border-b border-r border-border-ink">
              <article className="flex h-full flex-col bg-card transition-colors duration-300 hover:bg-inverse">
                {/* Image header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border-ink">
                  {event.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="dot-grid flex h-full w-full items-center justify-center bg-accent-tint">
                      <Calendar className="h-10 w-10 text-foreground/30" strokeWidth={1.5} />
                    </div>
                  )}
                  <span className="absolute left-3 top-3 inline-flex items-center border-2 border-border-ink bg-accent-lime px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
                    {catLabel}
                  </span>
                </div>
                {/* Body */}
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center justify-between">
                    <time className="font-mono text-xs font-bold tracking-wide text-muted transition-colors group-hover:text-accent-lime">
                      {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    </time>
                    <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-accent-lime" />
                  </div>
                  <h3 className="mt-2 text-lg font-black leading-snug tracking-tight text-foreground transition-colors group-hover:text-inverse-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted transition-colors group-hover:text-inverse-foreground/70">{event.description}</p>
                </div>
              </article>
            </Link>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
