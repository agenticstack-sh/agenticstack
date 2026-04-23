import { getToolBySlug, getAllTools, renderToHtml } from "@/lib/markdown";
import FeatureBadge from "@/app/components/FeatureBadge";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { AgentFeatures } from "@/lib/types";

export function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

const AGENT_FEATURES: { key: keyof AgentFeatures; label: string; description: string }[] = [
  { key: "agent_sdk", label: "Agent SDK", description: "Dedicated SDK for agentic workflows" },
  { key: "token_delegation", label: "Token Delegation", description: "Issue scoped tokens for downstream services" },
  { key: "human_in_the_loop", label: "Human-in-the-loop", description: "Pause and require user approval before proceeding" },
  { key: "fga", label: "Fine-Grained Authorization", description: "Relationship-based or attribute-based access control" },
  { key: "mcp_support", label: "MCP Support", description: "Native support for Model Context Protocol authorization" },
  { key: "async_authorization", label: "Async Authorization", description: "Non-blocking approval workflows" },
];

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

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-2">
        <Link
          href="/categories/auth"
          className="text-sm no-underline hover:opacity-70 transition-opacity"
          style={{ color: "var(--muted)" }}
        >
          ← Auth & Identity
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-start gap-4 mb-3">
          <h1 className="text-2xl font-semibold tracking-tight">{tool.name}</h1>
          <div className="flex gap-2 mt-1">
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
            href={`/content/tools/${slug}.md`}
            className="text-xs font-mono hover:text-white transition-colors no-underline"
            style={{ color: "var(--muted)" }}
          >
            View as markdown →
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
        <h2 className="font-medium mb-4">Agent features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AGENT_FEATURES.map(({ key, label, description }) => (
            <div key={key} className="flex items-start gap-3">
              <div className="mt-0.5 w-5 text-center">
                <FeatureBadge value={tool.agent_features[key]} />
              </div>
              <div>
                <div className="text-sm font-medium">{label}</div>
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
