"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import FadeIn from "./FadeIn";

interface StatItem {
  prefix?: string;
  target: number;
  suffix: string;
  decimals?: number;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    prefix: "",
    target: 3.2,
    suffix: "x",
    decimals: 1,
    label: "Average ROAS",
    description: "Return on ad spend achieved by enterprise clients within 90 days of launch",
  },
  {
    prefix: "",
    target: 47,
    suffix: "%",
    decimals: 0,
    label: "Lower CAC",
    description: "Reduction in customer acquisition cost versus prior channel benchmarks",
  },
  {
    prefix: "",
    target: 2.8,
    suffix: "x",
    decimals: 1,
    label: "Pipeline Growth",
    description: "Average qualified pipeline increase generated within the first quarter",
  },
];

function useCountUp(target: number, decimals = 0, duration = 2000, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (target - startValue) * eased;
      setCount(parseFloat(current.toFixed(decimals)));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, decimals, duration]);

  return count;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(stat.target, stat.decimals ?? 0, 2200, inView);

  return (
    <div
      ref={ref}
      className="text-center"
    >
      <div className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
        {stat.prefix}
        {stat.decimals && stat.decimals > 0
          ? count.toFixed(stat.decimals)
          : Math.floor(count)}
        {stat.suffix}
      </div>
      <div className="mt-3 text-lg font-semibold text-accent-light">
        {stat.label}
      </div>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-gray-500">
        {stat.description}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-wide text-accent-light uppercase">
              Proven at Scale
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Results That Move the Needle
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              Measurable outcomes delivered for enterprise organizations across
              every vertical.
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.12}>
              <StatCard stat={stat} index={i} />
            </FadeIn>
          ))}
        </div>

        {/* Divider line */}
        <div className="mt-20 border-t border-white/8" />
      </div>
    </section>
  );
}
