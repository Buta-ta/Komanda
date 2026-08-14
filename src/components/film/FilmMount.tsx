"use client";

import dynamic from "next/dynamic";

export const FilmMount = dynamic(() => import("./Film").then((m) => m.Film), {
  ssr: false,
  loading: () => <div className="h-screen bg-[#FFD23F]" />,
});
