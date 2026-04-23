import { getComparisonBySlug, getAllComparisons, getToolBySlug, renderToHtml } from "@/lib/markdown";
import ComparisonColumns from "@/app/components/ComparisonColumns";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ToolFrontmatter } from "@/lib/types";

export function generateStaticParams() {
  const comparisons = getAllComparisons();
  return comparisons.map((c) => ({ slug: c.slug }));
}

export default async function EditorialComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let comparison;
  try {
    comparison = getComparisonBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter, body } = comparison;
  const html = await renderToHtml(body);

  const tools: ToolFrontmatter[] = frontmatter.tools
    .map((toolSlug) => {
      try {
        return getToolBySlug(toolSlug).frontmatter;
      } catch {
        return null;
      }
    })
    .filter((t): t is ToolFrontmatter => t !== null);

  const dynamicUrl = `/compare?tools=${frontmatter.tools.join(",")}`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-2">
        <Link
          href="/compare"
          className="text-sm no-underline hover:opacity-70 transition-opacity"
          style={{ color: "var(--muted)" }}
        >
          ← Compare Tools
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          {frontmatter.title}
        </h1>
        {frontmatter.verdict && (
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {frontmatter.verdict}
          </p>
        )}
        <div className="flex gap-4 mt-3 text-xs font-mono" style={{ color: "var(--muted)" }}>
          <Link
            href={dynamicUrl}
            className="hover:opacity-60 transition-opacity no-underline"
          >
            Live comparison →
          </Link>
          <a
            href={`/content/comparisons/${slug}.md`}
            className="hover:opacity-60 transition-opacity no-underline"
          >
            View as markdown →
          </a>
        </div>
      </div>

      <div className="mb-10">
        <ComparisonColumns tools={tools} />
      </div>

      {html.trim() && (
        <div
          className="prose text-sm leading-relaxed"
          style={{ color: "var(--muted)" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}

      <div
        className="mt-12 pt-6 flex items-center justify-between text-xs"
        style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}
      >
        <span>
          Last verified:{" "}
          <span className="font-mono">{frontmatter.last_verified}</span>
        </span>
      </div>
    </div>
  );
}
