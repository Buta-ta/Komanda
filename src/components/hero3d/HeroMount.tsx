"use client";

import dynamic from "next/dynamic";

export const HeroMount = dynamic(
  () => import("./HeroWorld").then((m) => m.HeroWorld),
  { ssr: false, loading: () => <div className="h-screen bg-[#FFD23F]" /> }
);
