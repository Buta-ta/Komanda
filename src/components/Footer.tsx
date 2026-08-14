"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");
  const tn = useTranslations("nav");

  return (
    <footer className="bg-komanda-charcoal py-16 text-white/70">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" className="text-white">
              <Logo invert size={32} />
            </Link>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed">{t("tagline")}</p>
          </div>
          <Col
            title={t("columns.products")}
            links={[
              [t("links.vitrine"), "/configurateur?base=vitrine"],
              [t("links.motion"), "/configurateur?base=vitrine-3d"],
              [t("links.agent"), "/agent"],
              [t("links.supplements"), "/offres"],
            ]}
          />
          <Col
            title={t("columns.company")}
            links={[
              [t("links.tracking"), "/suivi"],
              [tn("offers"), "/offres"],
              [t("links.contact"), "/devis"],
            ]}
          />
          <Col
            title={t("columns.countries")}
            links={[
              [t("links.benin"), "/offres"],
              [t("links.civ"), "/offres"],
              [t("links.senegal"), "/offres"],
              [t("links.cameroon"), "/offres"],
            ]}
          />
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[13px]">
          <div>{tc("byMoyiTech")}</div>
          <div>{tc("paymentSecure")}</div>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h5 className="mb-3 font-display text-[15px] font-bold text-white">{title}</h5>
      <ul className="space-y-2 text-[14px]">
        {links.map(([l, h]) => (
          <li key={l + h}>
            <Link href={h} className="transition hover:text-komanda-yellow">
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
