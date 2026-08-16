// Komanda — données de départ (seed)
import { config } from "dotenv";
import { existsSync } from "fs";
import { resolve } from "path";

// Charge .env.local s'il existe (pour que le seed marche avec la config Next.js aussi)
const envLocal = resolve(process.cwd(), ".env.local");
if (existsSync(envLocal)) config({ path: envLocal });
// Charge aussi .env (Prisma)
config();
// Exécuter avec : npx prisma db seed
// Importe les 2 bases, l'agent IA, les suppléments et les 3 packs.

import { PrismaClient, ProductType, PriceType } from "@prisma/client";
const prisma = new PrismaClient();

type SeedProduct = {
  type: ProductType;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  price: number;
  priceType: PriceType;
  emoji?: string;
  category?: string;
  features?: string[];
  order?: number;
};

const BASES: SeedProduct[] = [
  {
    type: "BASE",
    name: "Vitrine",
    slug: "vitrine",
    tagline: "Un site moderne, rapide et responsive.",
    price: 10000,
    priceType: "ONCE",
    emoji: "🌐",
    features: [
      "Site 4–5 sections",
      "100% responsive mobile",
      "Formulaire de contact",
      "Livré en 72h",
      "HTTPS & performances",
    ],
    order: 1,
  },
  {
    type: "BASE",
    name: "Vitrine 3D Motion",
    slug: "vitrine-3d-motion",
    tagline: "L'effet waouh d'un site premium.",
    price: 15000,
    priceType: "ONCE",
    emoji: "✨",
    features: [
      "Tout l'offre Vitrine",
      "Animations & micro-interactions",
      "Effets 3D style awwwards",
      "Design premium sur-mesure",
      "Optimisé mobile & SEO",
    ],
    order: 2,
  },
];

const AGENT: SeedProduct = {
  type: "AGENT",
  name: "Agent IA WhatsApp",
  slug: "agent-whatsapp",
  tagline: "Il répond, prend commandes et RDV, 24/7.",
  price: 5000,
  priceType: "MONTHLY",
  emoji: "🤖",
  features: [
    "Réponses naturelles en français",
    "Prise de commande",
    "Prise de rendez-vous",
    "Relances automatiques",
    "Connecté à ton catalogue",
    "Tableau de bord",
  ],
  order: 3,
};

const SUPPLEMENTS: SeedProduct[] = [
  // === IDENTITÉ & CONTENU ===
  { type: "SUPPLEMENT", name: "Logo professionnel", slug: "logo", category: "identite", price: 15000, priceType: "ONCE", emoji: "🎨", tagline: "Logo vectoriel + déclinaisons", order: 10 },
  { type: "SUPPLEMENT", name: "Charte graphique complète", slug: "charte-graphique", category: "identite", price: 45000, priceType: "ONCE", emoji: "🎨", tagline: "Logo + couleurs + typographies + usage", order: 11 },
  { type: "SUPPLEMENT", name: "Rédaction de contenu", slug: "redaction", category: "identite", price: 8000, priceType: "ONCE", emoji: "📝", tagline: "Textes qui vendent, adaptés à ton secteur", order: 12 },
  { type: "SUPPLEMENT", name: "Pack photos premium", slug: "photos", category: "identite", price: 25000, priceType: "ONCE", emoji: "📸", tagline: "Banque d'images HD libre de droits", order: 13 },
  { type: "SUPPLEMENT", name: "Shooting photo produit", slug: "shooting", category: "identite", price: 75000, priceType: "ONCE", emoji: "📷", tagline: "Séance photo livrée retouchée", order: 14 },
  { type: "SUPPLEMENT", name: "Vidéo de présentation", slug: "video", category: "identite", price: 60000, priceType: "ONCE", emoji: "🎬", tagline: "Vidéo 30–60s pour ta homepage", order: 15 },
  { type: "SUPPLEMENT", name: "Voix off pro", slug: "voix-off", category: "identite", price: 20000, priceType: "ONCE", emoji: "🎙️", tagline: "Voix masculine ou féminine FR/EN", order: 16 },
  { type: "SUPPLEMENT", name: "Multilingue FR/EN", slug: "multilingue", category: "identite", price: 15000, priceType: "ONCE", emoji: "🌍", tagline: "Site en français et anglais", order: 17 },
  { type: "SUPPLEMENT", name: "Langue locale additionnelle", slug: "langue-locale", category: "identite", price: 8000, priceType: "ONCE", emoji: "🗣️", tagline: "Fon, Yoruba, Lingwala, Wolof…", order: 18 },

  // === TECHNIQUE & HÉBERGEMENT ===
  { type: "SUPPLEMENT", name: "Nom de domaine .com", slug: "domaine-com", category: "technique", price: 7500, priceType: "YEARLY", emoji: "🌐", tagline: "Pour 1 an", order: 20 },
  { type: "SUPPLEMENT", name: "Nom de domaine .africa/.bj/.ci/.sn", slug: "domaine-local", category: "technique", price: 12000, priceType: "YEARLY", emoji: "🌍", tagline: "Extension locale, pour 1 an", order: 21 },
  { type: "SUPPLEMENT", name: "Hébergement + SSL", slug: "hebergement", category: "technique", price: 12000, priceType: "YEARLY", emoji: "☁️", tagline: "Rapide, sécurisé, sauvegardé", order: 22 },
  { type: "SUPPLEMENT", name: "Emails professionnels (3)", slug: "emails", category: "technique", price: 15000, priceType: "YEARLY", emoji: "📧", tagline: "contact@tonentreprise.com", order: 23 },
  { type: "SUPPLEMENT", name: "Maintenance mensuelle", slug: "maintenance", category: "technique", price: 5000, priceType: "MONTHLY", emoji: "🛠️", tagline: "Mises à jour & support prioritaire", order: 24 },
  { type: "SUPPLEMENT", name: "Sauvegarde quotidienne", slug: "sauvegarde", category: "technique", price: 3000, priceType: "MONTHLY", emoji: "💾", tagline: "Tes données à l'abri chaque jour", order: 25 },
  { type: "SUPPLEMENT", name: "CDN / accélération", slug: "cdn", category: "technique", price: 4000, priceType: "MONTHLY", emoji: "⚡", tagline: "Site ultra-rapide partout", order: 26 },
  { type: "SUPPLEMENT", name: "Sécurité & anti-piratage", slug: "securite", category: "technique", price: 25000, priceType: "YEARLY", emoji: "🔒", tagline: "Protection & scans", order: 27 },

  // === FONCTIONNALITÉS SITE ===
  { type: "SUPPLEMENT", name: "Formulaire avancé", slug: "formulaire", category: "fonctionnalites", price: 5000, priceType: "ONCE", emoji: "📝", tagline: "Champs personnalisés & fichiers", order: 30 },
  { type: "SUPPLEMENT", name: "Réservation / RDV", slug: "reservation", category: "fonctionnalites", price: 15000, priceType: "ONCE", emoji: "📅", tagline: "Créneaux, rappels, confirmation", order: 31 },
  { type: "SUPPLEMENT", name: "Blog / actualités", slug: "blog", category: "fonctionnalites", price: 10000, priceType: "ONCE", emoji: "📰", tagline: "Articles, catégories, recherche", order: 32 },
  { type: "SUPPLEMENT", name: "Galerie / portfolio", slug: "galerie", category: "fonctionnalites", price: 8000, priceType: "ONCE", emoji: "🖼️", tagline: "Photos & vidéos mises en avant", order: 33 },
  { type: "SUPPLEMENT", name: "Témoignages clients", slug: "temoignages", category: "fonctionnalites", price: 3000, priceType: "ONCE", emoji: "⭐", tagline: "Avis vérifiés", order: 34 },
  { type: "SUPPLEMENT", name: "FAQ interactive", slug: "faq", category: "fonctionnalites", price: 4000, priceType: "ONCE", emoji: "❓", tagline: "Questions/réponses animées", order: 35 },
  { type: "SUPPLEMENT", name: "Carte Google Maps", slug: "maps", category: "fonctionnalites", price: 3000, priceType: "ONCE", emoji: "📍", tagline: "Géolocalisation de ton activité", order: 36 },
  { type: "SUPPLEMENT", name: "Bouton WhatsApp flottant", slug: "whatsapp-btn", category: "fonctionnalites", price: 3000, priceType: "ONCE", emoji: "💬", tagline: "Chat direct depuis le site", order: 37 },
  { type: "SUPPLEMENT", name: "Intégration réseaux sociaux", slug: "reseaux-sociaux", category: "fonctionnalites", price: 3000, priceType: "ONCE", emoji: "📱", tagline: "Liens & fils d'actualité", order: 38 },
  { type: "SUPPLEMENT", name: "Newsletter", slug: "newsletter", category: "fonctionnalites", price: 6000, priceType: "ONCE", emoji: "📧", tagline: "Collecte d'emails & envois", order: 39 },
  { type: "SUPPLEMENT", name: "Espace client / connexion", slug: "espace-client", category: "fonctionnalites", price: 35000, priceType: "ONCE", emoji: "🔐", tagline: "Zone privée pour tes clients", order: 40 },
  { type: "SUPPLEMENT", name: "Multi-utilisateurs / rôles", slug: "roles", category: "fonctionnalites", price: 20000, priceType: "ONCE", emoji: "👥", tagline: "Plusieurs accès administrateurs", order: 41 },

  // === E-COMMERCE ===
  { type: "SUPPLEMENT", name: "Boutique en ligne", slug: "boutique", category: "ecommerce", price: 35000, priceType: "ONCE", emoji: "🛒", tagline: "Catalogue + panier + commandes", order: 50 },
  { type: "SUPPLEMENT", name: "Paiement en ligne (Fedapay)", slug: "paiement", category: "ecommerce", price: 10000, priceType: "ONCE", emoji: "💳", tagline: "Orange, MTN, Moov, Wave, carte", order: 51 },
  { type: "SUPPLEMENT", name: "Gestion des livraisons", slug: "livraison", category: "ecommerce", price: 15000, priceType: "ONCE", emoji: "🚚", tagline: "Zones, frais & suivi", order: 52 },
  { type: "SUPPLEMENT", name: "Codes promo / fidélité", slug: "promos", category: "ecommerce", price: 12000, priceType: "ONCE", emoji: "🎟️", tagline: "Réductions & points fidélité", order: 53 },
  { type: "SUPPLEMENT", name: "Gestion de stock", slug: "stock", category: "ecommerce", price: 18000, priceType: "ONCE", emoji: "📦", tagline: "Inventaire & alertes", order: 54 },
  { type: "SUPPLEMENT", name: "Factures automatiques", slug: "factures", category: "ecommerce", price: 10000, priceType: "ONCE", emoji: "🧾", tagline: "PDF générés à chaque commande", order: 55 },

  // === IA ===
  { type: "SUPPLEMENT", name: "Chatbot IA sur le site", slug: "chatbot-site", category: "ia", price: 5000, priceType: "MONTHLY", emoji: "💡", tagline: "Assistant qui répond aux visiteurs", order: 60 },
  { type: "SUPPLEMENT", name: "Agent IA de prospection", slug: "agent-prospection", category: "ia", price: 15000, priceType: "MONTHLY", emoji: "📞", tagline: "Il prospecte & relance tes leads", order: 61 },
  { type: "SUPPLEMENT", name: "Recommandation produits IA", slug: "reco-ia", category: "ia", price: 8000, priceType: "MONTHLY", emoji: "🎯", tagline: "Suggestions personnalisées", order: 62 },
  { type: "SUPPLEMENT", name: "Rapports IA mensuels", slug: "rapports-ia", category: "ia", price: 5000, priceType: "MONTHLY", emoji: "📊", tagline: "Analyses & conseils automatiques", order: 63 },
  { type: "SUPPLEMENT", name: "Voix IA (appels entrants)", slug: "voix-ia", category: "ia", price: 20000, priceType: "MONTHLY", emoji: "📞", tagline: "Répond aux appels comme un humain", order: 64 },

  // === VISIBILITÉ & CROISSANCE ===
  { type: "SUPPLEMENT", name: "SEO & référencement", slug: "seo", category: "visibilite", price: 30000, priceType: "ONCE", emoji: "🔍", tagline: "Optimisation Google complète", order: 70 },
  { type: "SUPPLEMENT", name: "Fiche Google Business", slug: "google-business", category: "visibilite", price: 10000, priceType: "ONCE", emoji: "📍", tagline: "Création & optimisation", order: 71 },
  { type: "SUPPLEMENT", name: "Pack réseaux sociaux (mois)", slug: "social-pack", category: "visibilite", price: 75000, priceType: "MONTHLY", emoji: "📲", tagline: "12 posts + stories par mois", order: 72 },
  { type: "SUPPLEMENT", name: "Publicité Google/Meta (mois)", slug: "ads", category: "visibilite", price: 50000, priceType: "MONTHLY", emoji: "📣", tagline: "Gestion de campagnes (budget pub non inclus)", order: 73 },
  { type: "SUPPLEMENT", name: "Formation prise en main", slug: "formation", category: "visibilite", price: 15000, priceType: "ONCE", emoji: "🎓", tagline: "Session visio de 2h", order: 74 },
  { type: "SUPPLEMENT", name: "Coaching digital (4 séances)", slug: "coaching", category: "visibilite", price: 60000, priceType: "ONCE", emoji: "📈", tagline: "Stratégie & accompagnement", order: 75 },

  // === APPLICATIONS & SUR-MESURE ===
  { type: "SUPPLEMENT", name: "Application Android", slug: "app-android", category: "app", price: 250000, priceType: "ONCE", emoji: "🤖", tagline: "Application native Android", order: 80 },
  { type: "SUPPLEMENT", name: "Application iOS", slug: "app-ios", category: "app", price: 300000, priceType: "ONCE", emoji: "🍎", tagline: "Application native iPhone", order: 81 },
  { type: "SUPPLEMENT", name: "Tableau de bord admin", slug: "dashboard", category: "app", price: 80000, priceType: "ONCE", emoji: "📊", tagline: "Interface de gestion sur-mesure", order: 82 },
  { type: "SUPPLEMENT", name: "Intégration API", slug: "api", category: "app", price: 40000, priceType: "ONCE", emoji: "🔌", tagline: "Connexion à ton ERP/compta/livraison", order: 83 },
];

async function main() {
  console.log("🌱 Seed Komanda…");

  for (const p of [...BASES, AGENT, ...SUPPLEMENTS]) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log("✅ Produits créés");

  // === PACKS ===
  const packs = [
    {
      name: "Pack Démarrage",
      slug: "pack-demarrage",
      tagline: "L'essentiel pour être en ligne.",
      baseSlug: "vitrine",
      supplementSlugs: ["domaine-com", "hebergement", "emails", "whatsapp-btn"],
      price: 35000,
      saving: 7500,
      emoji: "🚀",
    },
    {
      name: "Pack Business",
      slug: "pack-business",
      tagline: "Pour vendre et être visible.",
      baseSlug: "vitrine-3d-motion",
      supplementSlugs: ["logo", "redaction", "whatsapp-btn", "seo", "google-business"],
      price: 59000,
      saving: 14000,
      emoji: "💼",
    },
    {
      name: "Pack E-commerce",
      slug: "pack-ecommerce",
      tagline: "Boutique complète prête à vendre.",
      baseSlug: "vitrine-3d-motion",
      supplementSlugs: ["logo", "boutique", "paiement", "livraison", "domaine-com", "hebergement"],
      price: 85000,
      saving: 14500,
      emoji: "🛍️",
    },
  ];

  for (const pack of packs) {
    const base = await prisma.product.findUnique({ where: { slug: pack.baseSlug } });
    const supplements = await prisma.product.findMany({
      where: { slug: { in: pack.supplementSlugs } },
    });
    if (!base) {
      console.warn(`⚠️ Base ${pack.baseSlug} introuvable`);
      continue;
    }
    const created = await prisma.product.upsert({
      where: { slug: pack.slug },
      update: {
        type: "PACK",
        name: pack.name,
        tagline: pack.tagline,
        price: pack.price,
        priceType: "ONCE",
        emoji: pack.emoji,
        features: [
          `Base : ${base.name}`,
          ...supplements.map((s) => s.name),
          `Tu économises ${pack.saving.toLocaleString("fr-FR")} CFA`,
        ],
      },
      create: {
        type: "PACK",
        name: pack.name,
        slug: pack.slug,
        tagline: pack.tagline,
        price: pack.price,
        priceType: "ONCE",
        emoji: pack.emoji,
        features: [
          `Base : ${base.name}`,
          ...supplements.map((s) => s.name),
          `Tu économises ${pack.saving.toLocaleString("fr-FR")} CFA`,
        ],
      },
    });
    // Items du pack
    await prisma.packItem.deleteMany({ where: { packId: created.id } });
    await prisma.packItem.create({
      data: { packId: created.id, itemId: base.id, quantity: 1 },
    });
    for (const s of supplements) {
      await prisma.packItem.create({
        data: { packId: created.id, itemId: s.id, quantity: 1 },
      });
    }
  }
  console.log("✅ Packs créés");
  console.log("🎉 Seed terminé");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
