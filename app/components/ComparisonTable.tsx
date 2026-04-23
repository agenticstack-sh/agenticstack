import Link from "next/link";
import type { ToolFrontmatter } from "@/lib/types";
import FeatureBadge from "./FeatureBadge";

interface ComparisonTableProps {
  tools: ToolFrontmatter[];
}

const FEATURE_COLS: { key: keyof ToolFrontmatter["agent_features"]; label: string; description: string }[] = [
  { key: "agent_sdk", label: "Agent SDK", description: "Dedicated SDK for agentic workflows — agent sessions, token lifecycle, and authorization requests" },
  { key: "token_delegation", label: "Token Delegation", description: "Issue scoped tokens an agent can use downstream without exposing user credentials" },
  { key: "human_in_the_loop", label: "Human-in-loop", description: "Pause agent execution and require explicit user approval before proceeding" },
  { key: "fga", label: "FGA", description: "Fine-Grained Authorization — relationship-based or attribute-based access control, not just role-based" },
  { key: "mcp_support", label: "MCP", description: "Native OAuth/OIDC authorization layer for Model Context Protocol servers" },
  { key: "async_authorization", label: "Async Authz", description: "Non-blocking approval workflows — agent continues and gets notified when approval is granted" },
];

export default function ComparisonTable({ tools }: ComparisonTableProps) {
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
            {FEATURE_COLS.map((col) => (
              <th
                key={col.key}
                className="text-center py-3 px-3 font-medium"
                style={{ color: "var(--muted)" }}
              >
                {col.label}
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
                  className="font-medium hover:opacity-70 no-underline"
                >
                  {tool.name}
                </Link>
              </td>
              <td className="py-3 px-3 text-center text-xs" style={{ color: "var(--muted)" }}>
                {tool.type}
              </td>
              <td className="py-3 px-3 text-center text-xs" style={{ color: "var(--muted)" }}>
                {tool.pricing}
              </td>
              <td className="py-3 px-3 text-center">
                <FeatureBadge value={tool.open_source} size="sm" />
              </td>
              {FEATURE_COLS.map((col) => (
                <td key={col.key} className="py-3 px-3 text-center">
                  <FeatureBadge value={tool.agent_features[col.key]} size="sm" />
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
        <p className="text-xs flex gap-3 flex-wrap" style={{ color: "var(--muted)" }}>
          <span style={{ background: "var(--green-bg)", color: "var(--green-text)" }} className="px-1.5 py-0.5 rounded-full font-medium">✓</span> Supported
          <span style={{ color: "var(--muted)" }}>✗</span> Not supported
          <span style={{ background: "var(--amber-bg)", color: "var(--amber-text)" }} className="px-1.5 py-0.5 rounded-full font-medium">?</span> Unverified
        </p>
        <details className="text-xs" style={{ color: "var(--muted)" }}>
          <summary className="cursor-pointer select-none hover:opacity-60 transition-opacity">
            What do these features mean?
          </summary>
          <ul className="mt-3 space-y-2 list-none p-0">
            {FEATURE_COLS.map((col) => (
              <li key={col.key}>
                <span className="font-medium" style={{ color: "var(--foreground)" }}>{col.label}</span>{" "}
                — {col.description}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}
