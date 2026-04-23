import { describe, it, expect } from "vitest";
import {
  getToolBySlug,
  getAllTools,
  getCategoryBySlug,
  getComparisonBySlug,
  getAllComparisons,
  getRawMarkdown,
  renderToHtml,
} from "@/lib/markdown";

describe("getToolBySlug", () => {
  it("returns correct frontmatter for a known tool", () => {
    const result = getToolBySlug("auth0");
    expect(result.frontmatter.name).toBe("Auth0");
    expect(result.frontmatter.slug).toBe("auth0");
    expect(result.frontmatter.category).toBe("auth");
  });

  it("includes a body", () => {
    const result = getToolBySlug("auth0");
    expect(result.body.length).toBeGreaterThan(0);
  });

  it("throws for an unknown slug", () => {
    expect(() => getToolBySlug("nonexistent-tool")).toThrow();
  });
});

describe("getAllTools", () => {
  it("returns all 10 tools", () => {
    const tools = getAllTools();
    expect(tools).toHaveLength(10);
  });

  it("every tool has required frontmatter fields", () => {
    const tools = getAllTools();
    for (const tool of tools) {
      expect(tool.name).toBeTruthy();
      expect(tool.slug).toBeTruthy();
      expect(tool.category).toBe("auth");
      expect(tool.website).toBeTruthy();
      expect(tool.agent_features).toBeDefined();
      expect(tool.last_verified).toBeTruthy();
      expect(tool.source_urls).toBeDefined();
    }
  });
});

describe("getCategoryBySlug", () => {
  it("returns correct metadata for auth category", () => {
    const result = getCategoryBySlug("auth");
    expect(result.frontmatter.category).toBe("auth");
    expect(result.frontmatter.title).toBeTruthy();
    expect(result.frontmatter.tools).toHaveLength(10);
  });

  it("throws for unknown category", () => {
    expect(() => getCategoryBySlug("nonexistent")).toThrow();
  });
});

describe("getRawMarkdown", () => {
  it("returns raw file contents including frontmatter delimiters", () => {
    const raw = getRawMarkdown("tools", "auth0");
    expect(raw).not.toBeNull();
    expect(raw!.startsWith("---")).toBe(true);
    expect(raw!).toContain("name: Auth0");
  });

  it("returns null for unknown slug", () => {
    const raw = getRawMarkdown("tools", "nonexistent");
    expect(raw).toBeNull();
  });

  it("works for categories", () => {
    const raw = getRawMarkdown("categories", "auth");
    expect(raw).not.toBeNull();
    expect(raw!.startsWith("---")).toBe(true);
  });
});

describe("getComparisonBySlug", () => {
  it("returns correct frontmatter for a known comparison", () => {
    const result = getComparisonBySlug("auth0-vs-clerk");
    expect(result.frontmatter.title).toBe("Auth0 vs Clerk");
    expect(result.frontmatter.slug).toBe("auth0-vs-clerk");
    expect(result.frontmatter.tools).toEqual(["auth0", "clerk"]);
    expect(result.frontmatter.category).toBe("auth");
  });

  it("includes a body", () => {
    const result = getComparisonBySlug("auth0-vs-clerk");
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
});
