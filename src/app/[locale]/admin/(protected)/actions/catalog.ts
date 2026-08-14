"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ProductType, ProductStatus, PriceType, TemplateKind, OrderStatus } from "@prisma/client";

async function guard(locale: string) {
  await requireAdmin(locale);
}

export async function listProducts(locale: string, type?: ProductType) {
  await guard(locale);
  return prisma.product.findMany({
    where: type ? { type } : undefined,
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function saveProduct(locale: string, formData: FormData) {
  await guard(locale);
  const id = (formData.get("id") as string) || undefined;
  const data = {
    type: formData.get("type") as ProductType,
    name: formData.get("name") as string,
    slug: (formData.get("slug") as string) || slugify(formData.get("name") as string),
    tagline: (formData.get("tagline") as string) || null,
    description: (formData.get("description") as string) || null,
    price: Number(formData.get("price")) || 0,
    priceType: (formData.get("priceType") as PriceType) || "ONCE",
    emoji: (formData.get("emoji") as string) || null,
    coverUrl: (formData.get("coverUrl") as string) || null,
    category: (formData.get("category") as string) || null,
    features: (formData.get("features") as string)
      ?.split("\n").map((s) => s.trim()).filter(Boolean) || [],
    status: (formData.get("status") as ProductStatus) || "ACTIVE",
    order: Number(formData.get("order")) || 0,
    revisionsIncluded: Number(formData.get("revisionsIncluded")) ?? 1,
    extraRevisionPrice: Number(formData.get("extraRevisionPrice")) || 5000,
    templateKind: (formData.get("templateKind") as TemplateKind) || null,
    templateUrl: (formData.get("templateUrl") as string) || null,
    templateFileUrl: (formData.get("templateFileUrl") as string) || null,
    priceBuild: formData.get("priceBuild") ? Number(formData.get("priceBuild")) : null,
    priceCode: formData.get("priceCode") ? Number(formData.get("priceCode")) : null,
  };

  if (id) await prisma.product.update({ where: { id }, data });
  else await prisma.product.create({ data });
  revalidatePath(`/${locale}/admin/produits`);
  redirect(`/${locale}/admin/produits`);
}

export async function deleteProduct(locale: string, id: string) {
  await guard(locale);
  await prisma.product.delete({ where: { id } });
  revalidatePath(`/${locale}/admin/produits`);
}

export async function toggleProductStatus(locale: string, id: string) {
  await guard(locale);
  const p = await prisma.product.findUnique({ where: { id } });
  if (!p) return;
  await prisma.product.update({
    where: { id },
    data: { status: p.status === "ACTIVE" ? "ARCHIVED" : "ACTIVE" },
  });
  revalidatePath(`/${locale}/admin/produits`);
}

export async function listPacks(locale: string) {
  await guard(locale);
  const packs = await prisma.product.findMany({
    where: { type: "PACK" },
    include: { packItems: { include: { item: true } } },
    orderBy: { createdAt: "desc" },
  });
  const all = await prisma.product.findMany({
    where: { type: { in: ["BASE", "SUPPLEMENT"] } },
    orderBy: { name: "asc" },
  });
  return { packs, all };
}

export async function listProjects(locale: string) {
  await guard(locale);
  return prisma.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
}

export async function saveProject(locale: string, formData: FormData) {
  await guard(locale);
  const id = (formData.get("id") as string) || undefined;
  const data = {
    title: formData.get("title") as string,
    client: (formData.get("client") as string) || null,
    sector: (formData.get("sector") as string) || null,
    country: (formData.get("country") as string) || null,
    category: (formData.get("category") as string) || null,
    year: Number(formData.get("year")) || new Date().getFullYear(),
    coverUrl: (formData.get("coverUrl") as string) || null,
    link: (formData.get("link") as string) || null,
    description: (formData.get("description") as string) || null,
    tags: (formData.get("tags") as string)
      ?.split(",").map((s) => s.trim()).filter(Boolean) || [],
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order")) || 0,
  };
  if (id) await prisma.project.update({ where: { id }, data });
  else await prisma.project.create({ data });
  revalidatePath(`/${locale}/admin/showroom`);
  redirect(`/${locale}/admin/showroom`);
}

export async function deleteProject(locale: string, id: string) {
  await guard(locale);
  await prisma.project.delete({ where: { id } });
  revalidatePath(`/${locale}/admin/showroom`);
}

export async function listOrders(locale: string) {
  await guard(locale);
  return prisma.order.findMany({
    include: {
      customer: { select: { email: true, fullName: true, phone: true } },
      items: true,
      payments: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export async function getOrder(locale: string, id: string) {
  await guard(locale);
  return prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      items: { include: { product: true } },
      payments: true,
      timeline: { orderBy: { createdAt: "asc" } },
      conversations: { include: { messages: { orderBy: { createdAt: "asc" } } } },
    },
  });
}

export async function updateOrderStatus(
  locale: string,
  orderId: string,
  status: OrderStatus,
  message?: string
) {
  await guard(locale);
  await prisma.order.update({ where: { id: orderId }, data: { status } });
  await prisma.orderEvent.create({
    data: { orderId, status, message: message || `Statut → ${status}`, authorId: "admin" },
  });
  revalidatePath(`/${locale}/admin/commandes`);
  revalidatePath(`/${locale}/admin/commandes/${orderId}`);
}

export async function listCustomers(locale: string) {
  await guard(locale);
  return prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } } },
  });
}

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}