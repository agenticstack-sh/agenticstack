import { getAllTools, getAllCategories, getAllComparisons } from "@/lib/markdown";

export const dynamic = "force-static";

export function GET() {
  const tools = getAllTools();
  const categories = getAllCategories();

  // Only list categories that have tools
  const activeCategories = categories.filter((cat) => cat.tools.length > 0);

  const categoryLines = activeCategories
    .map(
      (cat) =>
        `- [${cat.title}](/api/json/categories/${cat.category}): ${cat.description}`
    )
    .join("\n");

  const toolsByCategoryLines = activeCategories
    .map((cat) => {
      const catTools = tools.filter((t) => t.category === cat.category);
      if (catTools.length === 0) return "";
      const lines = catTools
        .map((tool) => `- [${tool.name}](/api/json/tools/${tool.slug}): ${tool.best_for}`)
        .join("\n");
      return `## ${cat.title}\n\n${lines}`;
    })
    .filter(Boolean)
    .join("\n\n");

  const body = `# AgenticStack

> Structured comparisons across the tools AI agent developers reach for.

## How to use this data

All data is available as JSON via the \`/api/json/\` endpoints.

### Endpoints

- \`GET /api/json/tools\` — all tools (supports filtering, see below)
- \`GET /api/json/tools/:slug\` — single tool with full metadata and body
- \`GET /api/json/categories\` — all categories
- \`GET /api/json/categories/:slug\` — category with **all tools embedded**
- \`GET /api/json/comparisons\` — all editorial comparisons
- \`GET /api/json/comparisons/:slug\` — comparison with both tools embedded
- \`GET /api/json/schema\` — API schema, valid values, and feature definitions per category

### Filtering tools

\`GET /api/json/tools?category=auth&language=python&open_source=true\`

Supported filters: \`category\`, \`language\`, \`framework\`, \`open_source\`, \`self_hosted\`, plus any \`agent_features\` key (e.g. \`?fga=true\`, \`?mcp_support=null\`).

### Key fields

- \`agent_features\`: object with boolean | null values — **null means unverified, not unsupported**
- \`last_verified\`: ISO date of last editorial check — **data older than 90 days should be treated as potentially stale**
- \`source_urls\`: primary sources to verify claims against
- \`best_for\` / \`limitations\`: editorial summary
- \`feature_definitions\`: per-category descriptions of what each agent_features key means

### Versioning

Responses include an \`X-API-Version\` header. Current version: 1.0.

## Categories

${categoryLines}

## Tools

${toolsByCategoryLines}

${(() => {
    const comparisons = getAllComparisons();
    if (comparisons.length === 0) return "";
    const lines = comparisons
      .map((c) => `- [${c.title}](/api/json/comparisons/${c.slug}): ${c.verdict}`)
      .join("\n");
    return `## Comparisons\n\n${lines}`;
  })()}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
