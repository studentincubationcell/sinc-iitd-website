"use client";

import { HeroContent, type HeroContentProps } from "./hero-content";

export function HeroShell(props: HeroContentProps) {
  return (
    <section
      className="theme-inverse relative min-h-[100svh] overflow-hidden bg-background"
      aria-label="Hero"
    >
      {/* Blueprint dot grid — faded toward the edges */}
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-70"
        style={{
          maskImage: "radial-gradient(ellipse 80% 75% at 50% 40%, black 30%, transparent 88%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 75% at 50% 40%, black 30%, transparent 88%)",
        }}
      />

      {/* Teal atmosphere glow — centered behind the visual */}
      <div
        className="pointer-events-none absolute bottom-[-12rem] left-1/2 h-[36rem] w-[44rem] -translate-x-1/2 rounded-full opacity-[0.16]"
        style={{ background: "radial-gradient(circle, var(--brand-teal) 0%, transparent 66%)" }}
      />

      {/* Hard ruled baseline under the hero */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-border-ink" />

      <HeroContent {...props} />
    </section>
  );
}
