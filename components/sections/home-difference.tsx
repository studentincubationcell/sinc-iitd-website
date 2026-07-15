"use client";

import Link from "next/link";
import { ArrowRight, Zap, Network, FlaskConical } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

const PILLARS = [
  {
    number: "01",
    icon: Zap,
    title: "Pre-incubation,\nnot a poster club",
    body: "SInC is built for founders who want term sheets and customers — not just event photos and LinkedIn posts.",
    pop: "bg-brand-blue",
  },
  {
    number: "02",
    icon: Network,
    title: "Campus + industry\nin one loop",
    body: "Professors, R&I Park, alumni founders, and investors — connected so you're not guessing who to email next.",
    pop: "bg-pop-pink",
  },
  {
    number: "03",
    icon: FlaskConical,
    title: "Deep-tech\nfrom day one",
    body: "Lab access, IP guidance, and mentors who've shipped hardware and software — built for IIT Delhi's builder culture.",
    pop: "bg-brand-teal",
  },
] as const;

export function HomeDifference() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-padding bg-background border-t border-border">
      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid items-end gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Why SInC
            </span>
            <h2 className="editorial-display text-3xl text-foreground sm:text-4xl lg:text-5xl">
              Built different from every other cell on{" "}
              <span className="lime-mark">campus.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-end">
            <p className="mb-6 text-base leading-relaxed text-muted lg:text-lg">
              Same institute. Different ambition. This is home for students treating their idea
              like a company from day one.
            </p>
            <Link href="/about">
              <Button size="lg" variant="outline" className="w-fit gap-2 bg-card">
                Our story <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <m.article
                key={pillar.number}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="soft-card flex flex-col gap-5 p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-2xl font-bold tabular-nums text-foreground/15">
                    {pillar.number}
                  </span>
                </div>
                <div>
                  <h3 className="whitespace-pre-line text-lg font-bold leading-snug tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.body}</p>
                </div>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
