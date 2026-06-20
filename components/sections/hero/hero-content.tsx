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
  initial: reduce ? false : { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function DeepTechFrame({
  label,
  tagClass,
  accentClass,
  imageClass,
  caption,
}: {
  label: string;
  tagClass: string;
  accentClass: string;
  imageClass: string;
  caption: string;
}) {
  return (
    <div className="relative w-full">
      <div
        className={`absolute -left-3 -top-3 z-10 border-2 border-border-ink px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-foreground ${tagClass}`}
      >
        Deep-Tech
      </div>
      <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted empty:hidden">
        {label}
      </p>
      <div className="relative aspect-square w-full border border-border-ink bg-card-pure hard-shadow-lg">
        <Image
          src="/hero-glass-render.png"
          alt="Abstract render representing SInC's deep-tech engineering platform"
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 40vw"
          className={`object-contain p-2 ${imageClass}`}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border-ink bg-background px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {caption}
          </span>
          <span className={`h-2 w-2 border border-border-ink ${accentClass}`} />
        </div>
      </div>
    </div>
  );
}

export function HeroContent({
  eyebrow,
  title,
  screenTagline,
  description,
  announcements,
}: HeroContentProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 min-h-[100svh] flex items-center px-4 pt-28 pb-16 sm:px-6 lg:px-8 md:pl-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">

          {/* ── Left column ─────────────────────────────── */}
          <div className="lg:col-span-7">

            {/* Mono kicker */}
            <m.div
              className="mb-7 flex items-center gap-3"
              {...fadeUp(0, reduceMotion)}
            >
              <span className="lime-block px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
                01 / SInC
              </span>
              <span className="mono-label">{eyebrow}</span>
            </m.div>

            {/* Announcement pill */}
            {announcements.length > 0 && (
              <m.div className="mb-7" {...fadeUp(0.05, reduceMotion)}>
                <HeroAnnouncement items={announcements} />
              </m.div>
            )}

            {/* Headline — oversized editorial */}
            <m.h1
              className="editorial-display text-[3.25rem] leading-[0.9] text-foreground sm:text-7xl lg:text-[6.25rem]"
              {...fadeUp(0.1, reduceMotion)}
            >
              {title}
            </m.h1>

            {/* Tagline with lime mark */}
            <m.p
              className="mt-7 max-w-[34rem] text-lg leading-relaxed text-foreground/80 sm:text-xl"
              {...fadeUp(0.18, reduceMotion)}
            >
              {description}
            </m.p>

            {/* CTAs */}
            <m.div className="mt-9 flex flex-wrap items-center gap-4" {...fadeUp(0.26, reduceMotion)}>
              <Link href="/apply">
                <Button
                  size="lg"
                  variant="club"
                  className="group/btn h-13 gap-2 px-8 text-[15px] font-bold normal-case tracking-normal"
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

            {/* Trust bar — ruled mono row */}
            <m.div
              className="mt-12 grid max-w-2xl grid-cols-2 border-t border-border-ink sm:grid-cols-4"
              {...fadeUp(0.34, reduceMotion)}
            >
              {TRUST_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-2 border-b border-r border-border-ink px-3 py-4 sm:border-b-0"
                >
                  <item.icon className="h-4 w-4 text-foreground" strokeWidth={2} />
                  <span className="font-mono text-[10px] font-semibold uppercase leading-tight tracking-[0.1em] text-muted">
                    {item.label}
                  </span>
                </div>
              ))}
            </m.div>
          </div>

          {/* ── Right column — framed render (Combo A) ───── */}
          <m.div
            className="lg:col-span-5"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative mx-auto w-full max-w-md">
              <DeepTechFrame
                label=""
                tagClass="bg-brand-teal"
                accentClass="bg-brand-teal"
                imageClass="deep-tech-render-teal"
                caption={screenTagline}
              />
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
}
