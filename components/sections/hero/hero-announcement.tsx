"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

export type AnnouncementItem = {
  text: string;
  href?: string;
};

export function HeroAnnouncement({
  items,
}: {
  items: AnnouncementItem[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  // Cycle through announcements
  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 3800);
    return () => clearInterval(t);
  }, [items.length]);

  if (items.length === 0) return null;

  const current = items[index];

  return (
    <div className="inline-flex items-center gap-0 overflow-hidden rounded-full border border-border bg-card pr-1 text-sm shadow-sm">
      {/* Live badge */}
      <span className="flex shrink-0 items-center gap-1.5 bg-accent-blue px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
        <Zap className="h-3 w-3" fill="currentColor" />
        Live
      </span>

      {/* Cycling text */}
      <div className="relative overflow-hidden h-7 flex items-center px-3 min-w-0 flex-1">
        <AnimatePresence mode="wait">
          <m.span
            key={index}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="whitespace-nowrap text-xs font-medium text-foreground"
          >
            {current.text}
          </m.span>
        </AnimatePresence>
      </div>

      {/* Arrow CTA */}
      {current.href && (
        <Link
          href={current.href}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent-blue transition-colors hover:bg-accent-blue hover:text-white"
          aria-label="View announcement"
        >
          <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}
