"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { DEFAULT_STORE, formatPrice, type Store } from "@/lib/catalog";
import { Lock, LayoutDashboard, Package, Tags, Image as ImageIcon, Save } from "lucide-react";

const TABS = [
  { id: "dash", label: "Tableau de bord", icon: LayoutDashboard },
  { id: "bases", label: "Bases / prix", icon: Package },
  { id: "extras", label: "Suppléments", icon: Tags },
  { id: "showroom", label: "Showroom", icon: ImageIcon },
] as const;

type Tab = (typeof TABS)[number]["id"];

export default function AdminPage() {
  const [pwd, setPwd] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("dash");
  const [store, setStore] = useState<Store>(DEFAULT_STORE);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/store")
      .then((r) => r.json())
      .then((d) => {
        if (d?.bases) setStore({ ...d, settings: { ...DEFAULT_STORE.settings, ...d.settings, adminPassword: DEFAULT_STORE.settings.adminPassword } });
      })
      .catch(() => {});
  }, []);

  const save = async () => {
    setStatus("…");
    const res = await fetch("/api/store", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-password": pwd || "komanda" },
      body: JSON.stringify(store),
    });
    setStatus(res.ok ? "Enregistré. Le film, /offres et le configurateur lisent ça." : "Mot de passe refusé (défaut : komanda)");
  };

  if (!authed) {
    return (
      <main className="grid min-h-screen place-items-center bg-komanda-charcoal px-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pwd.length >= 4) setAuthed(true);
          }}
          className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8"
        >
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-komanda-yellow text-komanda-charcoal">
            <Lock size={24} />
          </div>
          <h1 className="mt-5 text-center font-display text-2xl font-extrabold text-white">Admin</h1>
          <p className="mt-2 text-center text-[13px] text-white/60">Mot de passe : komanda</p>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Mot de passe"
            className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-komanda-yellow"
          />
          <button className="mt-4 w-full rounded-full bg-komanda-yellow px-6 py-3 text-sm font-bold text-komanda-charcoal">Entrer</button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-komanda-cream pt-24">
      <header className="border-b border-komanda-charcoal/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <Logo className="text-komanda-charcoal" />
            <span className="rounded-full bg-komanda-charcoal px-2.5 py-0.5 text-[10px] font-bold uppercase text-komanda-yellow">Admin</span>
          </div>
          <button onClick={save} className="inline-flex items-center gap-2 rounded-full bg-komanda-charcoal px-5 py-2.5 text-sm font-bold text-white">
            <Save size={14} /> Enregistrer
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[220px_1fr]">
        <aside className="space-y-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-left text-sm font-semibold ${
                tab === t.id ? "bg-komanda-charcoal text-white" : "text-komanda-charcoal/70 hover:bg-white"
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </aside>

        <section>
          {status && <div className="mb-6 rounded-2xl bg-komanda-yellow px-4 py-3 text-sm font-bold">{status}</div>}

          {tab === "dash" && (
            <>
              <h1 className="font-display text-3xl font-black">Caisse, pas caméra.</h1>
              <p className="mt-2 max-w-xl text-komanda-charcoal/65">
                Tu changes les prix, la visibilité, les sites du showroom. Le film 3D, `/offres` et le configurateur lisent le même fichier : `data/store.json`.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <Kpi label="Bases" value={String(store.bases.length)} />
                <Kpi label="Prix mini" value={formatPrice(Math.min(...store.bases.map((b) => b.price)))} />
                <Kpi label="Projets" value={String(store.projects.filter((p) => p.featured).length)} />
              </div>
            </>
          )}

          {tab === "bases" && (
            <>
              <h1 className="font-display text-3xl font-black">Bases</h1>
              <div className="mt-6 space-y-3">
                {store.bases.map((b, i) => (
                  <div key={b.id} className="rounded-2xl border border-komanda-charcoal/10 bg-white p-5">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex-1 font-display text-lg font-bold">{b.name}</div>
                      <label className="text-[12px] font-bold">
                        Prix CFA
                        <input
                          type="number"
                          value={b.price}
                          onChange={(e) => {
                            const next = structuredClone(store);
                            next.bases[i].price = Number(e.target.value);
                            setStore(next);
                          }}
                          className={inputCls}
                        />
                      </label>
                      <label className="text-[12px] font-bold">
                        Délai
                        <input
                          value={b.delay}
                          onChange={(e) => {
                            const next = structuredClone(store);
                            next.bases[i].delay = e.target.value;
                            setStore(next);
                          }}
                          className={inputCls}
                        />
                      </label>
                      <label className="flex items-center gap-2 text-[12px] font-bold">
                        <input
                          type="checkbox"
                          checked={b.popular || false}
                          onChange={(e) => {
                            const next = structuredClone(store);
                            next.bases[i].popular = e.target.checked;
                            setStore(next);
                          }}
                        />
                        Populaire
                      </label>
                      <label className="flex items-center gap-2 text-[12px] font-bold">
                        <input
                          type="checkbox"
                          checked={b.visible !== false}
                          onChange={(e) => {
                            const next = structuredClone(store);
                            next.bases[i].visible = e.target.checked;
                            setStore(next);
                          }}
                        />
                        Visible
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "extras" && (
            <>
              <h1 className="font-display text-3xl font-black">Suppléments</h1>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {store.supplements.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-3 rounded-2xl border border-komanda-charcoal/10 bg-white p-4">
                    <span className="text-2xl">{s.emoji}</span>
                    <div className="flex-1 text-[14px] font-bold">{s.name}</div>
                    <input
                      type="number"
                      value={s.price}
                      onChange={(e) => {
                        const next = structuredClone(store);
                        next.supplements[i].price = Number(e.target.value);
                        setStore(next);
                      }}
                      className="w-28 rounded-xl border border-komanda-charcoal/10 px-3 py-2 text-sm font-bold"
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "showroom" && (
            <>
              <h1 className="font-display text-3xl font-black">Showroom</h1>
              <p className="mt-2 text-sm text-komanda-charcoal/60">Décoche pour retirer un site du film et de la page showroom.</p>
              <div className="mt-6 space-y-3">
                {store.projects.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-komanda-charcoal/10 bg-white p-4">
                    <input
                      type="checkbox"
                      checked={p.featured !== false}
                      onChange={(e) => {
                        const next = structuredClone(store);
                        next.projects[i].featured = e.target.checked;
                        setStore(next);
                      }}
                    />
                    <div className="flex-1">
                      <div className="font-display font-bold">{p.title}</div>
                      <div className="text-[12px] text-komanda-charcoal/55">
                        {p.country} · {p.category}
                      </div>
                    </div>
                    <input
                      value={p.cover}
                      onChange={(e) => {
                        const next = structuredClone(store);
                        next.projects[i].cover = e.target.value;
                        setStore(next);
                      }}
                      className="w-56 rounded-xl border border-komanda-charcoal/10 px-3 py-2 text-[12px]"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-komanda-charcoal/10 bg-white p-6">
      <div className="text-xs font-bold uppercase tracking-wider text-komanda-charcoal/50">{label}</div>
      <div className="mt-2 font-display text-3xl font-black">{value}</div>
    </div>
  );
}

const inputCls = "mt-1 block w-32 rounded-xl border border-komanda-charcoal/12 bg-komanda-paper px-3 py-2 text-sm font-bold";
