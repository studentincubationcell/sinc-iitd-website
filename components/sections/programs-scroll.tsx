"use client";

import Link from "next/link";
import {
  Users, Building2, Scale, TrendingUp, Sparkles,
  ArrowUpRight, type LucideIcon,
} from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Program } from "@/lib/schemas";

const iconMap: Record<string, LucideIcon> = { Users, Building2, Scale, TrendingUp, Sparkles };

const COLOR: Record<string, {
  pill: string; iconBg: string; icon: string;
  cardGlow: string; topBar: string; dot: string;
}> = {
  mentorship: {
    pill: "bg-sky-400/20 text-sky-300 border-sky-400/30",
    iconBg: "bg-sky-400/15", icon: "text-sky-300",
    cardGlow: "hover:shadow-[0_0_48px_rgba(56,189,248,0.18)]",
    topBar: "from-sky-400 to-blue-500", dot: "bg-sky-400",
  },
  space: {
    pill: "bg-orange-400/20 text-orange-300 border-orange-400/30",
    iconBg: "bg-orange-400/15", icon: "text-orange-300",
    cardGlow: "hover:shadow-[0_0_48px_rgba(251,146,60,0.18)]",
    topBar: "from-orange-400 to-amber-500", dot: "bg-orange-400",
  },
  legal: {
    pill: "bg-rose-400/20 text-rose-300 border-rose-400/30",
    iconBg: "bg-rose-400/15", icon: "text-rose-300",
    cardGlow: "hover:shadow-[0_0_48px_rgba(251,113,133,0.18)]",
    topBar: "from-rose-500 to-red-500", dot: "bg-rose-400",
  },
  funding: {
    pill: "bg-amber-400/20 text-amber-300 border-amber-400/30",
    iconBg: "bg-amber-400/15", icon: "text-amber-300",
    cardGlow: "hover:shadow-[0_0_48px_rgba(251,191,36,0.22)]",
    topBar: "from-amber-400 to-yellow-400", dot: "bg-amber-400",
  },
  community: {
    pill: "bg-violet-400/20 text-violet-300 border-violet-400/30",
    iconBg: "bg-violet-400/15", icon: "text-violet-300",
    cardGlow: "hover:shadow-[0_0_48px_rgba(167,139,250,0.22)]",
    topBar: "from-violet-500 to-purple-500", dot: "bg-violet-400",
  },
};

export function ProgramsScroll({ programs }: { programs: Program[] }) {
  const reduceMotion = useReducedMotion();
  const [featured, ...rest] = programs;

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden border-y border-white/[0.06]"
      style={{
        background: "linear-gradient(160deg, #09051a 0%, #130d2e 55%, #1e1247 100%)",
      }}
    >
      {/* Cross-grid overlay */}
      <div className="absolute inset-0 cross-grid pointer-events-none" />
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.6) 0%, transparent 65%)", filter: "blur(80px)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <m.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.28em] text-club-lavender/50 mb-5">
              <span className="h-px w-8 bg-club-lavender/40" />
              Programs
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.06]">
              Every resource you need<br className="hidden sm:block" />
              <span className="gradient-text-hero"> to launch.</span>
            </h2>
          </m.div>
          <Link href="/programs" className="shrink-0">
            <Button variant="outline" className="gap-2 border-white/15 text-white/70 bg-transparent hover:bg-white/5 hover:border-white/30 hover:text-white">
              All programs <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {/* Featured card — xl:col-span-2 */}
          {featured && (() => {
            const Icon = iconMap[featured.icon] ?? Sparkles;
            const c = COLOR[featured.id] ?? COLOR.community;
            return (
              <m.div
                key={featured.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="xl:col-span-2"
              >
                <Link href="/programs" className={`sheen group relative flex flex-col h-full min-h-[260px] rounded-2xl overflow-hidden dark-card p-8 transition-all duration-300 hover:-translate-y-1.5 ${c.cardGlow}`}>
                  {/* Top gradient bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.topBar}`} />

                  <div className="flex items-start justify-between mb-auto mt-1">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${c.iconBg} ${c.icon} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-white/20 tabular-nums">01</span>
                  </div>

                  <div className="mt-8">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${c.pill} mb-3`}>
                      Featured
                    </span>
                    <h3 className="text-2xl font-black tracking-tight">{featured.title}</h3>
                    <p className="mt-3 text-[15px] text-white/50 leading-relaxed max-w-md">
                      {featured.description}
                    </p>
                    <span className={`mt-6 inline-flex items-center gap-2 text-sm font-bold ${c.icon} group-hover:gap-3 transition-all`}>
                      Learn more <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </m.div>
            );
          })()}

          {/* Rest */}
          {rest.map((program, i) => {
            const Icon = iconMap[program.icon] ?? Sparkles;
            const c = COLOR[program.id] ?? COLOR.community;
            return (
              <m.div
                key={program.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 1) * 0.09, duration: 0.45 }}
              >
                <Link href="/programs" className={`sheen group relative flex flex-col h-full min-h-[200px] rounded-2xl overflow-hidden dark-card p-7 transition-all duration-300 hover:-translate-y-1.5 ${c.cardGlow}`}>
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${c.topBar} opacity-60 group-hover:opacity-100 transition-opacity`} />

                  <div className="flex items-start justify-between mb-5 mt-1">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.iconBg} ${c.icon} group-hover:scale-110 transition-transform`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-white/20">{String(i + 2).padStart(2, "0")}</span>
                  </div>

                  <h3 className="text-[17px] font-black tracking-tight flex-1 leading-snug">{program.title}</h3>
                  <p className="mt-2 text-sm text-white/45 leading-relaxed line-clamp-2">{program.description}</p>
                  <span className={`mt-5 inline-flex items-center gap-1.5 text-xs font-bold ${c.icon} group-hover:gap-2.5 transition-all`}>
                    Explore <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
