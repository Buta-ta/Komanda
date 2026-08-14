import { DEFAULT_STORE, featuredProjects, type StoreProject } from "./catalog";

export type ProjectCategory = "vitrine" | "3d" | "ecommerce" | "agent" | "app" | "audit";

export type Project = StoreProject;

export const PROJECTS: Project[] = featuredProjects(DEFAULT_STORE);

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  vitrine: "Vitrine",
  "3d": "3D Motion",
  ecommerce: "E-commerce",
  agent: "Agent IA",
  app: "Application",
  audit: "Audit",
};
