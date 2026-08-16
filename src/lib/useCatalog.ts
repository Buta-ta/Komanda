"use client";

import { useEffect, useState } from "react";
<<<<<<< HEAD
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
=======
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
>>>>>>> f6e96b805ef61188457195cfdaa1aef6643990ba
