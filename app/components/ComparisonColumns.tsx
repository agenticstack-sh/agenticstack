import Link from "next/link";
import type { ToolFrontmatter, AgentFeatures } from "@/lib/types";
import FeatureBadge from "./FeatureBadge";

interface ComparisonColumnsProps {
  tools: ToolFrontmatter[];
}

const AGENT_FEATURES: { key: keyof AgentFeatures; label: string }[] = [
  { key: "agent_sdk", label: "Agent SDK" },
  { key: "token_delegation", label: "Token Delegation" },
  { key: "human_in_the_loop", label: "Human-in-the-loop" },
  { key: "fga", label: "Fine-Grained Authorization" },
  { key: "mcp_support", label: "MCP Support" },
  { key: "async_authorization", label: "Async Authorization" },
];

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid items-center py-3 px-4 text-sm"
      style={{
        gridTemplateColumns: `160px repeat(${(children as React.ReactNode[])?.length || 1}, 1fr)`,
        borderBottom: "1px solid var(--border)",
      }}
    >
      <span className="font-medium" style={{ color: "var(--muted)" }}>
        {label}
      </span>
      {children}
    </div>
  );
}

export default function ComparisonColumns({ tools }: ComparisonColumnsProps) {
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: "1px solid var(--border)", background: "var(--card)" }}
    >
      {/* Header row */}
      <div
        className="grid items-center py-4 px-4"
        style={{
          gridTemplateColumns: `160px repeat(${tools.length}, 1fr)`,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span />
        {tools.map((tool) => (
          <div key={tool.slug} className="text-center">
            <Link
              href={`/tools/${tool.slug}`}
              className="font-semibold text-lg no-underline hover:opacity-70"
            >
              {tool.name}
            </Link>
            <div className="flex justify-center gap-2 mt-1">
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
            </div>
          </div>
        ))}
      </div>

      {/* Agent features */}
      {AGENT_FEATURES.map((feature) => (
        <Row key={feature.key} label={feature.label}>
          {tools.map((tool) => (
            <div key={tool.slug} className="text-center">
              <FeatureBadge value={tool.agent_features[feature.key]} />
            </div>
          ))}
        </Row>
      ))}

      {/* Open source */}
      <Row label="Open Source">
        {tools.map((tool) => (
          <div key={tool.slug} className="text-center">
            <FeatureBadge value={tool.open_source} />
          </div>
        ))}
      </Row>

      {/* Self hosted */}
      <Row label="Self-Hosted">
        {tools.map((tool) => (
          <div key={tool.slug} className="text-center">
            <FeatureBadge value={tool.self_hosted} />
          </div>
        ))}
      </Row>

      {/* SDK Languages */}
      <Row label="SDK Languages">
        {tools.map((tool) => (
          <div key={tool.slug} className="text-center">
            <div className="flex flex-wrap justify-center gap-1">
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
        ))}
      </Row>

      {/* Frameworks */}
      <Row label="Frameworks">
        {tools.map((tool) => (
          <div key={tool.slug} className="text-center">
            <div className="flex flex-wrap justify-center gap-1">
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
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  None listed
                </span>
              )}
            </div>
          </div>
        ))}
      </Row>

      {/* Compliance */}
      <Row label="Compliance">
        {tools.map((tool) => (
          <div key={tool.slug} className="text-center">
            <div className="flex flex-wrap justify-center gap-1">
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
        ))}
      </Row>

      {/* Best for */}
      <Row label="Best For">
        {tools.map((tool) => (
          <div key={tool.slug} className="text-center text-sm px-2">
            {tool.best_for}
          </div>
        ))}
      </Row>

      {/* Limitations */}
      <Row label="Limitations">
        {tools.map((tool) => (
          <div key={tool.slug} className="text-center text-sm px-2">
            {tool.limitations}
          </div>
        ))}
      </Row>

      {/* Legend */}
      <div className="px-4 py-3">
        <p className="text-xs flex gap-3 flex-wrap" style={{ color: "var(--muted)" }}>
          <span
            style={{ background: "var(--green-bg)", color: "var(--green-text)" }}
            className="px-1.5 py-0.5 rounded-full font-medium"
          >
            ✓
          </span>{" "}
          Supported
          <span style={{ color: "var(--muted)" }}>✗</span> Not supported
          <span
            style={{ background: "var(--amber-bg)", color: "var(--amber-text)" }}
            className="px-1.5 py-0.5 rounded-full font-medium"
          >
            ?
          </span>{" "}
          Unverified
        </p>
      </div>
    </div>
  );
}
