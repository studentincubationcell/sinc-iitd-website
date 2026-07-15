"use client";

import { HeroContent, type HeroContentProps } from "./hero-content";
import { HeroSocialRail } from "./hero-social-rail";

export function HeroShell(props: HeroContentProps) {
  return (
    <section
      className="theme-inverse relative min-h-[100svh] overflow-hidden bg-background"
      aria-label="Hero"
    >
      <HeroSocialRail socials={props.socials} />

      {/* Blueprint dot grid — faded toward the edges */}
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-70"
        style={{
          maskImage: "radial-gradient(ellipse 80% 75% at 50% 42%, black 30%, transparent 88%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 75% at 50% 42%, black 30%, transparent 88%)",
        }}
      />

      {/* Teal atmosphere glow — single subtle accent */}
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full opacity-[0.14]"
        style={{ background: "radial-gradient(circle, var(--brand-teal) 0%, transparent 68%)" }}
      />

      {/* Hard ruled baseline under the hero */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-border-ink" />

      <HeroContent {...props} />
    </section>
  );
}
