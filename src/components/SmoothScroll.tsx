"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let raf = 0;
    let dead = false;

    import("lenis").then(({ default: Lenis }) => {
      if (dead) return;
      const instance = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.1,
      });
      lenis = instance;
      const loop = (time: number) => {
        instance.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
