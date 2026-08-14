"use client";

import { useEffect, useState } from "react";

export const FRAME_COUNT = 94;

const cache: HTMLImageElement[] = [];

export function useFilmFrames() {
  const [frames, setFrames] = useState<HTMLImageElement[]>(cache.length ? cache : []);
  const [loaded, setLoaded] = useState(cache.length);
  const [ready, setReady] = useState(cache.length === FRAME_COUNT);
  const [hasFirst, setHasFirst] = useState(cache.length > 0);

  useEffect(() => {
    if (cache.length === FRAME_COUNT) {
      setFrames(cache.slice());
      setLoaded(FRAME_COUNT);
      setReady(true);
      setHasFirst(true);
      return;
    }

    let cancelled = false;
    const step = typeof window !== "undefined" && window.innerWidth < 720 ? 2 : 1;
    const indices: number[] = [];
    for (let i = 1; i <= FRAME_COUNT; i += step) indices.push(i);

    const loadOne = (frameNo: number) =>
      new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = `/hero-push/p_${String(frameNo).padStart(3, "0")}.jpg`;
        const done = () => resolve(img);
        img.onload = done;
        img.onerror = done;
      });

    (async () => {
      const first = await loadOne(indices[0]);
      if (cancelled) return;
      cache[0] = first;
      setFrames([first]);
      setHasFirst(true);
      setLoaded(1);

      const rest: HTMLImageElement[] = [first];
      for (let i = 1; i < indices.length; i += 8) {
        const batch = await Promise.all(indices.slice(i, i + 8).map(loadOne));
        if (cancelled) return;
        rest.push(...batch);
        setFrames(rest.slice());
        setLoaded(rest.length);
      }
      cache.length = 0;
      cache.push(...rest);
      setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { frames, loaded, ready, hasFirst };
}
