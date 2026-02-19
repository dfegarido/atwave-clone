"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TECH_STATS = [
  { val: "+3.2x", label: "ROAS" },
  { val: "47%",   label: "Lower CAC" },
  { val: "90d",   label: "To results" },
];

export default function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);

  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const ctasRef      = useRef<HTMLDivElement>(null);

  // Typewriter state for the eyebrow label
  const [displayed, setDisplayed] = useState("");
  const fullText = "Enterprise-Grade Demand Generation";

  useEffect(() => {
    let idx = 0;
    const timer = setInterval(() => {
      setDisplayed(fullText.slice(0, idx + 1));
      idx++;
      if (idx >= fullText.length) clearInterval(timer);
    }, 38);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const section   = sectionRef.current;
    const textGroup = textGroupRef.current;
    const card      = cardRef.current;

    const els = [
      eyebrowRef.current,
      headlineRef.current,
      subRef.current,
      ctasRef.current,
    ].filter(Boolean) as HTMLElement[];

    if (!section || !textGroup || !card) return;

    gsap.set(els, { opacity: 0, y: 40 });
    gsap.set(card, { opacity: 0, scale: 1.06, filter: "blur(8px)", y: 24 });

    const entranceTl = gsap.timeline({ delay: 0.15 });
    entranceTl.to(els, {
      opacity: 1, y: 0, duration: 1.15, ease: "power4.out", stagger: 0.14,
    });
    entranceTl.to(card, {
      opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1.3, ease: "power4.out",
    }, "-=0.75");

    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: section, start: "top top", end: "+=80%",
        pin: true, scrub: 0.7, anticipatePin: 1,
      },
    });
    exitTl.to(textGroup, { y: -70, opacity: 0, ease: "none" }, 0);
    exitTl.to(card,      { scale: 0.92, opacity: 0, ease: "none" }, 0);

    return () => {
      entranceTl.kill();
      exitTl.kill();
      ScrollTrigger.getAll().filter((t) => t.trigger === section).forEach((t) => t.kill());
    };
  }, []);

  // Play the hero card video only when it enters the viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="slide relative overflow-hidden bg-transparent"
    >
      {/* Dot-grid texture over the WebGL canvas */}
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-100" />

      {/* Radial vignette to focus center */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,rgba(7,20,40,0.6)_100%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-32 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-0">

        {/* ── Text content ─────────────────────────────────────────────────── */}
        <div ref={textGroupRef} className="flex-1 text-center lg:text-left">

          {/* Eyebrow with typewriter + live dot */}
          <div
            ref={eyebrowRef}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="animate-pulse-glow h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
              {displayed}
              <span className="animate-blink ml-0.5 inline-block w-[2px] bg-accent align-middle" style={{ height: "0.8em" }} />
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[5rem]"
          >
            Drive Strategic
            <br />
            <em className="font-serif not-italic bg-gradient-to-r from-accent-light via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Growth at Scale
            </em>
          </h1>

          <p
            ref={subRef}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-400 md:text-xl lg:mx-0"
          >
            Precision-targeted demand generation powered by AI.
            Built for enterprises that measure success in pipeline,
            not impressions.
          </p>

          {/* Inline micro-stats */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            {TECH_STATS.map((s) => (
              <div key={s.val} className="flex items-center gap-1.5">
                <span className="text-base font-bold text-white">{s.val}</span>
                <span className="text-xs text-gray-500">{s.label}</span>
              </div>
            ))}
          </div>

          <div
            ref={ctasRef}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:bg-accent-light hover:scale-[1.03] hover:shadow-accent/50"
            >
              <span>Start Your Strategy</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10"
            >
              <Zap size={15} className="text-accent-light" />
              Watch Demo
            </a>
          </div>
        </div>

        {/* ── Terminal / video card ──────────────────────────────────────────── */}
        <div className="mt-16 flex-1 lg:mt-0">
          <div
            ref={cardRef}
            className="relative mx-auto w-full max-w-lg"
            style={{ willChange: "transform, opacity, filter" }}
          >
            {/* Ambient glow layers */}
            <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-accent/25 via-blue-500/10 to-violet-600/15 blur-3xl" />
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-accent/15 to-transparent blur-xl" />

            {/* Terminal window */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl shadow-accent/10 backdrop-blur-md">

              {/* Title bar */}
              <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/4 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-[11px] text-white/30">nexus.ai — pipeline-engine v2.4</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="animate-pulse h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-semibold text-emerald-400/80">LIVE</span>
                </div>
              </div>

              {/* Looping video — lazy-played via IntersectionObserver */}
              <div className="relative aspect-video overflow-hidden">
                <video
                  ref={videoRef}
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/work-01-saas.jpg`}
                  className="h-full w-full object-cover"
                >
                  <source src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/hero-bg.mp4`} type="video/mp4" />
                </video>
                {/* Dark-to-transparent overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                {/* CRT scan-line effect */}
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.07)_3px,rgba(0,0,0,0.07)_4px)]" />
                {/* Corner tag */}
                <div className="absolute right-3 top-3 rounded-md border border-white/15 bg-black/50 px-2 py-1 text-[10px] font-mono font-semibold text-white/70 backdrop-blur-sm">
                  DEMAND_ENGINE.exe
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 divide-x divide-white/8 border-t border-white/8">
                {TECH_STATS.map((s) => (
                  <div key={s.val} className="py-4 text-center">
                    <div className="text-sm font-bold text-white">{s.val}</div>
                    <div className="mt-0.5 text-[10px] text-white/35">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating notification badge — CSS-only animation, no Framer Motion */}
            <div className="animate-float absolute -right-4 top-10 z-10 rounded-xl border border-white/10 bg-navy-deep/90 px-4 py-3 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
                  <Zap size={14} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Pipeline growing</div>
                  <div className="text-[10px] text-gray-500">+23% this week</div>
                </div>
              </div>
            </div>

            {/* Floating accuracy badge */}
            <div className="animate-float-down absolute -left-4 bottom-14 z-10 rounded-xl border border-white/10 bg-navy-deep/90 px-4 py-3 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
                  <span className="text-xs font-bold text-accent">AI</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Signal accuracy</div>
                  <div className="text-[10px] text-gray-500">94.7% precision</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/30 to-transparent" />
    </section>
  );
}
