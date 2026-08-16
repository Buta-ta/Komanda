import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type AdminCustomer = {
  id: string;
  email: string | null;
  fullName: string | null;
  isAdmin: boolean;
};

/** À appeler au début de chaque page admin (server component). */
export async function requireAdmin(locale = "fr") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/admin/login`);

  // Lecture via service_role : indépendant des droits anon / RLS.
  const admin = createAdminClient();
  const { data: customer } = await admin
    .from("Customer")
    .select('id, email, "fullName", "isAdmin"')
    .eq("id", user.id)
    .maybeSingle();

  if (!customer?.isAdmin) redirect(`/${locale}/admin/login?error=forbidden`);

  return { user, customer: customer as AdminCustomer, locale };
}

/** Pour les API routes : renvoie null si pas admin. */
export async function getAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const admin = createAdminClient();
  const { data: customer } = await admin
    .from("Customer")
    .select('id, "isAdmin"')
    .eq("id", user.id)
    .maybeSingle();

  return customer?.isAdmin ? user : null;
}