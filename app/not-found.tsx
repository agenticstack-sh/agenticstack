import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-6 py-32 text-center">
      <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight mb-4">404 — Page not found</h1>
      <p className="text-base mb-8" style={{ color: "var(--muted)" }}>
        This page doesn't exist. It may have been moved or removed.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg no-underline transition-opacity hover:opacity-80"
        style={{ background: "var(--accent-text)", color: "#fff" }}
      >
        Back to home
      </Link>
    </div>
  );
}
