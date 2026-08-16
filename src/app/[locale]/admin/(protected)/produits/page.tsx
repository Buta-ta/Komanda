// ============================================================
// À créer : src/app/[locale]/admin/(protected)/produits/page.tsx
// Liste des produits lus depuis Supabase, suppression via MODAL.
// ============================================================
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { deleteProduct, listProducts } from "../actions/catalog";
import DeleteProductModal from "@/components/admin/DeleteProductModal";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  type: string;
  name: string;
  nameEn?: string | null;
  emoji?: string | null;
  price: number;
  status: string;
  order: number;
};

const TYPE_LABELS: Record<string, string> = {
  BASE: "Base",
  SUPPLEMENT: "Supplément",
  PACK: "Pack",
  AGENT: "Agent IA",
  APP: "Application",
  TEMPLATE: "Template",
  AUDIT: "Audit",
  STUDIO: "Studio",
};

export default async function AdminProduits({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await requireAdmin(locale);
  const products = (await listProducts(locale)) as Row[];

  const del = deleteProduct.bind(null, locale);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-black">Produits</h1>
          <p className="mt-1 text-sm text-komanda-charcoal/60">
            Bases, suppléments, packs et templates.
          </p>
        </div>
        <Link
          href={`/${locale}/admin/produits/nouveau`}
          className="inline-flex items-center gap-2 rounded-full bg-komanda-charcoal px-5 py-2.5 text-sm font-bold text-komanda-yellow transition hover:bg-black"
        >
          <Plus size={16} /> Nouveau produit
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-komanda-charcoal/10 bg-white">
        {products.length === 0 ? (
          <p className="p-10 text-center text-sm text-komanda-charcoal/60">
            Aucun produit pour l&apos;instant.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-komanda-charcoal/5 text-[11px] font-bold uppercase tracking-wider text-komanda-charcoal/50">
                  <th className="px-5 py-3">Produit</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Prix</th>
                  <th className="px-5 py-3">Statut</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-komanda-charcoal/5 last:border-0 hover:bg-komanda-cream/40">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-komanda-cream text-lg">
                          {p.emoji || "📦"}
                        </span>
                        <div>
                          <div className="font-bold text-komanda-charcoal">{p.name}</div>
                          {p.nameEn && (
                            <div className="text-[11px] text-komanda-charcoal/45">{p.nameEn}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-komanda-cream px-2.5 py-1 text-[11px] font-bold text-komanda-charcoal/70">
                        {TYPE_LABELS[p.type] ?? p.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-bold text-komanda-charcoal">
                      {p.price.toLocaleString("fr-FR")} CFA
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                          p.status === "ACTIVE"
                            ? "bg-komanda-green/15 text-komanda-green-2"
                            : p.status === "DRAFT"
                              ? "bg-amber-500/15 text-amber-600"
                              : "bg-komanda-charcoal/10 text-komanda-charcoal/50"
                        }`}
                      >
                        {p.status.toLowerCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/${locale}/admin/produits/${p.id}/modifier`}
                          className="rounded-lg border border-komanda-charcoal/10 p-2 text-komanda-charcoal/60 transition hover:bg-komanda-cream"
                          aria-label="Modifier"
                        >
                          <Pencil size={15} />
                        </Link>
                        <DeleteProductModal
                          productId={p.id}
                          productName={p.name}
                          deleteAction={del}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
