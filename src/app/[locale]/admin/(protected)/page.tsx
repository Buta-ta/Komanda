<<<<<<< HEAD
// ============================================================
// À remplacer : src/app/[locale]/admin/(protected)/page.tsx
// (plus AUCUN prisma)
// ============================================================
import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
=======
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
import { formatPrice } from "@/lib/catalog";

export const dynamic = "force-dynamic";

<<<<<<< HEAD
type RecentOrder = {
  id: string;
  reference: string;
  total: number;
  status: string;
  guestEmail: string | null;
  Customer: { email: string | null; fullName: string | null } | null;
};

=======
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { customer } = await requireAdmin(locale);
<<<<<<< HEAD
  const supabase = await createClient();

  const [
    { count: ordersCount },
    { count: productsCount },
    { count: customersCount },
    recentOrders,
    paidOrders,
  ] = await Promise.all([
    supabase.from("Order").select("id", { count: "exact", head: true }),
    supabase
      .from("Product")
      .select("id", { count: "exact", head: true })
      .eq("status", "ACTIVE"),
    supabase.from("Customer").select("id", { count: "exact", head: true }),
    supabase
      .from("Order")
      .select('id, reference, total, status, "guestEmail", Customer(email, "fullName")')
      .order("createdAt", { ascending: false })
      .limit(8),
    supabase
      .from("Order")
      .select("total")
      .in("status", ["PAID", "IN_PRODUCTION", "IN_REVIEW", "DELIVERED"]),
  ]);

  const revenue = (paidOrders.data ?? []).reduce(
    (sum: number, o) => sum + ((o as { total?: number }).total ?? 0),
    0
  );
  const recent: RecentOrder[] = (recentOrders.data ?? []) as unknown as RecentOrder[];
=======

  const [ordersCount, paidOrders, productsCount, customersCount, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.findMany({
        where: {
          status: { in: ["PAID", "IN_PRODUCTION", "IN_REVIEW", "DELIVERED"] },
        },
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

  const revenue = paidOrders.reduce((s, o) => s + o.total, 0);
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba

  return (
    <div>
      <h1 className="font-display text-3xl font-black">Bienvenue 👋</h1>
      <p className="mt-1 text-sm text-komanda-charcoal/60">
        Connecté en tant que {customer.email || customer.fullName}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
<<<<<<< HEAD
        <Kpi label="Commandes" value={String(ordersCount ?? 0)} />
        <Kpi label="Chiffre d'affaires" value={formatPrice(revenue)} />
        <Kpi label="Produits actifs" value={String(productsCount ?? 0)} />
        <Kpi label="Clients" value={String(customersCount ?? 0)} />
=======
        <Kpi label="Commandes" value={String(ordersCount)} />
        <Kpi label="Chiffre d'affaires" value={formatPrice(revenue)} />
        <Kpi label="Produits actifs" value={String(productsCount)} />
        <Kpi label="Clients" value={String(customersCount)} />
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
      </div>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Dernières commandes</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-komanda-charcoal/10 bg-white">
<<<<<<< HEAD
          {recent.length === 0 ? (
=======
          {recentOrders.length === 0 ? (
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
            <p className="p-6 text-center text-sm text-komanda-charcoal/60">
              Aucune commande pour l'instant.
            </p>
          ) : (
<<<<<<< HEAD
            recent.map((o) => (
=======
            recentOrders.map((o) => (
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
              <div
                key={o.id}
                className="flex items-center justify-between border-b border-komanda-charcoal/5 p-4 last:border-0"
              >
                <div>
                  <div className="font-bold">#{o.reference}</div>
                  <div className="text-xs text-komanda-charcoal/50">
<<<<<<< HEAD
                    {o.Customer?.email || o.guestEmail}
=======
                    {o.customer?.email || o.guestEmail}
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{formatPrice(o.total)}</div>
                  <span className="rounded-full bg-komanda-cream px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-komanda-charcoal/70">
                    {o.status}
                  </span>
                </div>
              </div>
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
      <div className="text-xs font-bold uppercase tracking-wider text-komanda-charcoal/50">
        {label}
      </div>
      <div className="mt-2 font-display text-2xl font-black">{value}</div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
