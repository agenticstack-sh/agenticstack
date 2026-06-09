import Link from "next/link";
import type { ToolFrontmatter } from "@/lib/types";

interface ToolCardProps {
  tool: ToolFrontmatter;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="tool-card group block no-underline rounded-lg p-5 transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-base transition-colors group-hover:text-[var(--primary)]">{tool.name}</h3>
        <div className="flex gap-1.5 shrink-0">
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{ background: "var(--accent)", color: "var(--muted)" }}
          >
            {tool.type}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{ background: "var(--accent)", color: "var(--muted)" }}
          >
            {tool.pricing}
          </span>
        </div>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {tool.best_for}
      </p>
    </Link>
  );
}
