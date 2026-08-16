import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductEditPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale } = await requireAdmin();
  const supabase = await createClient();
  const { id } = await params;
  const isNew = id === "nouveau";

  let product: any = null;
  if (!isNew) {
    const { data } = await supabase.from("Product").select("*").eq("id", id).maybeSingle();
    product = data;
    if (!product) notFound();
  }

  return (
    <div>
      <Link href={`/${locale}/admin/produits`} className="text-sm font-bold text-komanda-charcoal/60 hover:text-komanda-charcoal">
        ← Retour
      </Link>
      <h1 className="mt-2 font-display text-3xl font-black">
        {isNew ? "Nouveau produit" : `Modifier : ${product?.nameFr || product?.slug}`}
      </h1>
      <p className="mt-4 rounded-2xl border border-dashed border-komanda-charcoal/20 bg-white p-6 text-sm text-komanda-charcoal/70">
        Le formulaire complet (champs bilingues, image, catégories, tags, groupes) arrive dans l'étape suivante.
      </p>
    </div>
  );
}