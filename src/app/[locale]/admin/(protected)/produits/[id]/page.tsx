import { saveProduct } from "../../actions/catalog";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function ProductForm({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  await requireAdmin(locale);

  const isNew = id === "nouveau";
  const product = isNew
    ? null
    : await prisma.product.findUnique({ where: { id } });

  if (!isNew && !product) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        Produit introuvable.{" "}
        <Link className="font-bold underline" href={`/${locale}/admin/produits`}>
          Retour
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href={`/${locale}/admin/produits`}
        className="text-sm font-bold text-komanda-charcoal/60 hover:text-komanda-charcoal"
      >
        ← Retour
      </Link>
      <h1 className="mt-2 font-display text-3xl font-black">
        {isNew ? "Nouveau produit" : `Modifier : ${product!.name}`}
      </h1>

      <form
        action={saveProduct.bind(null, locale)}
        className="mt-6 space-y-5 rounded-3xl border border-komanda-charcoal/10 bg-white p-6"
      >
        {product && <input type="hidden" name="id" value={product.id} />}

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Nom *">
            <input required name="name" defaultValue={product?.name || ""} className={inputCls} />
          </Field>
          <Field label="Slug (URL)">
            <input name="slug" defaultValue={product?.slug || ""} className={inputCls} placeholder="auto si vide" />
          </Field>
        </div>

        <Field label="Accroche">
          <input name="tagline" defaultValue={product?.tagline || ""} className={inputCls} />
        </Field>

        <Field label="Description">
          <textarea name="description" rows={3} defaultValue={product?.description || ""} className={inputCls} />
        </Field>

        <div className="grid gap-5 md:grid-cols-3">
          <Field label="Type">
            <select name="type" defaultValue={product?.type || "BASE"} className={inputCls}>
              <option value="BASE">Base (site)</option>
              <option value="SUPPLEMENT">Supplément</option>
              <option value="PACK">Pack</option>
              <option value="AGENT">Agent IA</option>
              <option value="APP">Application</option>
              <option value="TEMPLATE">Template</option>
              <option value="AUDIT">Audit</option>
              <option value="STUDIO">Studio créatif</option>
            </select>
          </Field>
          <Field label="Prix (CFA)">
            <input type="number" name="price" defaultValue={product?.price ?? 0} className={inputCls} />
          </Field>
          <Field label="Type de prix">
            <select name="priceType" defaultValue={product?.priceType || "ONCE"} className={inputCls}>
              <option value="ONCE">Une fois</option>
              <option value="MONTHLY">Mensuel</option>
              <option value="YEARLY">Annuel</option>
            </select>
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Field label="Emoji">
            <input name="emoji" defaultValue={product?.emoji || ""} className={inputCls} />
          </Field>
          <Field label="Catégorie">
            <input name="category" defaultValue={product?.category || ""} className={inputCls} />
          </Field>
          <Field label="Révisions incluses">
            <input type="number" name="revisionsIncluded" defaultValue={product?.revisionsIncluded ?? 1} className={inputCls} />
          </Field>
          <Field label="Prix révision sup.">
            <input type="number" name="extraRevisionPrice" defaultValue={product?.extraRevisionPrice ?? 5000} className={inputCls} />
          </Field>
        </div>

        <Field label="Caractéristiques (une par ligne)">
          <textarea
            name="features"
            rows={4}
            defaultValue={(product?.features || []).join("\n")}
            className={inputCls}
          />
        </Field>

        <details className="rounded-2xl border border-komanda-charcoal/10 p-4">
          <summary className="cursor-pointer text-sm font-bold">Options template / avancées</summary>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <Field label="Genre de template">
              <select name="templateKind" defaultValue={product?.templateKind || ""} className={inputCls}>
                <option value="">— Aucun —</option>
                <option value="HTML">HTML/CSS/JS</option>
                <option value="NEXTJS">Next.js</option>
                <option value="SCREENSHOT">Capture d'écran</option>
                <option value="FIGMA">Figma</option>
              </select>
            </Field>
            <Field label="URL démo / iframe / Figma">
              <input name="templateUrl" defaultValue={product?.templateUrl || ""} className={inputCls} />
            </Field>
            <Field label="Prix « réalisé par nous »">
              <input type="number" name="priceBuild" defaultValue={product?.priceBuild ?? ""} className={inputCls} />
            </Field>
            <Field label="Prix « template + code »">
              <input type="number" name="priceCode" defaultValue={product?.priceCode ?? ""} className={inputCls} />
            </Field>
            <Field label="Statut">
              <select name="status" defaultValue={product?.status || "ACTIVE"} className={inputCls}>
                <option value="DRAFT">Brouillon</option>
                <option value="ACTIVE">Actif</option>
                <option value="ARCHIVED">Archivé</option>
              </select>
            </Field>
            <Field label="Ordre d'affichage">
              <input type="number" name="order" defaultValue={product?.order ?? 0} className={inputCls} />
            </Field>
          </div>
        </details>

        <div className="flex justify-end gap-3 pt-2">
          <Link
            href={`/${locale}/admin/produits`}
            className="rounded-full border border-komanda-charcoal/15 px-6 py-3 text-sm font-bold hover:bg-komanda-cream"
          >
            Annuler
          </Link>
          <button className="rounded-full bg-komanda-charcoal px-6 py-3 text-sm font-bold text-komanda-yellow">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-komanda-charcoal/60">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-komanda-charcoal/12 bg-komanda-paper px-4 py-2.5 text-sm outline-none focus:border-komanda-gold";