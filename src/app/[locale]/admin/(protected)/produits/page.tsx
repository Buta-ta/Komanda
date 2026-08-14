import { listProducts, toggleProductStatus, deleteProduct } from "../actions/catalog";
import Link from "next/link";
import { formatPrice } from "@/lib/catalog";
import { DeleteButton } from "../produits/DeleteButton";

export const dynamic = "force-dynamic";

export default async function ProductsAdmin({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const products = await listProducts(locale);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-black">Bases &amp; produits</h1>
        <Link
          href={`/${locale}/admin/produits/nouveau`}
          className="rounded-full bg-komanda-charcoal px-4 py-2 text-sm font-bold text-komanda-yellow"
        >
          + Nouveau
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-komanda-charcoal/10 bg-white">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center gap-4 border-b border-komanda-charcoal/5 p-4 last:border-0"
          >
            <span className="text-2xl">{p.emoji || "📦"}</span>
            <div className="min-w-[180px] flex-1">
              <div className="font-bold">{p.name}</div>
              <div className="text-xs text-komanda-charcoal/50">
                {p.type} · {p.slug}
              </div>
            </div>
            <div className="text-right font-bold">{formatPrice(p.price)}</div>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                p.status === "ACTIVE"
                  ? "bg-komanda-green/15 text-komanda-green-2"
                  : "bg-komanda-charcoal/10 text-komanda-charcoal/50"
              }`}
            >
              {p.status}
            </span>
            <div className="flex gap-2">
              <form action={toggleProductStatus.bind(null, locale, p.id)}>
                <button className="rounded-lg border border-komanda-charcoal/15 px-3 py-1.5 text-xs font-bold hover:bg-komanda-cream">
                  {p.status === "ACTIVE" ? "Masquer" : "Activer"}
                </button>
              </form>
              <Link
                href={`/${locale}/admin/produits/${p.id}`}
                className="rounded-lg border border-komanda-charcoal/15 px-3 py-1.5 text-xs font-bold hover:bg-komanda-cream"
              >
                Éditer
              </Link>
              <DeleteButton locale={locale} id={p.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}