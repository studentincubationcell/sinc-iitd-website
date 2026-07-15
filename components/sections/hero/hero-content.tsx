"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  FlaskConical,
  Lightbulb,
  Network,
  Rocket,
  Users,
} from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { HeroAnnouncement, type AnnouncementItem } from "./hero-announcement";
import type { SocialLink } from "./hero-social-rail";

export type HeroContentProps = {
  eyebrow: string;
  title: string;
  screenTagline: string;
  description: string;
  announcements: AnnouncementItem[];
  socials: SocialLink[];
};

const signalStops = [
  { label: "People", icon: Users, className: "md:translate-y-8" },
  { label: "Labs", icon: FlaskConical, className: "md:-translate-y-6" },
  { label: "Programs", icon: Network, className: "md:translate-y-12" },
  { label: "Venture", icon: Rocket, className: "md:-translate-y-2" },
];

const fadeUp = (delay: number, reduce: boolean | null) => ({
  initial: reduce ? false : { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function HeroContent({ eyebrow, title, description, announcements }: HeroContentProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[90rem] flex-col px-4 pb-8 pt-28 sm:px-6 lg:px-8 lg:pt-36">
      <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <m.div {...fadeUp(0, reduceMotion)} className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-accent signal-pulse" aria-hidden />
            <p className="mono-label text-brand-blue">{eyebrow}</p>
          </m.div>

          <m.h1
            className="mt-7 max-w-4xl text-balance font-display text-5xl font-semibold leading-[0.94] tracking-[-0.055em] text-foreground sm:text-7xl lg:text-[6.2rem]"
            {...fadeUp(0.08, reduceMotion)}
          >
            {title}
          </m.h1>

          <m.div className="mt-7 flex max-w-2xl items-start gap-4 border-l-2 border-brand-blue pl-5" {...fadeUp(0.16, reduceMotion)}>
            <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-brand-blue" aria-hidden />
            <p className="text-pretty text-base leading-relaxed text-muted sm:text-xl">{description}</p>
          </m.div>

          <m.div className="mt-9 flex flex-wrap gap-3" {...fadeUp(0.24, reduceMotion)}>
            <Link href="/events" className="inline-flex min-h-12 items-center bg-brand-blue px-6 text-sm font-bold text-primary-foreground transition-colors hover:bg-foreground">
              Follow the signal <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/apply" className="inline-flex min-h-12 items-center border border-brand-blue bg-card px-6 text-sm font-bold text-brand-blue transition-colors hover:bg-accent-tint">
              Bring an idea
            </Link>
          </m.div>
        </div>

        <m.aside
          className="signal-grid border border-brand-blue bg-card p-5 shadow-[8px_8px_0_0_var(--brand-blue)] sm:p-8"
          {...fadeUp(0.22, reduceMotion)}
          aria-label="How an idea moves through SInC"
        >
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <p className="mono-label text-brand-blue">Idea signal / 01</p>
              <p className="mt-2 text-sm text-muted">One spark. A connected campus.</p>
            </div>
            <CalendarDays className="h-5 w-5 text-brand-blue" aria-hidden />
          </div>

          <div className="py-10 sm:py-14">
            <div className="flex items-center gap-2">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent ring-4 ring-accent/20">
                <Lightbulb className="h-6 w-6" aria-hidden />
                <span className="sr-only">Idea</span>
              </div>
              <div className="h-px flex-1 bg-brand-blue" aria-hidden />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {signalStops.map(({ label, icon: Icon, className }, index) => (
                <div key={label} className={`relative bg-card ${className}`}>
                  <div className="flex min-h-24 flex-col justify-between border border-border p-3 transition-colors hover:border-brand-blue hover:bg-accent-tint">
                    <span className="font-mono text-[10px] text-muted">0{index + 2}</span>
                    <span className="flex items-center gap-2 text-xs font-bold text-foreground"><Icon className="h-4 w-4 text-brand-blue" />{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {announcements.length > 0 && <HeroAnnouncement items={announcements} />}
        </m.aside>
      </div>

      <m.div className="flex items-center justify-between border-t border-brand-blue py-6" {...fadeUp(0.34, reduceMotion)}>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Spark → connect → test → build</p>
        <a href="#community" className="hidden items-center gap-2 text-xs font-semibold text-brand-blue sm:flex">Explore the ecosystem <ArrowDownRight className="h-4 w-4" /></a>
      </m.div>
    </div>
  );
}
