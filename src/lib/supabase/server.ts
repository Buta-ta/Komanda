import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
<<<<<<< HEAD
=======

>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
<<<<<<< HEAD
            // Ignoré dans un Server Component
=======
            // Ignoré dans un Server Component : on rafraîchit via middleware
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
          }
        },
      },
    }
  );
}