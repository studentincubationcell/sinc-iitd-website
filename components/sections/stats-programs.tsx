"use client";

import {
  Users, Building2, Scale, TrendingUp, Sparkles, ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/lib/data";

/* ─── ClubStatsBand (transparency dashboard) ───────────── */
export function ClubStatsBand() {
  return (
    <section className="border-t border-border bg-card/30 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 max-w-2xl">
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
            </span>
            Transparency
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Where we are, in honest numbers
          </h2>
          <p className="mt-2 text-sm text-muted">
            No vanity metrics. What SInC has deployed, who&apos;s in the room, and what we&apos;ve shipped — updated as we grow.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {site.stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="soft-card flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-baseline font-bold tabular-nums text-foreground">
                  <span className="text-4xl sm:text-5xl">
                    <CountUp value={stat.value} duration={1400} />
                  </span>
                  <span className="text-2xl sm:text-3xl text-muted">{stat.suffix}</span>
                </div>
                <p className="mt-3 text-sm font-semibold tracking-tight text-foreground">
                  {stat.label}
                </p>
                {stat.note && (
                  <p className="mt-1 text-xs leading-relaxed text-muted">{stat.note}</p>
                )}
              </div>
            </StaggerItem>
          ))}
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
