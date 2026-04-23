"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface ToolPickerProps {
  tools: { name: string; slug: string }[];
}

export default function ToolPicker({ tools }: ToolPickerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("tools")?.split(",").filter(Boolean) ?? [];

  function toggle(slug: string) {
    let next: string[];
    if (selected.includes(slug)) {
      next = selected.filter((s) => s !== slug);
    } else if (selected.length >= 3) {
      return;
    } else {
      next = [...selected, slug];
    }
    if (next.length === 0) {
      router.push("/compare");
    } else {
      router.push(`/compare?tools=${next.join(",")}`);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => {
          const isSelected = selected.includes(tool.slug);
          const isDisabled = !isSelected && selected.length >= 3;
          return (
            <button
              key={tool.slug}
              onClick={() => toggle(tool.slug)}
              disabled={isDisabled}
              className="text-sm px-3 py-1.5 rounded-lg font-medium transition-all"
              style={{
                background: isSelected ? "var(--accent-text)" : "var(--card)",
                color: isSelected ? "#fff" : "var(--foreground)",
                border: `1px solid ${isSelected ? "var(--accent-text)" : "var(--border)"}`,
                opacity: isDisabled ? 0.4 : 1,
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
            >
              {tool.name}
            </button>
          );
        })}
      </div>
      <p className="text-xs mt-2" style={{ color: "var(--muted)" }}>
        Select 2-3 tools to compare
      </p>
    </div>
  );
}
