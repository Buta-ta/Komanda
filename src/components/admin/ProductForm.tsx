// ============================================================
// À créer : src/components/admin/ProductForm.tsx  (client)
// Formulaire produit bilingue. Soumet à saveProduct via <form action>.
// ============================================================
"use client";

import { useState } from "react";
import { useTransition } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { UploadField } from "@/components/UploadField";

export type ProductFormData = {
  id?: string;
  type: string;
  name: string;
  nameEn?: string | null;
  slug?: string;
  tagline?: string | null;
  taglineEn?: string | null;
  description?: string | null;
  descriptionEn?: string | null;
  price: number;
  priceType: string;
  emoji?: string | null;
  category?: string | null;
  coverUrl?: string | null;
  features?: string[];
  featuresEn?: string[];
  status: string;
  order: number;
  revisionsIncluded?: number;
  extraRevisionPrice?: number;
  templateKind?: string | null;
  templateUrl?: string | null;
  templateFileUrl?: string | null;
  priceBuild?: number | null;
  priceCode?: number | null;
};

const TYPES = [
  { id: "BASE", label: "Base" },
  { id: "SUPPLEMENT", label: "Supplément" },
  { id: "PACK", label: "Pack" },
  { id: "AGENT", label: "Agent IA" },
  { id: "APP", label: "Application" },
  { id: "TEMPLATE", label: "Template" },
  { id: "AUDIT", label: "Audit" },
  { id: "STUDIO", label: "Studio" },
];

const PRICE_TYPES = [
  { id: "ONCE", label: "Une fois" },
  { id: "MONTHLY", label: "Mensuel" },
  { id: "YEARLY", label: "Annuel" },
];

const TEMPLATE_KINDS = [
  { id: "HTML", label: "HTML/CSS/JS" },
  { id: "NEXTJS", label: "Next.js" },
  { id: "SCREENSHOT", label: "Capture" },
  { id: "FIGMA", label: "Figma" },
];

const inputCls =
  "w-full rounded-xl border border-komanda-charcoal/12 bg-komanda-paper px-4 py-2.5 text-[14px] text-komanda-charcoal outline-none transition focus:border-komanda-gold focus:ring-4 focus:ring-komanda-yellow/30";

export default function ProductForm({
  saveAction,
  backHref,
  initial,
  categories = [],
  tags = [],
  selectedCategoryIds = [],
  selectedTagIds = [],
}: {
  saveAction: (formData: FormData) => Promise<void>;
  backHref: string;
  initial?: ProductFormData;
  categories?: { id: string; nameFr: string; nameEn?: string | null; emoji?: string | null }[];
  tags?: { id: string; nameFr: string; nameEn?: string | null; emoji?: string | null }[];
  selectedCategoryIds?: string[];
  selectedTagIds?: string[];
}) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSaved(false);
    startTransition(async () => {
      await saveAction(new FormData(form));
      setSaved(true);
    });
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <a
          href={backHref}
          className="inline-flex items-center gap-2 rounded-full border border-komanda-charcoal/15 px-4 py-2 text-sm font-bold text-komanda-charcoal hover:bg-komanda-cream"
        >
          <ArrowLeft size={15} /> Retour
        </a>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-full bg-komanda-charcoal px-6 py-2.5 text-sm font-bold text-komanda-yellow transition hover:bg-black disabled:opacity-50"
        >
          <Check size={16} /> {isPending ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>

      {saved && (
        <div className="rounded-xl bg-komanda-green/10 p-3 text-sm font-semibold text-komanda-green-2">
          ✅ Produit enregistré.
        </div>
      )}

      {/* Identité */}
      <Fieldset title="Identité">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom (FR) *">
            <input name="name" defaultValue={initial?.name} required className={inputCls} />
          </Field>
          <Field label="Nom (EN)">
            <input name="nameEn" defaultValue={initial?.nameEn ?? ""} className={inputCls} />
          </Field>
          <Field label="Slug (laisser vide = auto)">
            <input name="slug" defaultValue={initial?.slug ?? ""} className={inputCls} />
          </Field>
          <Field label="Emoji">
            <input name="emoji" defaultValue={initial?.emoji ?? ""} className={inputCls} />
          </Field>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Tagline (FR)">
            <input name="tagline" defaultValue={initial?.tagline ?? ""} className={inputCls} />
          </Field>
          <Field label="Tagline (EN)">
            <input name="taglineEn" defaultValue={initial?.taglineEn ?? ""} className={inputCls} />
          </Field>
        </div>
        <div className="mt-4">
          <UploadUrlField
            name="coverUrl"
            label="Image de couverture"
            defaultValue={initial?.coverUrl}
            context="showroom"
            accept="image/*"
          />
        </div>
      </Fieldset>

      {/* Type / prix */}
      <Fieldset title="Type & prix">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Type *">
            <select name="type" defaultValue={initial?.type ?? "BASE"} className={inputCls}>
              {TYPES.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Prix (CFA) *">
            <input
              name="price"
              type="number"
              defaultValue={initial?.price ?? 0}
              className={inputCls}
            />
          </Field>
          <Field label="Fréquence">
            <select
              name="priceType"
              defaultValue={initial?.priceType ?? "ONCE"}
              className={inputCls}
            >
              {PRICE_TYPES.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Field label="Révisions incluses">
            <input
              name="revisionsIncluded"
              type="number"
              defaultValue={initial?.revisionsIncluded ?? 1}
              className={inputCls}
            />
          </Field>
          <Field label="Prix révision suppl.">
            <input
              name="extraRevisionPrice"
              type="number"
              defaultValue={initial?.extraRevisionPrice ?? 5000}
              className={inputCls}
            />
          </Field>
          <Field label="Ordre">
            <input name="order" type="number" defaultValue={initial?.order ?? 0} className={inputCls} />
          </Field>
        </div>
      </Fieldset>

      {/* Description & features */}
      <Fieldset title="Contenu">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Description (FR)">
            <textarea
              name="description"
              defaultValue={initial?.description ?? ""}
              rows={3}
              className={inputCls}
            />
          </Field>
          <Field label="Description (EN)">
            <textarea
              name="descriptionEn"
              defaultValue={initial?.descriptionEn ?? ""}
              rows={3}
              className={inputCls}
            />
          </Field>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Features (FR) — une par ligne">
            <textarea
              name="features"
              defaultValue={(initial?.features ?? []).join("\n")}
              rows={4}
              className={inputCls}
            />
          </Field>
          <Field label="Features (EN) — une par ligne">
            <textarea
              name="featuresEn"
              defaultValue={(initial?.featuresEn ?? []).join("\n")}
              rows={4}
              className={inputCls}
            />
          </Field>
        </div>
      </Fieldset>

      {/* Catégories & Tags */}
      <Fieldset title="Catégories & tags">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <span className="mb-2 block text-[13px] font-semibold text-komanda-charcoal/75">Catégories</span>
            {categories.length === 0 ? (
              <p className="text-xs text-komanda-charcoal/50">Aucune catégorie. Crée-en dans l&apos;onglet Catégories.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <label
                    key={c.id}
                    className="flex cursor-pointer items-center gap-1.5 rounded-full border border-komanda-charcoal/12 px-3 py-1.5 text-[13px] font-semibold text-komanda-charcoal/75 transition has-[:checked]:border-komanda-gold has-[:checked]:bg-komanda-yellow/30"
                  >
                    <input
                      type="checkbox"
                      name="categoryIds"
                      value={c.id}
                      defaultChecked={selectedCategoryIds.includes(c.id)}
                      className="accent-komanda-charcoal"
                    />
                    {c.emoji} {c.nameFr}
                  </label>
                ))}
              </div>
            )}
          </div>
          <div>
            <span className="mb-2 block text-[13px] font-semibold text-komanda-charcoal/75">Tags</span>
            {tags.length === 0 ? (
              <p className="text-xs text-komanda-charcoal/50">Aucun tag. Crée-en dans l&apos;onglet Tags.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <label
                    key={t.id}
                    className="flex cursor-pointer items-center gap-1.5 rounded-full border border-komanda-charcoal/12 px-3 py-1.5 text-[13px] font-semibold text-komanda-charcoal/75 transition has-[:checked]:border-komanda-gold has-[:checked]:bg-komanda-yellow/30"
                  >
                    <input
                      type="checkbox"
                      name="tagIds"
                      value={t.id}
                      defaultChecked={selectedTagIds.includes(t.id)}
                      className="accent-komanda-charcoal"
                    />
                    {t.emoji} {t.nameFr}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </Fieldset>

      {/* Template (si type TEMPLATE) */}
      <Fieldset title="Template">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Type de template">
            <select
              name="templateKind"
              defaultValue={initial?.templateKind ?? ""}
              className={inputCls}
            >
              <option value="">Aucun</option>
              {TEMPLATE_KINDS.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </Field>
          <Field label="URL template (démo / Figma)">
            <input name="templateUrl" defaultValue={initial?.templateUrl ?? ""} className={inputCls} />
          </Field>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Field label="Prix « Komanda construit »">
            <input
              name="priceBuild"
              type="number"
              defaultValue={initial?.priceBuild ?? ""}
              className={inputCls}
            />
          </Field>
          <Field label="Prix « template + code »">
            <input
              name="priceCode"
              type="number"
              defaultValue={initial?.priceCode ?? ""}
              className={inputCls}
            />
          </Field>
        </div>
        <div className="mt-4">
          <UploadUrlField
            name="templateFileUrl"
            label="Fichier template (ZIP Cloudinary)"
            defaultValue={initial?.templateFileUrl}
            context="templates"
            accept=".zip,application/zip"
          />
        </div>
      </Fieldset>

      {/* Statut */}
      <Fieldset title="Publication">
        <div className="flex gap-4">
          {[
            { id: "ACTIVE", label: "Active" },
            { id: "DRAFT", label: "Brouillon" },
            { id: "ARCHIVED", label: "Archivée" },
          ].map((s) => (
            <label key={s.id} className="flex items-center gap-2 text-sm font-semibold text-komanda-charcoal/75">
              <input
                type="radio"
                name="status"
                value={s.id}
                defaultChecked={(initial?.status ?? "ACTIVE") === s.id}
                className="accent-komanda-charcoal"
              />
              {s.label}
            </label>
          ))}
        </div>
      </Fieldset>

      <input type="hidden" name="id" value={initial?.id ?? ""} />
    </form>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-komanda-charcoal/10 bg-white p-6">
      <legend className="px-2 text-sm font-bold uppercase tracking-wider text-komanda-gold">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-komanda-charcoal/75">{label}</span>
      {children}
    </label>
  );
}

/** Champ fichier Cloudinary + input caché pour stocker l'URL. */
function UploadUrlField({
  name,
  label,
  defaultValue,
  context,
  accept,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  context: "templates" | "showroom" | "onboarding" | "studio" | "messages";
  accept?: string;
}) {
  const [url, setUrl] = useState<string>(defaultValue ?? "");
  return (
    <Field label={label}>
      <UploadField
        context={context}
        accept={accept}
        onChange={(f) => setUrl(f?.url ?? "")}
      />
      <input type="hidden" name={name} value={url} />
      {url && (
        <p className="mt-2 truncate text-[11px] text-komanda-charcoal/45">{url}</p>
      )}
    </Field>
  );
}
