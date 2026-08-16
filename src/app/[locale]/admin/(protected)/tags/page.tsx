// ============================================================
// À créer : src/app/[locale]/admin/(protected)/tags/page.tsx
// Liste + création des tags (CRUD via Supabase).
// ============================================================
import { requireAdmin } from "@/lib/admin";
import { listTags, saveTag, deleteTag } from "../actions/catalog";
import CrudModal from "@/components/admin/CrudModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export const dynamic = "force-dynamic";

type Tag = {
  id: string;
  nameFr: string;
  nameEn?: string | null;
  emoji?: string | null;
  color?: string | null;
  ProductTag?: unknown[] | null;
};

export default async function AdminTags({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await requireAdmin(locale);
  const tags = (await listTags(locale)) as Tag[];

  const save = saveTag.bind(null, locale);
  const del = deleteTag.bind(null, locale);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-black">Tags</h1>
          <p className="mt-1 text-sm text-komanda-charcoal/60">
            Étiquettes avec emoji, pour filtrer / mettre en avant.
          </p>
        </div>
        <CrudModal
          title="Nouveau tag"
          triggerLabel="Nouveau tag"
          fields={[
            { name: "nameFr", label: "Nom (FR) *", required: true },
            { name: "nameEn", label: "Nom (EN)" },
            { name: "emoji", label: "Emoji" },
            { name: "color", label: "Couleur", type: "color" },
            { name: "order", label: "Ordre", type: "number" },
          ]}
          submitAction={save}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {tags.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 rounded-full border border-komanda-charcoal/10 bg-white py-2 pl-4 pr-2"
          >
            <span className="text-lg">{t.emoji || "🏷️"}</span>
            <span className="text-sm font-bold text-komanda-charcoal">{t.nameFr}</span>
            <span className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: t.color || "#15110C" }}>
              {t.nameEn || t.nameFr}
            </span>
            <span className="text-[11px] text-komanda-charcoal/40">
              {t.ProductTag?.length ?? 0}
            </span>
            <DeleteConfirmModal id={t.id} name={t.nameFr} deleteAction={del} iconClass="rounded-lg p-1.5 text-red-500 transition hover:bg-red-50" />
          </div>
        ))}
        {tags.length === 0 && (
          <p className="w-full rounded-2xl border border-dashed border-komanda-charcoal/15 p-10 text-center text-sm text-komanda-charcoal/60">
            Aucun tag.
          </p>
        )}
      </div>
    </div>
  );
}
