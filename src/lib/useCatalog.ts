"use client";

import { useEffect, useState } from "react";
import { DEFAULT_STORE, type Store } from "./catalog";

/**
 * Hook client pour lire le catalogue.
 * En dev/prod, il charge /api/store (qui lit data/store.json).
 * Quand l'admin enregistre, un rechargement de page met à jour.
 */
export function useCatalog() {
  const [store, setStore] = useState<Store>(DEFAULT_STORE);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/store")
      .then((r) => r.json())
      .then((data: Store) => {
        if (!active || !data?.bases) return;
        setStore(data);
      })
      .catch(() => {})
      .finally(() => {
        if (active) {
          setLoading(false);
          setReady(true);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return {
    store,
    loading,
    ready,
    bases: store.bases.filter((b) => b.visible !== false),
    supplements: store.supplements,
    packs: store.packs,
    projects: store.projects,
  };
}