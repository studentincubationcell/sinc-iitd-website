"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap, Building2, Briefcase, Rocket } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
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

const TRUST_ITEMS = [
  { icon: GraduationCap, label: "IIT Delhi" },
  { icon: Building2, label: "R&I Park" },
  { icon: Briefcase, label: "Industry Mentors" },
  { icon: Rocket, label: "40+ Startups" },
];

const fadeUp = (delay: number, reduce: boolean | null) => ({
  initial: reduce ? false : { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay, ease: "easeOut" as const },
});

export function HeroContent({
  eyebrow,
  title,
  description,
  announcements,
}: HeroContentProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 min-h-[100svh] flex items-center px-4 pt-24 pb-16 sm:px-6 lg:px-8 md:pl-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left column ─────────────────────────────── */}
          <div className="max-w-xl">

            {/* Announcement pill */}
            {announcements.length > 0 && (
              <m.div className="mb-7" {...fadeUp(0, reduceMotion)}>
                <HeroAnnouncement items={announcements} />
              </m.div>
            )}

            {/* Eyebrow */}
            <m.p
              className="mb-5 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-blue"
              {...fadeUp(0.05, reduceMotion)}
            >
              <span className="inline-block h-px w-8 bg-accent-blue/50" />
              {eyebrow}
            </m.p>

            {/* Headline — massive, static, deep slate */}
            <m.h1
              className="headline-tight text-balance text-[2.75rem] font-extrabold text-foreground sm:text-6xl lg:text-[4.25rem]"
              {...fadeUp(0.08, reduceMotion)}
            >
              {title}
            </m.h1>

            {/* Description */}
            <m.p
              className="mt-6 max-w-[28rem] text-base leading-relaxed text-muted sm:text-lg"
              {...fadeUp(0.16, reduceMotion)}
            >
              {description}
            </m.p>

            {/* CTAs */}
            <m.div className="mt-9 flex flex-wrap gap-3" {...fadeUp(0.24, reduceMotion)}>
              <Link href="/apply">
                <Button
                  size="lg"
                  variant="club"
                  className="h-13 gap-2 px-8 text-[15px] font-bold normal-case tracking-normal"
                >
                  Apply now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/programs">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 border-border bg-card px-8 text-[15px] text-foreground hover:bg-muted/5 hover:border-foreground/20"
                >
                  Our programs
                </Button>
              </Link>
            </m.div>

            {/* Trust bar */}
            <m.div
              className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2"
              {...fadeUp(0.32, reduceMotion)}
            >
              {TRUST_ITEMS.map((item, i) => (
                <span key={item.label} className="flex items-center gap-2">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-border" />}
                  <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
                    <item.icon className="h-3.5 w-3.5 text-accent-blue" strokeWidth={2} />
                    {item.label}
                  </span>
                </span>
              ))}
            </m.div>
          </div>

          {/* ── Right column — glassmorphism render ──────── */}
          <m.div
            className="relative"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative mx-auto aspect-square w-full max-w-xl">
              <Image
                src="/hero-glass-render.png"
                alt="Abstract glassmorphism render representing SInC's deep-tech engineering platform"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-contain animate-float"
              />
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
}
