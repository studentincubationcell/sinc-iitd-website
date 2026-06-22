"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

const SESSION_KEY = "sinc-splash-seen";
const MOTTO = "Your journey from idea to impact begins here.";

type Phase = "logo" | "motto" | "split" | "done";

export function SplashCurtain() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<Phase>("logo");

  useEffect(() => {
    // Only show splash once per session
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) {
      setPhase("done");
      return;
    }
    setShow(true);

    // Phase 1: Logo punches in and holds (0 → 0.7s)
    const t1 = setTimeout(() => setPhase("motto"), 700);
    // Phase 2: Motto is revealed and held (0.7s → 1.6s)
    const t2 = setTimeout(() => setPhase("split"), 1600);
    // Phase 3: Curtains split open, then unmount (1.6s → 2.2s)
    const t3 = setTimeout(() => {
      setPhase("done");
      setShow(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "done" && !show) return null;

  const splitting = phase === "split";
  const showMotto = phase === "motto" || phase === "split";

  const skip = () => {
    setPhase("done");
    setShow(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <m.div
          onClick={skip}
          className="fixed inset-0 z-[9999] pointer-events-auto cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden
        >
          {/* Left curtain panel */}
          <m.div
            className="absolute top-0 left-0 w-1/2 h-full bg-inverse"
            animate={splitting ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Right curtain panel */}
          <m.div
            className="absolute top-0 right-0 w-1/2 h-full bg-inverse"
            animate={splitting ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Center dividing line — lime */}
          <m.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-accent-lime"
            animate={
              splitting ? { opacity: 0, scaleX: 40 } : { opacity: 1, scaleX: 1 }
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Center stage */}
          <m.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            animate={splitting ? { scale: 1.4, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* SInC wordmark — shrinks up to make room for the motto */}
            <m.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative flex flex-col items-center gap-3"
            >
              <m.span
                className="editorial-display text-inverse-foreground leading-none"
                animate={{ fontSize: showMotto ? "3rem" : "4.5rem" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                SInC
              </m.span>
              <span className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-accent-lime">
                IIT Delhi
              </span>

              {/* Pulse ring (only during the logo phase) */}
              {!showMotto && (
                <m.div
                  className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-none border border-accent-lime/40"
                  animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                />
              )}
            </m.div>

            {/* Motto reveal */}
            <AnimatePresence>
              {showMotto && (
                <m.div
                  className="mt-8 flex max-w-xl flex-col items-center gap-5"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="h-px w-12 bg-accent-lime" />
                  <p className="editorial-display text-2xl leading-tight text-inverse-foreground text-balance sm:text-3xl">
                    {MOTTO.split(" ").map((word, i) => (
                      <m.span
                        key={`${word}-${i}`}
                        className="inline-block"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.12 + i * 0.04,
                          duration: 0.32,
                          ease: "easeOut",
                        }}
                      >
                        {word}
                        {"\u00A0"}
                      </m.span>
                    ))}
                  </p>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-inverse-foreground/50">
                    Student Incubation Cell
                  </span>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
