import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  return (
    <nav
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--background)",
      }}
      className="sticky top-0 z-10"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-base tracking-tight no-underline" style={{ color: "var(--foreground)" }}>
          AgenticStack
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
