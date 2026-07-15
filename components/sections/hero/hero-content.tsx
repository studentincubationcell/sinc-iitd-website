"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, CalendarDays, Network, Rocket } from "lucide-react";
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

const routes = [
  { label: "Meet the ventures", href: "/portfolio", icon: Rocket },
  { label: "Find an event", href: "/events", icon: CalendarDays },
  { label: "Enter the network", href: "/network", icon: Network },
];

const fadeUp = (delay: number, reduce: boolean | null) => ({
  initial: reduce ? false : { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function HeroContent({ eyebrow, title, description, announcements }: HeroContentProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[90rem] flex-col px-4 pb-8 pt-32 sm:px-6 lg:px-8 lg:pb-10 lg:pt-40">
      <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.35fr_0.65fr]">
        <div>
          <m.div {...fadeUp(0, reduceMotion)}>
            <p className="mono-label text-foreground">{eyebrow}</p>
            <div className="mt-5 h-1 w-20 bg-accent" aria-hidden />
          </m.div>
          <m.h1 className="mt-8 max-w-5xl text-balance font-display text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-foreground sm:text-7xl lg:text-[6.6rem]" {...fadeUp(0.08, reduceMotion)}>
            {title}
          </m.h1>
          <m.p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-xl" {...fadeUp(0.16, reduceMotion)}>{description}</m.p>
          <m.div className="mt-9 flex flex-wrap gap-3" {...fadeUp(0.24, reduceMotion)}>
            <Link href="/events" className="inline-flex min-h-12 items-center bg-foreground px-6 text-sm font-bold text-background transition-colors hover:bg-accent hover:text-on-accent">Explore the ecosystem <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
            <Link href="/apply" className="inline-flex min-h-12 items-center border border-border-ink bg-background px-6 text-sm font-bold text-foreground transition-colors hover:bg-accent-tint">Find your place</Link>
          </m.div>
        </div>

        <m.aside className="border-t border-border-ink lg:border-l lg:border-t-0 lg:pl-10" {...fadeUp(0.28, reduceMotion)} aria-label="Ways to explore SInC">
          <p className="mono-label mb-3 text-foreground">Choose a direction</p>
          {routes.map(({ label, href, icon: Icon }, index) => (
            <Link key={href} href={href} className="group flex items-center justify-between gap-4 border-b border-border py-5">
              <span className="flex items-center gap-3 text-sm font-bold"><span className="flex h-9 w-9 items-center justify-center bg-accent-tint"><Icon className="h-4 w-4" /></span>{label}</span>
              <span className="font-mono text-xs text-muted">0{index + 1}</span>
            </Link>
          ))}
          {announcements.length > 0 && <div className="mt-7"><HeroAnnouncement items={announcements} /></div>}
        </m.aside>
      </div>

      <m.div className="flex items-center justify-between border-t border-border-ink pt-6" {...fadeUp(0.34, reduceMotion)}>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Built by students · Open to the ecosystem</p>
        <a href="#community" className="hidden items-center gap-2 text-xs font-semibold sm:flex">Scroll to discover <ArrowDownRight className="h-4 w-4" /></a>
      </m.div>
    </div>
  );
}
