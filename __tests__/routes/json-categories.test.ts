import { describe, it, expect } from "vitest";
import { getAllCategories, getCategoryBySlug, getToolBySlug } from "@/lib/markdown";

describe("/categories/:slug.json endpoint", () => {
  it("returns valid frontmatter for each category", () => {
    const categories = getAllCategories();
    for (const cat of categories) {
      const { frontmatter } = getCategoryBySlug(cat.category);
      expect(frontmatter.category).toBe(cat.category);
      expect(frontmatter.title).toBeTruthy();
      expect(frontmatter.tools).toBeDefined();
    }
  });

  it("throws for nonexistent category", () => {
    expect(() => getCategoryBySlug("nonexistent")).toThrow();
  });

  it("embeds all tools with full frontmatter (N+1 fix)", () => {
    const categories = getAllCategories().filter((c) => c.tools.length > 0);
    expect(categories.length).toBeGreaterThan(0);

    for (const cat of categories) {
      const { frontmatter } = getCategoryBySlug(cat.category);
      const embeddedTools = frontmatter.tools.map((slug) =>
        getToolBySlug(slug).frontmatter
      );

      expect(embeddedTools.length).toBe(frontmatter.tools.length);

      for (const tool of embeddedTools) {
        expect(tool.name).toBeTruthy();
        expect(tool.slug).toBeTruthy();
        expect(tool.agent_features).toBeDefined();
        expect(tool.agent_features.agent_sdk).not.toBeUndefined();
        expect(tool.agent_features.token_delegation).not.toBeUndefined();
      }
    }
  });

  it("category + embedded tools is JSON-serializable", () => {
    const categories = getAllCategories().filter((c) => c.tools.length > 0);

    for (const cat of categories) {
      const { frontmatter } = getCategoryBySlug(cat.category);
      const tools = frontmatter.tools.map((slug) =>
        getToolBySlug(slug).frontmatter
      );
      const payload = { ...frontmatter, tools };
      const json = JSON.stringify(payload);
      const parsed = JSON.parse(json);

      expect(parsed.category).toBe(cat.category);
      expect(parsed.tools.length).toBe(frontmatter.tools.length);
      expect(parsed.tools[0].agent_features).toBeDefined();
    }
  });
});
