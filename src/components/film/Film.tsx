"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Mark } from "@/components/Mark";
import { HeroPush } from "@/components/HeroPush";
import { HomeStory } from "@/components/HomeStory";
import { useFilmFrames, FRAME_COUNT } from "@/components/hero3d/useFilmFrames";
import { World } from "./World";
import { Overlays } from "./Overlays";
import { useCatalog } from "@/lib/useCatalog";
import { formatPrice } from "@/lib/catalog";
import { useLocale, useTranslations } from "next-intl";

export function Film() {
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [reduce, setReduce] = useState(false);
  const { frames, loaded, ready, hasFirst } = useFilmFrames();
  const { bases } = useCatalog();
  const locale = useLocale();
  const tc = useTranslations("catalog");

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const total = stage.offsetHeight - window.innerHeight;
        const p = Math.max(0, Math.min(1, -stage.getBoundingClientRect().top / Math.max(1, total)));
        progressRef.current = p;
        setProgress(p);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  if (reduce) {
    return (
      <>
        <HeroPush />
        <HomeStory />
      </>
    );
  }

  const cards = useMemo(
    () =>
      bases.map((b) => ({
        title: tc(`bases.${b.id}.name`),
        price: formatPrice(b.price, locale),
        tag: b.delay,
        accent: b.popular ? "#15110C" : "#FFD23F",
      })),
    [bases, locale, tc]
  );

  const pct = Math.round((loaded / Math.max(1, frames.length || FRAME_COUNT)) * 100);

  return (
    <>
      {!hasFirst && (
        <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-6 bg-komanda-yellow">
          <div className="key-press">
            <Mark size={72} />
          </div>
          <div className="h-1 w-56 overflow-hidden rounded-full bg-komanda-charcoal/10">
            <div className="h-full bg-komanda-charcoal transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="text-[11px] font-extrabold uppercase tracking-[.28em] text-komanda-charcoal/60">{pct}%</div>
        </div>
      )}

      <section ref={stageRef} className="relative h-[820vh] bg-komanda-yellow max-[720px]:h-[680vh]">
        <div id="offres" className="absolute top-[44%] h-px w-px" />
        <div id="showroom" className="absolute top-[58%] h-px w-px" />
        <div id="agent" className="absolute top-[70%] h-px w-px" />
        <div id="audit" className="absolute top-[82%] h-px w-px" />

        <div className="sticky top-0 h-screen overflow-hidden">
          <Canvas
            className="absolute inset-0 h-full w-full"
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            camera={{ fov: 28, position: [0.06, 0.16, 1.62], near: 0.08, far: 50 }}
            shadows
          >
            <World
              frames={frames}
              progressRef={progressRef}
              cards={bases.map((b) => ({
                title: tc(`bases.${b.id}.name`),
                price: formatPrice(b.price, locale),
                tag: b.delay,
                accent: b.popular ? "#15110C" : "#FFD23F",
              }))}
            />
          </Canvas>
          <Overlays progress={progress} bases={bases} />
          {!ready && hasFirst && (
            <div className="absolute right-5 top-20 z-20 text-[10px] font-bold uppercase tracking-[.18em] text-komanda-charcoal/45">
              {pct}%
            </div>
          )}
        </div>
      </section>
    </>
  );
}
