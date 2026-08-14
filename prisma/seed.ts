/// <reference types="node" />
import { PrismaClient, ProductType, PriceType } from "@prisma/client";

const prisma = new PrismaClient();

type ProductInput = {
  type: ProductType;
  nameFr: string;
  nameEn?: string;
  slug: string;
  taglineFr?: string;
  taglineEn?: string;
  descriptionFr?: string;
  descriptionEn?: string;
  price: number;
  priceType?: PriceType;
  emoji?: string;
  coverUrl?: string;
  categorySlug?: string;
  featuresFr?: string[];
  featuresEn?: string[];
  order?: number;
  revisionsIncluded?: number;
  extraRevisionPrice?: number;
  templateKind?: "HTML" | "NEXTJS" | "SCREENSHOT" | "FIGMA";
  templateUrl?: string;
  templateFileUrl?: string;
  priceBuild?: number;
  priceCode?: number;
  themeJson?: object;
  status?: "DRAFT" | "ACTIVE" | "ARCHIVED";
};

const BASES: ProductInput[] = [
  {
    type: "BASE",
    nameFr: "Vitrine",
    nameEn: "Landing page",
    slug: "vitrine",
    taglineFr: "Un site moderne, rapide, qui convertit.",
    taglineEn: "A modern, fast, high-converting website.",
    price: 10000,
    emoji: "🌐",
    featuresFr: ["Site 4–5 sections", "100% responsive mobile", "Formulaire de contact", "Livré en 72h", "HTTPS & performances"],
    featuresEn: ["4–5 sections", "100% mobile responsive", "Contact form", "Delivered in 72h", "HTTPS & performance"],
    order: 1,
    revisionsIncluded: 1,
  },
  {
    type: "BASE",
    nameFr: "3D Motion",
    nameEn: "3D Motion",
    slug: "vitrine-3d",
    taglineFr: "L'effet waouh d'un site premium.",
    taglineEn: "The wow effect of a premium site.",
    price: 15000,
    emoji: "✨",
    featuresFr: ["Tout l'offre Vitrine", "Scroll cinématique", "Micro-interactions", "Direction artistique sur-mesure", "Optimisé mobile & SEO"],
    featuresEn: ["Everything in Landing", "Cinematic scroll", "Micro-interactions", "Bespoke art direction", "Mobile & SEO optimized"],
    order: 2,
    revisionsIncluded: 2,
  },
  {
    type: "APP",
    nameFr: "Application",
    nameEn: "Application",
    slug: "app",
    taglineFr: "Une app qui prend les commandes.",
    taglineEn: "An app that takes orders.",
    price: 50000,
    emoji: "📱",
    featuresFr: ["PWA ou app mobile", "Comptes & tableau de bord", "Paiement Mobile Money", "Premier build en 14 jours", "Publication & formation"],
    featuresEn: ["PWA or mobile app", "Accounts & dashboard", "Mobile Money payments", "First build in 14 days", "Publishing & training"],
    order: 3,
    revisionsIncluded: 3,
  },
  {
    type: "AUDIT",
    nameFr: "Audit",
    nameEn: "Audit",
    slug: "audit",
    taglineFr: "On ouvre le capot de ton site ou de ton app.",
    taglineEn: "We look under the hood of your site or app.",
    price: 12000,
    emoji: "🔍",
    featuresFr: ["UX, perf, SEO, sécurité", "Parcours mobile réel", "Score et priorités", "Plan d'action 30 jours", "Rapport livré en 72h"],
    featuresEn: ["UX, perf, SEO, security", "Real mobile journey", "Score & priorities", "30-day action plan", "Report delivered in 72h"],
    order: 4,
  },
];

const AGENT: ProductInput = {
  type: "AGENT",
  nameFr: "Agent IA WhatsApp",
  nameEn: "WhatsApp AI Agent",
  slug: "agent-whatsapp",
  taglineFr: "Il répond, prend commandes et RDV, 24/7.",
  taglineEn: "Replies, takes orders & books appointments, 24/7.",
  price: 5000,
  priceType: "MONTHLY",
  emoji: "🤖",
  featuresFr: ["Réponses naturelles", "Prise de commande", "Prise de RDV", "Relances automatiques", "Connecté à ton catalogue", "Tableau de bord"],
  featuresEn: ["Natural replies", "Order taking", "Appointment booking", "Automatic reminders", "Connected to your catalog", "Dashboard"],
  order: 5,
};

const SUPPLEMENTS: ProductInput[] = [
  { type: "SUPPLEMENT", nameFr: "Logo & identité", nameEn: "Logo & identity", slug: "logo", categorySlug: "identite", price: 15000, emoji: "🎨", taglineFr: "Logo vectoriel + déclinaisons" },
  { type: "SUPPLEMENT", nameFr: "Rédaction de contenu", nameEn: "Copywriting", slug: "redaction", categorySlug: "identite", price: 8000, emoji: "📝" },
  { type: "SUPPLEMENT", nameFr: "Pack photos premium", nameEn: "Premium photo pack", slug: "photos", categorySlug: "identite", price: 25000, emoji: "📸" },
  { type: "SUPPLEMENT", nameFr: "Multilingue FR/EN", nameEn: "Bilingual FR/EN", slug: "multilingue", categorySlug: "identite", price: 15000, emoji: "🌍" },
  { type: "SUPPLEMENT", nameFr: "Nom de domaine .com", nameEn: ".com domain", slug: "domaine-com", categorySlug: "technique", price: 7500, priceType: "YEARLY", emoji: "🌐" },
  { type: "SUPPLEMENT", nameFr: "Hébergement + SSL", nameEn: "Hosting + SSL", slug: "hebergement", categorySlug: "technique", price: 12000, priceType: "YEARLY", emoji: "☁️" },
  { type: "SUPPLEMENT", nameFr: "Emails pro (3)", nameEn: "Pro emails (3)", slug: "emails", categorySlug: "technique", price: 15000, priceType: "YEARLY", emoji: "📧" },
  { type: "SUPPLEMENT", nameFr: "Maintenance mensuelle", nameEn: "Monthly maintenance", slug: "maintenance", categorySlug: "technique", price: 5000, priceType: "MONTHLY", emoji: "🛠️" },
  { type: "SUPPLEMENT", nameFr: "Réservation / RDV", nameEn: "Booking / appointments", slug: "reservation", categorySlug: "fonctionnalites", price: 15000, emoji: "📅" },
  { type: "SUPPLEMENT", nameFr: "Blog / actualités", nameEn: "Blog / news", slug: "blog", categorySlug: "fonctionnalites", price: 10000, emoji: "📰" },
  { type: "SUPPLEMENT", nameFr: "Galerie / portfolio", nameEn: "Gallery / portfolio", slug: "galerie", categorySlug: "fonctionnalites", price: 8000, emoji: "🖼️" },
  { type: "SUPPLEMENT", nameFr: "Bouton WhatsApp", nameEn: "WhatsApp button", slug: "whatsapp-btn", categorySlug: "fonctionnalites", price: 3000, emoji: "💬" },
  { type: "SUPPLEMENT", nameFr: "Espace client", nameEn: "Customer area", slug: "espace-client", categorySlug: "fonctionnalites", price: 35000, emoji: "🔐" },
  { type: "SUPPLEMENT", nameFr: "Boutique en ligne", nameEn: "Online store", slug: "boutique", categorySlug: "ecommerce", price: 35000, emoji: "🛒" },
  { type: "SUPPLEMENT", nameFr: "Paiement en ligne", nameEn: "Online payments", slug: "paiement", categorySlug: "ecommerce", price: 10000, emoji: "💳" },
  { type: "SUPPLEMENT", nameFr: "Gestion livraisons", nameEn: "Shipping management", slug: "livraison", categorySlug: "ecommerce", price: 15000, emoji: "🚚" },
  { type: "SUPPLEMENT", nameFr: "Chatbot IA sur le site", nameEn: "On-site AI chatbot", slug: "chatbot-site", categorySlug: "ia", price: 5000, priceType: "MONTHLY", emoji: "💡" },
  { type: "SUPPLEMENT", nameFr: "Rapports IA mensuels", nameEn: "Monthly AI reports", slug: "rapports-ia", categorySlug: "ia", price: 5000, priceType: "MONTHLY", emoji: "📊" },
  { type: "SUPPLEMENT", nameFr: "SEO & référencement", nameEn: "SEO", slug: "seo", categorySlug: "visibilite", price: 30000, emoji: "🔍" },
  { type: "SUPPLEMENT", nameFr: "Fiche Google Business", nameEn: "Google Business profile", slug: "google-business", categorySlug: "visibilite", price: 10000, emoji: "📍" },
  { type: "SUPPLEMENT", nameFr: "Formation prise en main", nameEn: "Onboarding training", slug: "formation", categorySlug: "visibilite", price: 15000, emoji: "🎓" },
];

const TEMPLATES: ProductInput[] = [
  {
    type: "TEMPLATE",
    nameFr: "Template Restaurant",
    nameEn: "Restaurant template",
    slug: "tpl-restaurant",
    price: 25000,
    priceBuild: 25000,
    priceCode: 60000,
    emoji: "🍽️",
    templateKind: "HTML",
    taglineFr: "Menu, réservation, commande WhatsApp",
    taglineEn: "Menu, reservations, WhatsApp ordering",
  },
  {
    type: "TEMPLATE",
    nameFr: "Template E-commerce mode",
    nameEn: "Fashion e-commerce template",
    slug: "tpl-fashion",
    price: 35000,
    priceBuild: 35000,
    priceCode: 85000,
    emoji: "👗",
    templateKind: "HTML",
    taglineFr: "Catalogue, panier, paiement Mobile Money",
    taglineEn: "Catalog, cart, Mobile Money payment",
  },
  {
    type: "TEMPLATE",
    nameFr: "Template Cabinet / SaaS",
    nameEn: "SaaS / Firm template",
    slug: "tpl-saas",
    price: 30000,
    priceBuild: 30000,
    priceCode: 70000,
    emoji: "📊",
    templateKind: "HTML",
    taglineFr: "Landing corporate sobre et crédible",
    taglineEn: "Clean, credible corporate landing",
  },
];

async function main() {
  console.log("🌱 Seed Komanda…");

  for (const p of [...BASES, AGENT, ...SUPPLEMENTS, ...TEMPLATES]) {
    const { categorySlug, ...data } = p;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: data,
      create: { ...data, status: "ACTIVE" },
    });
  }
  console.log("✅ Produits créés");

  const categories = [
    { slug: "identite", nameFr: "Identité & contenu", nameEn: "Identity & content", emoji: "🎨", order: 1 },
    { slug: "technique", nameFr: "Technique & hébergement", nameEn: "Tech & hosting", emoji: "☁️", order: 2 },
    { slug: "fonctionnalites", nameFr: "Fonctionnalités", nameEn: "Features", emoji: "⚙️", order: 3 },
    { slug: "ecommerce", nameFr: "E-commerce", nameEn: "E-commerce", emoji: "🛒", order: 4 },
    { slug: "ia", nameFr: "Intelligence artificielle", nameEn: "AI", emoji: "🤖", order: 5 },
    { slug: "visibilite", nameFr: "Visibilité & croissance", nameEn: "Visibility & growth", emoji: "🚀", order: 6 },
  ];
  for (const c of categories) {
    await prisma.category.upsert({ where: { slug: c.slug }, update: c, create: c });
  }
  for (const s of SUPPLEMENTS) {
    if (s.categorySlug) {
      const cat = await prisma.category.findUnique({ where: { slug: s.categorySlug } });
      if (cat) {
        await prisma.product.update({ where: { slug: s.slug }, data: { categoryId: cat.id } });
      }
    }
  }
  console.log("✅ Catégories créées");

  const tags = [
    { slug: "populaire", labelFr: "Populaire", labelEn: "Popular", emoji: "🔥" },
    { slug: "nouveau", labelFr: "Nouveau", labelEn: "New", emoji: "✨" },
    { slug: "rapide", labelFr: "Livraison rapide", labelEn: "Fast delivery", emoji: "⚡" },
    { slug: "sans-engagement", labelFr: "Sans engagement", labelEn: "No commitment", emoji: "🤝" },
  ];
  for (const t of tags) {
    await prisma.tag.upsert({ where: { slug: t.slug }, update: t, create: t });
  }
  console.log("✅ Tags créés");

  const groups = [
    { slug: "demarrage", nameFr: "Pour démarrer", nameEn: "Starter picks", emoji: "🚀", order: 1, visible: true },
    { slug: "business", nameFr: "Pour vendre", nameEn: "For selling", emoji: "💼", order: 2, visible: true },
    { slug: "internes", nameFr: "À venir", nameEn: "Coming soon", emoji: "👀", order: 99, visible: false },
  ];
  for (const g of groups) {
    await prisma.productGroup.upsert({ where: { slug: g.slug }, update: g, create: g });
  }
  const starter = await prisma.productGroup.findUnique({ where: { slug: "demarrage" } });
  if (starter) {
    for (const slug of ["vitrine", "logo", "domaine-com", "hebergement"]) {
      const prod = await prisma.product.findUnique({ where: { slug } });
      if (prod) {
        await prisma.productGroupItem.upsert({
          where: { groupId_productId: { groupId: starter.id, productId: prod.id } },
          update: {},
          create: { groupId: starter.id, productId: prod.id },
        });
      }
    }
  }
  console.log("✅ Groupes créés");

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