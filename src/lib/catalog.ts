import fallback from "../../data/store.json";

export type SupplementCategory =
  | "contenu"
  | "technique"
  | "fonctionnalites"
  | "ecommerce"
  | "ia"
  | "visibilite";

export type BaseId = "vitrine" | "vitrine-3d" | "app" | "audit";

export interface BaseProduct {
  id: BaseId;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  popular?: boolean;
  delay: string;
  kind: "site" | "app" | "audit";
  visible?: boolean;
}

export interface Supplement {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: "once" | "monthly" | "yearly";
  category: SupplementCategory;
  emoji: string;
}

export interface Pack {
  id: string;
  name: string;
  tagline: string;
  baseId: BaseId;
  supplementIds: string[];
  price: number;
  priceType: "once" | "monthly";
  saving?: number;
  highlight?: boolean;
}

export interface StoreProject {
  id: string;
  title: string;
  client: string;
  sector: string;
  country: string;
  category: string;
  year: number;
  description: string;
  tags: string[];
  cover: string;
  coverFrom: string;
  coverTo: string;
  featured?: boolean;
  link?: string;
}

export interface Store {
  settings: { adminPassword: string; whatsapp: string };
  bases: BaseProduct[];
  supplements: Supplement[];
  packs: Pack[];
  projects: StoreProject[];
}

export const DEFAULT_STORE = fallback as Store;

/** Snapshot au boot — les pages client doivent préférer useCatalog() pour voir l'admin. */
export const BASES: BaseProduct[] = DEFAULT_STORE.bases;
export const SUPPLEMENTS: Supplement[] = DEFAULT_STORE.supplements;
export const PACKS: Pack[] = DEFAULT_STORE.packs;

export function formatPrice(amount: number, locale: string = "fr"): string {
  const loc = locale.startsWith("en") ? "en-US" : "fr-FR";
  return new Intl.NumberFormat(loc).format(amount) + " CFA";
}

export function visibleBases(store: Store = DEFAULT_STORE) {
  return store.bases.filter((b) => b.visible !== false);
}

export function getBase(id: string, store: Store = DEFAULT_STORE): BaseProduct | undefined {
  return store.bases.find((b) => b.id === id);
}

export function getSupplement(id: string, store: Store = DEFAULT_STORE): Supplement | undefined {
  return store.supplements.find((s) => s.id === id);
}

export function getPack(id: string, store: Store = DEFAULT_STORE): Pack | undefined {
  return store.packs.find((p) => p.id === id);
}

export function featuredProjects(store: Store = DEFAULT_STORE) {
  return store.projects.filter((p) => p.featured !== false);
}
