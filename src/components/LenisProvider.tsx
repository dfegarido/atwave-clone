"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Lenis context — exposes the instance once initialised ────────────────────
const LenisContext = createContext<Lenis | null>(null);

/** Returns the Lenis instance. Null during SSR or before first mount. */
export function useLenis() {
  return useContext(LenisContext);
}

// ── Provider ─────────────────────────────────────────────────────────────────

export default function LenisProvider({ children }: { children: ReactNode }) {
  // State (not ref) so the context value updates and consumers re-render once
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // ── Reduce ScrollTrigger callback overhead ────────────────────────────────
    // limitCallbacks: only fire callbacks when the trigger state changes,
    // not on every scroll tick — dramatically reduces work per frame.
    ScrollTrigger.config({ limitCallbacks: true });

    // normalizeScroll: false — Lenis handles scroll normalisation already;
    // ScrollTrigger's built-in normalizer would conflict and double-process.
    ScrollTrigger.normalizeScroll(false);

    const instance = new Lenis({
      // Expo-like easing: starts fast, decelerates smoothly — the Atwave feel
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = instance;
    setLenis(instance);

    // ── Sync Lenis with GSAP ScrollTrigger ───────────────────────────────────
    instance.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP's global ticker so they share the same RAF loop
    gsap.ticker.add((time) => {
      instance.raf(time * 1000);
    });

    // Let Lenis handle lag smoothing
    gsap.ticker.lagSmoothing(0);

    return () => {
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
