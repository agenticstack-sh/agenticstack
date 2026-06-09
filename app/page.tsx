import Link from "next/link";
import { getAllCategories, getToolBySlug } from "@/lib/markdown";
import ContributePrompt from "@/app/components/ContributePrompt";
import type { ToolFrontmatter } from "@/lib/types";
import { websiteJsonLd, safeJsonLd } from "@/lib/jsonld";

export default function Home() {
  const categories = getAllCategories();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteJsonLd()) }}
      />

      {/* Hero */}
      <div className="max-w-2xl mb-12 sm:mb-20">
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight mb-4 leading-tight">
          Find the right tool for<br />every layer of your agent stack.
        </h1>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
          Structured comparisons across the tools AI agent developers reach for.
        </p>
        <Link
          href="/compare"
          className="inline-block text-sm font-medium px-5 py-2.5 rounded-lg no-underline transition-opacity hover:opacity-90"
          style={{ background: "var(--accent-text)", color: "#fff" }}
        >
          Compare tools side by side
        </Link>
      </div>

      {/* Skills banner */}
      <div
        className="rounded-xl px-5 py-5 mb-12 sm:mb-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ background: "var(--accent)", border: "1px solid #c4b5fd" }}
      >
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>
            Use AgenticStack with any AI assistant.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Install the skills to search, compare, and recommend agent tools directly from your AI workflow.{" "}
            <a
              href="https://skills.sh/agenticstack-sh/agenticstack-skills"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-text)" }}
            >
              View skills →
            </a>
          </p>
        </div>
        <code
          className="text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap px-4 py-2.5 rounded-lg font-mono"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            color: "var(--accent-text)",
          }}
        >
          npx skills add agenticstack-sh/agenticstack-skills
        </code>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const tools: ToolFrontmatter[] = category.tools
            .map((slug) => {
              try {
                return getToolBySlug(slug).frontmatter;
              } catch {
                return null;
              }
            })
            .filter((t): t is ToolFrontmatter => t !== null);

          const isEmpty = tools.length === 0;
          const preview = tools.slice(0, 5);

          const card = (
            <div
              key={category.category}
              className={`category-card flex flex-col justify-between rounded-xl p-4 sm:p-6 transition-colors ${isEmpty ? "opacity-60" : ""}`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-semibold text-base leading-tight" style={{ color: "var(--foreground)" }}>
                    {category.title}
                  </h2>
                  {isEmpty ? (
                    <span
                      className="text-xs font-medium ml-3 px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: "var(--border)", color: "var(--muted)" }}
                    >
                      coming soon
                    </span>
                  ) : (
                    <span
                      className="text-xs font-medium ml-3 px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: "var(--accent)", color: "var(--accent-text)" }}
                    >
                      {tools.length} tools
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
                  {category.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {preview.map((tool) => (
                  <span
                    key={tool.slug}
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{ background: "var(--accent)", color: "var(--foreground)" }}
                  >
                    {tool.name}
                  </span>
                ))}
                {tools.length > preview.length && (
                  <span
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{ background: "var(--accent)", color: "var(--muted)" }}
                  >
                    +{tools.length - preview.length} more
                  </span>
                )}
              </div>
            </div>
          );

          return isEmpty ? card : (
            <Link
              key={category.category}
              href={`/categories/${category.category}`}
              className="no-underline"
            >
              {card}
            </Link>
          );
        })}
      </div>

      <ContributePrompt context="home" />
    </div>
  );
}
