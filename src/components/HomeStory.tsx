"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { BASES, formatPrice } from "@/lib/catalog";
import { Showroom } from "./Showroom";
import { KeyButton } from "./KeyButton";
import { Check, ArrowRight } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 28 },
<<<<<<< HEAD
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] } },
=======
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
};

export function HomeStory() {
  return (
    <>
      <div className="overflow-hidden border-y border-komanda-charcoal/10 bg-komanda-charcoal py-4 text-komanda-yellow">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-[18px] font-extrabold uppercase tracking-[.18em]">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-10">
              {["Sites", "Apps", "Agents IA", "Audits", "72 heures", "Mobile Money", "Afrique"].map((w) => (
                <span key={w + k} className="flex items-center gap-10">
                  {w}
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-komanda-yellow" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section className="bg-komanda-cream py-28">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fade}>
            <p className="text-[12px] font-extrabold uppercase tracking-[.18em] text-komanda-gold">Comment ça marche</p>
            <h2 className="mt-4 max-w-4xl text-[clamp(40px,7vw,88px)] font-black text-komanda-charcoal">
              Commande ton site, <span className="text-komanda-gold">comme un plat.</span>
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-0 md:grid-cols-3">
            {[
              { n: "01", t: "Configure", d: "Choisis ta base, ajoute tes suppléments. Le preview et le prix bougent en direct." },
              { n: "02", t: "Paie", d: "Orange, MTN, Moov, Wave, carte. Fedapay confirme, on lance la production." },
              { n: "03", t: "Reçois", d: "Brouillon, ajustements, mise en ligne. 72h pour un site. 14 jours pour une app." },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fade}
                transition={{ delay: i * 0.08 }}
                className="relative border-t border-komanda-charcoal/10 py-8 md:border-l md:border-t-0 md:px-8 md:first:border-l-0 md:first:pl-0"
              >
                <div className="font-display text-[64px] font-black leading-none text-komanda-yellow">{s.n}</div>
                <h3 className="mt-4 font-display text-3xl font-bold text-komanda-charcoal">{s.t}</h3>
                <p className="mt-3 max-w-xs text-[15px] font-medium leading-relaxed text-komanda-charcoal/65">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="offres" className="relative overflow-hidden bg-komanda-paper py-28">
        <div className="pointer-events-none absolute -right-24 top-0 h-[380px] w-[380px] rounded-full bg-komanda-yellow opacity-50 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5">
          <p className="text-[12px] font-extrabold uppercase tracking-[.18em] text-komanda-gold">Les offres</p>
          <h2 className="mt-4 max-w-3xl text-[clamp(36px,6vw,72px)] font-black text-komanda-charcoal">
            Quatre produits. <span className="text-komanda-gold">Un bouton.</span>
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {BASES.map((b) => (
              <Link
                key={b.id}
                href={`/configurateur?base=${b.id}`}
                data-cursor="hover"
                className={`group relative overflow-hidden rounded-[28px] border p-8 transition duration-500 hover:-translate-y-1.5 ${
                  b.popular
                    ? "border-komanda-yellow bg-komanda-charcoal text-white shadow-[0_40px_80px_-30px_rgba(20,15,8,.55)]"
                    : "border-komanda-charcoal/8 bg-white text-komanda-charcoal"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`text-[11px] font-extrabold uppercase tracking-[.16em] ${b.popular ? "text-komanda-yellow" : "text-komanda-charcoal/45"}`}>
                    {b.delay} · {b.kind}
                  </div>
                  {b.popular && (
                    <span className="rounded-full bg-komanda-yellow px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-komanda-charcoal">
                      Populaire
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-[36px] font-extrabold">{b.name}</h3>
                <p className={`mt-2 text-[15px] ${b.popular ? "text-white/70" : "text-komanda-charcoal/60"}`}>{b.tagline}</p>
                <div className="mt-6 flex items-end gap-1.5 font-display font-black">
                  <span className="bg-gradient-to-b from-komanda-yellow to-komanda-gold bg-clip-text text-[48px] leading-none text-transparent">
                    {b.price.toLocaleString("fr-FR")}
                  </span>
                  <span className={`mb-1 text-sm font-bold ${b.popular ? "text-white/60" : "text-komanda-charcoal/50"}`}>CFA</span>
                </div>
                <ul className="mt-6 space-y-2">
                  {b.features.slice(0, 4).map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-[14px] ${b.popular ? "text-white/80" : "text-komanda-charcoal/75"}`}>
                      <span className="mt-0.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-komanda-yellow text-komanda-charcoal">
                        <Check size={11} strokeWidth={3.5} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className={`mt-8 inline-flex items-center gap-2 text-[14px] font-bold ${b.popular ? "text-komanda-yellow" : "text-komanda-charcoal"}`}>
                  Composer <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Showroom />

      <section id="agent" className="relative overflow-hidden bg-komanda-charcoal py-28 text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(800px 500px at 80% 20%, rgba(34,197,94,.22), transparent 60%), radial-gradient(700px 500px at 10% 90%, rgba(255,192,31,.16), transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-komanda-green/30 bg-komanda-green/15 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[.08em] text-green-300">
              Agent IA WhatsApp · 5 000 CFA/mois
            </span>
            <h2 className="mt-5 text-[clamp(36px,5vw,64px)] font-black leading-[0.98]">
              Pendant que tu dors,
              <br />
              <em className="bg-gradient-to-b from-komanda-green to-green-300 bg-clip-text not-italic text-transparent">ton agent vend.</em>
            </h2>
            <p className="mt-5 max-w-lg text-[17px] font-medium leading-relaxed text-white/75">
              Un commercial branché sur WhatsApp. Il accueille, répond, prend les commandes et les rendez-vous. 24h/24. En français.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <KeyButton href="/configurateur?extra=agent-whatsapp">Activer l&apos;agent</KeyButton>
              <Link
                href="/agent"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-6 py-3.5 text-[15px] font-bold text-white backdrop-blur hover:bg-white/15"
              >
                Voir la démo
              </Link>
            </div>
          </div>

          <div className="relative flex h-[560px] items-center justify-center [perspective:1400px]">
            <Chip className="left-0 top-8 bg-komanda-yellow text-komanda-charcoal">✓ Commande #128</Chip>
            <Chip className="right-0 top-24 bg-white text-komanda-charcoal">📅 RDV demain 14h</Chip>
            <Chip className="bottom-24 left-0 bg-white text-komanda-charcoal">💰 +25 000 CFA</Chip>
            <div className="relative h-[540px] w-[270px] rounded-[46px] bg-gradient-to-br from-[#2a2520] to-[#0a0805] p-3.5 shadow-[0_60px_100px_-30px_rgba(0,0,0,.8)] [animation:float_6s_ease-in-out_infinite] [transform:rotateY(-16deg)_rotateX(8deg)_rotateZ(-3deg)]">
              <div className="absolute left-1/2 top-[18px] z-10 h-6 w-[90px] -translate-x-1/2 rounded-[14px] bg-black" />
              <div
                className="relative h-full w-full overflow-hidden rounded-[34px] p-3.5 pt-[46px]"
                style={{ background: "radial-gradient(circle at 30% 0%, rgba(34,197,94,.3), transparent 50%), linear-gradient(180deg,#0e4a27,#062010)" }}
              >
                <div className="mb-3.5 flex items-center gap-2.5 rounded-[14px] bg-white/[.06] p-2.5">
                  <div className="grid h-[38px] w-[38px] place-items-center rounded-full bg-komanda-yellow font-display text-[15px] font-extrabold text-komanda-charcoal">K</div>
                  <div>
                    <div className="text-[14px] font-bold">Komanda · Restaurant</div>
                    <div className="text-[11px] font-semibold text-green-300">en ligne — 2 sec</div>
                  </div>
                </div>
                <Bubble bot>Bonsoir 👋 Bienvenue chez Délices d&apos;Abomey ! Vous commandez ?</Bubble>
                <Bubble>Bonsoir, un mafé pour 2 personnes svp</Bubble>
                <Bubble bot>Parfait 🍲 Livraison vers quelle heure ?</Bubble>
                <Bubble>Vers 20h, à Fidjrossè</Bubble>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0c0b09] py-28 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-komanda-yellow to-transparent opacity-60" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[.18em] text-komanda-yellow">Audit</p>
            <h2 className="mt-4 text-[clamp(36px,5vw,64px)] font-black">
              On ouvre le capot.
              <br />
              <span className="text-komanda-yellow">Sans jargon.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/70">
              UX, performance, SEO, sécurité, parcours mobile. Un score, des priorités, un plan de 30 jours. Livré en 72h.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <KeyButton href="/audit">Voir l&apos;audit</KeyButton>
              <Link href="/configurateur?base=audit" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[15px] font-bold text-white hover:bg-white/10">
                Commander · {formatPrice(12000)}
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black p-6 font-mono text-[13px] text-komanda-yellow/90">
            <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[.16em] text-white/40">
              <span className="h-2 w-2 rounded-full bg-komanda-coral" /> scan · komanda
            </div>
            {["perf ………… 61", "ux mobile … 54", "seo ………… 73", "sécu ………… 80"].map((l) => (
              <div key={l} className="border-b border-white/5 py-2.5">
                {l}
              </div>
            ))}
            <div className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-komanda-yellow/25 to-transparent" style={{ animation: "scan 3.6s ease-in-out infinite" }} />
            <div className="mt-6 font-display text-5xl font-black text-white">
              67<span className="text-lg text-white/40">/100</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-komanda-cream py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="relative overflow-hidden rounded-[36px] bg-komanda-yellow px-8 py-16 text-center md:px-16">
            <div className="mx-auto mb-6 grid h-20 w-20 place-items-center">
              <div className="key-press">
                <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
                  <rect width="80" height="80" rx="22" fill="#15110C" />
                  <path fill="#FFD23F" d="M26 18h12v20h12v-10L68 45.5 50 64V54H26V18Z" />
                </svg>
              </div>
            </div>
            <h2 className="mx-auto max-w-3xl text-[clamp(32px,5.4vw,64px)] font-black text-komanda-charcoal">
              Prêt à appuyer sur Entrée&nbsp;?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] font-semibold text-komanda-charcoal/75">
              Configure ta commande. Paie en Mobile Money. On livre.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <KeyButton href="/configurateur" dark>
                Configurer ma commande
              </KeyButton>
              <Link
                href="/devis"
                className="inline-flex items-center gap-2 rounded-full border border-komanda-charcoal/20 bg-komanda-charcoal/10 px-7 py-3.5 text-[15px] font-bold text-komanda-charcoal hover:bg-komanda-charcoal/15"
              >
                Parler à un conseiller
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`absolute rounded-2xl px-3.5 py-2.5 text-[12px] font-bold shadow-[0_20px_40px_rgba(0,0,0,.3)] [animation:float2_5s_ease-in-out_infinite] ${className}`}>
      {children}
    </div>
  );
}

function Bubble({ children, bot }: { children: React.ReactNode; bot?: boolean }) {
  return (
    <div
      className={`mb-2.5 max-w-[78%] animate-[pop_.6s_cubic-bezier(.2,.8,.2,1)_both] rounded-2xl p-2.5 text-[13px] font-medium leading-snug ${
        bot ? "rounded-bl-md bg-white/10 text-white" : "ml-auto rounded-br-md bg-komanda-green text-[#062810]"
      }`}
    >
      {children}
    </div>
  );
}
