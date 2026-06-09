import Link from "next/link";
import type { ToolFrontmatter, FeatureDefinitions } from "@/lib/types";
import FeatureBadge from "./FeatureBadge";

interface ComparisonColumnsProps {
  tools: ToolFrontmatter[];
  featureDefinitions?: FeatureDefinitions;
}

function featureLabel(key: string): string {
  return key
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

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
        gridTemplateColumns: `180px repeat(${(children as React.ReactNode[])?.length || 1}, 1fr)`,
        borderBottom: "1px solid var(--border)",
      }}
    >
      <span className="font-medium flex items-center gap-2" style={{ color: "var(--muted)" }}>
        {label}
      </span>
      {children}
    </div>
  );
}

export default function ComparisonColumns({ tools, featureDefinitions }: ComparisonColumnsProps) {
  const featureKeys = featureDefinitions ? Object.keys(featureDefinitions) : [];

  return (
    <div className="overflow-x-auto">
    <div
      className="rounded-lg overflow-hidden min-w-[560px]"
      style={{ border: "1px solid var(--border)", background: "var(--card)" }}
    >
      {/* Header row */}
      <div
        className="grid items-center py-4 px-4"
        style={{
          gridTemplateColumns: `180px repeat(${tools.length}, 1fr)`,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span />
        {tools.map((tool) => (
          <div key={tool.slug} className="text-center">
            <Link
              href={`/tools/${tool.slug}`}
              className="font-semibold text-lg no-underline hover:opacity-70 inline-flex flex-col items-center gap-2"
            >
              <img
                src={`/logos/${tool.slug}.svg`}
                alt=""
                width={28}
                height={28}
                className="rounded"
              />
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
                {tool.pricing_tiers?.[0] ?? tool.pricing}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Category-specific features */}
      {featureKeys.map((key) => (
        <Row key={key} label={featureLabel(key)}>
          {tools.map((tool) => (
            <div key={tool.slug} className="text-center">
              <FeatureBadge value={tool.agent_features[key] ?? null} />
            </div>
          ))}
        </Row>
      ))}

      {/* Pricing tiers */}
      <Row label="Pricing">
        {tools.map((tool) => (
          <div key={tool.slug} className="text-center">
            <div className="flex flex-col items-center gap-0.5 text-xs" style={{ color: "var(--muted)" }}>
              {tool.pricing_tiers?.map((tier, j) => (
                <span key={j}>{tier}</span>
              )) ?? <span>{tool.pricing}</span>}
            </div>
          </div>
        ))}
      </Row>

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
        <p className="text-xs flex gap-3 flex-wrap items-center" style={{ color: "var(--muted)" }}>
          <span className="inline-flex items-center gap-1"><FeatureBadge value={true} size="sm" /> Supported</span>
          <span className="inline-flex items-center gap-1"><FeatureBadge value={false} size="sm" /> Not supported</span>
          <span className="inline-flex items-center gap-1"><FeatureBadge value={null} size="sm" /> Unverified</span>
        </p>
      </div>
    </div>
    </div>
  );
}
