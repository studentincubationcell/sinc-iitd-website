"use client";

import { HeroContent, type HeroContentProps } from "./hero-content";
import { HeroSocialRail } from "./hero-social-rail";

export function HeroShell(props: HeroContentProps) {
  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-background"
      aria-label="Hero"
    >
      <HeroSocialRail socials={props.socials} />

      {/* Blueprint dot grid — faded toward the edges */}
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-60"
        style={{
          maskImage: "radial-gradient(ellipse 75% 70% at 50% 38%, black 35%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 38%, black 35%, transparent 85%)",
        }}
      />

      {/* Very subtle blue wash, top-right only */}
      <div
        className="pointer-events-none absolute -top-24 right-0 h-[460px] w-[460px] rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)" }}
      />

      {/* Bottom fade into the next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <HeroContent {...props} />
    </section>
  );
}
