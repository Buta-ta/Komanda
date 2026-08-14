"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mark } from "@/components/Mark";
import { KeyButton } from "@/components/KeyButton";
import { HeroPush } from "@/components/HeroPush";
import { Scene } from "./Scene";
import { useFilmFrames, FRAME_COUNT } from "./useFilmFrames";
import { heroPhases } from "./phases";

export function HeroWorld() {
  const t = useTranslations("hero");
  const stageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduce, setReduce] = useState(false);
  const { frames, loaded, ready, hasFirst } = useFilmFrames();

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

  if (reduce) return <HeroPush />;

  const phases = heroPhases(progress);
  const pct = Math.round((loaded / Math.max(1, frames.length || FRAME_COUNT)) * 100);
  const showLoader = !hasFirst;

  return (
    <>
      {showLoader && (
        <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-6 bg-komanda-yellow">
          <div className="key-press">
            <Mark size={72} />
          </div>
          <div className="h-1 w-56 overflow-hidden rounded-full bg-komanda-charcoal/10">
            <div className="h-full bg-komanda-charcoal transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="text-[11px] font-extrabold uppercase tracking-[.28em] text-komanda-charcoal/60">
            {pct}%
          </div>
        </div>
      )}

      <section ref={stageRef} className="relative h-[300vh] bg-komanda-yellow max-[720px]:h-[250vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <Canvas
            className="absolute inset-0 h-full w-full"
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            camera={{ fov: 32, position: [0, 0.12, 2.02], near: 0.1, far: 40 }}
            shadows
          >
            <Scene frames={frames} phases={phases} />
          </Canvas>

          <div className="absolute left-0 top-0 z-20 h-[2px] bg-komanda-charcoal" style={{ width: `${progress * 100}%` }} />

          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background: `linear-gradient(180deg, rgba(21,17,12,${0.08 + phases.exit * 0.05}) 0%, transparent 28%, transparent 62%, rgba(21,17,12,${0.12 + phases.copy * 0.2}) 100%)`,
            }}
          />

          <div
            className="absolute inset-x-0 bottom-[12%] z-20 flex flex-col items-center px-6 text-center"
            style={{
              opacity: phases.copy,
              transform: `translateY(${(1 - phases.copy) * 22}px)`,
              pointerEvents: phases.copy > 0.4 ? "auto" : "none",
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-komanda-charcoal/15 bg-black/25 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[.14em] text-white backdrop-blur-md">
              {t("badge")}
            </div>
            <h1 className="mt-4 font-display text-[clamp(40px,6vw,80px)] font-black leading-[0.9] text-komanda-charcoal">
              {t("title1")}
              <br />
              <span className="text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.25)]">{t("title2")}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-[15px] font-medium leading-relaxed text-komanda-charcoal/80">
              {t("subtitle")}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <KeyButton href="/configurateur">{t("cta")}</KeyButton>
              <Link
                href="/devis"
                className="inline-flex items-center gap-2 rounded-full border-2 border-komanda-charcoal/20 bg-black/20 px-6 py-3.5 text-[15px] font-bold text-komanda-charcoal backdrop-blur-md hover:bg-black/30"
              >
                {t("quote")}
              </Link>
            </div>
          </div>

          <div
            className="absolute bottom-7 left-1/2 z-30 -translate-x-1/2 text-center text-komanda-charcoal/70"
            style={{ opacity: progress < 0.05 ? 1 : 0, transition: "opacity .4s" }}
          >
            <div className="text-[10px] font-bold uppercase tracking-[.22em]">{t("scroll")}</div>
            <div className="mx-auto mt-2 h-9 w-5 rounded-full border-[1.5px] border-komanda-charcoal/40">
              <div className="mx-auto mt-1.5 h-1.5 w-[3px] animate-bounce rounded-full bg-komanda-charcoal/70" />
            </div>
          </div>

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
