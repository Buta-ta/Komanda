import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store.server";
import type { Store } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = readStore();
  const publicStore = {
    ...store,
    settings: { whatsapp: store.settings.whatsapp, adminPassword: "" },
  };
  return NextResponse.json(publicStore);
}

export async function PUT(req: NextRequest) {
  const password = req.headers.get("x-admin-password") || "";
  const current = readStore();
  const expected = process.env.ADMIN_PASSWORD || current.settings.adminPassword || "komanda";
  if (password !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as Store;
  if (!body?.bases || !body?.supplements || !body?.packs || !body?.projects) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const next: Store = {
    ...body,
    settings: {
      adminPassword: current.settings.adminPassword,
      whatsapp: body.settings?.whatsapp || current.settings.whatsapp,
    },
  };
  writeStore(next);
  return NextResponse.json({ ok: true });
}
