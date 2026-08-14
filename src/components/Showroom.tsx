"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { CATEGORY_LABELS, type ProjectCategory } from "@/lib/projects";
import { useCatalog } from "@/lib/useCatalog";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

const FILTERS: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "vitrine", label: "Vitrines" },
  { id: "3d", label: "3D Motion" },
  { id: "app", label: "Apps" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "agent", label: "Agents" },
  { id: "audit", label: "Audits" },
];

export function Showroom() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const { projects: all } = useCatalog();
  const featured = all.filter((p) => p.featured !== false);
  const projects = useMemo(
    () => (filter === "all" ? featured : featured.filter((p) => p.category === filter)),
    [filter, featured]
  );

  return (
    <section id="showroom" className="bg-komanda-paper py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-[12px] font-extrabold uppercase tracking-[.18em] text-komanda-gold">Showroom</span>
            <h2 className="mt-4 text-[clamp(32px,5vw,64px)] font-black leading-[1.02] text-komanda-charcoal">
              Ce qu&apos;on a <em className="not-italic text-komanda-gold">déjà livré.</em>
            </h2>
            <p className="mt-3 text-[16px] font-medium leading-relaxed text-komanda-charcoal/65">
              Des sites, des apps, des boutiques et des agents qui travaillent déjà.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-4 py-2 text-[13px] font-bold transition ${
                  filter === f.id
                    ? "bg-komanda-charcoal text-komanda-yellow"
                    : "border border-komanda-charcoal/15 bg-white text-komanda-charcoal/70 hover:border-komanda-gold"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.id}
              className="group relative overflow-hidden rounded-3xl border border-komanda-charcoal/5 bg-white shadow-[0_20px_40px_-25px_rgba(20,15,8,.35)] transition duration-500 hover:-translate-y-1.5"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-komanda-charcoal">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10" />
                <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white backdrop-blur">
                  {CATEGORY_LABELS[p.category as ProjectCategory] ?? p.category}
                </span>
                <span className="absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-komanda-charcoal">
                  {p.year}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-wider text-komanda-charcoal/50">
                  <span>{p.sector}</span>
                  <span>{p.country}</span>
                </div>
                <h3 className="mt-2 font-display text-[22px] font-extrabold leading-tight text-komanda-charcoal">{p.title}</h3>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-komanda-charcoal/70">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-komanda-cream px-2.5 py-1 text-[11px] font-semibold text-komanda-charcoal/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-dashed border-komanda-charcoal/15 bg-komanda-cream/60 p-8 text-center">
          <p className="text-[15px] font-medium text-komanda-charcoal/70">Ton projet pourrait être le prochain dans ce showroom.</p>
          <Link
            href="/configurateur"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-komanda-charcoal px-6 py-3 text-[14px] font-bold text-komanda-yellow transition hover:bg-black"
          >
            Démarrer le mien <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
