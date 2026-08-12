"use client";

import { cn } from "@/lib/utils";

/**
 * Lumena-style ASCII ring (test-3).
 * Exact paper bg in the file — no brightness filters (those create a visible box).
 */
export function AsciiRingReel({
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
          WebkitMaskImage:
            "radial-gradient(ellipse 92% 84% at 52% 50%, #000 58%, transparent 92%)",
          maskImage:
            "radial-gradient(ellipse 92% 84% at 52% 50%, #000 58%, transparent 92%)",
        }}
      >
        <video
          className="absolute inset-0 h-full w-full scale-[1.12] object-contain object-center mix-blend-multiply"
          src="/motion/ascii-ring-loop.mp4"
          poster="/motion/ascii-ring-loop-poster.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Animated ASCII ring"
        />
      </div>
      {showCaption ? (
        <p className="pointer-events-none absolute bottom-2 left-0 right-0 z-10 px-4 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
          Structure · clarity
        </p>
      ) : null}
    </div>
  );
}
