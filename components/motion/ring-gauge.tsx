"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const RING_SIZE = 104;
const STROKE_WIDTH = 7;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function RingGauge({
  value,
  suffix = "",
  label,
  className,
  duration = 1300,
  fillRatio = 0.82,
  gradFrom = "#f59e0b",
  gradTo = "#fcd34d",
  dark = false,
}: {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
  duration?: number;
  fillRatio?: number;
  gradFrom?: string;
  gradTo?: string;
  dark?: boolean;
}) {
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const reduceMotion = useReducedMotion();
  const gradId = `rg-${label.replace(/\W+/g, "-")}`;

  useEffect(() => {
    if (reduceMotion) { setCount(value); setProgress(fillRatio); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setCount(Math.floor(eased * value));
          setProgress(eased * fillRatio);
          if (t < 1) requestAnimationFrame(animate);
          else { setCount(value); setProgress(fillRatio); }
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, fillRatio, reduceMotion]);

  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const textColor = dark ? "text-white" : "text-foreground";
  const trackColor = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";

  return (
    <div ref={ref} className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
        <svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} className="-rotate-90">
          {/* Track */}
          <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RADIUS} fill="none" stroke={trackColor} strokeWidth={STROKE_WIDTH} />
          {/* Gradient def */}
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradFrom} />
              <stop offset="100%" stopColor={gradTo} />
            </linearGradient>
          </defs>
          {/* Arc */}
          <circle
            cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RADIUS}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
          />
        </svg>
        {/* Centre value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("text-2xl sm:text-[1.7rem] font-black tabular-nums tracking-tight", textColor)}>
            {count}<span className="text-lg font-bold">{suffix}</span>
          </span>
        </div>
      </div>
      <p className={cn("text-xs font-semibold text-center leading-snug", dark ? "text-white/45" : "text-muted")}>
        {label}
      </p>
    </div>
  );
}
