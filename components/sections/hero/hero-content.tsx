"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { AsciiRingReel } from "@/components/ui/ascii-ring-reel";
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
  initial: reduce ? false : { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/**
 * Desktop: headline left · large ring right (own stage).
 * Mobile: headline → ring → short copy + CTAs (visual before the wall of text).
 */
export function HeroContent({ eyebrow, title, description }: HeroContentProps) {
  const reduceMotion = useReducedMotion();
  const lines = title.split(". ").map((l, i, arr) => (i < arr.length - 1 ? `${l}.` : l));

  return (
    <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[96rem] flex-col justify-center px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-14 lg:pt-28">
      <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] lg:gap-4 xl:gap-8">
        {/* Copy column */}
        <div className="relative z-10 order-1 max-w-xl">
          <m.p
            className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted"
            {...fadeUp(0.02, reduceMotion)}
          >
            {eyebrow}
          </m.p>

          <m.h1
            className="mega-display text-[12vw] leading-[0.96] text-foreground sm:text-6xl lg:text-[4.6rem] xl:text-[5.4rem]"
            {...fadeUp(0.06, reduceMotion)}
          >
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </m.h1>

          {/* Desktop copy under headline; on mobile this block sits after the ring via order */}
          <div className="mt-6 hidden lg:block">
            <m.p
              className="max-w-md text-pretty text-base leading-relaxed text-foreground/90 sm:text-lg"
              {...fadeUp(0.16, reduceMotion)}
            >
              {description}
            </m.p>
            <m.div
              className="mt-8 flex flex-wrap items-center gap-5"
              {...fadeUp(0.24, reduceMotion)}
            >
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

        {/* Ring — dominant visual */}
        <m.div
          className="relative order-2 -mx-4 aspect-[16/11] w-[calc(100%+2rem)] justify-self-center sm:-mx-2 sm:w-[calc(100%+1rem)] lg:mx-0 lg:aspect-auto lg:h-[min(64vh,580px)] lg:w-full lg:justify-self-stretch"
          {...fadeUp(0.12, reduceMotion)}
        >
          <AsciiRingReel className="absolute inset-0" showCaption={false} />
        </m.div>

        {/* Mobile copy under ring */}
        <div className="order-3 lg:hidden">
          <m.p
            className="text-pretty text-base leading-relaxed text-foreground/90"
            {...fadeUp(0.18, reduceMotion)}
          >
            {description}
          </m.p>
          <m.div
            className="mt-6 flex flex-wrap items-center gap-5"
            {...fadeUp(0.26, reduceMotion)}
          >
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
