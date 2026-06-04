import { describe, it, expect } from "vitest";
import {
  getToolBySlug,
  getAllTools,
  getCategoryBySlug,
  getAllCategories,
  getComparisonBySlug,
  getAllComparisons,
  getRawMarkdown,
  renderToHtml,
} from "@/lib/markdown";

describe("getToolBySlug", () => {
  it("returns correct frontmatter for a known tool", () => {
    const tools = getAllTools();
    const first = tools[0];
    const result = getToolBySlug(first.slug);
    expect(result.frontmatter.name).toBe(first.name);
    expect(result.frontmatter.slug).toBe(first.slug);
    expect(result.frontmatter.category).toBeTruthy();
  });

  it("includes a body", () => {
    const tools = getAllTools();
    const result = getToolBySlug(tools[0].slug);
    expect(result.body.length).toBeGreaterThan(0);
  });

  it("throws for an unknown slug", () => {
    expect(() => getToolBySlug("nonexistent-tool")).toThrow();
  });
});

describe("getAllTools", () => {
  it("returns at least one tool", () => {
    const tools = getAllTools();
    expect(tools.length).toBeGreaterThan(0);
  });

  it("every tool has required frontmatter fields", () => {
    const tools = getAllTools();
    for (const tool of tools) {
      expect(tool.name).toBeTruthy();
      expect(tool.slug).toBeTruthy();
      expect(tool.category).toBeTruthy();
      expect(tool.website).toBeTruthy();
      expect(tool.agent_features).toBeDefined();
      expect(tool.last_verified).toBeTruthy();
      expect(tool.source_urls).toBeDefined();
    }
  });
});

describe("getCategoryBySlug", () => {
  it("returns correct metadata for each category", () => {
    const categories = getAllCategories();
    for (const cat of categories) {
      const result = getCategoryBySlug(cat.category);
      expect(result.frontmatter.category).toBe(cat.category);
      expect(result.frontmatter.title).toBeTruthy();
      expect(result.frontmatter.tools).toBeDefined();
    }
  });

  it("throws for unknown category", () => {
    expect(() => getCategoryBySlug("nonexistent")).toThrow();
  });
});

describe("getRawMarkdown", () => {
  it("returns raw file contents including frontmatter delimiters", () => {
    const tools = getAllTools();
    const raw = getRawMarkdown("tools", tools[0].slug);
    expect(raw).not.toBeNull();
    expect(raw!.startsWith("---")).toBe(true);
    expect(raw!).toContain(`name: ${tools[0].name}`);
  });

  it("returns null for unknown slug", () => {
    const raw = getRawMarkdown("tools", "nonexistent");
    expect(raw).toBeNull();
  });

  it("works for categories", () => {
    const categories = getAllCategories();
    const raw = getRawMarkdown("categories", categories[0].category);
    expect(raw).not.toBeNull();
    expect(raw!.startsWith("---")).toBe(true);
  });
});

describe("getComparisonBySlug", () => {
  it("returns correct frontmatter for each comparison", () => {
    const comparisons = getAllComparisons();
    for (const comp of comparisons) {
      const result = getComparisonBySlug(comp.slug);
      expect(result.frontmatter.title).toBe(comp.title);
      expect(result.frontmatter.slug).toBe(comp.slug);
      expect(result.frontmatter.tools).toHaveLength(2);
      expect(result.frontmatter.category).toBeTruthy();
    }
  });

  it("includes a body", () => {
    const comparisons = getAllComparisons();
    const result = getComparisonBySlug(comparisons[0].slug);
    expect(result.body.length).toBeGreaterThan(0);
  });

  it("throws for an unknown slug", () => {
    expect(() => getComparisonBySlug("nonexistent-vs-nothing")).toThrow();
  });
});

describe("getAllComparisons", () => {
  it("returns at least one comparison", () => {
    const comparisons = getAllComparisons();
    expect(comparisons.length).toBeGreaterThanOrEqual(1);
  });

  it("filters out _template.md", () => {
    const comparisons = getAllComparisons();
    const hasTemplate = comparisons.some((c) => c.slug === "_template" || c.slug === "toola-vs-toolb");
    expect(hasTemplate).toBe(false);
  });

  it("every comparison has required fields", () => {
    const comparisons = getAllComparisons();
    for (const comp of comparisons) {
      expect(comp.title).toBeTruthy();
      expect(comp.slug).toBeTruthy();
      expect(comp.tools).toHaveLength(2);
      expect(comp.category).toBeTruthy();
      expect(comp.last_verified).toBeTruthy();
    }
  });
});

describe("renderToHtml", () => {
  it("converts markdown to HTML", async () => {
    const html = await renderToHtml("# Hello\n\nThis is **bold**.");
    expect(html).toContain("<h1");
    expect(html).toContain("<strong>");
  });

  it("handles empty string", async () => {
    const html = await renderToHtml("");
    expect(typeof html).toBe("string");
  });

  it("strips script tags", async () => {
    const html = await renderToHtml('<script>alert(1)</script>');
    expect(html).not.toContain("<script");
  });

  it("strips event handlers", async () => {
    const html = await renderToHtml('<img src=x onerror="alert(1)">');
    expect(html).not.toContain("onerror");
  });
});
