"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Build Together.",
  "Ship Together.",
  "Raise Together.",
  "Win Together.",
];

export function HeroTypewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) {
            setTimeout(() => setDeleting(true), 2400);
          }
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setPhraseIndex((i) => (i + 1) % PHRASES.length);
          }
        }
      },
      deleting ? 38 : 90
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIndex]);

  return (
    <p className="mt-3 text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight min-h-[1.15em] leading-none text-glow-gold gradient-text-gold">
      {text || "\u00a0"}
      <span
        className="inline-block w-[4px] h-[0.85em] bg-club-gold ml-1.5 align-middle"
        style={{ animation: "pulse 0.9s ease-in-out infinite" }}
      />
    </p>
  );
}
