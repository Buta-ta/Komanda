"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function DevisPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", pays: "Bénin",
    projectType: "Site vitrine", budget: "10 000 – 50 000 CFA", message: "",
  });

  if (sent) {
    return (
      <main className="grid min-h-screen place-items-center bg-komanda-cream px-5">
        <div className="w-full max-w-lg rounded-3xl border border-komanda-charcoal/10 bg-white p-10 text-center shadow-xl">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-komanda-green/15 text-komanda-green-2">
            <CheckCircle2 size={36} />
          </div>
          <h1 className="mt-5 font-display text-3xl font-black text-komanda-charcoal">Demande envoyée !</h1>
          <p className="mt-3 text-[15px] text-komanda-charcoal/65">
            Merci {form.name || "à toi"}. Un conseiller Komanda te recontacte sous 24h par WhatsApp ou email avec une estimation.
          </p>
          <Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-full bg-komanda-charcoal px-6 py-3 text-sm font-bold text-white hover:bg-black">
            Retour à l'accueil
          </Link>
        </div>
      </main>
    );
  }

  return (
      <main className="min-h-screen bg-komanda-cream pt-16">
      <div className="mx-auto max-w-3xl px-5 py-14">
        <h1 className="text-center font-display text-4xl font-black text-komanda-charcoal">Demande de devis</h1>
        <p className="mx-auto mt-3 max-w-lg text-center text-[15px] text-komanda-charcoal/65">
          Pour les projets complexes (app sur-mesure, e-commerce complet, intégrations), décris-nous ton besoin. On te répond sous 24h.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-10 space-y-4 rounded-3xl border border-komanda-charcoal/10 bg-white p-7 shadow-xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nom complet *"><input required className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
            <Field label="Téléphone / WhatsApp *"><input required className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
          </div>
          <Field label="Email *"><input required type="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Type de projet">
              <select className={inputCls} value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })}>
                {["Site vitrine", "Site 3D motion", "E-commerce", "Application web/mobile", "Agent IA", "Audit", "Autre"].map((x) => <option key={x}>{x}</option>)}
              </select>
            </Field>
            <Field label="Budget estimé">
              <select className={inputCls} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                {["10 000 – 50 000 CFA", "50 000 – 150 000 CFA", "150 000 – 500 000 CFA", "Plus de 500 000 CFA"].map((x) => <option key={x}>{x}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Décris ton projet">
            <textarea rows={5} className={inputCls} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Objectifs, fonctionnalités, délais…" />
          </Field>
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-komanda-charcoal px-7 py-3.5 text-[15px] font-bold text-white transition hover:bg-black">
            Envoyer ma demande <ArrowRight size={15} />
          </button>
        </form>
      </div>
    </main>
  );
}

const inputCls =
  "w-full rounded-xl border border-komanda-charcoal/12 bg-komanda-paper px-4 py-3 text-[15px] text-komanda-charcoal outline-none transition focus:border-komanda-gold focus:ring-4 focus:ring-komanda-yellow/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-komanda-charcoal/75">{label}</span>
      {children}
    </label>
  );
}
