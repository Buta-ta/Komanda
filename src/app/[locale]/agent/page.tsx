import Link from "next/link";
<<<<<<< HEAD
import { getTranslations } from "next-intl/server";
import { ArrowRight, Check, MessageCircle, Bot, Bell, BarChart3 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "agentPage" });
  return { title: `${t("title")} — Komanda` };
}

export default async function AgentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "agentPage" });
  const ta = await getTranslations({ locale, namespace: "agent" });
  const features = ta.raw("features") as string[];

=======
import { ArrowRight, Check, MessageCircle, Bot, Bell, BarChart3 } from "lucide-react";

export const metadata = { title: "Agent IA WhatsApp — Komanda" };

export default function AgentPage() {
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
  return (
    <main className="min-h-screen bg-komanda-charcoal pt-16 text-white">
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0" style={{ background: "radial-gradient(700px 400px at 75% 10%, rgba(34,197,94,.25), transparent 60%)" }} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-komanda-green/30 bg-komanda-green/15 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wider text-green-300">
<<<<<<< HEAD
              <Bot size={13} /> {ta("price")}
            </span>
            <h1 className="mt-5 text-[clamp(36px,5vw,60px)] font-black leading-[1.05]">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/75">
              {t("subtitle")}
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
=======
              <Bot size={13} /> 5 000 CFA/mois
            </span>
            <h1 className="mt-5 text-[clamp(36px,5vw,60px)] font-black leading-[1.05]">
              Ton commercial IA<br />qui ne dort <span className="bg-gradient-to-b from-komanda-green to-green-300 bg-clip-text text-transparent">jamais.</span>
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/75">
              Komanda branche un agent IA directement sur ton WhatsApp. Il accueille, répond, prend les commandes et les rendez-vous, relance les clients, 24h/24, en français.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Réponses en français",
                "Prise de commande",
                "Prise de rendez-vous",
                "Relances automatiques",
                "Te notifie quand il faut toi",
                "Rapports de conversations",
              ].map((f) => (
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
                <li key={f} className="flex items-center gap-2.5 text-[15px] font-semibold text-white/90">
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-komanda-green/15 text-komanda-green"><Check size={14} /></span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/configurateur" className="inline-flex items-center gap-2 rounded-full bg-komanda-yellow px-7 py-3.5 text-[15px] font-bold text-komanda-charcoal shadow-[0_14px_34px_rgba(255,192,31,.45)] transition hover:-translate-y-0.5">
<<<<<<< HEAD
                {t("activate")} <ArrowRight size={15} />
              </Link>
              <Link href="/devis" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-7 py-3.5 text-[15px] font-bold text-white backdrop-blur hover:bg-white/15">
                {t("requestDemo")}
=======
                Activer pour 5 000 CFA/mois <ArrowRight size={15} />
              </Link>
              <Link href="/devis" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-7 py-3.5 text-[15px] font-bold text-white backdrop-blur hover:bg-white/15">
                Demander une démo
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-[280px] rounded-[46px] bg-gradient-to-br from-[#2a2520] to-black p-3.5 shadow-[0_60px_100px_-30px_rgba(0,0,0,.8)]">
              <div className="relative h-[540px] overflow-hidden rounded-[34px] p-3.5 pt-12"
                   style={{ background: "linear-gradient(180deg,#0e4a27,#062010)" }}>
                <div className="mb-4 flex items-center gap-2.5 rounded-2xl bg-white/[.06] p-2.5">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-komanda-yellow to-komanda-gold font-display font-extrabold text-komanda-charcoal">K</div>
                  <div>
<<<<<<< HEAD
                    <div className="text-[14px] font-bold">{t("mock.boutique")}</div>
                    <div className="text-[11px] font-semibold text-green-300">{t("mock.online")}</div>
                  </div>
                </div>
                <Msg bot>{t("mock.hello")}</Msg>
                <Msg me>{t("mock.order")}</Msg>
                <Msg bot>{t("mock.size")}</Msg>
                <Msg me>{t("mock.sizes")}</Msg>
                <Msg bot>{t("mock.delivery")}</Msg>
=======
                    <div className="text-[14px] font-bold">Komanda · Boutique</div>
                    <div className="text-[11px] font-semibold text-green-300">en ligne</div>
                  </div>
                </div>
                <Msg bot>Bonsoir 👋 Bienvenue ! Vous commandez ?</Msg>
                <Msg me>Je veux 2 chemises premium</Msg>
                <Msg bot>Parfait 👔 Taille M, L ou XL ? Couleur ?</Msg>
                <Msg me>L, blanc et bleu</Msg>
                <Msg bot>Noté ! Livraison à quel quartier ?</Msg>
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-5">
<<<<<<< HEAD
          <h2 className="text-center font-display text-4xl font-black">{t("howItWorks")}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {(["chat", "notify", "report"] as const).map((key, idx) => {
              const icons = [<MessageCircle key="a" />, <Bell key="b" />, <BarChart3 key="c" />];
              return (
                <div key={key} className="rounded-3xl border border-white/10 bg-white/5 p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-komanda-green/15 text-komanda-green">{icons[idx]}</div>
                  <h3 className="mt-5 font-display text-2xl font-bold">{t(`items.${key}.title`)}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-white/70">{t(`items.${key}.desc`)}</p>
                </div>
              );
            })}
=======
          <h2 className="text-center font-display text-4xl font-black">Comment il travaille</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { i: <MessageCircle />, t: "Il discute", d: "Sur WhatsApp, comme un vendeur naturel. Il comprend les questions, même mal écrites." },
              { i: <Bell />, t: "Il te notifie", d: "Quand une commande ou un RDV est pris, tu reçois une alerte. Tu valides d'un tap." },
              { i: <BarChart3 />, t: "Il te rend compte", d: "Chaque semaine, un rapport : conversations, ventes, questions fréquentes." },
            ].map((x) => (
              <div key={x.t} className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-komanda-green/15 text-komanda-green">{x.i}</div>
                <h3 className="mt-5 font-display text-2xl font-bold">{x.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-white/70">{x.d}</p>
              </div>
            ))}
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
          </div>
        </div>
      </section>
    </main>
  );
}

function Msg({ children, bot, me }: { children: React.ReactNode; bot?: boolean; me?: boolean }) {
  return (
    <div className={`mb-2.5 max-w-[80%] rounded-2xl p-2.5 text-[13px] ${bot ? "rounded-bl-md bg-white/10" : "ml-auto rounded-br-md bg-komanda-green text-[#062810]"}`}>
      {children}
    </div>
  );
}
