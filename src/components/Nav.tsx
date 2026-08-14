"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { Menu, X, User } from "lucide-react";

export function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as "fr" | "en";
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(pathname !== "/");
  const home = pathname === "/";
  const darkPage = pathname.startsWith("/agent") || pathname.startsWith("/audit");

  const links = [
    { href: "/offres", label: t("offers") },
    { href: "/showroom", label: t("showroom") },
    { href: "/agent", label: t("agent") },
    { href: "/audit", label: t("audit") },
    { href: "/suivi", label: t("tracking") },
  ];

  useEffect(() => {
    setOpen(false);
    if (!home) {
      setSolid(true);
      return;
    }
    const onScroll = () =>
      setSolid(window.scrollY + window.innerHeight > document.body.scrollHeight - 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [home, pathname]);

  const invertMark = home && !solid;
  const lightText = (home && !solid) || (darkPage && !solid);
  const onDarkBar = darkPage && solid;

  const switchLocale = (l: "fr" | "en") => {
    router.replace(pathname, { locale: l });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${
        solid
          ? onDarkBar
            ? "border-b border-white/10 bg-[#15110C]/90 backdrop-blur-xl"
            : "border-b border-komanda-charcoal/5 bg-komanda-cream/88 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
        <Link
          href="/"
          className={lightText || onDarkBar ? "text-white" : "text-komanda-charcoal"}
          data-cursor="hover"
        >
          <Logo invert={invertMark || onDarkBar} size={34} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-2 text-[13px] font-bold transition ${
                lightText || onDarkBar
                  ? "text-white/85 hover:bg-white/10 hover:text-white"
                  : "text-komanda-charcoal/70 hover:bg-komanda-charcoal/5 hover:text-komanda-charcoal"
              } ${pathname === l.href ? "bg-black/10" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className={`hidden items-center rounded-full p-0.5 text-[11px] font-extrabold sm:flex ${
              lightText || onDarkBar ? "bg-white/10 text-white" : "bg-komanda-charcoal/5 text-komanda-charcoal"
            }`}
          >
            {(["fr", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => switchLocale(l)}
                className={`rounded-full px-2 py-1 uppercase ${
                  locale === l
                    ? lightText || onDarkBar
                      ? "bg-komanda-yellow text-komanda-charcoal"
                      : "bg-komanda-charcoal text-komanda-yellow"
                    : "opacity-60"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <Link
            href="/login"
            className={`hidden items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-bold sm:inline-flex ${
              lightText || onDarkBar ? "text-white/85 hover:bg-white/10" : "text-komanda-charcoal/70 hover:bg-black/5"
            }`}
          >
            <User size={14} /> {t("login")}
          </Link>
          <Link
            href="/configurateur"
            className="inline-flex items-center gap-1.5 rounded-full bg-komanda-yellow px-3.5 py-2 text-[13px] font-extrabold text-komanda-charcoal shadow-md transition hover:-translate-y-0.5"
            data-cursor="hover"
          >
            {t("order")}
          </Link>
          <button
            className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${
              lightText || onDarkBar ? "text-white" : "text-komanda-charcoal"
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-komanda-charcoal/10 bg-komanda-cream px-5 py-5 lg:hidden">
          <div className="mb-3 flex gap-2">
            {(["fr", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => switchLocale(l)}
                className={`rounded-full px-3 py-1.5 text-[12px] font-extrabold uppercase ${
                  locale === l ? "bg-komanda-charcoal text-komanda-yellow" : "bg-white text-komanda-charcoal/60"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-3 text-[16px] font-bold text-komanda-charcoal hover:bg-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-3 py-3 text-[16px] font-bold text-komanda-charcoal/70"
            >
              {t("login")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
