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
  nameEn?: string;
  price: number;
  tagline: string;
  taglineEn?: string;
  features: string[];
  featuresEn?: string[];
  popular?: boolean;
  delay: string;
  delayEn?: string;
  kind: "site" | "app" | "audit";
  visible?: boolean;
}

export interface Supplement {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  priceType: "once" | "monthly" | "yearly";
  category: SupplementCategory;
  emoji: string;
}

export interface Pack {
  id: string;
  name: string;
  nameEn?: string;
  tagline: string;
  taglineEn?: string;
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
  titleEn?: string;
  client: string;
  sector: string;
  sectorEn?: string;
  country: string;
  countryEn?: string;
  category: string;
  year: number;
  description: string;
  descriptionEn?: string;
  tags: string[];
  tagsEn?: string[];
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

/** Renvoie la valeur EN si locale === "en" et qu'une traduction existe, sinon le FR. */
export function pick<T>(locale: string, fr: T, en: T | undefined): T {
  return locale === "en" && en !== undefined ? en : fr;
}

export function formatPrice(amount: number, locale: string = "fr"): string {
  const loc = locale.startsWith("en") ? "en-US" : "fr-FR";
  return new Intl.NumberFormat(loc).format(amount) + " CFA";
}

export function visibleBases(store: Store = DEFAULT_STORE) {
  return store.bases.filter((b) => b.visible !== false);
}

export function getBase(id: string, store: Store | null = DEFAULT_STORE): BaseProduct | undefined {
  return (store ?? DEFAULT_STORE).bases.find((b) => b.id === id);
}

export function getSupplement(id: string, store: Store | null = DEFAULT_STORE): Supplement | undefined {
  return (store ?? DEFAULT_STORE).supplements.find((s) => s.id === id);
}

export function getPack(id: string, store: Store | null = DEFAULT_STORE): Pack | undefined {
  return (store ?? DEFAULT_STORE).packs.find((p) => p.id === id);
}

export function featuredProjects(store: Store = DEFAULT_STORE) {
  return store.projects.filter((p) => p.featured !== false);
}
