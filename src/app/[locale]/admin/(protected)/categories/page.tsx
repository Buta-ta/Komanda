// ============================================================
// À créer : src/app/[locale]/admin/(protected)/categories/page.tsx
// Liste + création des catégories (CRUD via Supabase).
// ============================================================
import { requireAdmin } from "@/lib/admin";
import { listCategories, saveCategory, deleteCategory } from "../actions/catalog";
import CrudModal from "@/components/admin/CrudModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export const dynamic = "force-dynamic";

type Cat = {
  id: string;
  nameFr: string;
  nameEn?: string | null;
  emoji?: string | null;
  parentId?: string | null;
  order: number;
  ProductCategory?: unknown[] | null;
};

export default async function AdminCategories({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await requireAdmin(locale);
  const cats = (await listCategories(locale)) as Cat[];

  const save = saveCategory.bind(null, locale);
  const del = deleteCategory.bind(null, locale);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-black">Catégories</h1>
          <p className="mt-1 text-sm text-komanda-charcoal/60">
            Regroupe les produits par type (vitrine, 3D, app…).
          </p>
        </div>
        <CrudModal
          title="Nouvelle catégorie"
          triggerLabel="Nouvelle catégorie"
          fields={[
            { name: "nameFr", label: "Nom (FR) *", required: true },
            { name: "nameEn", label: "Nom (EN)" },
            { name: "emoji", label: "Emoji" },
            { name: "order", label: "Ordre", type: "number" },
          ]}
          submitAction={save}
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-3 rounded-2xl border border-komanda-charcoal/10 bg-white p-4"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-komanda-cream text-xl">
              {c.emoji || "🏷️"}
            </span>
            <div className="flex-1">
              <div className="font-bold text-komanda-charcoal">{c.nameFr}</div>
              <div className="text-[11px] text-komanda-charcoal/45">
                {c.nameEn || "—"} · {c.ProductCategory?.length ?? 0} produit(s)
              </div>
            </div>
            <DeleteConfirmModal id={c.id} name={c.nameFr} deleteAction={del} />
          </div>
        ))}
        {cats.length === 0 && (
          <p className="col-span-full rounded-2xl border border-dashed border-komanda-charcoal/15 p-10 text-center text-sm text-komanda-charcoal/60">
            Aucune catégorie.
          </p>
        )}
      </div>
    </div>
  );
}
