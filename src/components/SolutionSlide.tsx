"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "./FadeIn";

gsap.registerPlugin(ScrollTrigger);

const bullets = [
  "AI-driven audience segmentation",
  "Cross-channel identity resolution",
  "Real-time intent scoring",
  "Multi-touch attribution modeling",
];

export default function SolutionSlide() {
  const sectionRef  = useRef<HTMLElement>(null);
  const visualRef   = useRef<HTMLDivElement>(null);

  // ── Scrub: visual parallax depth as user scrolls through ─────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const visual  = visualRef.current;
    if (!section || !visual) return;

    const tween = gsap.to(visual, {
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === section)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="slide relative overflow-hidden bg-surface/95 backdrop-blur-sm"
    >
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:gap-24 lg:px-8 lg:py-0">

        {/* Left: text content */}
        <FadeIn direction="left">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
              The Solution
            </p>
            <h2 className="text-3xl leading-[1.15] tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Reach the Right Audience{" "}
              <em className="font-serif text-accent not-italic">at the Right Moment</em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Leverage advanced audience intelligence and real-time behavioral
              data to connect with high-intent prospects. Our targeting engine
              processes millions of signals to ensure every impression delivers
              measurable business value — not vanity metrics.
            </p>
            <ul className="mt-8 space-y-4">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-[15px] text-gray-600">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Right: analytics photo with scrub parallax */}
        <FadeIn direction="right">
          <div className="relative" style={{ willChange: "transform" }}>
            {/* Glow behind visual */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 via-blue-500/10 to-indigo-500/5 blur-2xl" />

            {/* Photo card — moves at a different rate for depth */}
            <div
              ref={visualRef}
              className="relative overflow-hidden rounded-2xl border border-gray-200/50 shadow-2xl aspect-[4/3]"
            >
              <Image
                src="/images/solution-analytics.jpg"
                alt="Performance analytics dashboard"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle overlay to tie into brand colors */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />

              {/* Floating stat card */}
              <div className="absolute bottom-6 left-6 rounded-xl border border-white/20 bg-navy/80 px-5 py-4 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  Pipeline Growth
                </p>
                <p className="mt-1 text-3xl font-bold text-white">+3.2×</p>
                <p className="mt-0.5 text-xs text-white/60">vs. previous quarter</p>
              </div>

              {/* Top right badge */}
              <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-white/80">Live dashboard</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
