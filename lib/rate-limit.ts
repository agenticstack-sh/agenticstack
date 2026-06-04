const windowMs = 60_000; // 1 minute
const maxRequests = 60; // per window per IP

const requests = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = requests.get(ip);

  if (!entry || now > entry.resetAt) {
    requests.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  entry.count++;
  if (entry.count > maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: maxRequests - entry.count };
}

// Periodic cleanup to prevent memory growth
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of requests) {
    if (now >= entry.resetAt) requests.delete(ip);
  }
}, 60_000);
