"use client";

import { useEffect, useState } from "react";
import { DEFAULT_STORE, type Store } from "./catalog";

export function useCatalog() {
  const [store, setStore] = useState<Store>(DEFAULT_STORE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/store")
      .then((r) => r.json())
      .then((data: Store) => {
        if (!alive || !data?.bases) return;
        setStore(data);
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setReady(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { store, ready, bases: store.bases.filter((b) => b.visible !== false), supplements: store.supplements, packs: store.packs, projects: store.projects };
}
