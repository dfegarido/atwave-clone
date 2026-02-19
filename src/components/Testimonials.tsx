"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import FadeIn from "./FadeIn";

const testimonials = [
  {
    quote:
      "Nexus transformed how we think about digital demand generation. Over 12 months, they became our highest-ROAS channel — outperforming paid search, paid social, and every other channel in our mix. The precision targeting is genuinely unlike anything else we've used.",
    name: "Sarah Chen",
    title: "VP of Growth",
    company: "Meridian Capital Group",
    avatar: "/images/avatar-sarah.jpg",
  },
  {
    quote:
      "What set Nexus apart was the strategic partnership. They didn't just run campaigns — they built the entire demand architecture from the ground up. Pipeline quality improved dramatically and our sales team finally had leads worth calling.",
    name: "Marcus Rivera",
    title: "Chief Marketing Officer",
    company: "Arclight Technologies",
    avatar: "/images/avatar-marcus.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white/95 py-24 backdrop-blur-sm lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-wide text-accent uppercase">
              What Our Customers Say
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Trusted by Growth Leaders
            </h2>
          </div>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.15} direction={i === 0 ? "left" : "right"}>
              <motion.div
                whileHover={{
                  y: -4,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.07)",
                  transition: { type: "spring", stiffness: 300, damping: 22 },
                }}
                className="relative rounded-2xl border border-gray-100 bg-surface p-8 lg:p-10"
              >
                {/* Decorative quote icon */}
                <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Quote size={20} strokeWidth={1.8} />
                </div>

                <blockquote className="text-lg leading-relaxed text-gray-700 lg:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-8 flex items-center gap-4">
                  {/* Avatar photo — fixed size, next/image for WebP */}
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={44}
                    height={44}
                    className="shrink-0 rounded-full object-cover ring-2 ring-accent/20"
                  />
                  <div>
                    <div className="text-sm font-semibold text-navy">
                      {t.name}
                    </div>
                    <div className="mt-0.5 text-sm text-muted">
                      {t.title} &mdash; {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
