"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { assetPath } from "@/lib/assetPath";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    index: "01",
    category: "Demand Generation",
    title: "Enterprise SaaS Platform Scales Pipeline 3.2x",
    stat: "+3.2x pipeline",
    detail: "90 days to results",
    image: assetPath("/images/work-01-saas.jpg"),
    overlay: "from-accent/70 via-blue-900/60 to-navy-deep/80",
  },
  {
    index: "02",
    category: "Performance Marketing",
    title: "Global Financial Services Firm Reduces CAC by 47%",
    stat: "47% lower CAC",
    detail: "Full-funnel attribution",
    image: assetPath("/images/work-02-finance.jpg"),
    overlay: "from-blue-900/70 via-cyan-900/60 to-navy-deep/80",
  },
  {
    index: "03",
    category: "Growth Strategy",
    title: "Healthcare Leader Achieves 2.8x ROAS in 90 Days",
    stat: "2.8x ROAS",
    detail: "Zero wasted impressions",
    image: assetPath("/images/work-03-health.jpg"),
    overlay: "from-indigo-900/70 via-violet-900/60 to-navy-deep/80",
  },
];

export default function WorkSlide() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const sceneRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef     = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const scenes = sceneRefs.current.filter(Boolean) as HTMLDivElement[];
    const dots   = dotsRef.current.filter(Boolean) as HTMLDivElement[];
    if (scenes.length !== projects.length) return;

    // ── Initial state: project 0 visible, others stacked below ───────────
    gsap.set(scenes, { yPercent: 100, opacity: 0 });
    gsap.set(scenes[0], { yPercent: 0, opacity: 1 });
    gsap.set(dots[0], { scale: 1, opacity: 1 });
    if (counterRef.current) counterRef.current.textContent = "01";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Update counter label
          const idx = Math.round(self.progress * (projects.length - 1));
          if (counterRef.current) {
            counterRef.current.textContent = String(idx + 1).padStart(2, "0");
          }
          // Dot active state
          dots.forEach((dot, i) => {
            gsap.set(dot, { opacity: i === idx ? 1 : 0.3, scale: i === idx ? 1 : 0.8 });
          });
        },
      },
    });

    const segmentSize = 1 / (projects.length - 1);

    for (let i = 0; i < projects.length - 1; i++) {
      const pos = i * segmentSize;
      // Current scene scales + fades out
      tl.to(scenes[i],
        { scale: 0.93, opacity: 0, ease: "none", duration: segmentSize * 0.5 },
        pos
      );
      // Next scene slides up + fades in
      tl.fromTo(
        scenes[i + 1],
        { yPercent: 8, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: "none", duration: segmentSize * 0.5 },
        pos + segmentSize * 0.15
      );
    }

    // Mobile: disable pin
    ScrollTrigger.matchMedia({
      "(max-width: 767px)": () => {
        ScrollTrigger.getAll()
          .filter((t) => t.pin === wrapper)
          .forEach((t) => t.kill());
        gsap.set(scenes, { yPercent: 0, opacity: 1, scale: 1 });
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === wrapper)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={wrapperRef} id="work" className="relative">
      {/* The pinned stage */}
      <div className="relative h-screen overflow-hidden bg-navy-deep">

        {/* Project scenes — absolutely stacked */}
        {projects.map((project, i) => (
          <div
            key={project.index}
            ref={(el) => { sceneRefs.current[i] = el; }}
            className="absolute inset-0 flex flex-col"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Top: photo background with gradient overlay — 60vh */}
            <div
              className="relative flex-1 overflow-hidden"
              style={{ minHeight: "60vh" }}
            >
              {/* Photo — next/image for automatic lazy loading + WebP */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                style={{ transform: "scale(1.05)" }}
                sizes="100vw"
                priority={project.index === "01"}
              />
              {/* Gradient overlay for legibility */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.overlay}`} />
              {/* Category label inside visual */}
              <div className="absolute left-8 top-8 text-xs font-semibold uppercase tracking-widest text-white/60 z-10">
                {project.category}
              </div>
              {/* Stat badge */}
              <div className="absolute right-8 top-8 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm z-10">
                {project.stat}
              </div>
            </div>

            {/* Bottom: project info */}
            <div className="flex items-center justify-between gap-6 bg-navy px-8 py-8 md:px-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {project.detail}
                </p>
                <h3 className="mt-2 max-w-xl text-xl font-bold leading-snug text-white md:text-2xl">
                  {project.title}
                </h3>
              </div>
              <a
                href="#contact"
                className="group hidden shrink-0 items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-accent hover:text-accent md:flex"
              >
                View Case Study
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        ))}

        {/* Navigation dots + counter */}
        <div className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3 z-10">
          <span
            ref={counterRef}
            className="mb-2 text-xs font-bold tabular-nums text-white/40"
          >
            01
          </span>
          {projects.map((_, i) => (
            <div
              key={i}
              ref={(el) => { dotsRef.current[i] = el; }}
              className="h-1.5 w-1.5 rounded-full bg-white"
              style={{ opacity: i === 0 ? 1 : 0.3, scale: i === 0 ? "1" : "0.8" }}
            />
          ))}
          <span className="mt-2 text-xs font-bold text-white/20">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Section label */}
        <div className="absolute left-8 top-8 z-10 text-xs font-semibold uppercase tracking-widest text-gray-600">
          Selected Work
        </div>
      </div>
    </div>
  );
}
