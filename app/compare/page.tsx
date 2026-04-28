import { Suspense } from "react";
import { getAllTools, getAllCategories, getAllComparisons, getToolBySlug, getCategoryBySlug } from "@/lib/markdown";
import ComparisonColumns from "@/app/components/ComparisonColumns";
import ToolPicker from "@/app/components/ToolPicker";
import Link from "next/link";
import type { ToolFrontmatter } from "@/lib/types";
import { GitCompareArrows, BookOpen } from "lucide-react";

function toolName(slug: string): string {
  try { return getToolBySlug(slug).frontmatter.name; } catch { return slug; }
}

function CompareContent({
  searchParams,
}: {
  searchParams: { category?: string; tools?: string };
}) {
  const allCategories = getAllCategories();

  // Build picker data: categories with their tool names
  const pickerCategories = allCategories.map((cat) => {
    const catTools = cat.tools.map((slug) => {
      try {
        const { frontmatter } = getToolBySlug(slug);
        return { name: frontmatter.name, slug: frontmatter.slug };
      } catch {
        return null;
      }
    }).filter((t): t is { name: string; slug: string } => t !== null);

    return { slug: cat.category, title: cat.title, tools: catTools };
  });

  const activeCategory = searchParams.category ?? "auth";
  const activeCategoryData = allCategories.find((c) => c.category === activeCategory);
  const slugs = searchParams.tools?.split(",").filter(Boolean) ?? [];

  const selectedTools: ToolFrontmatter[] = slugs
    .map((slug) => {
      try {
        return getToolBySlug(slug).frontmatter;
      } catch {
        return null;
      }
    })
    .filter((t): t is ToolFrontmatter => t !== null);

  const comparisons = getAllComparisons();
  const editorialMatch =
    selectedTools.length === 2
      ? comparisons.find((c) => {
          const sorted = [...c.tools].sort();
          const selectedSorted = selectedTools.map((t) => t.slug).sort();
          return sorted[0] === selectedSorted[0] && sorted[1] === selectedSorted[1];
        })
      : null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight mb-2 flex items-center gap-3">
          <GitCompareArrows size={24} style={{ color: "var(--accent-text)" }} />
          Compare Tools
        </h1>
        <p style={{ color: "var(--muted)" }}>
          Pick a category, then select 2–3 tools to compare side by side.
        </p>
      </div>

      <div className="mb-8">
        <ToolPicker categories={pickerCategories} />
      </div>

      {editorialMatch && (
        <div
          className="mb-6 p-4 rounded-lg text-sm"
          style={{ background: "var(--accent)", border: "1px solid var(--border)" }}
        >
          <Link
            href={`/compare/${editorialMatch.slug}`}
            className="font-medium no-underline hover:opacity-70 inline-flex items-center gap-2"
          >
            <BookOpen size={16} />
            Read the full {editorialMatch.title} comparison guide
          </Link>
        </div>
      )}

      {selectedTools.length >= 2 ? (
        <ComparisonColumns tools={selectedTools} featureDefinitions={activeCategoryData?.feature_definitions} />
      ) : activeCategory ? (
        <div
          className="rounded-lg p-12 text-center text-sm"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            color: "var(--muted)",
          }}
        >
          Pick at least 2 tools above to see a comparison.
        </div>
      ) : (
        <div
          className="rounded-lg p-12 text-center text-sm"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            color: "var(--muted)",
          }}
        >
          Select a category to get started.
        </div>
      )}
      {/* Popular comparison guides — filtered to active category */}
      {comparisons.filter((c) => c.category === activeCategory && c.popular).length > 0 && (
        <div className="mt-16">
          <h2 className="text-sm font-medium uppercase tracking-wide mb-4" style={{ color: "var(--muted)" }}>
            Popular deep dives
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {comparisons.filter((c) => c.category === activeCategory && c.popular).map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="p-4 rounded-lg no-underline hover:opacity-80 transition-opacity flex items-start gap-3"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <BookOpen size={16} className="mt-0.5 shrink-0" style={{ color: "var(--accent-text)" }} />
                <div>
                  <div className="font-medium text-sm">{comp.title}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                    When to pick {toolName(comp.tools[0])} vs {toolName(comp.tools[1])} →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tools?: string }>;
}) {
  const params = await searchParams;
  return (
    <Suspense>
      <CompareContent searchParams={params} />
    </Suspense>
  );
}
