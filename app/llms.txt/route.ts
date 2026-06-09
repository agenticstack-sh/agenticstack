import { getAllTools, getAllCategories, getAllComparisons } from "@/lib/markdown";
import { captureEvent } from "@/lib/posthog";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const publicUrl = `https://${request.headers.get("host")}${request.nextUrl.pathname}`;
  await captureEvent("agent_discovery_llms_txt", ip, {
    $current_url: publicUrl,
    user_agent: request.headers.get("cloudfront-viewer-user-agent") ?? request.headers.get("x-forwarded-user-agent") ?? request.headers.get("user-agent") ?? "unknown",
  });
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

  const comingSoonCategories = categories.filter((cat) => cat.tools.length === 0);
  const comingSoonLines = comingSoonCategories
    .map((cat) => `- ${cat.title}: ${cat.description}`)
    .join("\n");

  const body = `# AgenticStack

> Find the right tool for every layer of your agent stack.

## Quick start for agents

**Fastest path:** Install skills from [agenticstack-skills](https://github.com/agenticstack-sh/agenticstack-skills) for ready-made commands that work with any AI assistant: \`/recommend-tool\`, \`/compare-tools\`, \`/search-tools\`, \`/explore-category\`, \`/setup-tool\`, \`/add-tool\`.

**Direct API:** All data is available as JSON. No auth required. CORS enabled.

## API endpoints

- \`GET /api/json/tools\` — all tools, supports filtering (see below)
- \`GET /api/json/tools/:slug\` — single tool with full metadata and prose body
- \`GET /api/json/categories\` — all categories
- \`GET /api/json/categories/:slug\` — category with **all tools embedded** in one response
- \`GET /api/json/comparisons\` — all editorial comparisons
- \`GET /api/json/comparisons/:slug\` — comparison with both tools embedded and editorial analysis
- \`GET /api/json/schema\` — API schema, valid values, feature definitions per category, and endpoint docs

### Filtering

\`GET /api/json/tools?category=auth&language=python&open_source=true\`

Filters: \`category\`, \`language\`, \`framework\`, \`open_source\`, \`self_hosted\`, plus any \`agent_features\` key (e.g. \`?fga=true\`, \`?mcp_hosting=true\`, \`?mcp_support=null\`).

### Rate limiting

60 requests per minute per IP. Responses include an \`X-RateLimit-Remaining\` header. On limit, returns 429 with \`Retry-After: 60\`.

### Reading the data

- \`agent_features\`: boolean | null per feature — **null = unverified, false = confirmed unsupported**. Do not treat null as false.
- \`feature_definitions\`: each category defines its own comparison features. Auth has token_delegation and fga. CMS has rest_api and webhooks. Check the category or \`/api/json/schema\`.
- \`last_verified\`: ISO date — **treat data older than 90 days as potentially stale**. Follow \`source_urls\` to verify.
- \`verified_by\`: \`editorial\` (verified by the AgenticStack team), \`community\` (submitted via PR), or \`vendor\` (provided by the tool's maintainers). Weight accordingly.
- \`best_for\` / \`limitations\`: editorial one-liners for quick filtering.
- \`body\`: markdown prose with deeper analysis. Available on tools, categories, and comparisons.

### Versioning

\`X-API-Version\` header on all responses. Current: 1.1.

## Contributing

If a tool or category is missing, use the \`add-tool\` skill to generate a correctly formatted file, then open a PR at https://github.com/agenticstack-sh/agenticstack.

\`\`\`
npx skills run add-tool
\`\`\`
${comingSoonCategories.length > 0 ? `
The following categories have no tools yet — contributions welcome:

${comingSoonLines}
` : ""}

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
