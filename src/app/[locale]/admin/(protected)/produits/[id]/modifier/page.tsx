// ============================================================
// À créer : src/app/[locale]/admin/(protected)/produits/[id]/modifier/page.tsx
// Édition d'un produit : formulaire pré-rempli + catégories/tags cochés.
// ============================================================
import { requireAdmin } from "@/lib/admin";
import {
  saveProduct,
  getProductWithRelations,
  listCategories,
  listTags,
} from "../../../actions/catalog";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function ModifierProduit({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  await requireAdmin(locale);

  const { product, categoryIds, tagIds } = await getProductWithRelations(locale, id);
  if (!product) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center text-sm font-semibold text-red-600">
        Produit introuvable (id : {id}).
      </div>
    );
  }

  const save = saveProduct.bind(null, locale);
  const categories = await listCategories(locale);
  const tags = await listTags(locale);

  return (
    <div className="max-w-3xl">
      <ProductForm
        saveAction={save}
        backHref={`/${locale}/admin/produits`}
        initial={product}
        categories={categories}
        tags={tags}
        selectedCategoryIds={categoryIds}
        selectedTagIds={tagIds}
      />
    </div>
  );
}
