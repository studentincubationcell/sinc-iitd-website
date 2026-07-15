"use client";

import {
  Users, Building2, Scale, TrendingUp, Sparkles, ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/lib/data";

/* ─── ClubStatsBand (light editorial numbers band) ─────── */
export function ClubStatsBand() {
  return (
    <section className="relative overflow-hidden border-t border-border-ink/10 bg-card py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" />

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-14 flex max-w-2xl flex-col gap-3">
          <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
            </span>
            Honest numbers
          </span>
          <h2 className="editorial-display text-3xl text-foreground sm:text-4xl lg:text-[2.75rem]">
            Where we are, no vanity metrics
          </h2>
        </Reveal>

        <StaggerContainer
          className="grid grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {site.stats.map((stat, i) => (
            <StaggerItem key={stat.label}>
              <div
                className={`flex h-full flex-col gap-3 border-foreground/15 px-1 py-8 sm:px-6 lg:py-2 ${
                  i > 0 ? "lg:border-l" : ""
                } ${i % 2 === 1 ? "border-l pl-6 lg:pl-6" : ""} ${
                  i < 2 ? "border-b pb-8 lg:border-b-0 lg:pb-2" : "pt-8 lg:pt-2"
                }`}
              >
                <div className="flex items-baseline tabular-nums text-foreground">
                  <span className="editorial-display text-6xl sm:text-7xl lg:text-[5.25rem]">
                    <CountUp value={stat.value} duration={1600} />
                  </span>
                  <span className="editorial-display text-4xl text-brand-teal sm:text-5xl">
                    {stat.suffix}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-tight text-foreground">
                    {stat.label}
                  </p>
                  {stat.note && (
                    <p className="mt-1 text-xs leading-relaxed text-muted">{stat.note}</p>
                  )}
                </div>
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
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
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
