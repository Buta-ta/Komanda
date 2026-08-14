import { NextRequest, NextResponse } from "next/server";
import { cloudinary, CLOUDINARY_FOLDERS } from "@/lib/cloudinary";
import { getAdminUser } from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Upload signé vers Cloudinary, côté serveur.
 * L'admin ou le client connecté envoie un fichier.
 * Le fichier transite par notre serveur pour signer la requête.
 */
export async function POST(req: NextRequest) {
  // L'upload publique (onboarding client) ou admin (catalogue)
  const isAdmin = !!(await getAdminUser());

  const form = await req.formData();
  const file = form.get("file");
  const context = (form.get("context") as string) || "onboarding";

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "missing_file" }, { status: 400 });
  }

  // Aucune limite de taille comme demandé, mais on type
  if (!file.type.startsWith("image/") && !file.type.includes("pdf") && !file.type.includes("zip") && !file.type.includes("word")) {
    return NextResponse.json({ error: "unsupported_type" }, { status: 400 });
  }

  // Si c'est un catalogue/template/studio, seul l'admin peut uploader
  if (["templates", "showroom", "studio"].includes(context) && !isAdmin) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const folder =
    CLOUDINARY_FOLDERS[context as keyof typeof CLOUDINARY_FOLDERS] ||
    CLOUDINARY_FOLDERS.onboarding;

  const arrayBuf = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuf);
  const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

  try {
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload(
        dataUri,
        {
          folder,
          resource_type: "auto",
          use_filename: true,
          unique_filename: true,
          overwrite: false,
        },
        (err, res) => (err ? reject(err) : resolve(res))
      );
    });

    return NextResponse.json({
      publicId: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    });
  } catch (err) {
    console.error("Cloudinary upload failed", err);
    return NextResponse.json({ error: "upload_failed" }, { status: 500 });
  }
}
