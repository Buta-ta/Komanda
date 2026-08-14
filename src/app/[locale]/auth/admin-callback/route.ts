import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

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

  const customer = await prisma.customer.findUnique({
    where: { id: user.id },
    select: { isAdmin: true },
  });

  if (!customer?.isAdmin) {
    await supabase.auth.signOut();
    return NextResponse.redirect(
      `${origin}/${locale}/admin/login?error=forbidden`
    );
  }

  return NextResponse.redirect(`${origin}/${locale}/admin`);
}
