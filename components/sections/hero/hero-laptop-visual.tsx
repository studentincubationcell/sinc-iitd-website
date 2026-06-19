"use client";

import dynamic from "next/dynamic";

const HeroCanvas = dynamic(
  () => import("./hero-canvas").then((mod) => mod.HeroCanvas),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[#12082a]" /> }
);

/** Wireframe laptop — R3F node network lives inside the screen (club-site layout) */
export function HeroLaptopVisual({
  screenTagline,
  announcement,
}: {
  screenTagline: string;
  announcement: React.ReactNode | null;
}) {
  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none lg:ml-auto">
      {announcement}

      <div className="relative mt-8 lg:mt-4">
        <svg
          viewBox="0 0 520 380"
          className="w-full h-auto text-[#9b7fd4]"
          fill="none"
          aria-hidden
        >
          {/* Screen */}
          <path
            d="M80 40 L420 40 L440 200 L60 200 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Keyboard base */}
          <path
            d="M40 200 L480 200 L500 320 L20 320 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M180 320 L340 320 L350 340 L170 340 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Hinge line */}
          <line x1="60" y1="200" x2="440" y2="200" stroke="currentColor" strokeWidth="2" />
        </svg>

        {/* Screen viewport — 3D network */}
        <div
          className="absolute overflow-hidden rounded-sm border border-[#9b7fd4]/30 bg-[#0d0618]"
          style={{
            top: "10.5%",
            left: "15.5%",
            width: "69%",
            height: "42%",
          }}
        >
          <HeroCanvas contained />
          <p className="absolute bottom-3 left-0 right-0 text-center text-sm sm:text-base font-medium text-[#b794f6]/90 italic pointer-events-none z-10">
            {screenTagline}
          </p>
        </div>
      </div>
    </div>
  );
}
