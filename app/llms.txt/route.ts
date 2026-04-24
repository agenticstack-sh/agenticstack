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
        `- [${cat.title}](/categories/${cat.category}.json): ${cat.description}`
    )
    .join("\n");

  const toolsByCategoryLines = activeCategories
    .map((cat) => {
      const catTools = tools.filter((t) => t.category === cat.category);
      if (catTools.length === 0) return "";
      const lines = catTools
        .map((tool) => `- [${tool.name}](/tools/${tool.slug}.json): ${tool.best_for}`)
        .join("\n");
      return `## ${cat.title}\n\n${lines}`;
    })
    .filter(Boolean)
    .join("\n\n");

  const body = `# AgenticStack

> Structured comparisons across the tools AI agent developers reach for.

## How to use this data

Every resource is available as JSON. Append \`.json\` to any page URL to get structured data.

- \`/categories/:slug.json\` returns the category with **all tools embedded** — one request for the full feature matrix
- \`/tools/:slug.json\` returns a single tool's metadata
- \`/compare/:slug.json\` returns the comparison with both tools embedded

Key fields in each tool object:

- \`agent_features\`: object with boolean | null values — null means unverified, not unsupported
- \`last_verified\`: ISO date of last editorial check
- \`source_urls\`: primary sources to verify claims
- \`best_for\` / \`limitations\`: editorial summary

## Categories

${categoryLines}

## Tools

${toolsByCategoryLines}

${(() => {
    const comparisons = getAllComparisons();
    if (comparisons.length === 0) return "";
    const lines = comparisons
      .map((c) => `- [${c.title}](/compare/${c.slug}.json): ${c.verdict}`)
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
