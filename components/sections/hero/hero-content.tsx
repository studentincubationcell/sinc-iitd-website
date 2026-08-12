"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { AsciiField } from "@/components/ui/ascii-field";
import type { AnnouncementItem } from "./hero-announcement";
import type { SocialLink } from "./hero-social-rail";

export type HeroContentProps = {
  eyebrow: string;
  title: string;
  screenTagline: string;
  description: string;
  announcements: AnnouncementItem[];
  socials: SocialLink[];
};

const fadeUp = (delay: number, reduce: boolean | null) => ({
  initial: reduce ? false : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function HeroContent({ eyebrow, title, description }: HeroContentProps) {
  const reduceMotion = useReducedMotion();
  const lines = title.split(". ").map((l, i, arr) => (i < arr.length - 1 ? `${l}.` : l));

  return (
    <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[96rem] flex-col px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pt-32">
      <div className="grid flex-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Headline — top-left, enormous */}
        <div className="pt-6 lg:pt-14">
          <m.h1 className="mega-display text-[13.5vw] text-foreground sm:text-7xl lg:text-[6.6rem] xl:text-[7.5rem]" {...fadeUp(0.05, reduceMotion)}>
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </m.h1>
        </div>

        {/* Generative particle ring — the "signal" (compact on mobile, full on desktop) */}
        <m.div className="relative h-52 sm:h-64 lg:h-auto" {...fadeUp(0.25, reduceMotion)}>
          <AsciiField seed={11} count={520} className="absolute inset-0" />
        </m.div>
      </div>

      {/* Baseline row — small descriptor left, big intro paragraph right */}
      <div className="mt-10 grid items-end gap-8 sm:mt-14 lg:mt-0 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <m.p className="max-w-xs text-base leading-relaxed text-foreground lg:pb-2" {...fadeUp(0.35, reduceMotion)}>
          {eyebrow}
        </m.p>

        <div>
          <m.p
            className="text-pretty text-xl leading-snug tracking-[-0.015em] text-foreground sm:text-[1.75rem]"
            {...fadeUp(0.45, reduceMotion)}
          >
            {description}
          </m.p>
          <m.div className="mt-8 flex flex-wrap items-center gap-6" {...fadeUp(0.55, reduceMotion)}>
            <Link href="/apply" className="pill-cta">
              Start building
            </Link>
            <a
              href="#manifesto"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand-blue"
            >
              Discover more
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card">
                <ArrowDown className="h-4 w-4" aria-hidden />
              </span>
            </a>
          </m.div>
        </div>
      </div>
    </div>
  );
}
