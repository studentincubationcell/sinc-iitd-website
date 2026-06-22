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
      className="group relative flex flex-col gap-4 bg-card p-6 transition-colors duration-300 hover:bg-accent-tint/30 lg:rounded-none lg:border-l lg:border-border lg:first:border-l-0 lg:p-7 [&:not(:last-child)]:border-b lg:[&:not(:last-child)]:border-b-0 lg:[&:not(:last-child)]:border-border"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-lime font-mono text-lg font-bold text-on-accent">
          {step.step}
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
          Step {step.step}
        </span>
      </div>

      <div>
        <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
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
    <section className="section-padding border-t border-border bg-card/30">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-14 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-muted">
            The path
          </span>
          <h2 className="editorial-display text-3xl text-foreground sm:text-4xl lg:text-5xl">
            Idea, to MVP, to{" "}
            <span className="lime-mark">funded.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Five steps from a late-night idea to a funded company — we&apos;re with you the whole way.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-5 lg:gap-0 lg:overflow-hidden lg:rounded-lg lg:border lg:border-border">
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
