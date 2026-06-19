"use client";

import Link from "next/link";
import { Calendar, ArrowUpRight, ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ClubEmptyState } from "@/components/ui/club-empty-state";
import type { SiteEvent } from "@/lib/schemas";

/* ─── Marquee config ─────────────────────────────────────── */
const ROW_A = [
  { label: "Pitch Nights", emoji: "🎤", color: "from-amber-400/20 to-amber-400/5 border-amber-400/25 text-amber-300" },
  { label: "Founder Dinners", emoji: "🍜", color: "from-rose-400/20 to-rose-400/5 border-rose-400/25 text-rose-300" },
  { label: "Demo Days", emoji: "🚀", color: "from-sky-400/20 to-sky-400/5 border-sky-400/25 text-sky-300" },
  { label: "Hackathons", emoji: "⚡", color: "from-yellow-400/20 to-yellow-400/5 border-yellow-400/25 text-yellow-300" },
  { label: "Mentor Hours", emoji: "🧭", color: "from-violet-400/20 to-violet-400/5 border-violet-400/25 text-violet-300" },
  { label: "Ideation Sprints", emoji: "💡", color: "from-emerald-400/20 to-emerald-400/5 border-emerald-400/25 text-emerald-300" },
];
const ROW_B = [
  { label: "Funding Frenzy", emoji: "💰", color: "from-green-400/20 to-green-400/5 border-green-400/25 text-green-300" },
  { label: "Startup 101", emoji: "📖", color: "from-orange-400/20 to-orange-400/5 border-orange-400/25 text-orange-300" },
  { label: "Legal Clinics", emoji: "⚖️", color: "from-red-400/20 to-red-400/5 border-red-400/25 text-red-300" },
  { label: "Investor Connect", emoji: "🤝", color: "from-cyan-400/20 to-cyan-400/5 border-cyan-400/25 text-cyan-300" },
  { label: "VC Workshops", emoji: "📊", color: "from-purple-400/20 to-purple-400/5 border-purple-400/25 text-purple-300" },
  { label: "IP & Patents", emoji: "🔏", color: "from-pink-400/20 to-pink-400/5 border-pink-400/25 text-pink-300" },
];

type MarqueeItem = { label: string; emoji: string; color: string };

function MarqueeRow({ items, reverse = false, speed = "26s" }: { items: MarqueeItem[]; reverse?: boolean; speed?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden py-1">
      <div
        className="flex gap-3 whitespace-nowrap"
        style={{ animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed} linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r ${item.color} border px-5 py-2.5 text-sm font-semibold cursor-default`}
          >
            <span className="text-base">{item.emoji}</span>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Category styling ───────────────────────────────────── */
const CAT_CONFIG: Record<string, { label: string; style: string; bar: string }> = {
  workshop:   { label: "Workshop",    style: "bg-sky-400/15 text-sky-300 border-sky-400/30",     bar: "bg-gradient-to-r from-sky-400 to-blue-500" },
  hackathon:  { label: "Hackathon",   style: "bg-amber-400/15 text-amber-300 border-amber-400/30", bar: "bg-gradient-to-r from-amber-400 to-yellow-400" },
  networking: { label: "Networking",  style: "bg-violet-400/15 text-violet-300 border-violet-400/30", bar: "bg-gradient-to-r from-violet-500 to-purple-500" },
  other:      { label: "Event",       style: "bg-white/10 text-white/55 border-white/15",         bar: "bg-gradient-to-r from-slate-400 to-slate-500" },
};

/* ─── Marquee section ───────────────────────────────────── */
export function EventsMarquee() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative py-24 lg:py-28 overflow-hidden border-y border-white/[0.06]"
      style={{ background: "linear-gradient(180deg, #0d0920 0%, #130d2e 100%)" }}
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.5) 0%, transparent 70%)", filter: "blur(72px)" }} />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-12"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.5) 0%, transparent 70%)", filter: "blur(64px)" }} />

      <div className="cross-grid absolute inset-0 pointer-events-none" />

      {/* Header */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-14 text-white">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.28em] text-club-lavender/50 mb-5">
                <span className="h-px w-8 bg-club-lavender/40" />
                Community
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.06]">
                Events that<br />
                <span className="gradient-text-hero">build founders.</span>
              </h2>
              <p className="mt-4 text-white/45 text-base max-w-md">
                Workshops, hackathons, investor nights — curated for builders, not spectators.
              </p>
            </div>
            <Link href="/events" className="shrink-0">
              <Button variant="outline" className="gap-2 border-white/15 text-white/70 bg-transparent hover:bg-white/5 hover:border-white/30 hover:text-white">
                All events <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Dual-row marquee */}
      <div className="relative space-y-3">
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0d0920] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0d0920] to-transparent z-10 pointer-events-none" />
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
    <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => {
        const cat = CAT_CONFIG[event.category] ?? CAT_CONFIG.other;
        return (
          <StaggerItem key={event.slug}>
            <Link href={`/events/${event.slug}`} className="group block h-full">
              <article className="h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-club-lavender/30">
                {/* Gradient top bar */}
                <div className={`h-1.5 ${cat.bar}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${cat.style}`}>
                      {cat.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted/30 group-hover:text-club-lavender transition-colors" />
                  </div>
                  <time className="text-xs font-bold text-club-gold tracking-wide">
                    {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                  <h3 className="mt-2 text-lg font-black tracking-tight leading-snug group-hover:text-club-lavender-dim transition-colors">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed">{event.description}</p>
                </div>
              </article>
            </Link>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
