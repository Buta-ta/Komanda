import { KeyButton } from "@/components/KeyButton";
import { formatPrice } from "@/lib/catalog";
<<<<<<< HEAD
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

=======
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Audit site & app" };

export default function AuditPage() {
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
  return (
    <main className="min-h-screen bg-[#0c0b09] pt-24 text-white">
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-komanda-yellow to-transparent opacity-70" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[.2em] text-komanda-yellow">
<<<<<<< HEAD
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
=======
              Audit · {formatPrice(12000)} · 72h
            </p>
            <h1 className="mt-5 text-[clamp(40px,6vw,76px)] font-black leading-[0.94]">
              On ouvre le capot de ton site — ou de ton app.
            </h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/70">
              Pas un PDF de 80 pages. Un scan utile : ce qui bloque tes clients, ce qui te coûte en pubs, ce qu&apos;il faut réparer en premier.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <KeyButton href="/configurateur?base=audit">Commander l&apos;audit</KeyButton>
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
              <a
                href="https://wa.me/2290151295927?text=Bonjour%20Komanda%20%F0%9F%91%8B%20Je%20veux%20un%20audit."
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3.5 text-[15px] font-bold text-white hover:bg-white/10"
              >
<<<<<<< HEAD
                {t("sendUrl")}
=======
                Envoyer mon URL
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black p-7 font-mono text-[13px]">
            <div className="mb-5 flex items-center gap-2 text-[11px] uppercase tracking-[.18em] text-white/40">
<<<<<<< HEAD
              <span className="h-2 w-2 rounded-full bg-komanda-yellow" /> {t("scanLabel")}
            </div>
            {METRIC_KEYS.map((k) => (
              <div key={k} className="flex items-center justify-between border-b border-white/5 py-3 text-white/80">
                <span>{t(`metrics.${k}`)}</span>
                <span className="text-komanda-yellow">{METRIC_VALUES[k]}</span>
=======
              <span className="h-2 w-2 rounded-full bg-komanda-yellow" /> komanda scan
            </div>
            {[
              ["Performance mobile", "61"],
              ["Parcours d'achat", "54"],
              ["SEO local", "73"],
              ["Sécurité / HTTPS", "80"],
              ["Accessibilité", "48"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between border-b border-white/5 py-3 text-white/80">
                <span>{k}</span>
                <span className="text-komanda-yellow">{v}</span>
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
              </div>
            ))}
            <div className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-komanda-yellow/20 to-transparent" style={{ animation: "scan 3.4s ease-in-out infinite" }} />
            <div className="mt-8 font-display text-6xl font-black">
              67<span className="text-xl text-white/35">/100</span>
            </div>
<<<<<<< HEAD
            <p className="mt-2 text-[12px] text-white/45">{t("scoreNote")}</p>
=======
            <p className="mt-2 text-[12px] text-white/45">Exemple de score — le tien sera le tien.</p>
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-3">
<<<<<<< HEAD
          {([0, 1, 2] as const).map((i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="font-display text-2xl font-bold">{t(`steps.${i}.t`)}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/65">{t(`steps.${i}.d`)}</p>
=======
          {[
            { t: "On clique comme un client", d: "Mobile d'abord. On mesure le temps, les frictions, les pages qui perdent l'argent." },
            { t: "On priorise", d: "Pas 200 reco. 8 actions classées : impact × effort. Tu sais par où commencer lundi." },
            { t: "On peut réparer", d: "L'audit se transforme en commande Vitrine, 3D ou App. Un bouton, la suite." },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="font-display text-2xl font-bold">{x.t}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/65">{x.d}</p>
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
