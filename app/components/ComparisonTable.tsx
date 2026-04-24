import Link from "next/link";
import type { ToolFrontmatter, AgentFeatures } from "@/lib/types";
import FeatureBadge from "./FeatureBadge";
import { Bot, KeyRound, UserCheck, Shield, Plug, Clock, type LucideIcon } from "lucide-react";

interface ComparisonTableProps {
  tools: ToolFrontmatter[];
  showLogos?: boolean;
}

const FEATURE_COLS: { key: keyof AgentFeatures; label: string; description: string; icon: LucideIcon }[] = [
  { key: "agent_sdk", label: "Agent SDK", description: "Dedicated SDK for agentic workflows — agent sessions, token lifecycle, and authorization requests", icon: Bot },
  { key: "token_delegation", label: "Token Delegation", description: "Issue scoped tokens an agent can use downstream without exposing user credentials", icon: KeyRound },
  { key: "human_in_the_loop", label: "Human-in-loop", description: "Pause agent execution and require explicit user approval before proceeding", icon: UserCheck },
  { key: "fga", label: "FGA", description: "Fine-Grained Authorization — relationship-based or attribute-based access control, not just role-based", icon: Shield },
  { key: "mcp_support", label: "MCP", description: "Native OAuth/OIDC authorization layer for Model Context Protocol servers", icon: Plug },
  { key: "async_authorization", label: "Async Authz", description: "Non-blocking approval workflows — agent continues and gets notified when approval is granted", icon: Clock },
];

export default function ComparisonTable({ tools, showLogos = true }: ComparisonTableProps) {
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
                title={col.description}
              >
                <div className="flex flex-col items-center gap-1">
                  <col.icon size={14} />
                  <span>{col.label}</span>
                </div>
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
        <p className="text-xs flex gap-3 flex-wrap items-center" style={{ color: "var(--muted)" }}>
          <span className="inline-flex items-center gap-1"><FeatureBadge value={true} size="sm" /> Supported</span>
          <span className="inline-flex items-center gap-1"><FeatureBadge value={false} size="sm" /> Not supported</span>
          <span className="inline-flex items-center gap-1"><FeatureBadge value={null} size="sm" /> Unverified</span>
        </p>
        <details className="text-xs" style={{ color: "var(--muted)" }}>
          <summary className="cursor-pointer select-none hover:opacity-60 transition-opacity">
            What do these features mean?
          </summary>
          <ul className="mt-3 space-y-2 list-none p-0">
            {FEATURE_COLS.map((col) => (
              <li key={col.key} className="flex items-start gap-2">
                <col.icon size={14} className="mt-0.5 shrink-0" style={{ color: "var(--accent-text)" }} />
                <span>
                  <span className="font-medium" style={{ color: "var(--foreground)" }}>{col.label}</span>{" "}
                  — {col.description}
                </span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}
