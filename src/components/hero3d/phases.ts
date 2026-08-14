export function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export function smooth(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

/** Découpe le scroll du hero en actes. */
export function heroPhases(p: number) {
  const film = smooth(p / 0.52);
  const exit = smooth((p - 0.48) / 0.24);
  const keyIn = smooth((p - 0.62) / 0.18);
  const press = smooth((p - 0.78) / 0.12);
  const copy = smooth((p - 0.8) / 0.14);
  return { film, exit, keyIn, press, copy };
}

export type HeroPhases = ReturnType<typeof heroPhases>;
