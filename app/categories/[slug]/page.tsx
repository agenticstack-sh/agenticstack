import { getCategoryBySlug, getToolBySlug, getAllCategories, renderToHtml } from "@/lib/markdown";
import ComparisonTable from "@/app/components/ComparisonTable";
import type { ToolFrontmatter } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ slug: cat.category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let category;
  try {
    category = getCategoryBySlug(slug);
  } catch {
    notFound();
  }

  const html = await renderToHtml(category.body);

  const tools: ToolFrontmatter[] = category.frontmatter.tools
    .map((toolSlug) => {
      try {
        return getToolBySlug(toolSlug).frontmatter;
      } catch {
        return null;
      }
    })
    .filter((t): t is ToolFrontmatter => t !== null);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          {category.frontmatter.title}
        </h1>
        <p style={{ color: "var(--muted)" }}>{category.frontmatter.description}</p>
        <div className="flex gap-3 mt-5 flex-wrap">
          <Link
            href={`/compare?category=${slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg no-underline transition-opacity hover:opacity-80"
            style={{ background: "var(--accent-text)", color: "#fff" }}
          >
            Compare tools
          </Link>
          <a
            href={`/api/json/categories/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg no-underline transition-opacity hover:opacity-80"
            style={{ background: "var(--card)", color: "var(--muted)", border: "1px solid var(--border)" }}
          >
            View as JSON
          </a>
        </div>
      </div>

      <div
        className="rounded-lg overflow-hidden"
        style={{ border: "1px solid var(--border)" }}
      >
        <ComparisonTable tools={tools} featureDefinitions={category.frontmatter.feature_definitions} showLogos={false} />
      </div>

      {html.trim() && (
        <div
          className="prose mt-12 text-sm leading-relaxed"
          style={{ color: "var(--muted)" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}
