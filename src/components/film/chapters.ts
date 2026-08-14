export function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

export function smooth(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

/** Ramp 0→1 between a and b. */
export function ramp(p: number, a: number, b: number) {
  if (b <= a) return p >= b ? 1 : 0;
  return smooth((p - a) / (b - a));
}

/** Fade in a→b, hold, fade out c→d. */
export function gate(p: number, a: number, b: number, c: number, d: number) {
  if (p <= a || p >= d) return 0;
  if (p < b) return ramp(p, a, b);
  if (p > c) return 1 - ramp(p, c, d);
  return 1;
}

export function chapters(p: number) {
  return {
    film: ramp(p, 0.0, 0.16),
    exit: ramp(p, 0.14, 0.24),
    keyIn: ramp(p, 0.2, 0.3),
    press: ramp(p, 0.28, 0.34),
    how: ramp(p, 0.32, 0.42),
    offers: ramp(p, 0.42, 0.54),
    show: ramp(p, 0.54, 0.66),
    agent: ramp(p, 0.66, 0.76),
    audit: ramp(p, 0.76, 0.86),
    cta: ramp(p, 0.86, 0.96),
    witnesses: ramp(p, 0.18, 0.28),
    uiHero: gate(p, 0.26, 0.3, 0.34, 0.38),
    uiHow: gate(p, 0.34, 0.38, 0.42, 0.46),
    uiOffers: gate(p, 0.44, 0.48, 0.54, 0.58),
    uiShow: gate(p, 0.56, 0.6, 0.66, 0.7),
    uiAgent: gate(p, 0.68, 0.72, 0.78, 0.82),
    uiAudit: gate(p, 0.78, 0.82, 0.86, 0.9),
    uiCta: gate(p, 0.88, 0.92, 1.05, 1.1),
  };
}

export type Chapters = ReturnType<typeof chapters>;

type CamKey = { p: number; pos: [number, number, number]; look: [number, number, number]; fov: number };

const CAM: CamKey[] = [
  { p: 0.0, pos: [0.06, 0.16, 1.62], look: [0.0, 0.28, 0], fov: 28 },
  { p: 0.14, pos: [0.18, 0.26, 2.18], look: [0.12, 0.3, 0], fov: 32 },
  { p: 0.24, pos: [0.04, 0.3, 2.72], look: [0.0, 0.18, 0], fov: 34 },
  { p: 0.34, pos: [0.0, 0.2, 2.28], look: [0.0, 0.26, 0], fov: 31 },
  { p: 0.44, pos: [1.35, 0.48, 3.35], look: [0.15, 0.12, -0.25], fov: 36 },
  { p: 0.54, pos: [-0.55, 0.52, 3.85], look: [0.0, 0.22, -0.85], fov: 38 },
  { p: 0.66, pos: [0.85, 0.4, 3.05], look: [0.35, 0.32, -1.55], fov: 34 },
  { p: 0.76, pos: [0.08, 0.2, 1.52], look: [0.0, 0.24, 0.08], fov: 30 },
  { p: 0.86, pos: [-0.35, 0.46, 2.85], look: [0.0, 0.34, -0.35], fov: 34 },
  { p: 1.0, pos: [0.0, 0.1, 1.78], look: [0.0, 0.2, 0], fov: 28 },
];

export function cameraAt(p: number) {
  const x = clamp01(p);
  let i = 0;
  while (i < CAM.length - 1 && CAM[i + 1].p < x) i++;
  const a = CAM[i];
  const b = CAM[Math.min(i + 1, CAM.length - 1)];
  const t = a.p === b.p ? 1 : smooth((x - a.p) / (b.p - a.p));
  return {
    pos: [
      a.pos[0] + (b.pos[0] - a.pos[0]) * t,
      a.pos[1] + (b.pos[1] - a.pos[1]) * t,
      a.pos[2] + (b.pos[2] - a.pos[2]) * t,
    ] as [number, number, number],
    look: [
      a.look[0] + (b.look[0] - a.look[0]) * t,
      a.look[1] + (b.look[1] - a.look[1]) * t,
      a.look[2] + (b.look[2] - a.look[2]) * t,
    ] as [number, number, number],
    fov: a.fov + (b.fov - a.fov) * t,
  };
}
