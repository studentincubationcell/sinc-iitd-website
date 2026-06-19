"use client";

import {
  Users, Building2, Scale, TrendingUp, Sparkles, ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { RingGauge } from "@/components/motion/ring-gauge";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/lib/data";

/* ─── Stats ring gauge colors ──────────────────────────── */
const STAT_THEMES = [
  { gradFrom: "#f59e0b", gradTo: "#fcd34d", glow: "rgba(245,158,11,0.3)" },
  { gradFrom: "#a78bfa", gradTo: "#7c5cbf", glow: "rgba(167,139,250,0.3)" },
  { gradFrom: "#34d399", gradTo: "#059669", glow: "rgba(52,211,153,0.25)" },
  { gradFrom: "#60a5fa", gradTo: "#3b82f6", glow: "rgba(96,165,250,0.25)" },
];

/* ─── ClubStatsBand ────────────────────────────────────── */
export function ClubStatsBand() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative py-24 lg:py-28 overflow-hidden border-y border-white/[0.06]"
      style={{ background: "linear-gradient(180deg, #09051a 0%, #130d2e 60%, #0d0920 100%)" }}
    >
      <div className="absolute inset-0 cross-grid pointer-events-none" />

      {/* Ambient centre glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-12"
        style={{ background: "radial-gradient(ellipse, rgba(167,139,250,0.7) 0%, transparent 65%)", filter: "blur(80px)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16 text-white">
          <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.28em] text-club-lavender/50 mb-5">
            <span className="h-px w-8 bg-club-lavender/40" />
            Impact
            <span className="h-px w-8 bg-club-lavender/40" />
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.06]">
            Numbers that<br />
            <span className="gradient-text-hero">don&apos;t lie.</span>
          </h2>
          <p className="mt-4 text-white/40 text-base max-w-md mx-auto">
            Real outcomes from campus founders — updated as SInC grows.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {site.stats.map((stat, i) => {
            const theme = STAT_THEMES[i % STAT_THEMES.length];
            return (
              <StaggerItem key={stat.label}>
                <m.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="sheen group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 flex flex-col items-center gap-4"
                  style={{
                    boxShadow: reduceMotion ? "none" : `0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)`,
                  }}
                >
                  {/* Coloured glow spot */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${theme.glow}, transparent)` }}
                  />
                  <RingGauge
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    fillRatio={0.82}
                    duration={1400}
                    gradFrom={theme.gradFrom}
                    gradTo={theme.gradTo}
                    dark
                  />
                </m.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── ProgramsBento (programs page) ────────────────────── */
const iconMap: Record<string, LucideIcon> = { Users, Building2, Scale, TrendingUp, Sparkles };

const PROG_COLORS: Record<string, { bg: string; icon: string; bar: string }> = {
  mentorship: { bg: "bg-sky-400/10",    icon: "text-sky-400",    bar: "from-sky-400 to-blue-500" },
  space:      { bg: "bg-orange-400/10", icon: "text-orange-400", bar: "from-orange-400 to-amber-500" },
  legal:      { bg: "bg-rose-400/10",   icon: "text-rose-400",   bar: "from-rose-500 to-red-500" },
  funding:    { bg: "bg-amber-400/10",  icon: "text-amber-400",  bar: "from-amber-400 to-yellow-400" },
  community:  { bg: "bg-violet-400/10", icon: "text-violet-400", bar: "from-violet-500 to-purple-500" },
};

export function ProgramsBento({ programs }: { programs: typeof import("@/lib/data").programs }) {
  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Programs"
          title="What SInC gives you"
          description="Everything on campus to go from idea to funded startup."
          className="mb-14"
        />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program) => {
            const Icon = iconMap[program.icon] ?? Sparkles;
            const c = PROG_COLORS[program.id] ?? PROG_COLORS.community;
            return (
              <StaggerItem key={program.id}>
                <div className="group relative overflow-hidden framer-card p-7 h-full">
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${c.bar} opacity-70 group-hover:opacity-100 transition-opacity`} />
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.bg} ${c.icon} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-black tracking-tight text-foreground mb-2">{program.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{program.description}</p>
                  <span className={`mt-5 inline-flex items-center gap-1 text-xs font-bold ${c.icon}`}>
                    Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
