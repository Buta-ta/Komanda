import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Komanda",
  description: "Komanda — sites, apps et agents IA livrés en 72h.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}