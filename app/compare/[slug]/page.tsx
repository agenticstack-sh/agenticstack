import { getComparisonBySlug, getAllComparisons, getToolBySlug, getCategoryBySlug, renderToHtml } from "@/lib/markdown";
import ComparisonColumns from "@/app/components/ComparisonColumns";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ToolFrontmatter } from "@/lib/types";
import type { Metadata } from "next";
import { comparisonJsonLd, breadcrumbJsonLd, safeJsonLd } from "@/lib/jsonld";
import { ChevronLeft, ArrowRight, Braces } from "lucide-react";

export function generateStaticParams() {
  const comparisons = getAllComparisons();
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getComparisonBySlug(slug);
    const toolNames = frontmatter.tools.map((t) => {
      try { return getToolBySlug(t).frontmatter.name; } catch { return t; }
    });
    const title = `${toolNames[0]} vs ${toolNames[1]} for AI Agents`;
    const description = `Compare ${toolNames[0]} vs ${toolNames[1]} for agentic workflows. Verdict: ${frontmatter.verdict}.`;
    return {
      title,
      description,
      openGraph: { title, description },
    };
  } catch {
    return {};
  }
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

  let featureDefinitions;
  try {
    featureDefinitions = getCategoryBySlug(frontmatter.category).frontmatter.feature_definitions;
  } catch {
    // category not found, skip feature definitions
  }

  const dynamicUrl = `/compare?category=${frontmatter.category}&tools=${frontmatter.tools.join(",")}`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(comparisonJsonLd(frontmatter, [tools[0]?.name ?? frontmatter.tools[0], tools[1]?.name ?? frontmatter.tools[1]])) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Compare", url: "/compare" },
          { name: frontmatter.title, url: `/compare/${slug}` },
        ])) }}
      />
      <div className="mb-2">
        <Link
          href="/compare"
          className="text-sm no-underline hover:opacity-70 transition-opacity inline-flex items-center gap-1"
          style={{ color: "var(--muted)" }}
        >
          <ChevronLeft size={16} />
          Compare Tools
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
            className="hover:opacity-60 transition-opacity no-underline inline-flex items-center gap-1"
          >
            <ArrowRight size={12} />
            Live comparison
          </Link>
          <a
            href={`/api/json/comparisons/${slug}`}
            className="hover:opacity-60 transition-opacity no-underline inline-flex items-center gap-1"
          >
            <Braces size={12} />
            View as JSON
          </a>
        </div>
      </div>

      <div className="mb-10">
        <ComparisonColumns tools={tools} featureDefinitions={featureDefinitions} />
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
