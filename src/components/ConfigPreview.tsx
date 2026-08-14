"use client";

import type { BaseProduct } from "@/lib/catalog";

export function ConfigPreview({
  base,
  extras,
}: {
  base: BaseProduct;
  extras: Set<string>;
}) {
  if (base.kind === "app") return <Phone extras={extras} />;
  if (base.kind === "audit") return <Scan name={base.name} />;
  return <Laptop base={base} extras={extras} />;
}

function Laptop({ base, extras }: { base: BaseProduct; extras: Set<string> }) {
  const motion = base.id === "vitrine-3d";
  return (
    <div className="rounded-[22px] border border-white/10 bg-black p-3 shadow-2xl">
      <div className="mb-2 flex items-center gap-1.5 px-1">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2 flex-1 rounded-full bg-white/5 py-0.5 text-center text-[9px] text-white/30">
          {base.name.toLowerCase()}.africa
        </span>
      </div>
      <div
        className={`relative overflow-hidden rounded-[14px] ${motion ? "bg-[#12100c] text-white" : "bg-[#fffaf0] text-[#15110c]"}`}
      >
        <div className="flex items-center justify-between px-4 py-3 text-[10px] font-bold">
          <span>Maison</span>
          <span className="rounded-full bg-[#FFD23F] px-2 py-0.5 text-[#15110c]">Menu</span>
        </div>
        <div className={`px-4 pb-5 pt-2 ${motion ? "min-h-[168px]" : "min-h-[150px]"}`}>
          <div className={`font-display text-[22px] font-black leading-none ${motion ? "text-[#FFD23F]" : ""}`}>
            {motion ? "Entre." : "Bienvenue."}
          </div>
          <div className={`mt-2 h-1.5 w-16 rounded ${motion ? "bg-[#FFD23F]" : "bg-[#15110c]"}`} />
          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`h-10 rounded-md ${motion ? "bg-white/10" : "bg-[#15110c]/8"}`} />
            ))}
          </div>
        </div>
        {extras.has("whatsapp") && (
          <div className="absolute bottom-3 right-3 grid h-7 w-7 place-items-center rounded-full bg-[#25D366] text-[11px] text-white">
            ✉
          </div>
        )}
        {extras.has("boutique") && (
          <div className="absolute right-3 top-3 rounded-full bg-[#FFD23F] px-2 py-0.5 text-[9px] font-extrabold text-[#15110c]">
            Panier 2
          </div>
        )}
        {extras.has("agent-whatsapp") && (
          <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2 py-1 text-[9px] font-bold text-[#15110c]">
            Agent en ligne
          </div>
        )}
      </div>
    </div>
  );
}

function Phone({ extras }: { extras: Set<string> }) {
  return (
    <div className="mx-auto w-[190px] rounded-[32px] border border-white/10 bg-black p-2.5">
      <div className="relative overflow-hidden rounded-[24px] bg-[#0e4a27] px-3 pb-4 pt-8 text-white">
        <div className="absolute left-1/2 top-2 h-3 w-14 -translate-x-1/2 rounded-full bg-black" />
        <div className="font-display text-lg font-black text-[#FFD23F]">Ton app</div>
        <div className="mt-3 space-y-1.5">
          {["Commandes", "Clients", "Paiements"].map((x) => (
            <div key={x} className="rounded-xl bg-white/10 px-3 py-2 text-[11px] font-bold">
              {x}
            </div>
          ))}
        </div>
        {extras.has("agent-whatsapp") && (
          <div className="mt-3 rounded-xl bg-[#25D366] px-3 py-2 text-[10px] font-bold text-[#062810]">Agent WhatsApp lié</div>
        )}
      </div>
    </div>
  );
}

function Scan({ name }: { name: string }) {
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black p-5 font-mono text-[12px] text-[#FFD23F]">
      <div className="text-[10px] uppercase tracking-[.18em] text-white/40">audit · {name}</div>
      <div className="mt-4 space-y-2 text-white/80">
        <div>crawling routes…</div>
        <div>lighthouse mobile…</div>
        <div>parcours checkout…</div>
      </div>
      <div className="mt-6 font-display text-4xl font-black text-white">scan</div>
      <div className="pointer-events-none absolute inset-x-0 h-14 bg-gradient-to-b from-[#FFD23F]/30 to-transparent" style={{ animation: "scan 3.2s ease-in-out infinite" }} />
    </div>
  );
}
