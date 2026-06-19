"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { JourneyStep } from "@/lib/schemas";

/* Each step gets a distinct color theme */
const STEP_THEMES = [
  {
    ring: "border-amber-400",
    bg: "bg-amber-400/12",
    text: "text-amber-300",
    glow: "shadow-[0_0_32px_rgba(251,191,36,0.35)]",
    bar: "from-amber-400",
    label: "text-amber-400",
  },
  {
    ring: "border-sky-400",
    bg: "bg-sky-400/12",
    text: "text-sky-300",
    glow: "shadow-[0_0_32px_rgba(56,189,248,0.3)]",
    bar: "from-sky-400",
    label: "text-sky-400",
  },
  {
    ring: "border-violet-400",
    bg: "bg-violet-400/12",
    text: "text-violet-300",
    glow: "shadow-[0_0_32px_rgba(167,139,250,0.3)]",
    bar: "from-violet-400",
    label: "text-violet-400",
  },
  {
    ring: "border-orange-400",
    bg: "bg-orange-400/12",
    text: "text-orange-300",
    glow: "shadow-[0_0_32px_rgba(251,146,60,0.3)]",
    bar: "from-orange-400",
    label: "text-orange-400",
  },
  {
    ring: "border-emerald-400",
    bg: "bg-emerald-400/12",
    text: "text-emerald-300",
    glow: "shadow-[0_0_32px_rgba(52,211,153,0.3)]",
    bar: "from-emerald-400",
    label: "text-emerald-400",
  },
];

/* Light variant uses framer-card on white bg */
function LightStep({ step, i }: { step: JourneyStep; i: number }) {
  const t = STEP_THEMES[i % STEP_THEMES.length];
  const reduceMotion = useReducedMotion();
  return (
    <m.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full rounded-2xl border border-border bg-card p-7 hover:-translate-y-1.5 hover:border-club-lavender/30 hover:shadow-lg transition-all duration-300"
    >
      {/* Color left-border accent */}
      <div className={`absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b ${t.bar} to-transparent opacity-60 group-hover:opacity-100 transition-opacity`} />

      <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${t.bg} ${t.text} text-lg font-black mb-5`}>
        {step.step}
      </span>
      <h3 className="text-lg font-black tracking-tight text-foreground">{step.title}</h3>
      <p className="mt-2 text-sm text-muted leading-relaxed">{step.description}</p>
    </m.div>
  );
}

/* Dark variant — for homepage */
function DarkStep({ step, i }: { step: JourneyStep; i: number }) {
  const t = STEP_THEMES[i % STEP_THEMES.length];
  const reduceMotion = useReducedMotion();
  return (
    <m.div
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col lg:items-center lg:text-center gap-4"
    >
      {/* Node */}
      <div
        className={cn(
          "relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 transition-all duration-300",
          t.ring, t.bg, t.text,
          "group-hover:scale-110 group-hover:border-opacity-100",
          `group-hover:${t.glow}`
        )}
      >
        <span className="text-2xl font-black">{step.step}</span>
        {/* Pulse ring */}
        <span className={cn("absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-30 scale-100 group-hover:scale-[1.35] transition-all duration-700", t.ring)} />
      </div>

      <div>
        <span className={`text-[10px] font-extrabold uppercase tracking-[0.2em] ${t.label} mb-1 block`}>
          Step {step.step}
        </span>
        <h3 className="text-lg font-black text-white tracking-tight">{step.title}</h3>
        <p className="mt-1.5 text-sm text-white/40 leading-relaxed">{step.description}</p>
      </div>
    </m.div>
  );
}

export function JourneySection({
  steps,
  variant = "dark",
}: {
  steps: JourneyStep[];
  variant?: "dark" | "light";
}) {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "relative py-24 lg:py-32 overflow-hidden",
        isDark
          ? "border-y border-white/[0.06]"
          : "border-y border-border"
      )}
      style={isDark ? {
        background: "linear-gradient(160deg, #130d2e 0%, #1e1247 50%, #130d2e 100%)",
      } : undefined}
    >
      {/* Dark variant decorations */}
      {isDark && (
        <>
          <div className="absolute inset-0 cross-grid pointer-events-none" />
          {/* Connecting horizontal line */}
          <div className="hidden lg:block absolute top-[calc(50%+2rem)] left-[calc(10%+3rem)] right-[calc(10%+3rem)] h-px bg-gradient-to-r from-transparent via-club-lavender/20 to-transparent pointer-events-none" />
          {/* Gold orb top */}
          <div
            className="pointer-events-none absolute -top-32 right-1/3 w-72 h-72 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, rgba(245,158,11,0.8) 0%, transparent 70%)", filter: "blur(60px)" }}
          />
        </>
      )}

      {/* Light variant decorations */}
      {!isDark && <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        {isDark ? (
          <Reveal className="text-center mb-20 text-white">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.28em] text-club-lavender/50 mb-5">
              <span className="h-px w-8 bg-club-lavender/40" />
              The path
              <span className="h-px w-8 bg-club-lavender/40" />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.06]">
              Idea → MVP → funded.<br />
              <span className="gradient-text-hero">We&apos;re with you.</span>
            </h2>
          </Reveal>
        ) : (
          <Reveal className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.28em] text-club-lavender-dim mb-5">
              <span className="h-px w-8 bg-club-lavender-dim/50" />
              Process
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.06] text-foreground">
              Five steps from idea<br />
              <span className="gradient-text">to launch.</span>
            </h2>
          </Reveal>
        )}

        {/* Steps */}
        <div className="grid gap-6 lg:grid-cols-5">
          {steps.map((step, i) =>
            isDark
              ? <DarkStep key={step.step} step={step} i={i} />
              : <LightStep key={step.step} step={step} i={i} />
          )}
        </div>

        {/* CTA */}
        <Reveal className="mt-16 text-center">
          <Link href="/programs">
            <Button
              size="lg"
              variant={isDark ? "club" : "default"}
              className={cn("gap-2 px-10 font-bold normal-case tracking-normal h-13",
                isDark && "shadow-[0_4px_28px_rgba(245,158,11,0.35)] hover:shadow-[0_4px_40px_rgba(245,158,11,0.5)] transition-shadow"
              )}
            >
              Explore Programs <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
