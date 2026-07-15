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

export function ProgramsScroll({ programs }: { programs: Program[] }) {
  const reduceMotion = useReducedMotion();
  const [featured, ...rest] = programs;

  return (
    <section className="programs-dark-grid relative overflow-hidden border-t border-border-ink bg-inverse py-24 text-inverse-foreground lg:py-32">
      <div className="pointer-events-none absolute inset-0 inverse-grid opacity-[0.35]" />

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <m.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="mb-5 inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-inverse-foreground/60">
              <span className="inline-block h-3 w-3 bg-brand-teal" />
              Programs
            </span>
            <h2 className="editorial-display text-4xl sm:text-5xl lg:text-[3.5rem]">
              Every resource you need to{" "}
              <span className="lime-mark">launch.</span>
            </h2>
          </m.div>
          <Link href="/programs" className="shrink-0">
            <Button
              variant="outline"
              className="gap-2 border-inverse-foreground bg-transparent text-inverse-foreground hover:bg-brand-teal hover:text-on-accent hover:border-brand-teal"
            >
              All programs <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 border border-inverse-foreground/25 md:grid-cols-2 xl:grid-cols-3">
          {featured && (() => {
            const Icon = iconMap[featured.icon] ?? Sparkles;
            return (
              <m.div
                key={featured.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="border-b border-inverse-foreground/25 md:border-r xl:col-span-2"
              >
                <Link
                  href="/programs"
                  className="group relative flex h-full min-h-[280px] flex-col bg-brand-teal p-8 text-on-accent transition-colors duration-300"
                >
                  <div className="mb-auto flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center border border-on-accent bg-background text-on-accent">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="font-mono text-5xl font-bold tabular-nums text-on-accent/25">01</span>
                  </div>

                  <div className="mt-8">
                    <span className="mb-3 inline-flex items-center gap-1.5 border border-on-accent bg-inverse px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-inverse-foreground">
                      Featured
                    </span>
                    <h3 className="text-3xl font-black tracking-tight">{featured.title}</h3>
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-on-accent/75">
                      {featured.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] transition-all group-hover:gap-3">
                      Learn more <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </m.div>
            );
          })()}

          {rest.map((program, i) => {
            const Icon = iconMap[program.icon] ?? Sparkles;

            return (
              <m.div
                key={program.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 1) * 0.08, duration: 0.45 }}
                className="border-b border-inverse-foreground/25 last:border-b-0 md:[&:nth-child(odd)]:border-r xl:border-r xl:[&:nth-child(odd)]:border-r"
              >
                <Link
                  href="/programs"
                  className="program-card-link group relative flex h-full min-h-[220px] flex-col p-7 transition-colors duration-300"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div className="program-card-icon flex h-11 w-11 items-center justify-center border border-inverse-foreground/40 text-inverse-foreground transition-colors duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="program-card-accent font-mono text-3xl font-bold tabular-nums text-inverse-foreground/15 transition-colors">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="flex-1 text-lg font-black leading-snug tracking-tight text-inverse-foreground">
                    {program.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-inverse-foreground/45">
                    {program.description}
                  </p>
                  <span className="program-card-accent mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-inverse-foreground/80 transition-all group-hover:gap-2.5">
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
