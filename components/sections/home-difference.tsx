"use client";

import Link from "next/link";
import { ArrowRight, Zap, Network, FlaskConical, Quote } from "lucide-react";
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

const QUOTE = {
  text: "SInC gave us access to mentors we couldn't have emailed cold. We closed our first ₹15L grant within 3 months of joining.",
  author: "Arjun M., AgriTech founder, IIT Delhi '24",
};

export function HomeDifference() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-border-ink bg-background py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 cross-grid opacity-60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid items-end gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
              <span className="inline-block h-3 w-3 bg-brand-teal" />
              Why SInC
            </span>
            <h2 className="editorial-display text-4xl text-foreground sm:text-5xl lg:text-[3.5rem]">
              Built different from every other cell on{" "}
              <span className="lime-mark">campus.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-end">
            <p className="mb-6 text-lg leading-relaxed text-muted">
              Same institute. Different ambition. This is home for students treating their idea
              like a company from day one.
            </p>
            <Link href="/about">
              <Button size="lg" variant="club" className="w-fit gap-2">
                Our story <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Reveal>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <m.article
                key={pillar.number}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex flex-col gap-6 p-8 ${pillar.pop} brutal-block text-foreground transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border-2 border-border-ink bg-background text-foreground">
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  <span className="font-mono text-4xl font-bold tabular-nums text-foreground/25">
                    {pillar.number}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="whitespace-pre-line text-xl font-black leading-snug tracking-tight text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                    {pillar.body}
                  </p>
                </div>
              </m.article>
            );
          })}
        </div>

        <Reveal>
          <div className="flex flex-col items-start gap-6 bg-brand-teal brutal-block-lg p-8 sm:flex-row sm:p-10">
            <Quote className="mt-1 h-9 w-9 shrink-0 text-foreground" fill="currentColor" />
            <div>
              <p className="text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">
                &ldquo;{QUOTE.text}&rdquo;
              </p>
              <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-foreground/70">
                — {QUOTE.author}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
