// ============================================================
// À créer : src/app/[locale]/admin/(protected)/groupes/page.tsx
// Gestion des groupes de produits + composition.
// ============================================================
import { requireAdmin } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { listGroups, saveGroup, deleteGroup, toggleGroupItem, listProducts } from "../actions/catalog";
import CrudModal from "@/components/admin/CrudModal";
import GroupProducts from "@/components/admin/GroupProducts";
import { Pencil, Trash2, X } from "lucide-react";

export const dynamic = "force-dynamic";

type Group = {
  id: string;
  nameFr: string;
  nameEn?: string | null;
  emoji?: string | null;
  order: number;
  ProductGroupItem?: { productId: string }[] | null;
};

export default async function AdminGroupes({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ id?: string }>;
}) {
  const { locale } = await params;
  const { id } = await searchParams;
  await requireAdmin(locale);

  const groups = (await listGroups(locale)) as Group[];
  const active = groups.find((g) => g.id === id) ?? null;

  const products = (await listProducts(locale)) as { id: string; name: string; nameEn?: string | null; emoji?: string | null; type: string }[];
  const memberIds = new Set(
    active?.ProductGroupItem?.map((i) => i.productId) ?? []
  );

  const save = saveGroup.bind(null, locale);
  const del = deleteGroup.bind(null, locale);
  const toggle = toggleGroupItem.bind(null, locale);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-black">Groupes de produits</h1>
          <p className="mt-1 text-sm text-komanda-charcoal/60">
            Rassemble des produits pour la vitrine et l&apos;offre.
          </p>
        </div>
        <CrudModal
          title="Nouveau groupe"
          triggerLabel="Nouveau groupe"
          fields={[
            { name: "nameFr", label: "Nom (FR) *", required: true },
            { name: "nameEn", label: "Nom (EN)" },
            { name: "emoji", label: "Emoji" },
            { name: "order", label: "Ordre", type: "number" },
          ]}
          submitAction={save}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Liste des groupes */}
        <aside className="space-y-2">
          {groups.map((g) => (
            <a
              key={g.id}
              href={`/${locale}/admin/groupes?id=${g.id}`}
              className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                active?.id === g.id
                  ? "border-komanda-gold bg-komanda-charcoal text-white"
                  : "border-komanda-charcoal/10 bg-white hover:bg-komanda-cream/40"
              }`}
            >
              <span className="text-xl">{g.emoji || "🗂️"}</span>
              <span className="flex-1">
                <span className="block text-sm font-bold">{g.nameFr}</span>
                <span className="block text-[11px] opacity-60">
                  {g.nameEn || ""} · {g.ProductGroupItem?.length ?? 0} produit(s)
                </span>
              </span>
            </a>
          ))}
          {groups.length === 0 && (
            <p className="rounded-xl border border-dashed border-komanda-charcoal/15 p-6 text-center text-sm text-komanda-charcoal/60">
              Aucun groupe.
            </p>
          )}
        </aside>

        {/* Détail du groupe actif */}
        {active ? (
          <section className="rounded-2xl border border-komanda-charcoal/10 bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-bold uppercase tracking-wider text-komanda-gold">
                  {active.nameFr} {active.nameEn ? `· ${active.nameEn}` : ""}
                </div>
                <p className="mt-1 text-sm text-komanda-charcoal/60">
                  Coche/décoche les produits membres de ce groupe.
                </p>
              </div>
              <a
                href={`/${locale}/admin/groupes`}
                className="rounded-lg p-1.5 text-komanda-charcoal/40 hover:bg-komanda-cream"
                aria-label="Fermer"
              >
                <X size={18} />
              </a>
            </div>

            <div className="mt-5">
              <GroupProducts
                groupId={active.id}
                products={products}
                memberIds={memberIds}
                toggleAction={toggle}
              />
            </div>
          </section>
        ) : (
          <section className="grid place-items-center rounded-2xl border border-dashed border-komanda-charcoal/15 bg-komanda-cream/40 p-12 text-center text-sm text-komanda-charcoal/50">
            Sélectionne un groupe pour gérer sa composition.
          </section>
        )}
      </div>
    </div>
  );
}
