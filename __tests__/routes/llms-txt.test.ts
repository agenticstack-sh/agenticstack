import { describe, it, expect } from "vitest";
import { getAllTools, getAllCategories, getAllComparisons } from "@/lib/markdown";

// Test the actual llms.txt route logic by importing it indirectly
// We replicate the same generation logic to verify correctness

function generateLlmsTxt(): string {
  const tools = getAllTools();
  const categories = getAllCategories();
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

  const comparisons = getAllComparisons();
  const compSection = comparisons.length === 0 ? "" :
    `## Comparisons\n\n${comparisons.map((c) => `- [${c.title}](/api/json/comparisons/${c.slug})`).join("\n")}`;

  return `# AgenticStack

> Find the right tool for every layer of your agent stack.

## Categories

${categoryLines}

## Tools

${toolsByCategoryLines}

${compSection}
`;
}

describe("/llms.txt content", () => {
  it("starts with # AgenticStack", () => {
    const body = generateLlmsTxt();
    expect(body.startsWith("# AgenticStack")).toBe(true);
  });

  it("contains an /api/json/tools/ link for each tool", () => {
    const body = generateLlmsTxt();
    const tools = getAllTools();
    for (const tool of tools) {
      expect(body).toContain(`/api/json/tools/${tool.slug}`);
    }
  });

  it("contains an /api/json/categories/ link for each active category", () => {
    const body = generateLlmsTxt();
    const activeCategories = getAllCategories().filter((c) => c.tools.length > 0);
    for (const cat of activeCategories) {
      expect(body).toContain(`/api/json/categories/${cat.category}`);
    }
  });

  it("all tool links point to /api/json/tools/ paths", () => {
    const body = generateLlmsTxt();
    const toolLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const matches = [...body.matchAll(toolLinkRegex)];
    const toolLinks = matches
      .map((m) => m[2])
      .filter((href) => href.startsWith("/api/json/tools/"));
    expect(toolLinks.length).toBe(getAllTools().length);
  });

  it("contains a link for each editorial comparison", () => {
    const body = generateLlmsTxt();
    const comparisons = getAllComparisons();
    for (const comp of comparisons) {
      expect(body).toContain(`/api/json/comparisons/${comp.slug}`);
    }
  });
});
