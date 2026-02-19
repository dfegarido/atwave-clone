"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const els = [headingRef.current, subRef.current, ctaRef.current].filter(
      Boolean
    ) as HTMLElement[];

    if (!section || els.length === 0) return;

    gsap.set(els, { opacity: 0, y: 44 });

    const tween = gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        once: true,
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
      id="contact"
      className="slide relative overflow-hidden bg-navy-deep"
    >
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center lg:px-8">

        <h2
          ref={headingRef}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
          style={{ willChange: "transform, opacity" }}
        >
          Ready to Transform
          <br />
          Your Growth Strategy?
        </h2>

        <p
          ref={subRef}
          className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400"
          style={{ willChange: "transform, opacity" }}
        >
          Partner with a team that delivers enterprise-grade results.
          Let&apos;s build your next growth chapter together.
        </p>

        <div
          ref={ctaRef}
          className="mt-12"
          style={{ willChange: "transform, opacity" }}
        >
          <a
            href="#"
            className="inline-flex items-center rounded-full bg-white px-10 py-4 text-base font-semibold text-navy transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/10"
          >
            Schedule a Strategy Call
          </a>
        </div>

        {/* Subtle divider line below CTA */}
        <div className="mt-20 w-16 border-t border-white/15" />
      </div>
    </section>
  );
}
