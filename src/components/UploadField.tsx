"use client";

import { useState } from "react";
import { Loader2, Upload, X } from "lucide-react";

type Props = {
  context?: "onboarding" | "messages" | "templates" | "showroom" | "studio";
  accept?: string;
  onChange?: (file: { url: string; publicId: string } | null) => void;
  label?: string;
};

export function UploadField({
  context = "onboarding",
  accept = "image/*,application/pdf,application/zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  onChange,
  label = "Glisse un fichier ou clique ici",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFile = async (file?: File) => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("context", context);
      const res = await fetch("/api/upload", { method: "POST", body });
      if (!res.ok) throw new Error("upload_failed");
      const data = await res.json();
      setPreview(data.url);
      onChange?.({ url: data.url, publicId: data.publicId });
    } catch {
      setError("Échec du téléversement. Réessaie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <label className="block">
      <div className="relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-komanda-charcoal/15 bg-white/60 p-6 text-center transition hover:border-komanda-gold hover:bg-komanda-yellow/10">
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin text-komanda-gold" />
        ) : preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="max-h-32 rounded-lg object-contain" />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setPreview(null);
                onChange?.(null);
              }}
              className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-komanda-charcoal text-white"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <Upload className="h-6 w-6 text-komanda-gold" />
            <span className="text-sm font-semibold text-komanda-charcoal/70">{label}</span>
            <span className="text-[11px] text-komanda-charcoal/40">
              Images, PDF, DOC, ZIP · Aucune limite de taille
            </span>
          </>
        )}
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </div>
      {error && <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
    </label>
  );
}
