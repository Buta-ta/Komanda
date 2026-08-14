"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mark } from "./Mark";
import { KeyButton } from "./KeyButton";

const FRAME_COUNT = 94;

export function HeroPush() {
  const t = useTranslations("hero");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const [hasFirst, setHasFirst] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 720;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(reduced);
    setStep(mobile || reduced ? 2 : 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const indices: number[] = [];
    for (let i = 1; i <= FRAME_COUNT; i += step) indices.push(i);
    framesRef.current = new Array(indices.length).fill(null);

    const loadOne = (slot: number, frameNo: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = `/hero-push/p_${String(frameNo).padStart(3, "0")}.jpg`;
        const done = () => {
          framesRef.current[slot] = img;
          setLoaded((n) => n + 1);
          resolve();
        };
        img.onload = done;
        img.onerror = done;
      });

    (async () => {
      await loadOne(0, indices[0]);
      if (cancelled) return;
      setHasFirst(true);
      if (reduce) {
        setReady(true);
        return;
      }
      for (let i = 1; i < indices.length; i += 8) {
        const batch = indices.slice(i, i + 8).map((n, j) => loadOne(i + j, n));
        await Promise.all(batch);
        if (cancelled) return;
      }
      setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [step, reduce]);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (!hasFirst) return;
    let raf = 0;
    let current = -1;
    const cover = window.innerWidth >= 720;

    const draw = (i: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = framesRef.current[i];
      if (!canvas || !ctx || !img || !img.complete || !img.naturalWidth) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.fillStyle = "#FFD23F";
      ctx.fillRect(0, 0, w, h);
      const ir = img.width / img.height;
      const cr = w / h;
      let dw: number, dh: number, dx: number, dy: number;
      const useCover = cover;
      if (useCover ? cr > ir : cr <= ir) {
        dw = w;
        dh = w / ir;
        dx = 0;
        dy = (h - dh) / 2;
      } else {
        dh = h;
        dw = h * ir;
        dx = (w - dw) / 2;
        dy = 0;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const total = stage.offsetHeight - window.innerHeight;
        const p = Math.max(0, Math.min(1, -stage.getBoundingClientRect().top / Math.max(1, total)));
        const max = Math.max(1, framesRef.current.filter(Boolean).length - 1);
        const idx = reduce ? 0 : Math.round(p * max);
        if (idx !== current) {
          current = idx;
          draw(idx);
        }
        setProgress(p);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    draw(0);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [hasFirst, ready, reduce]);

  const totalToLoad = Math.ceil(FRAME_COUNT / step);
  const pct = Math.round((loaded / totalToLoad) * 100);
  const leftOpacity = reduce ? 1 : Math.max(0, Math.min(1, (progress - 0.28) / 0.28));
  const leftX = (1 - leftOpacity) * -24;
  const bottomOpacity = reduce ? 1 : Math.max(0, Math.min(1, (progress - 0.58) / 0.18));

  return (
    <>
      {!ready && (
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

      <section ref={stageRef} className="relative h-[240vh] bg-komanda-yellow max-[720px]:h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background: `linear-gradient(90deg, rgba(21,17,12,${0.18 + leftOpacity * 0.28}) 0%, rgba(21,17,12,0) 46%, rgba(21,17,12,0) 70%, rgba(21,17,12,0.12) 100%)`,
            }}
          />

          <div className="absolute left-0 top-0 z-20 h-[2px] bg-komanda-charcoal" style={{ width: `${progress * 100}%` }} />

          <div
            className="absolute inset-0 z-20 flex items-end md:items-center"
            style={{ opacity: leftOpacity }}
          >
            <div
              className="w-full px-6 pb-36 md:max-w-[46%] md:px-12 md:pb-0 lg:px-16"
              style={{ transform: `translateX(${leftX}px)` }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[.14em] text-white backdrop-blur-md">
                {t("badge")}
              </div>
              <h1 className="mt-5 font-display text-[clamp(40px,5.4vw,72px)] font-black leading-[0.92] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
                {t("title1")}
                <br />
                <span className="text-komanda-yellow">{t("title2")}</span>
              </h1>
              <p className="mt-4 max-w-md text-[clamp(14px,1.5vw,17px)] font-medium leading-relaxed text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
                {t("subtitle")}
              </p>
            </div>
          </div>

          <div
            className="absolute inset-x-0 bottom-[11%] z-20 flex flex-col items-start px-6 md:max-w-[50%] md:px-12 lg:px-16"
            style={{ opacity: bottomOpacity, transform: `translateY(${(1 - bottomOpacity) * 16}px)` }}
          >
            <div className="flex flex-wrap gap-3">
              <KeyButton href="/configurateur">{t("cta")}</KeyButton>
              <Link
                href="/devis"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-black/30 px-6 py-3.5 text-[15px] font-bold text-white backdrop-blur-md transition hover:bg-black/50"
              >
                {t("quote")}
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-[12px] font-bold text-white">
              <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 backdrop-blur">{t("prices.vitrine")}</span>
              <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 backdrop-blur">{t("prices.motion")}</span>
              <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 backdrop-blur">{t("prices.agent")}</span>
            </div>
          </div>

          <div
            className="absolute bottom-7 left-1/2 z-30 -translate-x-1/2 text-center text-white/80"
            style={{ opacity: progress < 0.06 ? 1 : 0, transition: "opacity .4s", textShadow: "0 1px 4px rgba(0,0,0,.5)" }}
          >
            <div className="text-[10px] font-bold uppercase tracking-[.22em]">{t("scroll")}</div>
            <div className="mx-auto mt-2 h-9 w-5 rounded-full border-[1.5px] border-white/50">
              <div className="mx-auto mt-1.5 h-1.5 w-[3px] animate-bounce rounded-full bg-white/80" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
