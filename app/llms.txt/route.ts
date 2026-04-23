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
        `- [${cat.title}](/content/categories/${cat.category}.md): ${cat.description}`
    )
    .join("\n");

  const toolsByCategoryLines = activeCategories
    .map((cat) => {
      const catTools = tools.filter((t) => t.category === cat.category);
      if (catTools.length === 0) return "";
      const lines = catTools
        .map((tool) => `- [${tool.name}](/content/tools/${tool.slug}.md): ${tool.best_for}`)
        .join("\n");
      return `## ${cat.title}\n\n${lines}`;
    })
    .filter(Boolean)
    .join("\n\n");

  const body = `# AgenticStack

> Structured comparisons across the tools AI agent developers reach for.

## How to use this data

Each tool page returns raw markdown with YAML frontmatter. Parse the frontmatter to compare tools programmatically. Key fields:

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
      .map((c) => `- [${c.title}](/content/comparisons/${c.slug}.md): ${c.verdict}`)
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
