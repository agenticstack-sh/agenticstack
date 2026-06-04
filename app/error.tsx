"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-xl mx-auto px-6 py-32 text-center">
      <h1 className="text-5xl font-semibold tracking-tight mb-4">500 — Something went wrong</h1>
      <p className="text-base mb-8" style={{ color: "var(--muted)" }}>
        Something went wrong. Try again or head back to the homepage.
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-opacity hover:opacity-80 cursor-pointer"
          style={{ background: "var(--accent-text)", color: "#fff" }}
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg no-underline transition-opacity hover:opacity-80"
          style={{ background: "var(--card)", color: "var(--muted)", border: "1px solid var(--border)" }}
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
