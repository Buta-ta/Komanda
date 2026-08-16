import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { Logo } from "@/components/Logo";
import {
  LayoutDashboard,
  Package,
  Tags,
<<<<<<< HEAD
  Tag,
  Layers,
  FolderTree,
=======
  Layers,
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
  Image as ImageIcon,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/produits", label: "Bases & produits", icon: Package },
<<<<<<< HEAD
  { href: "/admin/categories", label: "Catégories", icon: FolderTree },
  { href: "/admin/tags", label: "Tags", icon: Tag },
  { href: "/admin/groupes", label: "Groupes", icon: Layers },
=======
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
  { href: "/admin/supplements", label: "Suppléments", icon: Tags },
  { href: "/admin/packs", label: "Packs", icon: Layers },
  { href: "/admin/showroom", label: "Showroom", icon: ImageIcon },
  { href: "/admin/commandes", label: "Commandes", icon: ShoppingBag },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/parametres", label: "Paramètres", icon: Settings },
];

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await requireAdmin(locale);

  return (
    <div className="min-h-screen bg-komanda-cream text-komanda-charcoal">
      <header className="sticky top-0 z-30 border-b border-komanda-charcoal/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="rounded-full bg-komanda-charcoal px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-komanda-yellow">
              Admin
            </span>
          </div>
          <form action={`/${locale}/auth/signout`} method="post">
            <button className="inline-flex items-center gap-2 rounded-full border border-komanda-charcoal/15 px-4 py-2 text-sm font-bold text-komanda-charcoal/70 hover:bg-komanda-cream">
              <LogOut size={14} /> Déconnexion
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 md:grid-cols-[230px_1fr]">
        <aside className="md:sticky md:top-24 md:self-start">
          <nav className="space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-komanda-charcoal/70 transition hover:bg-white hover:text-komanda-charcoal"
              >
                <item.icon size={16} /> {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
