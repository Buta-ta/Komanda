// ============================================================
// À créer : src/components/admin/GroupProducts.tsx (client)
// Gère le toggle produit <-> groupe. Recharge la page après action.
// ============================================================
"use client";

import { useTransition } from "react";

type P = {
  id: string;
  name: string;
  nameEn?: string | null;
  emoji?: string | null;
  type: string;
};

export default function GroupProducts({
  groupId,
  products,
  memberIds,
  toggleAction,
}: {
  groupId: string;
  products: P[];
  memberIds: Set<string>;
  toggleAction: (groupId: string, productId: string) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  const toggle = (productId: string) => {
    startTransition(async () => {
      await toggleAction(groupId, productId);
    });
  };

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {products.map((p) => {
        const on = memberIds.has(p.id);
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => toggle(p.id)}
            disabled={isPending}
            className={`flex items-center gap-2 rounded-xl border p-3 text-left transition ${
              on
                ? "border-komanda-gold bg-yellow-50"
                : "border-komanda-charcoal/10 bg-white hover:bg-komanda-cream/40"
            }`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-komanda-cream text-base">
              {p.emoji || "📦"}
            </span>
            <span className="flex-1">
              <span className="block text-[13px] font-bold text-komanda-charcoal">{p.name}</span>
              <span className="block text-[11px] text-komanda-charcoal/45">{p.type}</span>
            </span>
            <span
              className={`grid h-5 w-5 place-items-center rounded-full border-2 text-[10px] ${
                on ? "border-komanda-gold bg-komanda-gold text-white" : "border-komanda-charcoal/25"
              }`}
            >
              {on ? "✓" : ""}
            </span>
          </button>
        );
      })}
    </div>
  );
}
