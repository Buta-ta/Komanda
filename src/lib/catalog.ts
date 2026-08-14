import storeData from "../../data/store.json";

export type Store = {
  settings: { adminPassword?: string; whatsapp: string };
  bases: Product[];
  supplements: Supplement[];
  packs: Pack[];
  projects: Project[];
};

export type Product = {
  id: string;
  name: string;
  price: number;
  tagline?: string;
  features: string[];
  popular?: boolean;
  delay?: string;
  kind?: "site" | "app" | "audit";
  visible?: boolean;
};

export type Supplement = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: "once" | "monthly" | "yearly";
  category: string;
  emoji: string;
};

export type Pack = {
  id: string;
  name: string;
  tagline: string;
  baseId: string;
  supplementIds: string[];
  price: number;
  priceType: "once" | "monthly" | "yearly";
  saving?: number;
  highlight?: boolean;
};

export type StoreProject = {
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
};

export type Project = StoreProject;

const data = storeData as Store;

export const DEFAULT_STORE: Store = {
  settings: { whatsapp: data.settings?.whatsapp || "2290151295927" },
  bases: data.bases || [],
  supplements: data.supplements || [],
  packs: data.packs || [],
  projects: data.projects || [],
};

export const BASES: Product[] = DEFAULT_STORE.bases;
export const SUPPLEMENTS: Supplement[] = DEFAULT_STORE.supplements;
export const PACKS: Pack[] = DEFAULT_STORE.packs;
export const PROJECTS: Project[] = DEFAULT_STORE.projects;

export function featuredProjects(store: Store): Project[] {
  return (store.projects || []).filter((p) => p.featured !== false);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount) + " CFA";
}