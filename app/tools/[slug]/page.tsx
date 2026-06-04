import { getToolBySlug, getAllTools, getCategoryBySlug, renderToHtml } from "@/lib/markdown";
import FeatureBadge from "@/app/components/FeatureBadge";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { toolJsonLd, breadcrumbJsonLd, safeJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter: tool } = getToolBySlug(slug);
    const title = `${tool.name} for AI Agents`;
    const description = `${tool.best_for}. Compare ${tool.name} features, pricing, and SDK support for agentic workflows.`;
    return {
      title,
      description,
      openGraph: { title, description },
    };
  } catch {
    return {};
  }
}

function featureLabel(key: string): string {
  return key
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let parsed;
  try {
    parsed = getToolBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter: tool, body } = parsed;
  const html = await renderToHtml(body);

  let categoryTitle = tool.category;
  let featureDefinitions: Record<string, string> = {};
  try {
    const cat = getCategoryBySlug(tool.category);
    categoryTitle = cat.frontmatter.title;
    featureDefinitions = cat.frontmatter.feature_definitions ?? {};
  } catch {}

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(toolJsonLd(tool)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: categoryTitle, url: `/categories/${tool.category}` },
          { name: tool.name, url: `/tools/${slug}` },
        ])) }}
      />
      <div className="mb-2">
        <Link
          href={`/categories/${tool.category}`}
          className="text-sm no-underline hover:opacity-70 transition-opacity"
          style={{ color: "var(--muted)" }}
        >
          ← {categoryTitle}
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-start gap-4 mb-3">
          <img
            src={`/logos/${slug}.svg`}
            alt=""
            width={36}
            height={36}
            className="rounded-lg mt-0.5"
          />
          <h1 className="text-2xl font-semibold tracking-tight">{tool.name}</h1>
          <div className="flex gap-2 mt-1">
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{ background: "var(--accent)", color: "var(--muted)" }}
            >
              {tool.type}
            </span>
            {tool.pricing_tiers?.map((tier, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded"
                style={{ background: "var(--accent)", color: "var(--muted)" }}
              >
                {tier}
              </span>
            )) ?? (
              <span
                className="text-xs px-2 py-0.5 rounded"
                style={{ background: "var(--accent)", color: "var(--muted)" }}
              >
                {tool.pricing}
              </span>
            )}
            {tool.open_source && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: "var(--green-bg)", color: "var(--green-text)" }}
              >
                open source
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-4 text-sm flex-wrap">
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            style={{ color: "var(--muted)" }}
          >
            {tool.website} ↗
          </a>
          <a
            href={`/api/json/tools/${slug}`}
            className="text-xs font-mono hover:text-white transition-colors no-underline"
            style={{ color: "var(--muted)" }}
          >
            View as JSON →
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div
          className="p-4 rounded-lg"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <h2 className="text-sm font-medium mb-2" style={{ color: "var(--muted)" }}>
            Best for
          </h2>
          <p className="text-sm">{tool.best_for}</p>
        </div>
        <div
          className="p-4 rounded-lg"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <h2 className="text-sm font-medium mb-2" style={{ color: "var(--muted)" }}>
            Limitations
          </h2>
          <p className="text-sm">{tool.limitations}</p>
        </div>
      </div>

      <div
        className="p-5 rounded-lg mb-8"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h2 className="font-medium mb-4">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(featureDefinitions).map(([key, description]) => (
            <div key={key} className="flex items-start gap-3">
              <div className="mt-0.5 w-5 text-center">
                <FeatureBadge value={tool.agent_features[key] ?? null} />
              </div>
              <div>
                <div className="text-sm font-medium">{featureLabel(key)}</div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>
                  {tool.agent_features[key] === null
                    ? "Unverified — check source_urls"
                    : description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <h3 className="text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: "var(--muted)" }}>
            Frameworks
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tool.frameworks.length > 0 ? (
              tool.frameworks.map((f) => (
                <span
                  key={f}
                  className="text-xs px-2 py-0.5 rounded"
                  style={{ background: "var(--accent)", color: "var(--muted)" }}
                >
                  {f}
                </span>
              ))
            ) : (
              <span className="text-xs" style={{ color: "var(--muted)" }}>None listed</span>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: "var(--muted)" }}>
            SDK Languages
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tool.sdk_languages.map((lang) => (
              <span
                key={lang}
                className="text-xs px-2 py-0.5 rounded"
                style={{ background: "var(--accent)", color: "var(--muted)" }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: "var(--muted)" }}>
            Compliance
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tool.compliance.map((c) => (
              <span
                key={c}
                className="text-xs px-2 py-0.5 rounded uppercase"
                style={{ background: "var(--accent)", color: "var(--muted)" }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {html && (
        <div
          className="prose text-sm"
          style={{ color: "var(--muted)" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}

      <div
        className="mt-12 pt-6 flex items-center justify-between text-xs flex-wrap gap-3"
        style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}
      >
        <div className="flex gap-4">
          <span>
            Last verified:{" "}
            <span className="font-mono">{tool.last_verified}</span>
          </span>
          <span>
            Verified by:{" "}
            <span
              className="px-1.5 py-0.5 rounded"
              style={{ background: "var(--accent)" }}
            >
              {tool.verified_by}
            </span>
          </span>
        </div>
        <div className="flex gap-4 font-mono">
          {Object.entries(tool.source_urls).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity no-underline"
            >
              {key} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
