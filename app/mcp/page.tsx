import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Server — AgenticStack",
  description:
    "Connect any MCP-compatible agent to the AgenticStack tool directory. Search, compare, and get recommendations without leaving your editor.",
};

const tools = [
  {
    name: "list_categories",
    description:
      "Lists all tool categories with descriptions, feature definitions, and tool slugs. Start here to discover valid category slugs and agent_features keys.",
  },
  {
    name: "search_tools",
    description:
      "Filters the directory by category, language, framework, or feature. Returns a summary list of matching tools.",
  },
  {
    name: "get_tool",
    description:
      "Full details for a single tool — agent features, pricing tiers, SDK languages, compliance certifications, limitations, and editorial analysis.",
  },
  {
    name: "compare_tools",
    description:
      "Side-by-side comparison of 2–3 tools, including a feature matrix and editorial analysis where available.",
  },
  {
    name: "recommend_tool",
    description:
      "Scores and ranks tools by how well they fit your requirements. Returns the top 3 with a match_score. Use this when you want a recommendation, not just a filtered list.",
  },
];

const clients = [
  {
    name: "Claude Desktop",
    path: "~/Library/Application Support/Claude/claude_desktop_config.json",
    snippet: `{
  "mcpServers": {
    "agenticstack": {
      "command": "npx",
      "args": ["-y", "agenticstack-mcp"]
    }
  }
}`,
  },
  {
    name: "Cursor",
    path: ".cursor/mcp.json",
    snippet: `{
  "mcpServers": {
    "agenticstack": {
      "command": "npx",
      "args": ["-y", "agenticstack-mcp"]
    }
  }
}`,
  },
];

export default function McpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-20">
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: "var(--accent)", color: "var(--accent-text)" }}
          >
            MCP Server
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight mb-4 leading-tight">
          AgenticStack for MCP
        </h1>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
          Connect any MCP-compatible agent to the AgenticStack tool directory.
          Search, compare, and get recommendations without leaving your editor or chat interface.
          No API key required.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.npmjs.com/package/agenticstack-mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium px-4 py-2 rounded-lg no-underline transition-opacity hover:opacity-90"
            style={{ background: "var(--accent-text)", color: "#fff" }}
          >
            View on npm
          </a>
          <a
            href="https://github.com/agenticstack-sh/agenticstack-mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium px-4 py-2 rounded-lg no-underline transition-opacity hover:opacity-90"
            style={{
              background: "var(--card)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
            }}
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Install */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-6">Install</h2>
        <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
          Requires Node 18+. Add the server to your MCP client config:
        </p>
        <div className="flex flex-col gap-6">
          {clients.map((client) => (
            <div key={client.name}>
              <p className="text-sm font-medium mb-1">{client.name}</p>
              <p className="text-xs mb-2 font-mono" style={{ color: "var(--muted)" }}>
                {client.path}
              </p>
              <pre
                className="text-sm rounded-xl px-5 py-4 overflow-x-auto"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              >
                <code>{client.snippet}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-2">Tools</h2>
        <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
          The server exposes five tools. A typical flow: call{" "}
          <code
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ background: "var(--accent)", color: "var(--accent-text)" }}
          >
            list_categories
          </code>{" "}
          first to discover valid slugs, then{" "}
          <code
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ background: "var(--accent)", color: "var(--accent-text)" }}
          >
            search_tools
          </code>{" "}
          or{" "}
          <code
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ background: "var(--accent)", color: "var(--accent-text)" }}
          >
            recommend_tool
          </code>{" "}
          to find candidates, then{" "}
          <code
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ background: "var(--accent)", color: "var(--accent-text)" }}
          >
            get_tool
          </code>{" "}
          or{" "}
          <code
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ background: "var(--accent)", color: "var(--accent-text)" }}
          >
            compare_tools
          </code>{" "}
          to go deeper.
        </p>
        <div className="flex flex-col gap-3">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="rounded-xl px-5 py-4"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="text-sm font-mono font-medium mb-1"
                style={{ color: "var(--accent-text)" }}
              >
                {tool.name}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Example prompts */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Example prompts</h2>
        <ul className="flex flex-col gap-2">
          {[
            "What auth tools support MCP and work with Python?",
            "Compare Auth0, Clerk, and WorkOS for an agentic app",
            "Recommend an observability tool for a TypeScript LangChain project",
            "What categories does AgenticStack cover?",
          ].map((prompt) => (
            <li
              key={prompt}
              className="text-sm px-4 py-3 rounded-lg"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
            >
              &ldquo;{prompt}&rdquo;
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
