"use client";

import { cn } from "@/lib/utils";

/**
 * Extruded SInC logo as ASCII — manifesto brand mark.
 * Clean solid-grid fill (readable C / Si), gentle depth pulse.
 * Distinct from hero people reel and campus imagery.
 */
export function AsciiLogoReel({
  className,
  showCaption = true,
}: {
  className?: string;
  showCaption?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        className="absolute inset-0 h-full w-full object-contain object-center"
        src="/motion/ascii-logo-loop.mp4"
        poster="/motion/ascii-logo-loop-poster.png"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="SInC logo rendered as animated ASCII"
      />
      {showCaption ? (
        <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-teal/70">
          SInC · signal
        </p>
      ) : null}
    </div>
  );
}

/** Lumena Why–style portrait alternate (cream ^/v) */
export function AsciiPortraitReel({
  className,
  showCaption = true,
}: {
  className?: string;
  showCaption?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-[#F6F4E9]", className)}>
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/motion/ascii-portrait-loop.mp4"
        poster="/motion/ascii-portrait-loop-poster.png"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Portrait rendered as animated ASCII"
      />
      {showCaption ? (
        <p className="pointer-events-none absolute bottom-4 left-0 right-0 z-10 px-4 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500/80">
          Start thinking
        </p>
      ) : null}
    </div>
  );
}

/** Thought / comment bubble ASCII alternate */
export function AsciiThoughtReel({
  className,
  showCaption = true,
}: {
  className?: string;
  showCaption?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        className="absolute inset-0 h-full w-full object-contain object-center"
        src="/motion/ascii-thought-loop.mp4"
        poster="/motion/ascii-thought-loop-poster.png"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Thought bubble rendered as animated ASCII"
      />
      {showCaption ? (
        <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-teal/70">
          Start thinking
        </p>
      ) : null}
    </div>
  );
}
