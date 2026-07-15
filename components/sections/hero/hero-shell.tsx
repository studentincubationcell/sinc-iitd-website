"use client";

import { HeroContent, type HeroContentProps } from "./hero-content";

export function HeroShell(props: HeroContentProps) {
  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-background"
      aria-label="Hero"
    >
      {/* Blueprint dot grid — faded toward the edges */}
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-60"
        style={{
          maskImage: "radial-gradient(ellipse 80% 75% at 50% 40%, black 30%, transparent 88%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 75% at 50% 40%, black 30%, transparent 88%)",
        }}
      />

      {/* Soft teal atmosphere — barely-there wash behind the headline */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[30rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.1]"
        style={{ background: "radial-gradient(circle, var(--brand-teal) 0%, transparent 66%)" }}
      />

      {/* Hard ruled baseline under the hero */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-border-ink" />

      <HeroContent {...props} />
    </section>
  );
}
