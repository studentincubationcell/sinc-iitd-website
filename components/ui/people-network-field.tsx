/**
 * Lumena-style ASCII people field.
 * Builds clearly readable human silhouettes from dense `>` glyphs,
 * with labeled Founder / Mentor / Investor figures for SInC.
 */
"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Role = {
  label: string;
  accent: string;
};

const ROLES: Role[] = [
  { label: "Founder", accent: "var(--foreground)" },
  { label: "Mentor", accent: "var(--brand-teal)" },
  { label: "Investor", accent: "var(--brand-blue)" },
];

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

/** Draw a standing person silhouette into an offscreen mask (0–255 alpha). */
function paintPerson(
  ctx: CanvasRenderingContext2D,
  cx: number,
  baseY: number,
  scale: number,
  shade: number
) {
  ctx.save();
  ctx.translate(cx, baseY);
  ctx.scale(scale, scale);
  ctx.fillStyle = `rgba(0,0,0,${shade})`;

  // Head
  ctx.beginPath();
  ctx.ellipse(0, -152, 24, 28, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hair mass (reads better as a person at glyph density)
  ctx.beginPath();
  ctx.ellipse(-2, -160, 26, 18, -0.2, Math.PI, Math.PI * 2);
  ctx.fill();

  // Neck
  ctx.fillRect(-8, -126, 16, 18);

  // Shoulders / torso
  ctx.beginPath();
  ctx.moveTo(-46, -110);
  ctx.quadraticCurveTo(-54, -68, -42, -16);
  ctx.lineTo(-30, -16);
  ctx.lineTo(-24, 14);
  ctx.lineTo(24, 14);
  ctx.lineTo(30, -16);
  ctx.lineTo(42, -16);
  ctx.quadraticCurveTo(54, -68, 46, -110);
  ctx.quadraticCurveTo(0, -122, -46, -110);
  ctx.fill();

  // Arms (slight outward stance)
  ctx.beginPath();
  ctx.moveTo(-42, -98);
  ctx.quadraticCurveTo(-68, -58, -62, -10);
  ctx.lineTo(-48, -10);
  ctx.quadraticCurveTo(-52, -52, -30, -102);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(42, -98);
  ctx.quadraticCurveTo(68, -58, 62, -10);
  ctx.lineTo(48, -10);
  ctx.quadraticCurveTo(52, -52, 30, -102);
  ctx.fill();

  // Legs
  ctx.beginPath();
  ctx.moveTo(-28, 12);
  ctx.lineTo(-36, 118);
  ctx.lineTo(-14, 118);
  ctx.lineTo(-6, 12);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(28, 12);
  ctx.lineTo(36, 118);
  ctx.lineTo(14, 118);
  ctx.lineTo(6, 12);
  ctx.fill();

  ctx.restore();
}

type Glyph = {
  x: number;
  y: number;
  text: string;
  alpha: number;
  size: number;
  delay: number;
  color: string;
};

function buildGlyphs(
  width: number,
  height: number,
  seed: number,
  fillDuration: number,
  dpr: number
): { glyphs: Glyph[]; labels: { x: number; y: number; text: string; color: string }[] } {
  const mask = document.createElement("canvas");
  mask.width = Math.max(1, Math.floor(width * dpr));
  mask.height = Math.max(1, Math.floor(height * dpr));
  const mctx = mask.getContext("2d", { willReadFrequently: true });
  if (!mctx) return { glyphs: [], labels: [] };

  mctx.scale(dpr, dpr);
  mctx.clearRect(0, 0, width, height);

  const count = ROLES.length;
  const gap = width / (count + 1);
  // Fit full standing figures + labels inside the frame
  const figureHeight = Math.min(height * 0.78, width * 0.42);
  const scale = figureHeight / 280;
  const baseY = height * 0.62;

  const centers: number[] = [];
  ROLES.forEach((role, i) => {
    const cx = gap * (i + 1);
    centers.push(cx);
    // Slight depth shading variation per figure
    paintPerson(mctx, cx, baseY, scale * (0.96 + i * 0.035), 0.58 + i * 0.1);
    // Soft overlap fill for denser midtones
    paintPerson(mctx, cx + 1.2, baseY, scale * (0.96 + i * 0.035), 0.2);
  });

  // Soft network arcs between figures (Lumena is people; SInC also signals network)
  mctx.save();
  mctx.globalAlpha = 0.18;
  mctx.strokeStyle = "#000";
  mctx.lineWidth = Math.max(1, scale * 1.2);
  for (let i = 0; i < centers.length - 1; i++) {
    const x1 = centers[i] + 28 * scale;
    const x2 = centers[i + 1] - 28 * scale;
    const y = baseY - 95 * scale;
    mctx.beginPath();
    mctx.moveTo(x1, y);
    mctx.quadraticCurveTo((x1 + x2) / 2, y - 36 * scale, x2, y);
    mctx.stroke();
  }
  mctx.restore();

  const data = mctx.getImageData(0, 0, mask.width, mask.height).data;
  const rand = mulberry32(seed);
  const glyphs: Glyph[] = [];

  // Sample on a tight grid — Lumena density is what makes people readable
  const stepX = 4.4;
  const stepY = 5.5;
  for (let y = stepY; y < height - stepY; y += stepY) {
    for (let x = stepX * 0.5; x < width - stepX; x += stepX) {
      const px = Math.min(mask.width - 1, Math.floor(x * dpr));
      const py = Math.min(mask.height - 1, Math.floor(y * dpr));
      const a = data[(py * mask.width + px) * 4 + 3];
      if (a < 18) continue;

      const density = a / 255;
      // Skip some lighter samples for organic gaps (Lumena has air in the forms)
      if (rand() > density * 0.92 + 0.08) continue;

      // Nearest role for color
      let nearest = 0;
      let best = Infinity;
      centers.forEach((cx, i) => {
        const d = Math.abs(cx - x);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });

      const t = rand();
      const delay = Math.round(t * t * fillDuration);
      const run = rand();
      const text = density > 0.72 ? (run > 0.55 ? ">>" : ">") : run > 0.7 ? ">>>" : ">";

      glyphs.push({
        x,
        y: y + (rand() - 0.5) * 1.4,
        text,
        alpha: 0.22 + density * 0.72,
        size: 7.5 + density * 5.5 + (rand() > 0.85 ? 2 : 0),
        delay,
        color: ROLES[nearest].accent,
      });
    }
  }

  // Stray field particles around the silhouettes (digital forming effect)
  for (let i = 0; i < 90; i++) {
    const figure = Math.floor(rand() * count);
    const cx = centers[figure];
    const angle = rand() * Math.PI * 2;
    const radius = 40 + rand() * Math.min(width, height) * 0.22;
    const x = cx + Math.cos(angle) * radius * 0.55;
    const y = baseY - 70 + Math.sin(angle) * radius * 0.7;
    if (x < 8 || x > width - 8 || y < 8 || y > height - 20) continue;
    const t = rand();
    glyphs.push({
      x,
      y,
      text: rand() > 0.5 ? ">" : ">>",
      alpha: 0.08 + rand() * 0.18,
      size: 6 + rand() * 4,
      delay: Math.round(t * fillDuration),
      color: ROLES[figure].accent,
    });
  }

  const labels = ROLES.map((role, i) => ({
    x: centers[i],
    y: Math.min(height - 14, baseY + scale * 138),
    text: role.label,
    color: role.accent,
  }));

  return { glyphs, labels };
}

export function PeopleNetworkField({
  seed = 11,
  className = "",
  color,
  fillDuration = 3600,
  showLegend = true,
}: {
  seed?: number;
  /** kept for API compat with previous usages */
  count?: number;
  className?: string;
  color?: string;
  fillDuration?: number;
  showLegend?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let start = 0;
    let glyphs: Glyph[] = [];
    let labels: { x: number; y: number; text: string; color: string }[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;

    const layout = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const built = buildGlyphs(w, h, seed, reduce ? 0 : fillDuration, dpr);
      glyphs = built.glyphs;
      labels = built.labels;
      start = performance.now();
    };

    const draw = (now: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "600 11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

      const elapsed = reduce ? fillDuration + 1 : now - start;

      for (const g of glyphs) {
        const local = elapsed - g.delay;
        if (local < 0 && fillDuration > 0) continue;
        const fade = fillDuration > 0 ? Math.min(1, local / 280) : 1;
        ctx.globalAlpha = g.alpha * fade;
        ctx.fillStyle = color ?? g.color;
        ctx.font = `600 ${g.size}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
        ctx.fillText(g.text, g.x, g.y);
      }

      if (showLegend) {
        for (const label of labels) {
          const appear =
            reduce || elapsed > fillDuration * 0.45
              ? 0.9
              : Math.max(0, (elapsed - fillDuration * 0.28) / (fillDuration * 0.28));
          ctx.globalAlpha = appear;
          ctx.fillStyle = color ?? label.color;
          ctx.font =
            "700 12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
          ctx.fillText(label.text.toUpperCase(), label.x, label.y);
          // underline tick for legibility
          const tw = ctx.measureText(label.text.toUpperCase()).width;
          ctx.globalAlpha = appear * 0.35;
          ctx.fillRect(label.x - tw / 2, label.y + 8, tw, 1);
        }
      }

      ctx.globalAlpha = 1;
      if (!reduce && elapsed < fillDuration + 400) {
        raf = requestAnimationFrame(draw);
      }
    };

    layout();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      layout();
      raf = requestAnimationFrame(draw);
    });
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [seed, fillDuration, color, showLegend]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={cn("pointer-events-none relative select-none overflow-hidden", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
