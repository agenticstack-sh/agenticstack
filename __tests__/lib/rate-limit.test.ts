import { describe, it, expect, beforeEach, vi } from "vitest";

// Reset module state between tests
let rateLimit: typeof import("@/lib/rate-limit").rateLimit;

beforeEach(async () => {
  vi.resetModules();
  const mod = await import("@/lib/rate-limit");
  rateLimit = mod.rateLimit;
});

describe("rateLimit", () => {
  it("allows requests under the limit", () => {
    const { allowed, remaining } = rateLimit("1.2.3.4");
    expect(allowed).toBe(true);
    expect(remaining).toBe(59);
  });

  it("decrements remaining on each call", () => {
    rateLimit("1.2.3.4");
    const { remaining } = rateLimit("1.2.3.4");
    expect(remaining).toBe(58);
  });

  it("blocks after 60 requests", () => {
    for (let i = 0; i < 60; i++) {
      rateLimit("1.2.3.4");
    }
    const { allowed, remaining } = rateLimit("1.2.3.4");
    expect(allowed).toBe(false);
    expect(remaining).toBe(0);
  });

  it("tracks IPs independently", () => {
    for (let i = 0; i < 60; i++) {
      rateLimit("1.2.3.4");
    }
    const { allowed } = rateLimit("5.6.7.8");
    expect(allowed).toBe(true);
  });

  it("resets after the window expires", () => {
    vi.useFakeTimers();
    for (let i = 0; i < 60; i++) {
      rateLimit("1.2.3.4");
    }
    expect(rateLimit("1.2.3.4").allowed).toBe(false);

    vi.advanceTimersByTime(60_000);
    const { allowed, remaining } = rateLimit("1.2.3.4");
    expect(allowed).toBe(true);
    expect(remaining).toBe(59);
    vi.useRealTimers();
  });
});
