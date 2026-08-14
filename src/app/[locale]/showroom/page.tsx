import { Showroom } from "@/components/Showroom";

export const metadata = { title: "Showroom — Komanda" };

export default function ShowroomPage() {
  return (
    <main className="min-h-screen bg-komanda-paper pt-16">
      <Showroom />
    </main>
  );
}
