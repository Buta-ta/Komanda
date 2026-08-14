"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { KeyButton } from "@/components/KeyButton";
import { chapters } from "./chapters";
import { formatPrice, type BaseProduct } from "@/lib/catalog";

function Pane({
  opacity,
  children,
  align = "center",
}: {
  opacity: number;
  children: React.ReactNode;
  align?: "center" | "left";
}) {
  if (opacity < 0.02) return null;
  return (
    <div
      className={`absolute inset-x-0 z-20 px-6 ${align === "left" ? "bottom-[14%] left-0 max-w-xl md:left-[8%]" : "bottom-[11%] flex flex-col items-center text-center"}`}
      style={{
        opacity,
        transform: `translateY(${(1 - opacity) * 28}px)`,
        pointerEvents: opacity > 0.45 ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}

export function Overlays({ progress, bases }: { progress: number; bases: BaseProduct[] }) {
  const t = useTranslations("film");
  const tc = useTranslations("catalog");
  const locale = useLocale();
  const ch = chapters(progress);
  const agentPrice = 5000;
  const line = bases
    .map((b) => {
      const name = tc(`bases.${b.id}.name`);
      return `${name} ${formatPrice(b.price, locale)}`;
    })
    .join(" · ");

  return (
    <>
      <div className="absolute left-0 top-0 z-30 h-[2px] bg-komanda-charcoal" style={{ width: `${progress * 100}%` }} />

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `linear-gradient(180deg, rgba(21,17,12,${0.06 + ch.agent * 0.18}) 0%, transparent 26%, transparent 58%, rgba(21,17,12,${0.1 + ch.cta * 0.18}) 100%)`,
        }}
      />

      <div
        className="absolute bottom-7 left-1/2 z-30 -translate-x-1/2 text-center text-komanda-charcoal/70"
        style={{ opacity: progress < 0.04 ? 1 : 0, transition: "opacity .45s" }}
      >
        <div className="text-[10px] font-bold uppercase tracking-[.22em]">{t("scroll")}</div>
        <div className="mx-auto mt-2 h-9 w-5 rounded-full border-[1.5px] border-komanda-charcoal/40">
          <div className="mx-auto mt-1.5 h-1.5 w-[3px] animate-bounce rounded-full bg-komanda-charcoal/70" />
        </div>
      </div>

      <Pane opacity={ch.uiHero}>
        <div className="inline-flex items-center gap-2 rounded-full border border-komanda-charcoal/15 bg-black/20 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[.14em] text-komanda-charcoal backdrop-blur-md">
          {t("badge")}
        </div>
        <h1 className="mt-4 font-display text-[clamp(42px,6.4vw,86px)] font-black leading-[0.88] text-komanda-charcoal">
          {t("title1")}
          <br />
          <span className="text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.28)]">{t("title2")}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-[15px] font-medium leading-relaxed text-komanda-charcoal/80">
          {t("subtitle")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <KeyButton href="/configurateur">{t("cta")}</KeyButton>
          <Link
            href="/devis"
            className="inline-flex items-center gap-2 rounded-full border-2 border-komanda-charcoal/20 bg-black/15 px-6 py-3.5 text-[15px] font-bold text-komanda-charcoal backdrop-blur-md hover:bg-black/25"
          >
            {t("quote")}
          </Link>
        </div>
      </Pane>

      <Pane opacity={ch.uiHow} align="left">
        <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-komanda-charcoal/55">{t("howEyebrow")}</p>
        <h2 className="mt-3 font-display text-[clamp(34px,5vw,68px)] font-black text-komanda-charcoal">
          {t("howTitle1")}
          <br />
          {t("howTitle2")}
        </h2>
        <ol className="mt-6 space-y-2 text-[15px] font-semibold text-komanda-charcoal/80">
          <li>{t("how1")}</li>
          <li>{t("how2")}</li>
          <li>{t("how3")}</li>
        </ol>
      </Pane>

      <Pane opacity={ch.uiOffers} align="left">
        <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-komanda-charcoal/55">{t("offersEyebrow")}</p>
        <h2 className="mt-3 font-display text-[clamp(34px,5vw,68px)] font-black text-komanda-charcoal">
          {t("offersTitle1")}
          <br />
          {t("offersTitle2")}
        </h2>
        <p className="mt-4 max-w-sm text-[15px] font-medium text-komanda-charcoal/75">{line}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <KeyButton href="/configurateur">{t("compose")}</KeyButton>
          <Link href="/offres" className="inline-flex items-center text-[14px] font-extrabold uppercase tracking-[.12em]">
            {t("seeOffers")} →
          </Link>
        </div>
      </Pane>

      <Pane opacity={ch.uiShow} align="left">
        <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-komanda-charcoal/55">{t("showEyebrow")}</p>
        <h2 className="mt-3 font-display text-[clamp(34px,5vw,68px)] font-black text-komanda-charcoal">{t("showTitle")}</h2>
        <p className="mt-4 max-w-sm text-[15px] font-medium text-komanda-charcoal/75">{t("showSub")}</p>
        <Link href="/showroom" className="mt-5 inline-block text-[14px] font-extrabold uppercase tracking-[.14em] text-komanda-charcoal">
          {t("showAll")}
        </Link>
      </Pane>

      <Pane opacity={ch.uiAgent} align="left">
        <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-komanda-charcoal/70">
          {t("agentEyebrow")} · {formatPrice(agentPrice, locale)}
          {locale.startsWith("en") ? "/mo" : "/mois"}
        </p>
        <h2 className="mt-3 font-display text-[clamp(34px,5vw,68px)] font-black text-komanda-charcoal">
          {t("agentTitle1")}
          <br />
          {t("agentTitle2")}
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <KeyButton href="/configurateur?extra=agent-whatsapp">{t("agentCta")}</KeyButton>
          <Link href="/agent" className="inline-flex items-center rounded-full border border-komanda-charcoal/20 bg-black/15 px-5 py-3.5 text-[14px] font-bold">
            {t("agentDemo")}
          </Link>
        </div>
      </Pane>

      <Pane opacity={ch.uiAudit} align="left">
        <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-komanda-charcoal/55">{t("auditEyebrow")}</p>
        <h2 className="mt-3 font-display text-[clamp(34px,5vw,68px)] font-black text-komanda-charcoal">
          {t("auditTitle1")}
          <br />
          {t("auditTitle2")}
        </h2>
        <div className="mt-5">
          <KeyButton href="/audit">{t("auditCta")}</KeyButton>
        </div>
      </Pane>

      <Pane opacity={ch.uiCta}>
        <h2 className="font-display text-[clamp(36px,5.6vw,76px)] font-black text-komanda-charcoal">
          {t("ctaTitle1")}
          <br />
          {t("ctaTitle2")}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] font-medium text-komanda-charcoal/80">{t("ctaSub")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <KeyButton href="/configurateur" dark>
            {t("cta")}
          </KeyButton>
          <Link
            href="/devis"
            className="inline-flex items-center gap-2 rounded-full border-2 border-komanda-charcoal/20 bg-black/10 px-6 py-3.5 text-[15px] font-bold"
          >
            {t("talk")}
          </Link>
        </div>
      </Pane>
    </>
  );
}
