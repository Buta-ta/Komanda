"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";

export function LocaleSwitcher({ currentLocale }: { currentLocale: "fr" | "en" }) {
  const t = useTranslations("common");
  const locale = useLocale() as "fr" | "en";
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: "fr" | "en") => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className="fixed bottom-5 left-5 z-[90] flex items-center gap-1 rounded-full border border-komanda-charcoal/10 bg-white/90 p-1 shadow-lg backdrop-blur">
      <Globe size={14} className="ml-1.5 text-komanda-charcoal/60" />
      <button
        onClick={() => switchTo("fr")}
        disabled={isPending}
        className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
          locale === "fr"
            ? "bg-komanda-charcoal text-komanda-yellow"
            : "text-komanda-charcoal/70 hover:text-komanda-charcoal"
        }`}
        aria-label="Français"
      >
        FR
      </button>
      <button
        onClick={() => switchTo("en")}
        disabled={isPending}
        className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
          locale === "en"
            ? "bg-komanda-charcoal text-komanda-yellow"
            : "text-komanda-charcoal/70 hover:text-komanda-charcoal"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
