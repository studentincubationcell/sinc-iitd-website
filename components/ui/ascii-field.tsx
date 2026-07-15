import type { CSSProperties } from "react";

/* Deterministic PRNG so server and client render identically */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Glyph = {
  left: string;
  top: string;
  opacity: string;
  size: number;
  text: string;
  delay: number;
  spark: boolean;
};

function buildRing(seed: number, count: number, fillDuration: number): Glyph[] {
  const rand = mulberry32(seed);
  const glyphs: Glyph[] = [];
  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2;
    /* Cluster around a ring with organic noise; some strays drift inward/outward */
    const stray = rand();
    const radius =
      stray > 0.92
        ? 12 + rand() * 30
        : 34 + (rand() - 0.5) * (rand() > 0.55 ? 16 : 6);
    const left = 50 + Math.cos(angle) * radius;
    const top = 50 + Math.sin(angle) * radius * 0.86;
    if (left < 1 || left > 97 || top < 1 || top > 97) continue;
    const run = rand();
    /* Blank mind → thoughts arrive slowly at first, then rush in.
       Ease-in distribution: most glyphs land in the later part of the window. */
    const t = rand();
    const delay = Math.round(t * t * fillDuration);
    /* Fixed-precision strings keep SSR and client markup identical */
    glyphs.push({
      left: `${left.toFixed(2)}%`,
      top: `${top.toFixed(2)}%`,
      opacity: (0.12 + rand() * 0.78).toFixed(2),
      size: 8 + Math.floor(rand() * 5),
      text: run > 0.72 ? ">>>" : run > 0.42 ? ">>" : ">",
      delay,
      spark: rand() > 0.9,
    });
  }
  return glyphs;
}

export function AsciiField({
  seed = 7,
  count = 460,
  className = "",
  color,
  fillDuration = 4200,
}: {
  seed?: number;
  count?: number;
  className?: string;
  color?: string;
  /** Total ms for the "mind" to fill with thoughts. 0 disables the reveal. */
  fillDuration?: number;
}) {
  const glyphs = buildRing(seed, count, fillDuration);
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden font-mono ${className}`}
      style={{ color: color ?? "var(--foreground)" } as CSSProperties}
    >
      {glyphs.map((g, i) => (
        <span
          key={i}
          className={`absolute leading-none ${fillDuration > 0 ? "thought-glyph" : ""}`}
          style={
            {
              left: g.left,
              top: g.top,
              fontSize: `${g.size}px`,
              color: g.spark ? "var(--brand-blue)" : undefined,
              ...(fillDuration > 0
                ? { "--glyph-opacity": g.opacity, "--glyph-delay": `${g.delay}ms` }
                : { opacity: g.opacity }),
            } as CSSProperties
          }
        >
          {g.text}
        </span>
      ))}
    </div>
  );
}
