"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const GITHUB_URL = "https://github.com/agenticstack-sh/agenticstack";
const SKILL_CMD = "npx skills run add-tool";

export default function ContributePrompt({ context = "category" }: { context?: "category" | "home" }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(SKILL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-8 text-sm" style={{ color: "var(--muted)" }}>
      <p className="mb-2.5">
        {context === "home"
          ? "Don't see a tool or category you use?"
          : "Missing a tool in this category?"}{" "}
        Use the{" "}
        <code
          className="text-xs px-1.5 py-0.5 rounded"
          style={{ background: "var(--accent)", color: "var(--accent-text)" }}
        >
          add-tool
        </code>{" "}
        skill to generate the file, then open a PR.
      </p>
      <div className="flex items-center gap-3 flex-wrap">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            color: "var(--accent-text)",
          }}
        >
          {SKILL_CMD}
          <button
            onClick={copy}
            aria-label="Copy command"
            className="transition-opacity hover:opacity-70 ml-1 cursor-pointer"
            style={{ color: "var(--muted)" }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
        </div>
        <a
          href={`${GITHUB_URL}/pulls`}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline hover:opacity-70 transition-opacity text-xs font-medium"
          style={{ color: "var(--accent-text)" }}
        >
          Open a PR →
        </a>
      </div>
    </div>
  );
}
