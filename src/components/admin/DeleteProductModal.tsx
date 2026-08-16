// ============================================================
// À créer : src/components/admin/DeleteProductModal.tsx (client)
// Modal de suppression d'un produit.
// ============================================================
"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteProductModal({
  productId,
  productName,
  deleteAction,
}: {
  productId: string;
  productName: string;
  deleteAction: (id: string) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const submit = () => {
    setIsPending(true);
    deleteAction(productId).finally(() => setIsPending(false));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
        aria-label="Supprimer"
      >
        <Trash2 size={15} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-5">
          <div className="w-full max-w-sm rounded-3xl border border-komanda-charcoal/10 bg-white p-6 shadow-2xl">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-600">
              <Trash2 size={22} />
            </div>
            <h3 className="mt-4 font-display text-xl font-extrabold text-komanda-charcoal">
              Supprimer « {productName} » ?
            </h3>
            <p className="mt-1 text-sm text-komanda-charcoal/60">
              Cette action est définitive et ne peut pas être annulée.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-komanda-charcoal/15 px-5 py-2 text-sm font-bold text-komanda-charcoal hover:bg-komanda-cream"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={isPending}
                className="rounded-full bg-red-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {isPending ? "Suppression…" : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
