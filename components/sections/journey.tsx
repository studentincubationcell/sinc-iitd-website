"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { JourneyStep } from "@/lib/schemas";

function Step({ step, i }: { step: JourneyStep; i: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <m.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col gap-4 border-border-ink bg-card p-7 transition-colors duration-300 hover:bg-foreground lg:border-l lg:first:border-l-0 [&:not(:last-child)]:border-b lg:[&:not(:last-child)]:border-b-0"
    >
      {/* Number marker */}
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center bg-accent-lime font-mono text-xl font-bold text-foreground">
          {step.step}
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-background/60">
          Step {step.step}
        </span>
      </div>

      <div>
        <h3 className="text-lg font-black tracking-tight text-foreground transition-colors duration-300 group-hover:text-background">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-background/70">
          {step.description}
        </p>
      </div>
    </m.div>
  );
}

export function JourneySection({
  steps,
}: {
  steps: JourneyStep[];
  variant?: "dark" | "light";
}) {
  return (
    <section className="relative overflow-hidden border-t border-border-ink bg-background py-24 lg:py-32">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mb-16 text-center">
          <span className="mb-5 inline-flex items-center justify-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            <span className="inline-block h-3 w-3 bg-accent-lime" />
            The path
          </span>
          <h2 className="editorial-display text-4xl text-foreground sm:text-5xl">
            Idea, to MVP, to{" "}
            <span className="lime-mark">funded.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-muted">
            Five steps from a late-night idea to a funded company — we&apos;re with you the whole way.
          </p>
        </Reveal>

        {/* Steps */}
        <div className="grid border border-border-ink lg:grid-cols-5">
          {steps.map((step, i) => (
            <Step key={step.step} step={step} i={i} />
          ))}
        </div>

        {/* CTA */}
        <Reveal className="mt-12 text-center">
          <Link href="/programs">
            <Button size="lg" variant="club" className="h-13 gap-2 px-10 font-bold normal-case tracking-normal">
              Explore Programs <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
