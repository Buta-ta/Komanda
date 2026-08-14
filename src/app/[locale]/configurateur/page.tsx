"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  formatPrice, getBase, getPack,
  type BaseId,
} from "@/lib/catalog";
import { useCatalog } from "@/lib/useCatalog";
import { ConfigPreview } from "@/components/ConfigPreview";
import {
  ArrowLeft, ArrowRight, Check, ShoppingCart, Sparkles,
  MessageCircle, CreditCard, Clock, ShieldCheck,
} from "lucide-react";

const CATEGORIES: { id: string; label: string }[] = [
  { id: "contenu", label: "Contenu & identité" },
  { id: "technique", label: "Technique & hébergement" },
  { id: "fonctionnalites", label: "Fonctionnalités" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "ia", label: "Intelligence artificielle" },
  { id: "visibilite", label: "Visibilité & croissance" },
];

export default function ConfigurateurPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-komanda-cream pt-24" />}>
      <ConfigurateurInner />
    </Suspense>
  );
}

function ConfigurateurInner() {
  const params = useSearchParams();
  const { store, bases: BASES, supplements: SUPPLEMENTS, packs: PACKS } = useCatalog();
  const [baseId, setBaseId] = useState<BaseId>("vitrine");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [packId, setPackId] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", pays: "Bénin", notes: "" });

  useEffect(() => {
    const b = params.get("base");
    if (b && getBase(b, store)) setBaseId(b as BaseId);
    const extra = params.get("extra");
    if (extra && SUPPLEMENTS.some((s) => s.id === extra)) {
      setSelected(new Set([extra]));
    }
  }, [params, store, SUPPLEMENTS]);

  const base = getBase(baseId, store)!;

  const toggleSupplement = (id: string) => {
    setPackId(null);
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const applyPack = (id: string) => {
    const pack = getPack(id, store);
    if (!pack) return;
    setPackId(id);
    setBaseId(pack.baseId);
    setSelected(new Set(pack.supplementIds));
  };

  const totals = useMemo(() => {
    let once = base.price;
    let monthly = 0;
    let yearly = 0;
    selected.forEach((id) => {
      const s = SUPPLEMENTS.find((x) => x.id === id);
      if (!s) return;
      if (s.priceType === "once") once += s.price;
      if (s.priceType === "monthly") monthly += s.price;
      if (s.priceType === "yearly") yearly += s.price;
    });
    if (packId) {
      const p = getPack(packId)!;
      once = p.priceType === "once" ? p.price : once;
      monthly = p.priceType === "monthly" ? p.price : monthly;
    }
    return { once, monthly, yearly, total: once + monthly * 12 + yearly };
  }, [base, selected, packId, store]);

  const goNext = () => {
    if (step === 2) {
      if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
        setError("Nom, email et WhatsApp sont requis.");
        return;
      }
      setError("");
    }
    setStep((s) => Math.min(3, s + 1) as 1 | 2 | 3);
  };

  return (
    <div className="min-h-screen bg-komanda-cream pt-24">
      <div className="sticky top-[60px] z-30 border-b border-komanda-charcoal/5 bg-komanda-cream/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 text-sm font-semibold text-komanda-charcoal/50">
          <span className={step >= 1 ? "text-komanda-charcoal" : ""}>1. Configuration</span>
          <span>›</span>
          <span className={step >= 2 ? "text-komanda-charcoal" : ""}>2. Coordonnées</span>
          <span>›</span>
          <span className={step >= 3 ? "text-komanda-charcoal" : ""}>3. Paiement</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1fr_380px]">
        <main>
          {step === 1 && (
            <>
              <h1 className="text-[clamp(32px,4.5vw,52px)] font-black text-komanda-charcoal">
                Compose ta <span className="text-komanda-gold">commande.</span>
              </h1>
              <p className="mt-3 max-w-xl text-[15px] text-komanda-charcoal/65">
                Choisis une base, ajoute tes suppléments. Le preview à droite suit tes choix.
              </p>

              <section className="mt-10">
                <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-komanda-gold">
                  <Sparkles size={16} /> Packs recommandés
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {PACKS.map((p) => {
                    const active = packId === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => applyPack(p.id)}
                        className={`relative rounded-3xl border p-5 text-left transition ${
                          active
                            ? "border-komanda-gold bg-komanda-charcoal text-white shadow-2xl"
                            : "border-komanda-charcoal/10 bg-white hover:-translate-y-0.5 hover:shadow-xl"
                        }`}
                      >
                        {p.highlight && (
                          <span className="absolute -top-2.5 right-4 rounded-full bg-komanda-yellow px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-komanda-charcoal">
                            Populaire
                          </span>
                        )}
                        <div className="font-display text-xl font-extrabold">{p.name}</div>
                        <div className={`mt-1 text-xs ${active ? "text-white/70" : "text-komanda-charcoal/60"}`}>{p.tagline}</div>
                        <div className="mt-4 font-display text-3xl font-black">
                          {formatPrice(p.price)}
                          {p.priceType === "monthly" && <span className="text-sm font-bold">/mois</span>}
                        </div>
                        {p.saving && (
                          <div className={`mt-1 text-xs font-semibold ${active ? "text-komanda-yellow" : "text-komanda-green-2"}`}>
                            Tu économises {formatPrice(p.saving)}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="mt-12">
                <div className="mb-4 text-sm font-bold uppercase tracking-wider text-komanda-gold">1. Choisis ta base</div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {BASES.map((b) => {
                    const active = baseId === b.id;
                    return (
                      <button
                        key={b.id}
                        onClick={() => { setBaseId(b.id); setPackId(null); }}
                        className={`relative overflow-hidden rounded-3xl border p-6 text-left transition ${
                          active
                            ? "border-komanda-gold bg-gradient-to-br from-komanda-yellow to-komanda-gold text-komanda-charcoal shadow-2xl"
                            : "border-komanda-charcoal/10 bg-white hover:-translate-y-0.5 hover:shadow-xl"
                        }`}
                      >
                        {b.popular && (
                          <span className="absolute right-4 top-4 rounded-full bg-komanda-charcoal px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-komanda-yellow">
                            Populaire
                          </span>
                        )}
                        <div className="text-[11px] font-bold uppercase tracking-wider opacity-60">{b.delay}</div>
                        <div className="mt-1 font-display text-2xl font-extrabold">{b.name}</div>
                        <div className="mt-1 text-sm opacity-75">{b.tagline}</div>
                        <div className="mt-5 font-display text-4xl font-black">{formatPrice(b.price)}</div>
                        <ul className="mt-4 space-y-1.5">
                          {b.features.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-[13px] font-medium opacity-85">
                              <Check size={15} className="mt-0.5 shrink-0" /> {f}
                            </li>
                          ))}
                        </ul>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="mt-12">
                <div className="mb-4 text-sm font-bold uppercase tracking-wider text-komanda-gold">2. Ajoute tes suppléments</div>
                {CATEGORIES.map((cat) => {
                  const items = SUPPLEMENTS.filter((s) => s.category === cat.id);
                  if (!items.length) return null;
                  return (
                    <div key={cat.id} className="mb-8">
                      <h3 className="mb-3 font-display text-lg font-bold text-komanda-charcoal">{cat.label}</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {items.map((s) => {
                          const on = selected.has(s.id);
                          return (
                            <button
                              key={s.id}
                              onClick={() => toggleSupplement(s.id)}
                              className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition ${
                                on
                                  ? "border-komanda-gold bg-yellow-50 shadow-md"
                                  : "border-komanda-charcoal/10 bg-white hover:border-komanda-gold/40"
                              }`}
                            >
                              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-white to-komanda-cream-2 text-2xl shadow-inner">
                                {s.emoji}
                              </span>
                              <span className="flex-1">
                                <span className="flex items-center justify-between gap-2">
                                  <span className="font-display text-[15px] font-bold text-komanda-charcoal">{s.name}</span>
                                  <span className="whitespace-nowrap font-display text-[15px] font-extrabold text-komanda-gold">
                                    {formatPrice(s.price)}
                                    {s.priceType === "monthly" && <span className="text-[11px] font-bold">/mois</span>}
                                    {s.priceType === "yearly" && <span className="text-[11px] font-bold">/an</span>}
                                  </span>
                                </span>
                                <span className="mt-0.5 block text-[12px] text-komanda-charcoal/60">{s.description}</span>
                              </span>
                              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition ${on ? "border-komanda-gold bg-komanda-gold text-white" : "border-komanda-charcoal/25"}`}>
                                {on && <Check size={13} strokeWidth={3} />}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </section>
            </>
          )}

          {step === 2 && (
            <section className="mx-auto max-w-2xl">
              <h1 className="text-[clamp(28px,4vw,44px)] font-black text-komanda-charcoal">
                Tes <span className="text-komanda-gold">coordonnées</span>
              </h1>
              <p className="mt-3 text-[15px] text-komanda-charcoal/65">On t&apos;envoie la confirmation et le suivi par WhatsApp et email.</p>
              {error && <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</div>}
              <div className="mt-8 space-y-4 rounded-3xl border border-komanda-charcoal/10 bg-white p-6 shadow-xl">
                <Field label="Nom complet *">
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Ex. Awa Diop" />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Téléphone / WhatsApp *">
                    <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="+229 01 97 00 00 00" />
                  </Field>
                  <Field label="Email *">
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="toi@entreprise.com" />
                  </Field>
                </div>
                <Field label="Pays">
                  <select value={form.pays} onChange={(e) => setForm({ ...form, pays: e.target.value })} className={inputCls}>
                    {["Bénin", "Côte d'Ivoire", "Sénégal", "Togo", "Burkina Faso", "Mali", "Niger", "Cameroun", "Congo", "Gabon", "RDC", "Guinée", "Autre"].map((p) => <option key={p}>{p}</option>)}
                  </select>
                </Field>
                <Field label="Informations sur ton projet (optionnel)">
                  <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputCls} placeholder="Parle-nous de ton activité…" />
                </Field>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="mx-auto max-w-2xl text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-komanda-green/15 text-komanda-green-2">
                <ShieldCheck size={40} />
              </div>
              <h1 className="mt-6 text-[clamp(28px,4vw,44px)] font-black text-komanda-charcoal">
                Paiement <span className="text-komanda-gold">sécurisé</span>
              </h1>
              <p className="mx-auto mt-3 max-w-lg text-[15px] text-komanda-charcoal/65">
                Tu vas être redirigé vers Fedapay. Tant que le paiement n&apos;est pas validé, rien n&apos;est débité.
              </p>
              <div className="mx-auto mt-8 max-w-md space-y-3 rounded-3xl border border-komanda-charcoal/10 bg-white p-6 text-left shadow-xl">
                <Row label="Produit" value={base.name} />
                <Row label="Suppléments" value={`${selected.size} ajouté(s)`} />
                <div className="border-t border-komanda-charcoal/10 pt-3">
                  <Row label="Total à payer" value={formatPrice(totals.once + totals.yearly)} big />
                  {totals.monthly > 0 && (
                    <div className="mt-1 text-right text-sm font-semibold text-komanda-gold">
                      + {formatPrice(totals.monthly)}/mois (abonnement)
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button onClick={() => setStep(2)} className="rounded-full border border-komanda-charcoal/15 bg-white px-6 py-3 text-sm font-bold text-komanda-charcoal hover:bg-komanda-charcoal/5">
                  ← Retour
                </button>
                <button className="inline-flex items-center gap-2 rounded-full bg-komanda-charcoal px-7 py-3.5 text-[15px] font-bold text-white shadow-xl transition hover:bg-black">
                  <CreditCard size={16} /> Payer avec Fedapay
                </button>
              </div>
              <p className="mt-4 text-xs text-komanda-charcoal/50">
                Mode démo du MVP : l&apos;intégration Fedapay sera branchée avec les clés API de production.
              </p>
            </section>
          )}

          {step !== 3 && (
            <div className="mt-10 flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1) as 1 | 2 | 3)}
                disabled={step === 1}
                className="inline-flex items-center gap-2 rounded-full border border-komanda-charcoal/15 bg-white px-5 py-3 text-sm font-bold text-komanda-charcoal disabled:opacity-40"
              >
                <ArrowLeft size={15} /> Retour
              </button>
              <button
                onClick={goNext}
                className="inline-flex items-center gap-2 rounded-full bg-komanda-charcoal px-7 py-3.5 text-[15px] font-bold text-white shadow-xl transition hover:bg-black"
              >
                {step === 1 ? "Continuer" : "Procéder au paiement"} <ArrowRight size={16} />
              </button>
            </div>
          )}
        </main>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-4">
            <ConfigPreview base={base} extras={selected} />
          </div>
          <div className="overflow-hidden rounded-3xl border border-komanda-charcoal/10 bg-komanda-charcoal text-white shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 p-5">
              <ShoppingCart size={18} className="text-komanda-yellow" />
              <span className="font-display text-lg font-extrabold">Ta commande</span>
            </div>
            <div className="max-h-[40vh] space-y-3 overflow-auto p-5 text-sm">
              <div className="flex justify-between gap-3">
                <span className="font-semibold text-white/80">Base · {base.name}</span>
                <span className="font-bold">{formatPrice(base.price)}</span>
              </div>
              {[...selected].map((id) => {
                const s = SUPPLEMENTS.find((x) => x.id === id);
                if (!s) return null;
                return (
                  <div key={id} className="flex items-center justify-between gap-3 text-white/85">
                    <button onClick={() => toggleSupplement(id)} className="flex flex-1 items-center gap-2 text-left hover:text-white">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10 text-[10px]">×</span>
                      <span>{s.emoji} {s.name}</span>
                    </button>
                    <span className="font-semibold">
                      {formatPrice(s.price)}
                      {s.priceType === "monthly" && "/mois"}
                      {s.priceType === "yearly" && "/an"}
                    </span>
                  </div>
                );
              })}
              {selected.size === 0 && (
                <p className="py-4 text-center text-xs text-white/50">Aucun supplément pour l&apos;instant.</p>
              )}
            </div>
            <div className="space-y-2 border-t border-white/10 p-5">
              <div className="flex justify-between text-sm text-white/70">
                <span>Une fois</span><span>{formatPrice(totals.once + totals.yearly)}</span>
              </div>
              {totals.monthly > 0 && (
                <div className="flex justify-between text-sm text-white/70">
                  <span>Abonnement mensuel</span><span>{formatPrice(totals.monthly)}/mois</span>
                </div>
              )}
              <div className="flex items-end justify-between border-t border-white/10 pt-3">
                <span className="font-display text-base font-extrabold">Total</span>
                <span className="font-display text-3xl font-black text-komanda-yellow">
                  {formatPrice(totals.once + totals.yearly)}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2.5 text-[11px] text-white/70">
                <Clock size={13} className="text-komanda-yellow" />
                {base.delay} après paiement et réception de ton contenu.
              </div>
              <button onClick={() => toggleSupplement("agent-whatsapp")} className="flex w-full items-center gap-2 rounded-xl bg-komanda-green/15 p-3 text-left text-[12px] font-semibold text-komanda-green hover:bg-komanda-green/25">
                <MessageCircle size={14} /> Ajoute l&apos;agent IA WhatsApp (5 000 CFA/mois)
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
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

function Row({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={big ? "font-display text-lg font-extrabold text-komanda-charcoal" : "text-sm text-komanda-charcoal/70"}>{label}</span>
      <span className={big ? "font-display text-2xl font-black text-komanda-gold" : "font-bold text-komanda-charcoal"}>{value}</span>
    </div>
  );
}
