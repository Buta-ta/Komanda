// ============================================================
// À remplacer : src/app/[locale]/auth/admin-callback/route.ts
// Vérifie isAdmin via le client service_role (bypass anon/RLS).
// ============================================================
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const url = new URL(request.url);
  const origin = url.origin;
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/${locale}/admin/login?error=auth`);
  }

  const supabase = await createClient();
  await supabase.auth.exchangeCodeForSession(code);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}/${locale}/admin/login?error=auth`);
  }

  // Vérification via service_role : indépendant des droits anon / RLS.
  const admin = createAdminClient();
  const { data: customer } = await admin
    .from("Customer")
    .select('id, "isAdmin"')
    .eq("id", user.id)
    .maybeSingle();

  if (!customer?.isAdmin) {
    await supabase.auth.signOut();
    return NextResponse.redirect(
      `${origin}/${locale}/admin/login?error=forbidden`
    );
  }

  return NextResponse.redirect(`${origin}/${locale}/admin`);
}
