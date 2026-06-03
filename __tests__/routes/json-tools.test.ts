import { describe, it, expect } from "vitest";
import { getToolBySlug, getAllTools } from "@/lib/markdown";

describe("/tools/:slug.json endpoint", () => {
  it("returns valid frontmatter for auth0", () => {
    const { frontmatter } = getToolBySlug("auth0");
    expect(frontmatter.name).toBe("Auth0");
    expect(frontmatter.slug).toBe("auth0");
    expect(frontmatter.agent_features).toBeDefined();
  });

  it("throws for nonexistent tool", () => {
    expect(() => getToolBySlug("nonexistent")).toThrow();
  });

  it("every tool frontmatter is JSON-serializable", () => {
    const tools = getAllTools();
    for (const tool of tools) {
      const json = JSON.stringify(tool);
      const parsed = JSON.parse(json);
      expect(parsed.name).toBe(tool.name);
      expect(parsed.slug).toBe(tool.slug);
      expect(parsed.agent_features).toEqual(tool.agent_features);
    }
  });

  it("every tool has last_verified and source_urls", () => {
    const tools = getAllTools();
    for (const tool of tools) {
      expect(tool.last_verified, `${tool.slug} missing last_verified`).toBeTruthy();
      expect(tool.source_urls, `${tool.slug} missing source_urls`).toBeDefined();
    }
  });
});
