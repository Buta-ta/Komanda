import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const origin = new URL(request.url).origin;
  const code = new URL(request.url).searchParams.get("code");
  const next = new URL(request.url).searchParams.get("next") || `/${locale}/compte`;

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${origin}${next}`);
}