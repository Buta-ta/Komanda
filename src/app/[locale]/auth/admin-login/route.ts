import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "anon";
  const rl = rateLimit(`admin-login:${ip}`, 10, 60_000);
  if (!rl.ok) {
    return NextResponse.redirect(
      new URL(`/${locale}/admin/login?error=rate_limited`, request.url)
    );
  }

  const origin = new URL(request.url).origin;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/${locale}/auth/admin-callback`,
    },
  });

  if (error || !data.url) {
    return NextResponse.redirect(
      new URL(`/${locale}/admin/login?error=auth`, request.url)
    );
  }
  return NextResponse.redirect(data.url);
}
