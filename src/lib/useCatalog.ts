"use client";

import { useEffect, useState } from "react";
import type { Store } from "./catalog";

/**
 * Hook client pour lire le catalogue.
 * En dev/prod, il charge /api/store (qui lit data/store.json).
 * Quand l'admin enregistre, un rechargement de page met à jour.
 */
export function useCatalog() {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/store")
      .then((r) => r.json())
      .then((data: Store) => {
        if (active) {
          setStore(data);
          setLoading(false);
        }
      })
      .catch(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { store, loading };
}