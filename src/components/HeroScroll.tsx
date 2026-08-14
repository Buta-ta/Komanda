"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

const FRAME_COUNT = 90;

export function HeroScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const [showText, setShowText] = useState(false);

  // Préchargement des frames
  useEffect(() => {
    let count = 0;
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const n = String(i).padStart(3, "0");
      img.src = `/frames/f_${n}.jpg`;
      const done = () => {
        count++;
        setLoaded(count);
        if (count === FRAME_COUNT) setReady(true);
      };
      img.onload = done;
      img.onerror = done;
      imgs.push(img);
    }
    framesRef.current = imgs;
  }, []);

  // Canvas responsive
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
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

  // Scroll → frame
  useEffect(() => {
    if (!ready) return;
    let raf = 0;
    const draw = (i: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = framesRef.current[i];
      if (!canvas || !ctx || !img || !img.complete) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const ir = img.width / img.height;
      const cr = w / h;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (cr > ir) {
        sh = img.width / cr;
        sy = (img.height - sh) / 2;
      } else {
        sw = img.height * cr;
        sx = (img.width - sw) / 2;
      }
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    };
    draw(0);

    let current = -1;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const rect = stage.getBoundingClientRect();
        const total = stage.offsetHeight - window.innerHeight;
        const p = Math.max(0, Math.min(1, -rect.top / total));
        const frameP = Math.min(1, p / 0.82);
        const idx = Math.round(frameP * (FRAME_COUNT - 1));
        if (idx !== current) {
          current = idx;
          draw(idx);
          if (canvasRef.current) {
            if (idx > FRAME_COUNT - 8) {
              const z = 1 + ((idx - (FRAME_COUNT - 8)) / 7) * 0.2;
              canvasRef.current.style.transform = `scale(${z})`;
            } else {
              canvasRef.current.style.transform = "scale(1)";
            }
          }
        }
        setShowText(p > 0.82);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ready]);

  const progress = ready ? (loaded / FRAME_COUNT) * 100 : (loaded / FRAME_COUNT) * 100;

  return (
    <>
      {/* Loader */}
      {!ready && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-black">
          <Logo className="text-white text-[22px]" />
          <div className="h-[58px] w-[58px] rounded-full animate-spin"
               style={{
                 background: "conic-gradient(from 0deg, transparent 0%, #FFD23F 80%, transparent 100%)",
                 WebkitMask: "radial-gradient(circle, transparent 58%, #000 60%)",
                 mask: "radial-gradient(circle, transparent 58%, #000 60%)",
               }} />
          <div className="h-[3px] w-[240px] overflow-hidden rounded bg-white/10">
            <div className="h-full bg-gradient-to-r from-komanda-yellow to-yellow-100 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="font-semibold text-[11px] uppercase tracking-[.22em] text-white/70">
            Chargement de l'expérience
          </div>
        </div>
      )}

      <div ref={stageRef} className="relative h-[620vh] max-[720px]:h-[540vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          <div
            className="pointer-events-none absolute inset-0 z-[3] transition-[background] duration-700"
            style={{
              background: showText
                ? "radial-gradient(100% 70% at 50% 55%, rgba(0,0,0,.22) 0%, rgba(0,0,0,.55) 60%, rgba(0,0,0,.86) 100%), linear-gradient(180deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,.28) 30%, rgba(0,0,0,.78) 100%)"
                : "radial-gradient(120% 80% at 50% 45%, rgba(0,0,0,0) 38%, rgba(0,0,0,.32) 78%, rgba(0,0,0,.72) 100%), linear-gradient(180deg, rgba(0,0,0,.32) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,.22) 60%, rgba(0,0,0,.72) 100%)",
            }}
          />

          <nav className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 md:px-11">
            <Logo className="text-white text-[22px]" />
            <div className="hidden items-center gap-6 text-sm font-medium text-white/85 md:flex">
              <Link href="/configurateur" className="hover:text-komanda-yellow">Offres</Link>
              <Link href="/#agent" className="hover:text-komanda-yellow">Agent IA</Link>
              <Link href="/suivi" className="hover:text-komanda-yellow">Suivi de commande</Link>
            </div>
            <Link href="/configurateur" className="inline-flex items-center gap-2 rounded-full bg-komanda-yellow px-4 py-2.5 text-sm font-bold text-komanda-charcoal shadow-[0_8px_20px_rgba(255,192,31,.5)] transition hover:-translate-y-0.5">
              Commander <ArrowRight size={14} strokeWidth={2.6} />
            </Link>
          </nav>

          <div className="absolute bottom-7 left-1/2 z-[6] flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[.22em] text-white/85 transition-opacity"
               style={{ opacity: showText ? 0 : 1 }}>
            <span>Scrolle pour entrer</span>
            <span className="relative h-[36px] w-[22px] rounded-[12px] border-[1.5px] border-white/70">
              <span className="absolute left-1/2 top-[7px] h-[7px] w-[3px] -translate-x-1/2 animate-bounce rounded bg-white" />
            </span>
          </div>

          {/* Texte final */}
          <div
            className="absolute inset-0 z-[6] flex flex-col items-center justify-center px-5 text-center transition-opacity duration-500"
            style={{ opacity: showText ? 1 : 0, pointerEvents: showText ? "auto" : "none" }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3.5 py-2 text-[12.5px] font-semibold text-white/95 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-komanda-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-komanda-green" />
              </span>
              Afrique de l'Ouest & Centrale · Paiement Mobile Money
            </div>
            <h1 className="bg-gradient-to-b from-white via-yellow-200 to-komanda-yellow bg-clip-text text-[clamp(68px,12vw,172px)] font-black leading-[0.9] tracking-[-.045em] text-transparent drop-shadow-[0_12px_80px_rgba(255,210,63,.35)]">
              Komanda
            </h1>
            <h2 className="mt-3 text-[clamp(22px,3.4vw,40px)] font-bold text-white">
              Ton site web, livré en 72&nbsp;h.
            </h2>
            <p className="mt-3.5 max-w-[640px] text-[clamp(14px,1.6vw,17px)] font-medium leading-relaxed text-white/90">
              Choisis ta base, ajoute tes suppléments, paie en Mobile Money. On s'occupe du reste — sites vitrines, sites 3D motion et agents IA commerciaux WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/configurateur" className="inline-flex items-center gap-2 rounded-full bg-komanda-yellow px-6 py-3.5 text-[15px] font-bold text-komanda-charcoal shadow-[0_14px_34px_rgba(255,192,31,.45)] transition hover:-translate-y-0.5">
                Voir les offres <ArrowRight size={16} strokeWidth={2.4} />
              </Link>
              <Link href="/devis" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-6 py-3.5 text-[15px] font-bold text-white backdrop-blur-md transition hover:bg-white/15">
                Demander un devis
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-2 text-[12.5px] font-semibold text-white/90">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">Vitrine dès <b className="text-komanda-yellow">10 000 CFA</b></span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">3D Motion dès <b className="text-komanda-yellow">15 000 CFA</b></span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">Agent IA WhatsApp <b className="text-komanda-yellow">5 000 CFA/mois</b></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
