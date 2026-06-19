"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroTypewriter } from "./hero-typewriter";
import { HeroLaptopVisual } from "./hero-laptop-visual";
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
  { emoji: "🎓", label: "IIT Delhi" },
  { emoji: "🏗️", label: "R&I Park" },
  { emoji: "💼", label: "Industry Mentors" },
  { emoji: "🚀", label: "40+ Startups" },
];

export function HeroContent({
  eyebrow,
  title,
  screenTagline,
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
              <m.div
                className="mb-7"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <HeroAnnouncement items={announcements} />
              </m.div>
            )}

            {/* Eyebrow */}
            <m.p
              className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-club-lavender/60 mb-5 flex items-center gap-2"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <span className="inline-block h-px w-8 bg-club-lavender/40" />
              {eyebrow}
            </m.p>

            {/* Headline */}
            <m.h1
              className="text-5xl sm:text-6xl lg:text-[4rem] font-black leading-[1.04] text-white tracking-tight"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              {title}
            </m.h1>

            {/* Typewriter */}
            <m.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.22, duration: 0.4 }}
            >
              <HeroTypewriter />
            </m.div>

            {/* Description */}
            <m.p
              className="mt-6 text-base sm:text-lg text-white/45 leading-relaxed max-w-[26rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
            >
              {description}
            </m.p>

            {/* CTAs */}
            <m.div
              className="mt-9 flex flex-wrap gap-3"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
            >
              <Link href="/apply">
                <Button
                  size="lg"
                  variant="club"
                  className="h-13 px-8 text-[15px] font-bold normal-case tracking-normal gap-2 shadow-[0_0_28px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transition-shadow"
                >
                  Apply now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/programs">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 px-8 text-[15px] border-white/15 text-white/80 hover:bg-white/6 hover:border-white/30 hover:text-white"
                >
                  Our programs
                </Button>
              </Link>
            </m.div>

            {/* Trust bar */}
            <m.div
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.58 }}
            >
              {TRUST_ITEMS.map((item) => (
                <span key={item.label} className="flex items-center gap-1.5 text-xs text-white/35 font-medium">
                  <span>{item.emoji}</span>{item.label}
                </span>
              ))}
            </m.div>
          </div>

          {/* ── Right column — laptop ────────────────────── */}
          <m.div
            initial={reduceMotion ? false : { opacity: 0, x: 32, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroLaptopVisual screenTagline={screenTagline} announcement={null} />
          </m.div>
        </div>
      </div>
    </div>
  );
}
