"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSlide() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const bgGlowRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left    = leftRef.current;
    const right   = rightRef.current;
    const bgGlow  = bgGlowRef.current;

    if (!section || !left || !right || !bgGlow) return;

    // ── Entrance: opposing sides ──────────────────────────────────────────
    gsap.set(left,  { opacity: 0, x: -64 });
    gsap.set(right, { opacity: 0, x: 64 });

    const enterTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    });

    enterTl
      .to(left,  { opacity: 1, x: 0, duration: 1.2, ease: "power4.out" }, 0)
      .to(right, { opacity: 1, x: 0, duration: 1.2, ease: "power4.out" }, 0.1);

    // ── Scrub: background glow parallax ──────────────────────────────────
    gsap.to(bgGlow, {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      enterTl.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === section)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="slide relative overflow-hidden bg-navy-deep"
    >
      {/* Subtle abstract photo background */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/problem-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-10 mix-blend-luminosity"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-deep/85" />
      </div>

      {/* Background accent glow */}
      <div
        ref={bgGlowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:gap-24 lg:px-8 lg:py-0">

        {/* Left: bold pain-point statement */}
        <div ref={leftRef} style={{ willChange: "transform, opacity" }}>
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-accent-light">
            The Problem
          </p>
          <h2 className="text-3xl leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            Most enterprise marketing{" "}
            <em className="font-serif text-white/90 not-italic">is noise.</em>
          </h2>
          <div className="mt-8 space-y-4">
            {[
              "Impressions without impact.",
              "Budget without accountability.",
              "Data without direction.",
            ].map((line) => (
              <p key={line} className="text-xl font-medium text-gray-400 lg:text-2xl">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Right: supporting paragraph */}
        <div ref={rightRef} style={{ willChange: "transform, opacity" }}>
          <div className="border-l-2 border-accent/40 pl-8">
            <p className="text-lg leading-relaxed text-gray-300 lg:text-xl">
              Enterprise organizations pour millions into digital channels and
              walk away with vanity metrics. Click-through rates. Reach. Engagement.
              None of it correlates with pipeline, revenue, or growth.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-gray-400 lg:text-xl">
              The problem is not budget. It&rsquo;s the absence of a system built
              specifically to turn digital attention into measurable business
              outcomes.
            </p>
            <p className="mt-8 text-base font-semibold text-white">
              That&rsquo;s exactly what we built.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
