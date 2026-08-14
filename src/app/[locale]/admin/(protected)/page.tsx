import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/catalog";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, customer } = await requireAdmin();

  const [ordersCount, paidOrders, productsCount, customersCount, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.findMany({
        where: { status: { in: ["PAID", "IN_PRODUCTION", "IN_REVIEW", "DELIVERED", "AWAITING_PAYMENT", "PREVIEW_READY"] } },
        select: { total: true },
      }),
      prisma.product.count({ where: { status: "ACTIVE" } }),
      prisma.customer.count(),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        include: { customer: { select: { email: true, fullName: true } } },
      }),
    ]);

  const revenue = paidOrders.reduce((s: number, o: { total: number }) => s + o.total, 0);

  return (
    <div>
      <h1 className="font-display text-3xl font-black">Bienvenue 👋</h1>
      <p className="mt-1 text-sm text-komanda-charcoal/60">
        Connecté en tant que {customer.email || customer.fullName}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Commandes" value={String(ordersCount)} />
        <Kpi label="Chiffre d'affaires" value={formatPrice(revenue)} />
        <Kpi label="Produits actifs" value={String(productsCount)} />
        <Kpi label="Clients" value={String(customersCount)} />
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Dernières commandes</h2>
          <Link href={`/${locale}/admin/commandes`} className="text-sm font-bold text-komanda-gold hover:underline">
            Tout voir
          </Link>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-komanda-charcoal/10 bg-white">
          {recentOrders.length === 0 ? (
            <p className="p-6 text-center text-sm text-komanda-charcoal/60">
              Aucune commande pour l'instant.
            </p>
          ) : (
            recentOrders.map((o) => (
              <Link
                key={o.id}
                href={`/${locale}/admin/commandes/${o.id}`}
                className="flex items-center justify-between border-b border-komanda-charcoal/5 p-4 last:border-0 hover:bg-komanda-cream/50"
              >
                <div>
                  <div className="font-bold">#{o.reference}</div>
                  <div className="text-xs text-komanda-charcoal/50">
                    {o.customer?.email || o.guestEmail}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{formatPrice(o.total)}</div>
                  <span className="rounded-full bg-komanda-cream px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-komanda-charcoal/70">
                    {o.status}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-komanda-charcoal/10 bg-white p-5">
      <div className="text-xs font-bold uppercase tracking-wider text-komanda-charcoal/50">{label}</div>
      <div className="mt-2 font-display text-2xl font-black">{value}</div>
    </div>
  );
}