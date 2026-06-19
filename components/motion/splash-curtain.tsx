"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

const SESSION_KEY = "sinc-splash-seen";

export function SplashCurtain() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"logo" | "split" | "done">("logo");

  useEffect(() => {
    // Only show splash once per session
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) {
      setPhase("done");
      return;
    }
    setShow(true);
    // Phase 1: Show logo for 1s, then split
    const t1 = setTimeout(() => setPhase("split"), 1000);
    // Phase 2: After split animation, mark done
    const t2 = setTimeout(() => {
      setPhase("done");
      setShow(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done" && !show) return null;

  return (
    <AnimatePresence>
      {show && (
        <m.div
          className="fixed inset-0 z-[9999] pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden
        >
          {/* Left curtain panel */}
          <m.div
            className="absolute top-0 left-0 w-1/2 h-full bg-foreground"
            animate={phase === "split" ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Right curtain panel */}
          <m.div
            className="absolute top-0 right-0 w-1/2 h-full bg-foreground"
            animate={phase === "split" ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Center dividing line — lime */}
          <m.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-accent-lime"
            animate={
              phase === "split"
                ? { opacity: 0, scaleX: 40 }
                : { opacity: 1, scaleX: 1 }
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Logo in center */}
          <m.div
            className="absolute inset-0 flex items-center justify-center"
            animate={
              phase === "split"
                ? { scale: 1.5, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <m.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              {/* SInC Text Logo */}
              <span className="editorial-display text-6xl sm:text-7xl text-background">
                SInC
              </span>
              <m.span
                className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-accent-lime"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                IIT Delhi
              </m.span>
              {/* Pulse ring */}
              <m.div
                className="absolute w-28 h-28 rounded-none border border-accent-lime/40"
                animate={{
                  scale: [1, 1.6],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: "easeOut",
                }}
              />
            </m.div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
