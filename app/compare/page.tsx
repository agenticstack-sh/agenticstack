import { Suspense } from "react";
import { getAllTools, getAllComparisons, getToolBySlug } from "@/lib/markdown";
import ComparisonColumns from "@/app/components/ComparisonColumns";
import ToolPicker from "@/app/components/ToolPicker";
import Link from "next/link";
import type { ToolFrontmatter } from "@/lib/types";

function CompareContent({
  searchParams,
}: {
  searchParams: { tools?: string };
}) {
  const allTools = getAllTools();
  const pickerTools = allTools.map((t) => ({ name: t.name, slug: t.slug }));
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
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Compare Tools
        </h1>
        <p style={{ color: "var(--muted)" }}>
          Select 2-3 auth tools to compare side by side.
        </p>
      </div>

      <div className="mb-8">
        <ToolPicker tools={pickerTools} />
      </div>

      {editorialMatch && (
        <div
          className="mb-6 p-4 rounded-lg text-sm"
          style={{ background: "var(--accent)", border: "1px solid var(--border)" }}
        >
          <Link
            href={`/compare/${editorialMatch.slug}`}
            className="font-medium no-underline hover:opacity-70"
          >
            Read the full {editorialMatch.title} comparison guide →
          </Link>
        </div>
      )}

      {selectedTools.length >= 2 ? (
        <ComparisonColumns tools={selectedTools} />
      ) : (
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
      )}
    </div>
  );
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ tools?: string }>;
}) {
  const params = await searchParams;
  return (
    <Suspense>
      <CompareContent searchParams={params} />
    </Suspense>
  );
}
