// ============================================================
// À créer : src/components/admin/CrudModal.tsx (client)
// Modal générique d'ajout/édition pour catégories & tags.
// ============================================================
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

const inputCls =
  "w-full rounded-xl border border-komanda-charcoal/12 bg-komanda-paper px-4 py-2.5 text-[14px] text-komanda-charcoal outline-none transition focus:border-komanda-gold focus:ring-4 focus:ring-komanda-yellow/30";

export type CrudField =
  | { name: string; label: string; type?: "text" | "number"; required?: boolean }
  | { name: string; label: string; type: "select"; options: { id: string; label: string }[] }
  | { name: string; label: string; type: "color" };

export default function CrudModal({
  title,
  triggerLabel,
  fields,
  submitAction,
}: {
  title: string;
  triggerLabel: string;
  fields: CrudField[];
  submitAction: (formData: FormData) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-komanda-charcoal px-5 py-2.5 text-sm font-bold text-komanda-yellow transition hover:bg-black"
      >
        <Plus size={16} /> {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              startTransition(async () => {
                await submitAction(new FormData(form));
                setOpen(false);
                router.refresh();
              });
            }}
            className="w-full max-w-md rounded-3xl border border-komanda-charcoal/10 bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-extrabold text-komanda-charcoal">{title}</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-komanda-charcoal/50 hover:bg-komanda-cream"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {fields.map((f) => (
                <label key={f.name} className="block">
                  <span className="mb-1.5 block text-[13px] font-semibold text-komanda-charcoal/75">
                    {f.label}
                  </span>
                  {f.type === "select" ? (
                    <select name={f.name} className={inputCls}>
                      <option value="">Aucun</option>
                      {f.type === "select" &&
                        f.options?.map((o) => (
                          <option key={o.id} value={o.id}>{o.label}</option>
                        ))}
                    </select>
                  ) : f.type === "color" ? (
                    <input name={f.name} type="color" defaultValue="#FFD23F" className="h-11 w-full rounded-xl border border-komanda-charcoal/12 bg-white" />
                  ) : (
                    <input
                      name={f.name}
                      type={f.type || "text"}
                      required={f.required}
                      className={inputCls}
                    />
                  )}
                </label>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-komanda-charcoal/15 px-5 py-2 text-sm font-bold text-komanda-charcoal hover:bg-komanda-cream"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="rounded-full bg-komanda-charcoal px-5 py-2 text-sm font-bold text-komanda-yellow transition hover:bg-black disabled:opacity-50"
              >
                {isPending ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
