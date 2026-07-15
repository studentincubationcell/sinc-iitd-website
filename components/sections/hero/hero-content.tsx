"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
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

const ROTATING_WORDS = ["idea", "prototype", "startup", "patent", "product"];

const fadeUp = (delay: number, reduce: boolean | null) => ({
  initial: reduce ? false : { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function RotatingWord({ reduce }: { reduce: boolean | null }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative inline-flex justify-center overflow-hidden rounded-lg border border-brand-teal/40 bg-brand-teal/10 px-3 align-baseline text-brand-teal">
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={ROTATING_WORDS[index]}
          initial={reduce ? false : { y: "70%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: "-70%", opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block font-semibold"
        >
          {ROTATING_WORDS[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

export function HeroContent({
  title,
  announcements,
}: HeroContentProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 flex min-h-[100svh] flex-col items-center px-4 pt-40 sm:px-6 lg:px-8 lg:pt-48">
      {/* Announcement pill */}
      {announcements.length > 0 && (
        <m.div className="mb-10" {...fadeUp(0, reduceMotion)}>
          <HeroAnnouncement items={announcements} />
        </m.div>
      )}

      {/* Headline — giant, centered */}
      <m.h1
        className="editorial-display max-w-5xl text-center text-[3rem] leading-[1.02] text-foreground sm:text-6xl lg:text-[5.25rem] xl:text-[6.25rem]"
        {...fadeUp(0.08, reduceMotion)}
      >
        {title}
      </m.h1>

      {/* Subline with rotating word */}
      <m.p
        className="mt-8 flex flex-wrap items-baseline justify-center gap-x-2 text-center text-lg leading-relaxed text-foreground/85 sm:text-2xl"
        {...fadeUp(0.16, reduceMotion)}
      >
        <span>We turn your</span>
        <RotatingWord reduce={reduceMotion} />
        <span>into a company, right on campus.</span>
      </m.p>

      {/* CTAs — centered pair */}
      <m.div
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
        {...fadeUp(0.24, reduceMotion)}
      >
        <Link href="/apply">
          <Button
            size="lg"
            variant="club"
            className="group/btn h-13 gap-2 rounded-full px-9 text-[15px] font-bold normal-case tracking-normal"
          >
            Apply now
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Button>
        </Link>
        <Link
          href="/programs"
          className="cine-link font-mono text-sm font-semibold uppercase tracking-[0.16em] text-foreground"
        >
          Our programs
        </Link>
      </m.div>

      {/* Grounding line — trust strip anchored to the fold */}
      <m.div
        className="mt-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-border-ink/15 py-8"
        {...fadeUp(0.32, reduceMotion)}
      >
        {["Student-run, IIT Delhi", "Idea to incorporation", "Zero equity taken"].map(
          (item) => (
            <span
              key={item}
              className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
              {item}
            </span>
          )
        )}
      </m.div>
    </div>
  );
}
