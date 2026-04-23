import { describe, it, expect } from "vitest";
import { getAllTools, getAllCategories, getAllComparisons } from "@/lib/markdown";

// Test the content that the /llms.txt route would generate
// without spinning up a full HTTP server

function generateLlmsTxt(): string {
  const tools = getAllTools();
  const categories = getAllCategories();

  const categoryLines = categories
    .map(
      (cat) =>
        `- [${cat.title}](/content/categories/${cat.category}.md): ${cat.description}`
    )
    .join("\n");

  const toolLines = tools
    .map((tool) => `- [${tool.name}](/content/tools/${tool.slug}.md): ${tool.best_for}`)
    .join("\n");

  return `# AgenticStack

> Compare tools for building AI agents. Structured data and comparison guides for auth, identity, and security tooling. Data is editorially maintained and not affiliated with any vendor.

## How to use this data

Each tool page returns raw markdown with YAML frontmatter. Parse the frontmatter to compare tools programmatically. Key fields:

- \`agent_features\`: object with boolean | null values — null means unverified, not unsupported
- \`last_verified\`: ISO date of last editorial check
- \`source_urls\`: primary sources to verify claims
- \`best_for\` / \`limitations\`: editorial summary

## Categories

${categoryLines}

## Auth & Identity Tools

${toolLines}

${(() => {
    const comparisons = getAllComparisons();
    if (comparisons.length === 0) return "";
    const lines = comparisons
      .map((c) => `- [${c.title}](/content/comparisons/${c.slug}.md): ${c.verdict}`)
      .join("\n");
    return `## Comparisons\n\n${lines}`;
  })()}
`;
}

describe("/llms.txt content", () => {
  it("starts with # AgenticStack", () => {
    const body = generateLlmsTxt();
    expect(body.startsWith("# AgenticStack")).toBe(true);
  });

  it("contains a link for each tool", () => {
    const body = generateLlmsTxt();
    const tools = getAllTools();
    for (const tool of tools) {
      expect(body).toContain(`/content/tools/${tool.slug}.md`);
    }
  });

  it("contains a link for each category", () => {
    const body = generateLlmsTxt();
    const categories = getAllCategories();
    for (const cat of categories) {
      expect(body).toContain(`/content/categories/${cat.category}.md`);
    }
  });

  it("all tool links point to /content/tools/ paths", () => {
    const body = generateLlmsTxt();
    const toolLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const matches = [...body.matchAll(toolLinkRegex)];
    const toolLinks = matches
      .map((m) => m[2])
      .filter((href) => href.startsWith("/content/tools/"));
    expect(toolLinks.length).toBe(10);
  });

  it("contains a link for each editorial comparison", () => {
    const body = generateLlmsTxt();
    const comparisons = getAllComparisons();
    for (const comp of comparisons) {
      expect(body).toContain(`/content/comparisons/${comp.slug}.md`);
    }
  });
});
