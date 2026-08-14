"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("has-custom-cursor");
    let x = 0,
      y = 0,
      rx = 0,
      ry = 0;
    let hover = false;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const over = (e: Event) => {
      const t = e.target as HTMLElement | null;
      hover = Boolean(t?.closest("a, button, [data-cursor='hover']"));
    };
    const loop = () => {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 4}px,${y - 4}px,0)`;
      }
      if (ring.current) {
        const s = hover ? 1.8 : 1;
        ring.current.style.transform = `translate3d(${rx - 16}px,${ry - 16}px,0) scale(${s})`;
        ring.current.style.opacity = hover ? "0.9" : "0.45";
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-2 w-2 rounded-full bg-komanda-yellow mix-blend-difference md:block"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-8 w-8 rounded-full border border-komanda-yellow mix-blend-difference md:block"
      />
    </>
  );
}
