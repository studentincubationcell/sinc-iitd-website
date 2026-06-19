"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { NodeNetworkScene } from "./node-network-scene";

function CanvasFallback() {
  return (
    <div className="absolute inset-0 bg-[#12082a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(155,127,212,0.25),transparent_70%)]" />
    </div>
  );
}

export function HeroCanvas({ contained = false }: { contained?: boolean }) {
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReady(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!ready || reduceMotion) return <CanvasFallback />;

  return (
    <div className={contained ? "absolute inset-0" : "absolute inset-0 z-0"} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, contained ? 5.2 : 6.5], fov: contained ? 48 : 52 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <color attach="background" args={["#12082a"]} />
        {!contained && <fog attach="fog" args={["#1a1033", 4, 14]} />}
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={1} color="#b794f6" />
        <pointLight position={[-3, -1, 2]} intensity={0.5} color="#7c5cbf" />
        <Suspense fallback={null}>
          <NodeNetworkScene scale={contained ? 0.85 : 1} />
        </Suspense>
      </Canvas>
      {!contained && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1033]/40 via-[#1a1033]/55 to-[#1a1033]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,transparent_20%,#1a1033_85%)]" />
        </>
      )}
    </div>
  );
}
