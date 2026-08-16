import { KeyButton } from "@/components/KeyButton";
import { formatPrice } from "@/lib/catalog";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "audit" });
  return { title: `${t("metaTitle")} — Komanda` };
}

const METRIC_KEYS = ["mobile", "purchase", "seo", "security", "a11y"] as const;
const METRIC_VALUES: Record<(typeof METRIC_KEYS)[number], string> = {
  mobile: "61",
  purchase: "54",
  seo: "73",
  security: "80",
  a11y: "48",
};

export default async function AuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "audit" });

  return (
    <main className="min-h-screen bg-[#0c0b09] pt-24 text-white">
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-komanda-yellow to-transparent opacity-70" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[.2em] text-komanda-yellow">
              {t("eyebrow", { price: formatPrice(12000) })}
            </p>
            <h1 className="mt-5 text-[clamp(40px,6vw,76px)] font-black leading-[0.94]">
              {t("title1")} — {t("title2")}
            </h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/70">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <KeyButton href="/configurateur?base=audit">{t("order")}</KeyButton>
              <a
                href="https://wa.me/2290151295927?text=Bonjour%20Komanda%20%F0%9F%91%8B%20Je%20veux%20un%20audit."
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3.5 text-[15px] font-bold text-white hover:bg-white/10"
              >
                {t("sendUrl")}
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black p-7 font-mono text-[13px]">
            <div className="mb-5 flex items-center gap-2 text-[11px] uppercase tracking-[.18em] text-white/40">
              <span className="h-2 w-2 rounded-full bg-komanda-yellow" /> {t("scanLabel")}
            </div>
            {METRIC_KEYS.map((k) => (
              <div key={k} className="flex items-center justify-between border-b border-white/5 py-3 text-white/80">
                <span>{t(`metrics.${k}`)}</span>
                <span className="text-komanda-yellow">{METRIC_VALUES[k]}</span>
              </div>
            ))}
            <div className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-komanda-yellow/20 to-transparent" style={{ animation: "scan 3.4s ease-in-out infinite" }} />
            <div className="mt-8 font-display text-6xl font-black">
              67<span className="text-xl text-white/35">/100</span>
            </div>
            <p className="mt-2 text-[12px] text-white/45">{t("scoreNote")}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-3">
          {([0, 1, 2] as const).map((i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="font-display text-2xl font-bold">{t(`steps.${i}.t`)}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/65">{t(`steps.${i}.d`)}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
