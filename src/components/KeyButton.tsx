"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export function KeyButton({
  href,
  children,
  dark = false,
  className = "",
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const cls = `group relative inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-bold transition will-change-transform hover:-translate-y-0.5 active:translate-y-1 active:scale-[0.97] ${
    dark
      ? "bg-komanda-charcoal text-komanda-yellow shadow-[0_16px_30px_rgba(20,15,8,.28)] hover:bg-black"
      : "bg-komanda-yellow text-komanda-charcoal shadow-[0_14px_34px_rgba(255,192,31,.4)] hover:bg-yellow-300"
  } ${className}`;

  const inner = (
    <>
      <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-black/10 transition group-active:translate-y-0.5">
        <svg width="14" height="14" viewBox="0 0 80 80" aria-hidden>
          <path
            fill="currentColor"
            d="M26 18h12v20h12v-10L68 45.5 50 64V54H26V18Z"
          />
        </svg>
      </span>
      {children}
      <ArrowRight size={15} strokeWidth={2.6} />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls} data-cursor="hover">
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} data-cursor="hover">
      {inner}
    </button>
  );
}
