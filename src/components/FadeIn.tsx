"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Direction offset map ──────────────────────────────────────────────────────

const directionMap = {
  up:    { y: 48,  x: 0   },
  down:  { y: -48, x: 0   },
  left:  { y: 0,   x: 48  },
  right: { y: 0,   x: -48 },
  none:  { y: 0,   x: 0   },
};

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Initial movement direction */
  direction?: keyof typeof directionMap;
  /** Seconds before animation starts after trigger (stagger support) */
  delay?: number;
  /** Duration in seconds. Default = 1.1s for that premium, unhurried feel. */
  duration?: number;
}

/**
 * Wraps children in a GSAP ScrollTrigger fade-in.
 * Uses power4.out for the signature slow-decelerate easing that makes
 * high-end agency sites feel like a curated presentation.
 */
export default function FadeIn({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 1.1,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { x, y } = directionMap[direction];

    // Set initial invisible state immediately (no flash on mount)
    gsap.set(el, { opacity: 0, x, y });

    const tween = gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}

// ── Framer Motion stagger variants (used by Services, CaseStudies hover grids)
// These are kept for whileHover spring effects — unrelated to scroll.

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1], // expo.out
    },
  },
};
