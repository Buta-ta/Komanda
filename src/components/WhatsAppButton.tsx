"use client";

import { usePathname } from "@/i18n/navigation";

export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  const WHATSAPP = "2290151295927";
  const msg = encodeURIComponent(
    "Bonjour Komanda 👋 Je veux commander un site, une app, un agent IA ou un audit."
  );
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter Komanda sur WhatsApp"
      data-cursor="hover"
      className="fixed bottom-5 right-5 z-[90] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-8px_rgba(37,211,102,.65)] transition hover:scale-105 hover:bg-[#1ebe5b]"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.1A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5ZM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-3.9.7.7-3.8-.2-.3A9 9 0 1 1 12 21Zm5-6.7c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3c0-.1 0-.3-.1-.4s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3a13.5 13.5 0 0 0 5.2 4.5c1.9.8 2.3.7 2.7.6s1.3-.5 1.5-1 .2-.9.1-1-.3-.2-.6-.3Z" />
      </svg>
    </a>
  );
}
