import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

/** Dossiers Cloudinary utilisés par Komanda. */
export const CLOUDINARY_FOLDERS = {
  showroom: "komanda/showroom",
  templates: "komanda/templates",
  onboarding: "komanda/onboarding",
  messages: "komanda/messages",
  studio: "komanda/studio",
} as const;

/** Transformations appliquées par défaut (optimisation + conversion WebP). */
export function optimize(publicId: string, opts: { width?: number; height?: number } = {}) {
  return cloudinary.url(publicId, {
    folder: "komanda",
    width: opts.width,
    height: opts.height,
    crop: opts.width || opts.height ? "fill" : undefined,
    quality: "auto",
    fetch_format: "auto",
    secure: true,
  });
}
