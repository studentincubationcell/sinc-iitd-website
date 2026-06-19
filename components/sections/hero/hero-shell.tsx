"use client";

import { HeroContent, type HeroContentProps } from "./hero-content";
import { HeroSocialRail } from "./hero-social-rail";

export function HeroShell(props: HeroContentProps) {
  return (
    <section
      className="relative min-h-[100svh] overflow-hidden"
      style={{ background: "linear-gradient(160deg, #09051a 0%, #130d2e 50%, #1e1247 100%)" }}
      aria-label="Hero"
    >
      <HeroSocialRail socials={props.socials} />

      {/* ── Atmospheric layers ──────────────────────────── */}

      {/* Primary aurora — top left */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-[700px] w-[700px] rounded-full opacity-30 animate-spin-slow"
        style={{
          background: "radial-gradient(circle, rgba(124,92,191,0.5) 0%, rgba(109,40,217,0.2) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Gold corona — right */}
      <div
        className="pointer-events-none absolute top-1/4 -right-24 h-[500px] w-[500px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.6) 0%, rgba(245,158,11,0.15) 45%, transparent 70%)",
          filter: "blur(72px)",
        }}
      />
      {/* Deep lavender — bottom center */}
      <div
        className="pointer-events-none absolute -bottom-24 left-1/3 h-[400px] w-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(ellipse, rgba(192,132,252,0.5) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Cross-grid overlay */}
      <div className="absolute inset-0 cross-grid opacity-100 pointer-events-none" />

      {/* Film grain */}
      <div className="absolute inset-0 hero-grain opacity-[0.04] pointer-events-none" />

      {/* Bottom fade to first section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />

      <HeroContent {...props} />
    </section>
  );
}
