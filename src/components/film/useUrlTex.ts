"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";

export function useUrlTex(url: string) {
  const [tex, setTex] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let alive = true;
    const loader = new THREE.TextureLoader();
    const t = loader.load(url, (loaded) => {
      if (!alive) return;
      loaded.colorSpace = THREE.SRGBColorSpace;
      loaded.minFilter = THREE.LinearFilter;
      loaded.magFilter = THREE.LinearFilter;
      setTex(loaded);
    });
    return () => {
      alive = false;
      t.dispose();
    };
  }, [url]);

  return tex;
}

export function useHtmlImage(url: string) {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    const el = new Image();
    el.src = url;
    el.onload = () => setImg(el);
  }, [url]);
  return img;
}
