// Rate limiter léger en mémoire (suffit en dev / petit trafic).
type Bucket = { count: number; reset: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, max = 10, windowMs = 60_000) {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now > b.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: max - 1 };
  }
  if (b.count >= max) return { ok: false, remaining: 0 };
  b.count++;
  return { ok: true, remaining: max - b.count };
}
