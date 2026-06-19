"use client";

import { HeroContent, type HeroContentProps } from "./hero-content";
import { HeroSocialRail } from "./hero-social-rail";

export function HeroShell(props: HeroContentProps) {
  return (
    <section
      className="relative min-h-[100svh] overflow-hidden vignette"
      style={{ background: "linear-gradient(160deg, #09051a 0%, #130d2e 50%, #1e1247 100%)" }}
      aria-label="Hero"
    >
      <HeroSocialRail socials={props.socials} />

      {/* ── Atmospheric layers ──────────────────────────── */}

      {/* Primary aurora — top left */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[760px] w-[760px] rounded-full opacity-40 aurora-drift"
        style={{
          background: "radial-gradient(circle, rgba(124,92,191,0.55) 0%, rgba(109,40,217,0.22) 40%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      {/* Gold corona — right */}
      <div
        className="pointer-events-none absolute top-1/5 -right-28 h-[560px] w-[560px] rounded-full opacity-30 aurora-drift-2"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.6) 0%, rgba(245,158,11,0.15) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Deep lavender — bottom center */}
      <div
        className="pointer-events-none absolute -bottom-28 left-1/3 h-[440px] w-[640px] rounded-full opacity-25 aurora-drift-3"
        style={{
          background: "radial-gradient(ellipse, rgba(192,132,252,0.5) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />
      {/* Maroon undertone — bottom left for cinematic depth */}
      <div
        className="pointer-events-none absolute bottom-0 -left-20 h-[420px] w-[420px] rounded-full opacity-25 aurora-drift-2"
        style={{
          background: "radial-gradient(circle, rgba(139,21,56,0.5) 0%, transparent 68%)",
          filter: "blur(80px)",
        }}
      />

      {/* Iridescent conic glow behind the laptop visual */}
      <div className="pointer-events-none absolute right-[6%] top-1/2 hidden -translate-y-1/2 lg:block">
        <div
          className="iridescent h-[520px] w-[520px] rounded-full opacity-[0.28]"
          style={{ filter: "blur(60px)" }}
        />
      </div>

      {/* Cross-grid overlay with radial mask for depth */}
      <div
        className="absolute inset-0 cross-grid pointer-events-none"
        style={{ maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 85%)", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 85%)" }}
      />

      {/* Film grain (animated flicker) */}
      <div className="absolute inset-0 hero-grain grain-animate pointer-events-none" />

      {/* Bottom fade to first section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />

      <HeroContent {...props} />
    </section>
  );
}
