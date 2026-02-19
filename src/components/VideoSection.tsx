"use client";

import { useRef, useState } from "react";
import { Play, Pause, Maximize2, Volume2, VolumeX } from "lucide-react";
import FadeIn from "./FadeIn";

const FEATURES = [
  { icon: "⚡", title: "Real-time attribution", desc: "Full-funnel visibility" },
  { icon: "🎯", title: "Precision targeting",   desc: "High-intent signals" },
  { icon: "🔄", title: "Cross-channel sync",    desc: "Unified data pipeline" },
  { icon: "📊", title: "Live dashboards",       desc: "Instant performance data" },
];

export default function VideoSection() {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else         { v.play();  setPlaying(true);  }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  const openFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <section
      id="demo"
      className="relative overflow-hidden bg-navy-deep py-24 lg:py-32"
    >
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      {/* Top glow */}
      <div className="pointer-events-none absolute left-1/2 -top-32 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/7 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center mb-14">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="animate-pulse h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Platform Demo
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              See the Engine{" "}
              <span className="bg-gradient-to-r from-accent-light to-cyan-400 bg-clip-text text-transparent">
                in Action
              </span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-400">
              Watch how Nexus&rsquo;s AI-driven demand engine finds, engages, and converts
              enterprise buyers at scale — from first signal to closed revenue.
            </p>
          </div>
        </FadeIn>

        {/* ── Video player ────────────────────────────────────────────────── */}
        <FadeIn delay={0.1}>
          <div className="relative mx-auto max-w-5xl">
            {/* Gradient border glow */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-accent/50 via-blue-400/20 to-violet-500/50 blur-[2px]" />
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-accent/8 via-transparent to-violet-500/8 blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl shadow-accent/15">

              {/* Browser chrome bar */}
              <div className="flex items-center border-b border-white/8 bg-[#0d1117] px-5 py-3.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors" />
                  <span className="h-3 w-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors" />
                </div>
                <div className="mx-auto flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-5 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-[11px] text-white/35">
                    app.nexus.ai/platform/live-demo
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-semibold text-emerald-400/80 uppercase tracking-wide">Live</span>
                </div>
              </div>

              {/* Video area */}
              <div
                className="group relative aspect-video cursor-pointer"
                onClick={togglePlay}
              >
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                  loop
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                >
                  <source src="/demo-video.mp4" type="video/mp4" />
                </video>

                {/* CRT scan lines */}
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.05)_3px,rgba(0,0,0,0.05)_4px)]" />

                {/* Overlay dimmer — fades when playing */}
                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${playing ? "opacity-0 group-hover:opacity-20" : "opacity-100"}`} />

                {/* Play / Pause button */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
                  <button
                    aria-label={playing ? "Pause" : "Play"}
                    className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-accent/80 hover:border-accent/40 hover:shadow-accent/30"
                  >
                    {playing
                      ? <Pause size={28} fill="white" />
                      : <Play  size={28} fill="white" className="ml-1" />
                    }
                  </button>
                </div>

                {/* Bottom control bar */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-5 py-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button onClick={togglePlay} className="text-white/80 hover:text-white transition-colors">
                    {playing ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button onClick={toggleMute} className="text-white/80 hover:text-white transition-colors">
                    {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <div className="flex-1" />
                  <button onClick={openFullscreen} className="text-white/80 hover:text-white transition-colors">
                    <Maximize2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Feature callouts ────────────────────────────────────────────── */}
        <FadeIn delay={0.2}>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { title: "Real-time attribution", desc: "Full-funnel visibility",  accent: "text-blue-400",    bg: "bg-blue-500/10",   border: "border-blue-500/20" },
              { title: "Precision targeting",   desc: "High-intent signals",     accent: "text-accent-light", bg: "bg-accent/10",   border: "border-accent/20" },
              { title: "Cross-channel sync",    desc: "Unified data pipeline",   accent: "text-cyan-400",    bg: "bg-cyan-500/10",   border: "border-cyan-500/20" },
              { title: "Live dashboards",       desc: "Instant performance data", accent: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
            ].map((f) => (
              <div
                key={f.title}
                className={`flex flex-col gap-2 rounded-xl border ${f.border} ${f.bg} px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className={`text-sm font-semibold ${f.accent}`}>{f.title}</div>
                <div className="text-xs text-gray-500">{f.desc}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
