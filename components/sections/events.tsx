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
              className="group inline-flex cursor-default items-center gap-2.5 border border-border-ink bg-card px-5 py-2.5 font-mono text-sm font-semibold uppercase tracking-tight text-foreground transition-colors hover:bg-accent-lime"
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
const CAT_CONFIG: Record<string, { label: string }> = {
  workshop:   { label: "Workshop" },
  hackathon:  { label: "Hackathon" },
  networking: { label: "Networking" },
  other:      { label: "Event" },
};

/* ─── Marquee section ───────────────────────────────────── */
export function EventsMarquee() {
  return (
    <section className="relative overflow-hidden border-t border-border-ink bg-background py-24 lg:py-28">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />

      {/* Header */}
      <div className="relative mx-auto mb-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-5 inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                <span className="inline-block h-3 w-3 bg-accent-lime" />
                Community
              </span>
              <h2 className="editorial-display text-4xl text-foreground sm:text-5xl">
                Events that build{" "}
                <span className="lime-mark">founders.</span>
              </h2>
              <p className="mt-4 max-w-md text-base text-muted">
                Workshops, hackathons, investor nights — curated for builders, not spectators.
              </p>
            </div>
            <Link href="/events" className="shrink-0">
              <Button variant="outline" className="gap-2">
                All events <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Dual-row marquee */}
      <div className="relative space-y-3 border-y border-border-ink py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <MarqueeRow items={ROW_A} speed="24s" />
        <MarqueeRow items={ROW_B} reverse speed="30s" />
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
        const cat = CAT_CONFIG[event.category] ?? CAT_CONFIG.other;
        return (
          <StaggerItem key={event.slug}>
            <Link href={`/events/${event.slug}`} className="group block h-full border-b border-r border-border-ink">
              <article className="flex h-full flex-col bg-card transition-colors duration-300 hover:bg-foreground">
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
                    {cat.label}
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
                  <h3 className="mt-2 text-lg font-black leading-snug tracking-tight text-foreground transition-colors group-hover:text-background">
                    {event.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted transition-colors group-hover:text-background/70">{event.description}</p>
                </div>
              </article>
            </Link>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
