"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pure CSS + GSAP animated background — replaces the Three.js / WebGL canvas.
 * Renders three blurred gradient orbs that:
 *  - Float continuously via CSS keyframes (zero JS cost)
 *  - Shift hue subtly as the page scrolls via lightweight GSAP ScrollTrigger
 *
 * Fixed behind all page content, pointer-events: none.
 */
export default function BackgroundGlow() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb1 = orb1Ref.current;
    const orb2 = orb2Ref.current;
    const orb3 = orb3Ref.current;
    if (!orb1 || !orb2 || !orb3) return;

    // Subtle scroll-driven positional shift — one cheap GSAP tween per orb
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const p = self.progress;
        // Orb 1: drifts up-left as page scrolls
        gsap.set(orb1, { x: -p * 60, y: -p * 120 });
        // Orb 2: drifts right as page scrolls
        gsap.set(orb2, { x: p * 80, y: p * 60 });
        // Orb 3: pulses opacity in mid-scroll
        const opc = 0.04 + Math.sin(p * Math.PI) * 0.04;
        gsap.set(orb3, { opacity: opc });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "linear-gradient(160deg, #071428 0%, #040d1e 60%, #060f28 100%)",
      }}
    >
      {/* Orb 1 — primary accent, top-left quadrant */}
      <div
        ref={orb1Ref}
        className="animate-float"
        style={{
          position: "absolute",
          top: "8%",
          left: "12%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />

      {/* Orb 2 — secondary, bottom-right quadrant */}
      <div
        ref={orb2Ref}
        className="animate-float-down"
        style={{
          position: "absolute",
          bottom: "10%",
          right: "8%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />

      {/* Orb 3 — deep violet accent, center */}
      <div
        ref={orb3Ref}
        style={{
          position: "absolute",
          top: "40%",
          left: "40%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          opacity: 0.04,
          background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 65%)",
          filter: "blur(100px)",
          willChange: "opacity",
        }}
      />

      {/* Subtle dot-grid texture */}
      <div
        className="bg-dots"
        style={{ position: "absolute", inset: 0, opacity: 0.4 }}
      />
    </div>
  );
}
