"use client";

import { useState } from "react";
import Link from "next/link";
<<<<<<< HEAD
import { useTranslations } from "next-intl";
import { Search, PackageCheck, Paintbrush, Eye, Rocket, CheckCircle2 } from "lucide-react";

const STEPS: { id: string; status: string; icon: typeof PackageCheck }[] = [
  { id: "recu", status: "PAID", icon: PackageCheck },
  { id: "prod", status: "IN_PRODUCTION", icon: Paintbrush },
  { id: "review", status: "IN_REVIEW", icon: Eye },
  { id: "livre", status: "DELIVERED", icon: Rocket },
];

export default function SuiviPage() {
  const t = useTranslations("tracking");
=======
import { Search, PackageCheck, Paintbrush, Eye, Rocket, CheckCircle2 } from "lucide-react";

const STEPS = [
  { id: "recu", label: "Commande reçue", icon: PackageCheck, desc: "Paiement confirmé, on a bien ta commande." },
  { id: "prod", label: "En production", icon: Paintbrush, desc: "Notre équipe assemble ton site avec l'IA." },
  { id: "review", label: "En révision", icon: Eye, desc: "Le brouillon est prêt, tu peux demander des ajustements." },
  { id: "livre", label: "Livré", icon: Rocket, desc: "Ton site est en ligne. Félicitations !" },
];

export default function SuiviPage() {
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
  const [code, setCode] = useState("");
  const [step, setStep] = useState(0);
  const [searched, setSearched] = useState(false);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    // Démo : selon le code, on simule un statut. À brancher sur la BDD.
    if (!code) return;
    const hash = Array.from(code).reduce((a, c) => a + c.charCodeAt(0), 0);
    setStep(hash % 4);
  };

  return (
    <main className="min-h-screen bg-komanda-cream pt-16">
      <div className="mx-auto max-w-3xl px-5 py-16">
<<<<<<< HEAD
        <h1 className="text-center font-display text-4xl font-black text-komanda-charcoal">{t("title")}</h1>
        <p className="mx-auto mt-3 max-w-md text-center text-[15px] text-komanda-charcoal/65">
          {t("subtitle")}
=======
        <h1 className="text-center font-display text-4xl font-black text-komanda-charcoal">Suis ta commande</h1>
        <p className="mx-auto mt-3 max-w-md text-center text-[15px] text-komanda-charcoal/65">
          Entre le code à 6 caractères reçu par WhatsApp et email après ton paiement.
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
        </p>

        <form onSubmit={search} className="mx-auto mt-8 flex max-w-md gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
<<<<<<< HEAD
            placeholder={t("placeholder")}
=======
            placeholder="Ex. KMD-7X2P"
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
            maxLength={10}
            className="w-full rounded-2xl border border-komanda-charcoal/10 bg-white px-5 py-3.5 text-center font-display text-lg font-bold uppercase tracking-widest outline-none focus:border-komanda-gold focus:ring-4 focus:ring-komanda-yellow/30"
          />
          <button className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-2xl bg-komanda-charcoal text-white transition hover:bg-black">
            <Search size={18} />
          </button>
        </form>

        {searched && code && (
          <div className="mt-12 rounded-3xl border border-komanda-charcoal/10 bg-white p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
<<<<<<< HEAD
                <div className="text-xs font-bold uppercase tracking-wider text-komanda-gold">{t("order", { code })}</div>
                <div className="mt-1 font-display text-2xl font-extrabold text-komanda-charcoal">{t(`statuses.${STEPS[step].status}`)}</div>
                <p className="mt-1 text-[14px] text-komanda-charcoal/65">{t(`descriptions.${STEPS[step].status}`)}</p>
=======
                <div className="text-xs font-bold uppercase tracking-wider text-komanda-gold">Commande {code}</div>
                <div className="mt-1 font-display text-2xl font-extrabold text-komanda-charcoal">{STEPS[step].label}</div>
                <p className="mt-1 text-[14px] text-komanda-charcoal/65">{STEPS[step].desc}</p>
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
              </div>
              {step === 3 ? <CheckCircle2 size={44} className="text-komanda-green" /> : (() => { const Icon = STEPS[step].icon; return <Icon size={40} className="text-komanda-gold" />; })()}
            </div>

            <div className="mt-8 flex items-center">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex flex-1 items-center last:flex-none">
                  <div className={`grid h-10 w-10 place-items-center rounded-full ${i <= step ? "bg-komanda-yellow text-komanda-charcoal" : "bg-komanda-charcoal/10 text-komanda-charcoal/40"}`}>
                    <s.icon size={16} />
                  </div>
                  {i < STEPS.length - 1 && <div className={`h-1 flex-1 rounded ${i < step ? "bg-komanda-yellow" : "bg-komanda-charcoal/10"}`} />}
                </div>
              ))}
            </div>

            {step === 3 && (
              <div className="mt-8 rounded-2xl bg-komanda-green/10 p-4 text-[14px] font-semibold text-komanda-green-2">
<<<<<<< HEAD
                🎉 {t("delivered")}
=======
                🎉 Ton site est en ligne ! Les accès t'ont été envoyés par email.
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
              </div>
            )}
          </div>
        )}

        <p className="mt-10 text-center text-[13px] text-komanda-charcoal/50">
<<<<<<< HEAD
          {t("demoNote")}
=======
          Démo MVP : essaie n'importe quel code, le statut est simulé. La version finale reliera ta vraie commande.
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
        </p>
      </div>
    </main>
  );
}
