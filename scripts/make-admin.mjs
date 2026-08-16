// ============================================================
// À remplacer : scripts/make-admin.mjs  (version Supabase, plus AUCUN prisma)
// Usage : node scripts/make-admin.mjs ton@email.com
// ============================================================
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

// Charge .env.local puis .env (le script tourne hors Next.js)
function loadEnv(file) {
  try {
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^\s*([\w]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  } catch {}
}
loadEnv(".env.local");
loadEnv(".env");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceRole) {
  console.error(
    "Manque NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY dans .env.local (URL SANS crochets [ ])"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRole);

const email = process.argv[2];
if (!email) {
  console.error("Usage: node scripts/make-admin.mjs <email>");
  process.exit(1);
}

// 1) Trouve l'utilisateur Supabase Auth par email
const { data: users, error: uErr } = await supabase.auth.admin.listUsers();
if (uErr) {
  console.error("Erreur listUsers:", uErr.message);
  process.exit(1);
}
const user = users.users.find((u) => u.email === email);
if (!user) {
  console.error(`Aucun utilisateur Supabase Auth avec l'email '${email}'.`);
  console.error(
    "Connecte-toi d'abord UNE FOIS via Google sur le site pour créer le compte, puis relance."
  );
  process.exit(1);
}

// 2) Upsert la ligne Customer avec isAdmin = true
const now = new Date().toISOString();
const { error } = await supabase
  .from("Customer")
  .upsert(
    {
      id: user.id,
      email,
      fullName: user.user_metadata?.full_name ?? user.email,
      isAdmin: true,
      isGuest: false,
      createdAt: now,
      updatedAt: now,
    },
    { onConflict: "id" }
  );

if (error) {
  console.error("Erreur Customer:", error.message);
  console.error(
    "=> Vérifie que la table \"Customer\" existe (SQL Editor exécuté) et que SUPABASE_SERVICE_ROLE_KEY est bon."
  );
  process.exit(1);
}
console.log(`✅ ${email} est maintenant ADMIN (id=${user.id}).`);
