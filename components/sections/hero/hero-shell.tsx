"use client";

import { HeroContent, type HeroContentProps } from "./hero-content";

export function HeroShell(props: HeroContentProps) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-background" aria-label="Hero">
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-border" />
      <HeroContent {...props} />
    </section>
  );
}
