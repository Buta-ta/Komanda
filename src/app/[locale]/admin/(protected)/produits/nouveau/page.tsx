// ============================================================
// À créer : src/app/[locale]/admin/(protected)/produits/nouveau/page.tsx
// Création d'un produit (formulaire vide) + catégories/tags dispo.
// ============================================================
import { requireAdmin } from "@/lib/admin";
import { saveProduct, listCategories, listTags } from "../../actions/catalog";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function NouveauProduit({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await requireAdmin(locale);

  const save = saveProduct.bind(null, locale);
  const categories = await listCategories(locale);
  const tags = await listTags(locale);

  return (
    <div className="max-w-3xl">
      <ProductForm
        saveAction={save}
        backHref={`/${locale}/admin/produits`}
        categories={categories}
        tags={tags}
      />
    </div>
  );
}
