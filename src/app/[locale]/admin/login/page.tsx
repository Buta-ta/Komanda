import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/Logo";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = { title: "Admin — Komanda" };

export default async function AdminLoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { locale } = await params;
  const { error } = await searchParams;
  const t = await getTranslations({ locale, namespace: "adminLogin" });

  const errorMessage =
    error === "forbidden"
      ? "Ce compte n'a pas les droits administrateur."
      : error === "auth"
        ? "La connexion a échoué. Réessaie."
        : error === "rate_limited"
          ? "Trop de tentatives. Patiente une minute."
          : null;

  return (
    <main className="grid min-h-screen place-items-center bg-komanda-charcoal px-5">
      <div className="w-full max-w-sm">
        <Link
          href={`/${locale}`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white"
        >
          <ArrowLeft size={14} /> {t("back")}
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-komanda-yellow text-komanda-charcoal">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold text-white">
                {t("title")}
              </h1>
              <p className="text-xs font-semibold uppercase tracking-wider text-komanda-yellow">
                Komanda · Team
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm text-white/60">{t("subtitle")}</p>

          {errorMessage && (
            <div className="mt-5 rounded-xl bg-red-500/10 p-3 text-center text-sm font-semibold text-red-300">
              {errorMessage}
            </div>
          )}

          <a
            href={`/${locale}/auth/admin-login`}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-komanda-yellow px-6 py-3.5 text-sm font-bold text-komanda-charcoal transition hover:bg-yellow-300"
          >
            <GoogleIcon />
            {t("continueWithGoogle")}
          </a>

          <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-3 text-[11px] leading-relaxed text-white/50">
            🔒 {t("securityNote")}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Komanda — Moyi Tech
        </p>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}