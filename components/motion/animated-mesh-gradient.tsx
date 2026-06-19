"use client";

import { useEffect, useRef } from "react";

/**
 * Animated mesh gradient with slowly drifting, morphing blobs.
 * Renders on a <canvas> for GPU-accelerated performance.
 * Colors: club-lavender, club-purple, club-gold
 */
export function AnimatedMeshGradient({
  className = "",
  opacity = 0.12,
}: {
  className?: string;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check reduced motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Blob definitions
    const blobs = [
      {
        x: 0.3,
        y: 0.2,
        r: 0.35,
        color: "155, 127, 212", // club-lavender
        speedX: 0.0003,
        speedY: 0.0002,
        phaseX: 0,
        phaseY: 0.5,
      },
      {
        x: 0.7,
        y: 0.5,
        r: 0.3,
        color: "109, 40, 217", // club-purple
        speedX: 0.0002,
        speedY: 0.00035,
        phaseX: 1.2,
        phaseY: 0.8,
      },
      {
        x: 0.5,
        y: 0.8,
        r: 0.28,
        color: "245, 166, 35", // club-gold
        speedX: 0.00025,
        speedY: 0.00015,
        phaseX: 2.4,
        phaseY: 1.8,
      },
      {
        x: 0.15,
        y: 0.65,
        r: 0.22,
        color: "196, 181, 253", // lighter lavender
        speedX: 0.00018,
        speedY: 0.00028,
        phaseX: 3.1,
        phaseY: 2.5,
      },
    ];

    let time = 0;

    const draw = () => {
      if (width === 0 || height === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time++;

      for (const blob of blobs) {
        const cx =
          (blob.x + Math.sin(time * blob.speedX + blob.phaseX) * 0.15) * width;
        const cy =
          (blob.y + Math.cos(time * blob.speedY + blob.phaseY) * 0.15) *
          height;
        const radius = blob.r * Math.min(width, height);

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(${blob.color}, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(${blob.color}, ${opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(${blob.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden
      style={{ mixBlendMode: "normal" }}
    />
  );
}
