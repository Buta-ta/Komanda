import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { Logo } from "@/components/Logo";
import { Package, FileText, CreditCard, LogOut } from "lucide-react";

type OrderRow = {
  id: string;
  reference: string;
  createdAt: Date;
  total: number;
  status:
    | "PENDING_PAYMENT"
    | "PAID"
    | "ONBOARDING"
    | "IN_PRODUCTION"
    | "IN_REVIEW"
    | "DELIVERED"
    | "CANCELLED"
    | "REFUNDED";
};

function formatPrice(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " CFA";
}

export default async function AccountPage() {
  const t = await getTranslations("account");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/fr/login");

  let customer = await prisma.customer.findUnique({
    where: { id: user.id },
    include: { orders: { orderBy: { createdAt: "desc" as const }, take: 10 } },
  });

  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        id: user.id,
        email: user.email ?? null,
        fullName: (user.user_metadata?.full_name as string) ?? null,
        avatarUrl: (user.user_metadata?.avatar_url as string) ?? null,
        isGuest: false,
      },
      include: { orders: { orderBy: { createdAt: "desc" as const }, take: 10 } },
    });
  }

  const orders = customer.orders as unknown as OrderRow[];

  return (
    <main className="min-h-screen bg-komanda-cream">
      <header className="border-b border-komanda-charcoal/5 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-komanda-charcoal">
            <Logo />
          </Link>
          <form action="/fr/auth/signout" method="post">
            <button className="inline-flex items-center gap-2 rounded-full border border-komanda-charcoal/15 px-4 py-2 text-sm font-bold text-komanda-charcoal/70 hover:bg-komanda-cream">
              <LogOut size={14} /> {t("signout")}
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="flex items-center gap-4">
          {customer.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={customer.avatarUrl}
              alt=""
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="grid h-16 w-16 place-items-center rounded-full bg-komanda-yellow font-display text-2xl font-extrabold text-komanda-charcoal">
              {(customer.fullName || customer.email || "?").charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="font-display text-3xl font-extrabold text-komanda-charcoal">
              {t("hello")}, {customer.fullName || customer.email}
            </h1>
            <p className="text-sm text-komanda-charcoal/60">{t("welcomeBack")}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Stat
            icon={<Package size={20} />}
            label={t("orders")}
            value={String(orders.length)}
          />
          <Stat icon={<FileText size={20} />} label={t("invoices")} value="0" />
          <Stat
            icon={<CreditCard size={20} />}
            label={t("subscription")}
            value="—"
          />
        </div>

        <section className="mt-10">
          <h2 className="font-display text-xl font-bold text-komanda-charcoal">
            {t("myOrders")}
          </h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-komanda-charcoal/10 bg-white">
            {orders.length === 0 ? (
              <div className="p-8 text-center text-sm text-komanda-charcoal/60">
                {t("noOrders")}{" "}
                <Link
                  href="/configurateur"
                  className="font-bold text-komanda-gold hover:underline"
                >
                  {t("startOrder")}
                </Link>
              </div>
            ) : (
              orders.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between border-b border-komanda-charcoal/5 p-4 last:border-0"
                >
                  <div>
                    <div className="font-bold text-komanda-charcoal">
                      #{o.reference}
                    </div>
                    <div className="text-xs text-komanda-charcoal/50">
                      {new Date(o.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-komanda-charcoal">
                      {formatPrice(o.total)}
                    </div>
                    <span className="rounded-full bg-komanda-cream px-2.5 py-1 text-[11px] font-bold text-komanda-charcoal/70">
                      {t(`status_${o.status}`)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-komanda-charcoal/10 bg-white p-5">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-komanda-yellow/30 text-komanda-gold">
        {icon}
      </div>
      <div>
        <div className="font-display text-2xl font-extrabold text-komanda-charcoal">
          {value}
        </div>
        <div className="text-xs text-komanda-charcoal/60">{label}</div>
      </div>
    </div>
  );
}