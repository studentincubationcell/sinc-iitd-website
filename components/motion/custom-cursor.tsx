"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/**
 * Custom magnetic cursor with:
 * - Small dot (8px) that follows immediately
 * - Larger ring (32px) that trails with lerp
 * - Magnetic snap to interactive elements (buttons, links)
 * - Hero spotlight glow
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const magnetTarget = useRef<{ x: number; y: number; w: number; h: number } | null>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device
  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
  }, []);

  const animate = useCallback(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Determine ring target (snap to magnet or follow mouse)
    let targetX = mousePos.current.x;
    let targetY = mousePos.current.y;

    if (magnetTarget.current) {
      const { x, y, w, h } = magnetTarget.current;
      targetX = x + w / 2;
      targetY = y + h / 2;
    }

    // Lerp the ring position
    ringPos.current.x += (targetX - ringPos.current.x) * 0.15;
    ringPos.current.y += (targetY - ringPos.current.y) * 0.15;

    // Apply transforms
    dot.style.transform = `translate3d(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px, 0)`;
    ring.style.transform = `translate3d(${ringPos.current.x - (magnetTarget.current ? magnetTarget.current.w / 2 + 8 : 18)}px, ${ringPos.current.y - (magnetTarget.current ? magnetTarget.current.h / 2 + 8 : 18)}px, 0)`;

    if (magnetTarget.current) {
      ring.style.width = `${magnetTarget.current.w + 16}px`;
      ring.style.height = `${magnetTarget.current.h + 16}px`;
      ring.style.borderRadius = "12px";
    } else {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderRadius = "50%";
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Update hero spotlight CSS variables
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    // Magnetic snap: listen for hover on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "button, a, [data-magnetic]"
      );
      if (target) {
        const rect = target.getBoundingClientRect();
        magnetTarget.current = {
          x: rect.left,
          y: rect.top,
          w: rect.width,
          h: rect.height,
        };
        setHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "button, a, [data-magnetic]"
      );
      if (target) {
        magnetTarget.current = null;
        setHovering(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, visible, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Dot — black core + paper outline: visible on light, dark, and colored blocks (no mix-blend) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        <div
          className="rounded-full bg-foreground"
          style={{
            width: hovering ? "6px" : "8px",
            height: hovering ? "6px" : "8px",
            boxShadow: "0 0 0 1px var(--background)",
            transition: "width 0.2s ease, height 0.2s ease",
          }}
        />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{
          opacity: visible ? 1 : 0,
          border: hovering
            ? "1.5px solid var(--brand-teal)"
            : "1.5px solid rgba(10, 10, 10, 0.45)",
          transition:
            "opacity 0.15s ease, border 0.2s ease, width 0.25s ease, height 0.25s ease, border-radius 0.25s ease",
          background: hovering
            ? "color-mix(in srgb, var(--brand-teal) 14%, transparent)"
            : "transparent",
        }}
      />
    </>
  );
}
