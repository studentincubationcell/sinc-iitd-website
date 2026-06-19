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
    <div className="inline-flex items-center gap-0 rounded-full border border-club-gold/40 bg-club-gold/[0.08] pr-1 text-sm overflow-hidden">
      {/* Live badge */}
      <span className="flex items-center gap-1.5 bg-club-gold text-club-purple font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 shrink-0">
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
            className="text-white/80 text-xs font-medium whitespace-nowrap"
          >
            {current.text}
          </m.span>
        </AnimatePresence>
      </div>

      {/* Arrow CTA */}
      {current.href && (
        <Link
          href={current.href}
          className="flex items-center justify-center h-6 w-6 rounded-full bg-club-gold/20 hover:bg-club-gold/40 text-club-gold transition-colors shrink-0"
          aria-label="View announcement"
        >
          <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}
