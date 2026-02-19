"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "We begin by auditing your existing digital footprint — channels, spend, attribution, and competitive positioning. From that foundation, we design a demand architecture built specifically around your market, buyers, and growth targets.",
    tags: ["Audit", "Competitive Analysis", "Goal Mapping"],
    bg: "from-navy-deep to-navy",
  },
  {
    number: "02",
    title: "Audience Intelligence",
    description:
      "Our AI engine processes behavioral signals across millions of touchpoints to build a precise picture of your ideal buyers. We identify high-intent segments before your competitors do, giving your team an unfair advantage in targeting.",
    tags: ["AI Segmentation", "Intent Scoring", "Identity Resolution"],
    bg: "from-navy to-navy-light",
  },
  {
    number: "03",
    title: "Campaign Execution",
    description:
      "With strategy and audiences locked, we deploy campaigns across channels with surgical precision. Every creative, every bid, every placement is calibrated against your specific revenue objectives — not platform vanity metrics.",
    tags: ["Multi-Channel Activation", "Creative Strategy", "Bid Optimization"],
    bg: "from-navy-light to-navy",
  },
  {
    number: "04",
    title: "Optimization & Scale",
    description:
      "Real-time attribution dashboards give you full-funnel visibility from first touch to closed revenue. We iterate weekly, compounding gains across every layer of the funnel until your acquisition machine is fully self-sustaining.",
    tags: ["Attribution Modeling", "Incremental Lift", "Scale Playbooks"],
    bg: "from-navy to-navy-deep",
  },
];

export default function ProcessTimeline() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const sectionRef  = useRef<HTMLElement>(null);
  const stepsRef    = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const numberRef   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrapper  = wrapperRef.current;
    const section  = sectionRef.current;
    const progress = progressRef.current;

    if (!wrapper || !section) return;

    const stepEls   = stepsRef.current.filter(Boolean) as HTMLDivElement[];
    const numberEls = numberRef.current.filter(Boolean) as HTMLDivElement[];

    if (stepEls.length !== steps.length) return;

    // ── Initial state: only first step visible ────────────────────────────
    gsap.set(stepEls, { opacity: 0, y: 36 });
    gsap.set(stepEls[0], { opacity: 1, y: 0 });

    // ── Build the pinned scrub timeline ───────────────────────────────────
    // Reserve the last 15% of timeline for the clean section exit fade,
    // so transitions occupy positions 0.0 → 0.85.
    const TRANSITION_END = 0.85;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Each step occupies 1/3 of the usable timeline space
    const segmentSize = TRANSITION_END / (steps.length - 1);

    for (let i = 0; i < steps.length - 1; i++) {
      const pos = i * segmentSize;

      // Outgoing step: fades out in the first 30% of the segment
      tl.to(stepEls[i], { opacity: 0, y: -36, ease: "none", duration: segmentSize * 0.3 }, pos);

      // Incoming step: starts at 35% of the segment (after outgoing is nearly gone)
      tl.to(stepEls[i + 1], { opacity: 1, y: 0, ease: "none", duration: segmentSize * 0.35 }, pos + segmentSize * 0.35);

      // Number highlight: dim outgoing at same moment step starts leaving
      tl.to(numberEls[i], { opacity: 0.3, ease: "none", duration: segmentSize * 0.3 }, pos);
      // Number highlight: brighten incoming in sync with incoming step
      if (numberEls[i + 1]) {
        tl.to(numberEls[i + 1], { opacity: 1, ease: "none", duration: segmentSize * 0.3 }, pos + segmentSize * 0.35);
      }

      // Progress bar fill — spans the full segment
      if (progress) {
        tl.to(
          progress,
          { scaleY: (i + 1) / (steps.length - 1), ease: "none", duration: segmentSize },
          pos
        );
      }
    }

    // ── Clean exit: fade the entire section content out before unpin ─────
    // This runs from 0.85 → 1.0 of the timeline, ensuring the Process
    // section is invisible when the pin releases and Work section enters.
    if (sectionRef.current) {
      tl.to(sectionRef.current, { opacity: 0, ease: "none", duration: 0.15 }, TRANSITION_END);
    }

    // ── Mobile: disable pin on small screens (graceful degrade) ──────────
    ScrollTrigger.matchMedia({
      "(max-width: 767px)": () => {
        ScrollTrigger.getAll()
          .filter((t) => t.pin === wrapper)
          .forEach((t) => t.kill());

        // Restore natural visibility
        gsap.set(stepEls, { opacity: 1, y: 0 });
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === wrapper)
        .forEach((t) => t.kill());
      // Restore section opacity so HMR / re-mount doesn't leave it invisible
      if (sectionRef.current) gsap.set(sectionRef.current, { opacity: 1 });
    };
  }, []);

  return (
    /* Outer wrapper: sets the scroll distance for the pin */
    <div ref={wrapperRef} id="process" className="relative">
      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden bg-navy-deep/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">

          {/* ── Left column: step numbers + progress ─────────────────────── */}
          <div className="hidden flex-none lg:flex lg:flex-col lg:pr-20">
            {/* Vertical progress line */}
            <div className="relative ml-6 flex flex-col gap-0">
              {/* Track */}
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
              {/* Filled progress */}
              <div
                ref={progressRef}
                className="absolute left-1/2 top-0 w-px origin-top -translate-x-1/2 bg-accent"
                style={{ height: "100%", transform: "scaleY(0)", transformOrigin: "top" }}
              />

              {steps.map((step, i) => (
                <div key={step.number} className="relative flex items-center gap-4 py-6">
                  {/* Number */}
                  <div
                    ref={(el) => { numberRef.current[i] = el; }}
                    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-navy-deep text-sm font-bold text-white transition-all"
                    style={{ opacity: i === 0 ? 1 : 0.3 }}
                  >
                    {step.number}
                  </div>
                  <span className="whitespace-nowrap text-sm font-medium text-gray-400">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: step content ───────────────────────────────── */}
          <div className="relative flex-1">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[i] = el; }}
                className="absolute inset-0 flex flex-col justify-center"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Mobile step number */}
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent-light lg:hidden">
                  {step.number} / {String(steps.length).padStart(2, "0")}
                </p>

                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent-light hidden lg:block">
                  Step {step.number}
                </p>

                <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {step.title}
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
                  {step.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section label */}
        <div className="absolute right-6 top-8 text-xs font-semibold uppercase tracking-widest text-gray-600 lg:right-8">
          Our Process
        </div>
      </section>
    </div>
  );
}
