"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Check, ArrowRight } from "lucide-react";
import { formatPrice, pick } from "@/lib/catalog";
import { useCatalog } from "@/lib/useCatalog";
import { KeyButton } from "./KeyButton";

export function OffersPage() {
  const t = useTranslations("offersPage");
  const tc = useTranslations("catalog");
  const locale = useLocale();
  const { store } = useCatalog();
  const bases = store?.bases ?? [];
  const supplements = store?.supplements ?? [];
  const packs = store?.packs ?? [];

  const nameOf = (id: string, fallback: string) => {
    try {
      return tc(`bases.${id}.name`);
    } catch {
      return fallback;
    }
  };
  const tagOf = (id: string, fallback: string) => {
    try {
      return tc(`bases.${id}.tagline`);
    } catch {
      return fallback;
    }
  };

  return (
    <div className="min-h-screen bg-komanda-cream pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-[12px] font-extrabold uppercase tracking-[.18em] text-komanda-gold">{t("eyebrow")}</p>
        <h1 className="mt-3 font-display text-[clamp(40px,7vw,88px)] font-black text-komanda-charcoal">{t("title")}</h1>
        <p className="mt-4 max-w-xl text-[16px] font-medium text-komanda-charcoal/65">{t("subtitle")}</p>

        <h2 className="mt-16 font-display text-2xl font-bold text-komanda-charcoal">{t("bases")}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {bases.map((b) => {
            const features = pick(locale, b.features, b.featuresEn);
            return (
              <Link
                key={b.id}
                href={`/configurateur?base=${b.id}`}
                className={`group relative overflow-hidden rounded-[28px] border p-8 transition hover:-translate-y-1 ${
                  b.popular ? "border-komanda-yellow bg-komanda-charcoal text-white" : "border-komanda-charcoal/8 bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`text-[11px] font-extrabold uppercase tracking-[.16em] ${b.popular ? "text-komanda-yellow" : "text-komanda-charcoal/45"}`}>
                    {pick(locale, b.delay, b.delayEn)} · {b.kind}
                  </div>
                  {b.popular && (
                    <span className="rounded-full bg-komanda-yellow px-3 py-1 text-[10px] font-extrabold uppercase text-komanda-charcoal">
                      {t("popular")}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-[36px] font-extrabold">{nameOf(b.id, b.name)}</h3>
                <p className={`mt-2 text-[15px] ${b.popular ? "text-white/70" : "text-komanda-charcoal/60"}`}>{tagOf(b.id, b.tagline)}</p>
                <div className="mt-6 font-display text-[44px] font-black text-komanda-gold">{formatPrice(b.price, locale)}</div>
                <ul className="mt-6 space-y-2">
                  {features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-[14px] ${b.popular ? "text-white/80" : "text-komanda-charcoal/75"}`}>
                      <span className="mt-0.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-komanda-yellow text-komanda-charcoal">
                        <Check size={11} strokeWidth={3.5} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className={`mt-8 inline-flex items-center gap-2 text-[14px] font-bold ${b.popular ? "text-komanda-yellow" : "text-komanda-charcoal"}`}>
                  {t("compose")} <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        <h2 className="mt-20 font-display text-2xl font-bold text-komanda-charcoal">{t("packs")}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {packs.map((p) => (
            <Link
              key={p.id}
              href={`/configurateur?base=${p.baseId}`}
              className={`rounded-[24px] border p-6 ${p.highlight ? "border-komanda-gold bg-komanda-charcoal text-white" : "border-komanda-charcoal/10 bg-white"}`}
            >
              <div className="font-display text-xl font-extrabold">{pick(locale, p.name, p.nameEn)}</div>
              <p className={`mt-1 text-[13px] ${p.highlight ? "text-white/65" : "text-komanda-charcoal/60"}`}>{pick(locale, p.tagline, p.taglineEn)}</p>
              <div className="mt-4 font-display text-3xl font-black text-komanda-gold">{formatPrice(p.price, locale)}</div>
              {p.saving ? (
                <div className={`mt-1 text-[12px] font-semibold ${p.highlight ? "text-komanda-yellow" : "text-komanda-green-2"}`}>
                  {t("saving", { amount: formatPrice(p.saving, locale) })}
                </div>
              ) : null}
            </Link>
          ))}
        </div>

        <h2 className="mt-20 font-display text-2xl font-bold text-komanda-charcoal">{t("extras")}</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {supplements.map((s) => (
            <div key={s.id} className="flex items-center gap-3 rounded-2xl border border-komanda-charcoal/10 bg-white p-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-komanda-cream text-2xl">{s.emoji}</span>
              <div className="flex-1">
                <div className="font-display text-[15px] font-bold">{pick(locale, s.name, s.nameEn)}</div>
                <div className="text-[12px] text-komanda-charcoal/55">{pick(locale, s.description, s.descriptionEn)}</div>
              </div>
              <div className="font-display font-extrabold text-komanda-gold">
                {formatPrice(s.price, locale)}
                {s.priceType === "monthly" ? "/m" : s.priceType === "yearly" ? "/y" : ""}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <KeyButton href="/configurateur">{t("compose")}</KeyButton>
        </div>
      </div>
    </div>
  );
}
