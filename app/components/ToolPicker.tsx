"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  slug: string;
  title: string;
  tools: { name: string; slug: string }[];
}

interface ToolPickerProps {
  categories: Category[];
}

export default function ToolPicker({ categories }: ToolPickerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";
  const selected = searchParams.get("tools")?.split(",").filter(Boolean) ?? [];

  const category = categories.find((c) => c.slug === activeCategory);

  function selectCategory(slug: string) {
    if (slug === activeCategory) {
      router.push("/compare");
    } else {
      router.push(`/compare?category=${slug}`);
    }
  }

  function toggleTool(slug: string) {
    let next: string[];
    if (selected.includes(slug)) {
      next = selected.filter((s) => s !== slug);
    } else if (selected.length >= 3) {
      return;
    } else {
      next = [...selected, slug];
    }
    if (next.length === 0) {
      router.push(`/compare?category=${activeCategory}`);
    } else {
      router.push(`/compare?category=${activeCategory}&tools=${next.join(",")}`);
    }
  }

  return (
    <div className="space-y-6">
      {/* Category selector */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = cat.slug === activeCategory;
            return (
              <button
                key={cat.slug}
                onClick={() => selectCategory(cat.slug)}
                className="text-sm px-3 py-1.5 rounded-lg font-medium transition-all"
                style={{
                  background: isActive ? "var(--accent-text)" : "var(--card)",
                  color: isActive ? "#fff" : "var(--foreground)",
                  border: `1px solid ${isActive ? "var(--accent-text)" : "var(--border)"}`,
                  cursor: "pointer",
                }}
              >
                {cat.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tool selector — only when category is chosen */}
      {category && (
        <div>
          <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>
            Select 2–3 tools to compare
          </p>
          <div className="flex flex-wrap gap-2">
            {category.tools.map((tool) => {
              const isSelected = selected.includes(tool.slug);
              const isDisabled = !isSelected && selected.length >= 3;
              return (
                <button
                  key={tool.slug}
                  onClick={() => toggleTool(tool.slug)}
                  disabled={isDisabled}
                  className="text-sm px-3 py-1.5 rounded-lg font-medium transition-all inline-flex items-center gap-2"
                  style={{
                    background: isSelected ? "var(--accent-text)" : "var(--card)",
                    color: isSelected ? "#fff" : "var(--foreground)",
                    border: `1px solid ${isSelected ? "var(--accent-text)" : "var(--border)"}`,
                    opacity: isDisabled ? 0.4 : 1,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  <img
                    src={`/logos/${tool.slug}.svg`}
                    alt=""
                    width={16}
                    height={16}
                    className="rounded"
                  />
                  {tool.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
