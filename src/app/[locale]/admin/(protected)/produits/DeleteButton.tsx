"use client";

import { deleteProduct } from "../actions/catalog";

export function DeleteButton({ locale, id }: { locale: string; id: string }) {
  return (
    <form
      action={deleteProduct.bind(null, locale, id)}
      onSubmit={(e) => {
        if (!window.confirm("Supprimer ce produit ?")) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50"
      >
        Supprimer
      </button>
    </form>
  );
}