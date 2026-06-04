"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/data";
import { Counter } from "@/components/motion/counter";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[92vh] flex items-center dot-grid overflow-hidden">
      <div className="absolute inset-0 mesh-bg pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl mx-auto text-center lg:max-w-4xl">
          <m.p
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-muted shadow-sm mb-8"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            IIT Delhi · Pre-Incubation
          </m.p>

          <m.h1
            className="text-4xl sm:text-6xl lg:text-[4.25rem] font-bold tracking-tight leading-[1.08] text-foreground"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            Launch your idea{" "}
            <span className="gradient-text">clearly & boldly.</span>
          </m.h1>

          <m.p
            className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            {site.fullName} — {site.tagline}
          </m.p>

          <m.div
            className="mt-10 flex flex-wrap justify-center gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
          >
            <Link href="/apply">
              <Button size="lg" className="gap-2 px-8 shadow-lg shadow-primary/20">
                Start Building <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/programs">
              <Button size="lg" variant="outline" className="px-8 bg-card">
                Learn more
              </Button>
            </Link>
          </m.div>
        </div>

        {/* Framer-style social proof stat strip (Cofounder pattern) */}
        <m.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.22 }}
        >
          {site.stats.slice(0, 3).map((stat) => (
            <div
              key={stat.label}
              className="framer-card px-6 py-5 text-center hover:-translate-y-0.5"
            >
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                <Counter value={stat.value} suffix={stat.suffix} duration={900} />
              </div>
              <p className="mt-1 text-sm text-muted font-medium">{stat.label}</p>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
