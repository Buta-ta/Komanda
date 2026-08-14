import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

/**
 * À appeler au tout début de chaque page admin (server component).
 * Redirige vers le PORTAIL ADMIN DÉDIÉ, pas le portail client.
 */
export async function requireAdmin(locale = "fr") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/admin/login`);

  const customer = await prisma.customer.findUnique({
    where: { id: user.id },
    select: { id: true, isAdmin: true, email: true, fullName: true },
  });

  if (!customer?.isAdmin) redirect(`/${locale}/admin/login?error=forbidden`);

    return { user, customer, locale };
}

/** Pour les API routes : renvoie null si pas admin. */
export async function getAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const customer = await prisma.customer.findUnique({
    where: { id: user.id },
    select: { id: true, isAdmin: true },
  });
  return customer?.isAdmin ? user : null;
}
