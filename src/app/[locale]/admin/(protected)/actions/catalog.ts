// ============================================================
// À remplacer : src/app/[locale]/admin/(protected)/actions/catalog.ts
// (plus AUCUN prisma) — écritures via client service_role
// Champs bilingues : nameEn, taglineEn, descriptionEn, featuresEn
// ============================================================
"use server";

import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

type ProductType = "BASE" | "SUPPLEMENT" | "PACK" | "AGENT" | "APP" | "TEMPLATE" | "AUDIT" | "STUDIO";
type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";
type PriceType = "ONCE" | "MONTHLY" | "YEARLY";
type TemplateKind = "HTML" | "NEXTJS" | "SCREENSHOT" | "FIGMA";
type OrderStatus =
  | "PENDING_PAYMENT" | "ONBOARDING" | "IN_PRODUCTION" | "PREVIEW_READY"
  | "AWAITING_PAYMENT" | "PAID" | "IN_REVIEW" | "DELIVERED"
  | "CANCELLED" | "REFUNDED";

async function guard(locale: string) {
  await requireAdmin(locale);
}

/* =================== PRODUITS =================== */

export async function listProducts(locale: string, type?: ProductType) {
  await guard(locale);
  const supabase = createAdminClient();
  let q = supabase
    .from("Product")
    .select("*")
    .order("order", { ascending: true })
    .order("createdAt", { ascending: false });
  if (type) q = q.eq("type", type);
  const { data } = await q;
  return data ?? [];
}

export async function saveProduct(locale: string, formData: FormData) {
  await guard(locale);
  const supabase = createAdminClient();
  const id = (formData.get("id") as string) || undefined;

  const splitLines = (v: FormDataEntryValue | null): string[] =>
    (v as string)?.split("\n").map((s) => s.trim()).filter(Boolean) || [];

  const categoryIds = formData.getAll("categoryIds") as string[];
  const tagIds = formData.getAll("tagIds") as string[];

  const payload = {
    type: formData.get("type") as ProductType,
    name: formData.get("name") as string,
    nameEn: (formData.get("nameEn") as string) || null,
    slug: (formData.get("slug") as string) || slugify(formData.get("name") as string),
    tagline: (formData.get("tagline") as string) || null,
    taglineEn: (formData.get("taglineEn") as string) || null,
    description: (formData.get("description") as string) || null,
    descriptionEn: (formData.get("descriptionEn") as string) || null,
    price: Number(formData.get("price")) || 0,
    priceType: (formData.get("priceType") as PriceType) || "ONCE",
    emoji: (formData.get("emoji") as string) || null,
    coverUrl: (formData.get("coverUrl") as string) || null,
    category: (formData.get("category") as string) || null,
    features: splitLines(formData.get("features")),
    featuresEn: splitLines(formData.get("featuresEn")),
    status: (formData.get("status") as ProductStatus) || "ACTIVE",
    order: Number(formData.get("order")) || 0,
    revisionsIncluded: Number(formData.get("revisionsIncluded")) || 1,
    extraRevisionPrice: Number(formData.get("extraRevisionPrice")) || 5000,
    templateKind: (formData.get("templateKind") as TemplateKind) || null,
    templateUrl: (formData.get("templateUrl") as string) || null,
    templateFileUrl: (formData.get("templateFileUrl") as string) || null,
    priceBuild: formData.get("priceBuild") ? Number(formData.get("priceBuild")) : null,
    priceCode: formData.get("priceCode") ? Number(formData.get("priceCode")) : null,
  };

  let productId = id;
  if (id) {
    await supabase.from("Product").update(payload).eq("id", id);
  } else {
    const { data: inserted, error: insErr } = await supabase
      .from("Product")
      .insert(payload)
      .select("id")
      .single();
    if (insErr) throw new Error(insErr.message);
    productId = inserted?.id;
  }

  // Relations : remplace les catégories & tags du produit
  if (productId) {
    await supabase.from("ProductCategory").delete().eq("productId", productId);
    await supabase.from("ProductTag").delete().eq("productId", productId);

    if (categoryIds.length) {
      await supabase.from("ProductCategory").insert(
        categoryIds.map((categoryId) => ({ productId, categoryId }))
      );
    }
    if (tagIds.length) {
      await supabase.from("ProductTag").insert(
        tagIds.map((tagId) => ({ productId, tagId }))
      );
    }
  }

  revalidatePath(`/${locale}/admin/produits`);
  redirect(`/${locale}/admin/produits`);
}

/** Charge un produit avec ses catégories & tags (pour l'édition). */
export async function getProductWithRelations(locale: string, id: string) {
  await guard(locale);
  const supabase = createAdminClient();
  const { data: product } = await supabase.from("Product").select("*").eq("id", id).single();
  const { data: cats } = await supabase
    .from("ProductCategory")
    .select("categoryId")
    .eq("productId", id);
  const { data: tags } = await supabase
    .from("ProductTag")
    .select("tagId")
    .eq("productId", id);
  return {
    product: product ?? null,
    categoryIds: (cats ?? []).map((c) => c.categoryId),
    tagIds: (tags ?? []).map((t) => t.tagId),
  };
}

export async function deleteProduct(locale: string, id: string) {
  await guard(locale);
  const supabase = createAdminClient();
  await supabase.from("Product").delete().eq("id", id);
  revalidatePath(`/${locale}/admin/produits`);
}

export async function toggleProductStatus(locale: string, id: string) {
  await guard(locale);
  const supabase = createAdminClient();
  const { data: p } = await supabase.from("Product").select("status").eq("id", id).single();
  if (!p) return;
  const next: ProductStatus = p.status === "ACTIVE" ? "ARCHIVED" : "ACTIVE";
  await supabase.from("Product").update({ status: next }).eq("id", id);
  revalidatePath(`/${locale}/admin/produits`);
}

/* =================== PACKS =================== */

export async function listPacks(locale: string) {
  await guard(locale);
  const supabase = createAdminClient();
  const { data: packs } = await supabase
    .from("Product")
    .select("*")
    .eq("type", "PACK")
    .order("createdAt", { ascending: false });
  const { data: all } = await supabase
    .from("Product")
    .select("*")
    .in("type", ["BASE", "SUPPLEMENT"])
    .order("name", { ascending: true });
  return { packs: packs ?? [], all: all ?? [] };
}

/* =================== SHOWROOM =================== */

export async function listProjects(locale: string) {
  await guard(locale);
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("Project")
    .select("*")
    .order("order", { ascending: true })
    .order("createdAt", { ascending: false });
  return data ?? [];
}

export async function saveProject(locale: string, formData: FormData) {
  await guard(locale);
  const supabase = createAdminClient();
  const id = (formData.get("id") as string) || undefined;
  const payload = {
    title: formData.get("title") as string,
    client: (formData.get("client") as string) || null,
    sector: (formData.get("sector") as string) || null,
    country: (formData.get("country") as string) || null,
    category: (formData.get("category") as string) || null,
    year: Number(formData.get("year")) || new Date().getFullYear(),
    coverUrl: (formData.get("coverUrl") as string) || null,
    link: (formData.get("link") as string) || null,
    description: (formData.get("description") as string) || null,
    tags:
      (formData.get("tags") as string)?.split(",").map((s) => s.trim()).filter(Boolean) || [],
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order")) || 0,
  };
  if (id) await supabase.from("Project").update(payload).eq("id", id);
  else await supabase.from("Project").insert(payload);
  revalidatePath(`/${locale}/admin/showroom`);
  redirect(`/${locale}/admin/showroom`);
}

export async function deleteProject(locale: string, id: string) {
  await guard(locale);
  const supabase = createAdminClient();
  await supabase.from("Project").delete().eq("id", id);
  revalidatePath(`/${locale}/admin/showroom`);
}

/* =================== COMMANDES =================== */

export async function listOrders(locale: string) {
  await guard(locale);
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("Order")
    .select('*, Customer(email, "fullName", phone), OrderItem(*), Payment(*)')
    .order("createdAt", { ascending: false })
    .limit(100);
  return data ?? [];
}

export async function getOrder(locale: string, id: string) {
  await guard(locale);
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("Order")
    .select('*, Customer(*), OrderItem(*, Product(*)), Payment(*), OrderEvent(*), Conversation(*, Message(*))')
    .eq("id", id)
    .single();
  return data ?? null;
}

export async function updateOrderStatus(
  locale: string,
  orderId: string,
  status: OrderStatus,
  message?: string
) {
  await guard(locale);
  const supabase = createAdminClient();
  await supabase.from("Order").update({ status }).eq("id", orderId);
  await supabase.from("OrderEvent").insert({
    orderId,
    status,
    message: message || `Statut changé → ${status}`,
    authorId: "admin",
  });
  revalidatePath(`/${locale}/admin/commandes`);
  revalidatePath(`/${locale}/admin/commandes/${orderId}`);
}

/* =================== CLIENTS =================== */

export async function listCustomers(locale: string) {
  await guard(locale);
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("Customer")
    .select('*, Order(id)')
    .order("createdAt", { ascending: false });
  const customers = (data ?? []).map((c) => ({
    ...c,
    _count: { orders: (c.Order as unknown as unknown[] | undefined)?.length ?? 0 },
  }));
  return customers;
}

/* =================== CATÉGORIES =================== */

export async function listCategories(locale: string) {
  await guard(locale);
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("Category")
    .select('*, ProductCategory(productId)')
    .order("order", { ascending: true });
  return data ?? [];
}

export async function saveCategory(locale: string, formData: FormData) {
  await guard(locale);
  const supabase = createAdminClient();
  const existingId = (formData.get("id") as string) || "";
  const id = existingId || crypto.randomUUID();
  const payload = {
    id,
    nameFr: formData.get("nameFr") as string,
    nameEn: (formData.get("nameEn") as string) || null,
    emoji: (formData.get("emoji") as string) || null,
    parentId: (formData.get("parentId") as string) || null,
    order: Number(formData.get("order")) || 0,
  };
  if (existingId) await supabase.from("Category").update(payload).eq("id", existingId);
  else await supabase.from("Category").insert(payload);
  revalidatePath(`/${locale}/admin/categories`);
  revalidatePath(`/${locale}/admin/produits`);
}

export async function deleteCategory(locale: string, id: string) {
  await guard(locale);
  const supabase = createAdminClient();
  await supabase.from("Category").delete().eq("id", id);
  revalidatePath(`/${locale}/admin/categories`);
}

/* =================== TAGS =================== */

export async function listTags(locale: string) {
  await guard(locale);
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("Tag")
    .select('*, ProductTag(productId)')
    .order("order", { ascending: true });
  return data ?? [];
}

export async function saveTag(locale: string, formData: FormData) {
  await guard(locale);
  const supabase = createAdminClient();
  const existingId = (formData.get("id") as string) || "";
  const id = existingId || crypto.randomUUID();
  const payload = {
    id,
    nameFr: formData.get("nameFr") as string,
    nameEn: (formData.get("nameEn") as string) || null,
    emoji: (formData.get("emoji") as string) || null,
    color: (formData.get("color") as string) || null,
    order: Number(formData.get("order")) || 0,
  };
  if (existingId) await supabase.from("Tag").update(payload).eq("id", existingId);
  else await supabase.from("Tag").insert(payload);
  revalidatePath(`/${locale}/admin/tags`);
  revalidatePath(`/${locale}/admin/produits`);
}

export async function deleteTag(locale: string, id: string) {
  await guard(locale);
  const supabase = createAdminClient();
  await supabase.from("Tag").delete().eq("id", id);
  revalidatePath(`/${locale}/admin/tags`);
}

/* =================== GROUPES =================== */

export async function listGroups(locale: string) {
  await guard(locale);
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("ProductGroup")
    .select('*, ProductGroupItem(productId)')
    .order("order", { ascending: true });
  return data ?? [];
}

export async function saveGroup(locale: string, formData: FormData) {
  await guard(locale);
  const supabase = createAdminClient();
  const existingId = (formData.get("id") as string) || "";
  const id = existingId || crypto.randomUUID();
  const payload = {
    id,
    nameFr: formData.get("nameFr") as string,
    nameEn: (formData.get("nameEn") as string) || null,
    emoji: (formData.get("emoji") as string) || null,
    order: Number(formData.get("order")) || 0,
  };
  if (existingId) await supabase.from("ProductGroup").update(payload).eq("id", existingId);
  else await supabase.from("ProductGroup").insert(payload);
  revalidatePath(`/${locale}/admin/groupes`);
}

export async function deleteGroup(locale: string, id: string) {
  await guard(locale);
  const supabase = createAdminClient();
  // Le lien ProductGroupItem est supprimé en cascade
  await supabase.from("ProductGroup").delete().eq("id", id);
  revalidatePath(`/${locale}/admin/groupes`);
}

/** Ajoute ou retire un produit d'un groupe (toggle). */
export async function toggleGroupItem(locale: string, groupId: string, productId: string) {
  await guard(locale);
  const supabase = createAdminClient();
  const { data: existing } = await supabase
    .from("ProductGroupItem")
    .select("groupId")
    .eq("groupId", groupId)
    .eq("productId", productId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("ProductGroupItem")
      .delete()
      .eq("groupId", groupId)
      .eq("productId", productId);
  } else {
    await supabase.from("ProductGroupItem").insert({ groupId, productId });
  }
  revalidatePath(`/${locale}/admin/groupes`);
}

/* =================== HELPERS =================== */

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
