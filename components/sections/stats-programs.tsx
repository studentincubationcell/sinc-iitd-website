"use client";

import {
  Users, Building2, Scale, TrendingUp, Sparkles, ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/lib/data";

/* ─── ClubStatsBand ────────────────────────────────────── */
export function ClubStatsBand() {
  return (
    <section className="relative overflow-hidden border-t border-border-ink bg-background py-24 lg:py-28">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-16 text-center">
          <span className="mb-5 inline-flex items-center justify-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            <span className="inline-block h-3 w-3 bg-accent-lime" />
            Impact
          </span>
          <h2 className="editorial-display text-4xl text-foreground sm:text-5xl">
            Numbers that don&apos;t{" "}
            <span className="lime-mark">lie.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-muted">
            Real outcomes from campus founders — updated as SInC grows.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {site.stats.map((stat, i) => {
            const pop = ["bg-accent-lime", "bg-pop-pink", "bg-pop-sky", "bg-pop-peach"][i % 4];
            return (
              <StaggerItem key={stat.label}>
                <div className={`group flex h-full flex-col justify-between ${pop} brutal-block p-7 text-foreground transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none sm:p-8`}>
                  <div className="flex items-baseline font-black tabular-nums text-foreground">
                    <span className="editorial-display text-5xl sm:text-6xl">
                      <CountUp value={stat.value} duration={1400} />
                    </span>
                    <span className="editorial-display text-3xl sm:text-4xl">{stat.suffix}</span>
                  </div>
                  <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/75">
                    {stat.label}
                  </p>
                </div>
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

export function ProgramsBento({ programs }: { programs: typeof import("@/lib/data").programs }) {
  return (
    <section className="programs-bento-grid border-t border-border-ink bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Programs"
          title="What SInC gives you"
          description="Everything on campus to go from idea to funded startup."
          className="mb-14"
        />
        <StaggerContainer className="grid grid-cols-1 border-l border-t border-border-ink md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => {
            const Icon = iconMap[program.icon] ?? Sparkles;
            return (
              <StaggerItem key={program.id}>
                <div
                  className="program-card-link group relative flex h-full flex-col border-b border-r border-border-ink bg-card p-7 transition-colors duration-300 hover:bg-inverse"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div className="program-card-icon flex h-12 w-12 items-center justify-center border border-border-ink bg-background text-foreground transition-colors duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="program-card-accent font-mono text-3xl font-bold tabular-nums text-foreground/15 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-black tracking-tight text-foreground transition-colors duration-300 group-hover:text-inverse-foreground">{program.title}</h3>
                  <p className="text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-inverse-foreground/70">{program.description}</p>
                  <span className="program-card-accent mt-5 inline-flex items-center gap-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-foreground transition-colors">
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
