"use client";

import { cn } from "@/lib/utils";

/**
 * Lumena-style ASCII people loop — network signal band.
 * Background is matched to page paper + soft-masked so it merges into the layout.
 */
export function AsciiPeopleLoopMedia({
  className,
  showCaption = false,
}: {
  className?: string;
  showCaption?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="absolute inset-0"
        style={{
          // Soft dissolve into page — no hard cream rectangle
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 68% at 50% 46%, #000 28%, transparent 72%)",
          maskImage:
            "radial-gradient(ellipse 70% 68% at 50% 46%, #000 28%, transparent 72%)",
        }}
      >
        <video
          className="absolute inset-0 h-full w-full object-contain object-center mix-blend-multiply"
          src="/motion/ascii-people-loop.mp4"
          poster="/motion/ascii-people-poster.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Founders, mentors and investors in conversation"
        />
      </div>

      {showCaption ? (
        <p className="pointer-events-none absolute bottom-2 left-1/2 z-10 w-full -translate-x-1/2 px-4 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
          Founders · Mentors · Investors
        </p>
      ) : null}
    </div>
  );
}
