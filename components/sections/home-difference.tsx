"use client";

import { AnimatedMeshGradient } from "@/components/motion/animated-mesh-gradient";
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
    gradient: "from-amber-500/20 via-yellow-400/10 to-transparent",
    iconBg: "bg-amber-400/15",
    iconColor: "text-amber-400",
    borderAccent: "group-hover:border-amber-400/40",
    glow: "group-hover:shadow-[0_8px_48px_rgba(245,158,11,0.15)]",
  },
  {
    number: "02",
    icon: Network,
    title: "Campus + industry\nin one loop",
    body: "Professors, R&I Park, alumni founders, and investors — connected so you're not guessing who to email next.",
    gradient: "from-violet-500/20 via-purple-400/10 to-transparent",
    iconBg: "bg-violet-400/15",
    iconColor: "text-violet-400",
    borderAccent: "group-hover:border-violet-400/40",
    glow: "group-hover:shadow-[0_8px_48px_rgba(167,139,250,0.15)]",
  },
  {
    number: "03",
    icon: FlaskConical,
    title: "Deep-tech\nfrom day one",
    body: "Lab access, IP guidance, and mentors who've shipped hardware and software — built for IIT Delhi's builder culture.",
    gradient: "from-cyan-500/20 via-sky-400/10 to-transparent",
    iconBg: "bg-cyan-400/15",
    iconColor: "text-cyan-400",
    borderAccent: "group-hover:border-cyan-400/40",
    glow: "group-hover:shadow-[0_8px_48px_rgba(34,211,238,0.12)]",
  },
];

const QUOTE = {
  text: "SInC gave us access to mentors we couldn't have emailed cold. We closed our first ₹15L grant within 3 months of joining.",
  author: "Arjun M., AgriTech founder, IIT Delhi '24",
};

export function HomeDifference() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden border-y border-club-lavender/10"
      style={{ background: "linear-gradient(180deg, var(--background) 0%, #f0edff 100%)" }}
    >
      {/* Animated mesh blobs — very subtle */}
      <AnimatedMeshGradient opacity={0.07} />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ─────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.28em] text-club-lavender-dim mb-5">
              <span className="h-px w-8 bg-club-lavender-dim/60 inline-block" />
              Why SInC
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.06] text-foreground">
              Built different from every<br />
              <span className="gradient-text">other cell on campus.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-end">
            <p className="text-lg text-muted leading-relaxed mb-6">
              Same institute. Different ambition. This is home for students treating their idea
              like a company from day one.
            </p>
            <Link href="/about">
              <Button size="lg" variant="club" className="gap-2 w-fit shadow-[0_4px_24px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_36px_rgba(245,158,11,0.45)] transition-shadow">
                Our story <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Reveal>
        </div>

        {/* ── 3-column bento grid ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-12">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <m.article
                key={pillar.number}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-8 flex flex-col gap-5 transition-all duration-300 ${pillar.borderAccent} ${pillar.glow}`}
              >
                {/* Gradient fill on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Header */}
                <div className="relative flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${pillar.iconBg} ${pillar.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-xs font-bold text-muted/30 tabular-nums">{pillar.number}</span>
                </div>

                {/* Text */}
                <div className="relative flex-1">
                  <h3 className="text-xl font-black tracking-tight whitespace-pre-line leading-snug text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{pillar.body}</p>
                </div>

                {/* Bottom accent bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </m.article>
            );
          })}
        </div>

        {/* ── Founder quote ───────────────────────────────── */}
        <Reveal>
          <div className="gold-card p-8 sm:p-10 flex flex-col sm:flex-row gap-6 items-start">
            <Quote className="h-8 w-8 text-club-gold shrink-0 mt-1 opacity-80" />
            <div>
              <p className="text-lg sm:text-xl font-semibold text-foreground/85 leading-relaxed italic">
                &ldquo;{QUOTE.text}&rdquo;
              </p>
              <p className="mt-4 text-sm font-bold text-club-gold-dim">— {QUOTE.author}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
