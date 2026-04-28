import Link from "next/link";
import type { ToolFrontmatter, FeatureDefinitions } from "@/lib/types";
import FeatureBadge from "./FeatureBadge";

interface ComparisonTableProps {
  tools: ToolFrontmatter[];
  featureDefinitions?: FeatureDefinitions;
  showLogos?: boolean;
}

function featureLabel(key: string): string {
  return key
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function ComparisonTable({ tools, featureDefinitions, showLogos = true }: ComparisonTableProps) {
  const featureKeys = featureDefinitions ? Object.keys(featureDefinitions) : [];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
            <th className="text-left py-3 px-4 font-medium" style={{ color: "var(--muted)", minWidth: "140px" }}>
              Tool
            </th>
            <th className="text-center py-3 px-3 font-medium" style={{ color: "var(--muted)" }}>
              Type
            </th>
            <th className="text-center py-3 px-3 font-medium" style={{ color: "var(--muted)" }}>
              Pricing
            </th>
            <th className="text-center py-3 px-3 font-medium" style={{ color: "var(--muted)" }}>
              OSS
            </th>
            {featureKeys.map((key) => (
              <th
                key={key}
                className="text-center py-3 px-3 font-medium"
                style={{ color: "var(--muted)" }}
                title={featureDefinitions![key]}
              >
                {featureLabel(key)}
              </th>
            ))}
            <th className="text-center py-3 px-3 font-medium" style={{ color: "var(--muted)" }}>
              Verified
            </th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool, i) => (
            <tr
              key={tool.slug}
              style={{
                borderBottom: "1px solid var(--border)",
                background: i % 2 === 0 ? "transparent" : "rgba(120,90,220,0.03)",
              }}
            >
              <td className="py-3 px-4">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="font-medium hover:opacity-70 no-underline flex items-center gap-2"
                >
                  {showLogos && (
                    <img
                      src={`/logos/${tool.slug}.svg`}
                      alt=""
                      width={20}
                      height={20}
                      className="rounded"
                    />
                  )}
                  {tool.name}
                </Link>
              </td>
              <td className="py-3 px-3 text-center text-xs" style={{ color: "var(--muted)" }}>
                {tool.type}
              </td>
              <td className="py-3 px-3 text-xs" style={{ color: "var(--muted)" }}>
                <div className="flex flex-col items-center gap-0.5">
                  {tool.pricing_tiers?.map((tier, j) => (
                    <span key={j}>{tier}</span>
                  )) ?? tool.pricing}
                </div>
              </td>
              <td className="py-3 px-3 text-center">
                <FeatureBadge value={tool.open_source} size="sm" />
              </td>
              {featureKeys.map((key) => (
                <td key={key} className="py-3 px-3 text-center">
                  <FeatureBadge value={tool.agent_features[key] ?? null} size="sm" />
                </td>
              ))}
              <td
                className="py-3 px-3 text-center text-xs font-mono"
                style={{ color: "var(--muted)" }}
              >
                {tool.last_verified}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex items-start justify-between gap-6 flex-wrap">
        <p className="text-xs flex gap-3 flex-wrap items-center" style={{ color: "var(--muted)" }}>
          <span className="inline-flex items-center gap-1"><FeatureBadge value={true} size="sm" /> Supported</span>
          <span className="inline-flex items-center gap-1"><FeatureBadge value={false} size="sm" /> Not supported</span>
          <span className="inline-flex items-center gap-1"><FeatureBadge value={null} size="sm" /> Unverified</span>
        </p>
        {featureKeys.length > 0 && (
          <details className="text-xs" style={{ color: "var(--muted)" }}>
            <summary className="cursor-pointer select-none hover:opacity-60 transition-opacity">
              What do these features mean?
            </summary>
            <ul className="mt-3 space-y-2 list-none p-0">
              {featureKeys.map((key) => (
                <li key={key} className="flex items-start gap-2">
                  <span>
                    <span className="font-medium" style={{ color: "var(--foreground)" }}>{featureLabel(key)}</span>{" "}
                    — {featureDefinitions![key]}
                  </span>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </div>
  );
}
