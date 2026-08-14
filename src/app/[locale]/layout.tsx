import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Grain } from "@/components/Grain";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  applicationName: "Komanda",
  title: {
    default: "Komanda — Ton site, ton app, livrés.",
    template: "%s · Komanda",
  },
  description:
    "Commande ton site web, ton application, ton agent IA ou un audit. Paiement Mobile Money, livraison en 72h. Un service de Moyi Tech.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Komanda", statusBarStyle: "black-translucent" },
  icons: { icon: "/logo-mark.svg", apple: "/logo-mark.svg" },
};

export const viewport: Viewport = {
  themeColor: "#15110C",
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "fr" | "en")) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SmoothScroll />
          <Grain />
          <Cursor />
          <Nav />
          {children}
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
