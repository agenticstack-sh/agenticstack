import { describe, it, expect } from "vitest";
import { getAllTools, getCategoryBySlug, getToolBySlug, getAllComparisons } from "@/lib/markdown";
import fs from "fs";
import path from "path";

const REQUIRED_TOOL_FIELDS = [
  "name", "slug", "category", "type", "website", "pricing",
  "agent_features", "last_verified", "source_urls", "best_for", "limitations",
];

const REQUIRED_AGENT_FEATURES = [
  "agent_sdk", "token_delegation", "human_in_the_loop",
  "fga", "mcp_support", "async_authorization",
];

describe("Tool frontmatter validation", () => {
  const tools = getAllTools();

  it("all 10 tools have required fields", () => {
    for (const tool of tools) {
      for (const field of REQUIRED_TOOL_FIELDS) {
        expect(
          tool[field as keyof typeof tool],
          `${tool.slug} missing field: ${field}`
        ).toBeDefined();
      }
    }
  });

  it("every agent_features object has all required keys", () => {
    for (const tool of tools) {
      for (const key of REQUIRED_AGENT_FEATURES) {
        expect(
          key in tool.agent_features,
          `${tool.slug} agent_features missing key: ${key}`
        ).toBe(true);
      }
    }
  });

  it("every agent_features value is true, false, or null", () => {
    for (const tool of tools) {
      for (const [key, value] of Object.entries(tool.agent_features)) {
        expect(
          value === true || value === false || value === null,
          `${tool.slug} agent_features.${key} has invalid value: ${value}`
        ).toBe(true);
      }
    }
  });

  it("every tool slug matches its filename", () => {
    const toolsDir = path.join(process.cwd(), "public", "content", "tools");
    const files = fs.readdirSync(toolsDir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const expectedSlug = file.replace(".md", "");
      const tool = tools.find((t) => t.slug === expectedSlug);
      expect(tool, `No tool with slug matching filename: ${file}`).toBeDefined();
    }
  });

  it("last_verified is a valid date string", () => {
    for (const tool of tools) {
      const date = new Date(tool.last_verified);
      expect(
        isNaN(date.getTime()),
        `${tool.slug} has invalid last_verified: ${tool.last_verified}`
      ).toBe(false);
    }
  });

  it("source_urls has at least one entry", () => {
    for (const tool of tools) {
      const urls = Object.values(tool.source_urls).filter(Boolean);
      expect(
        urls.length,
        `${tool.slug} source_urls is empty`
      ).toBeGreaterThan(0);
    }
  });

  it("no tool has empty best_for or limitations", () => {
    for (const tool of tools) {
      expect(tool.best_for.trim(), `${tool.slug} has empty best_for`).toBeTruthy();
      expect(tool.limitations.trim(), `${tool.slug} has empty limitations`).toBeTruthy();
    }
  });
});

describe("Category frontmatter validation", () => {
  it("category auth lists tools that actually exist as files", () => {
    const category = getCategoryBySlug("auth");
    for (const toolSlug of category.frontmatter.tools) {
      expect(
        () => getToolBySlug(toolSlug),
        `Category references tool that doesn't exist: ${toolSlug}`
      ).not.toThrow();
    }
  });
});

describe("Comparison frontmatter validation", () => {
  const comparisons = getAllComparisons();

  it("every comparison has required fields", () => {
    for (const comp of comparisons) {
      expect(comp.title, `${comp.slug} missing title`).toBeTruthy();
      expect(comp.slug, `comparison missing slug`).toBeTruthy();
      expect(comp.tools, `${comp.slug} missing tools`).toBeDefined();
      expect(comp.tools.length, `${comp.slug} must reference exactly 2 tools`).toBe(2);
      expect(comp.category, `${comp.slug} missing category`).toBeTruthy();
      expect(comp.last_verified, `${comp.slug} missing last_verified`).toBeTruthy();
    }
  });

  it("every comparison references tools that exist", () => {
    for (const comp of comparisons) {
      for (const toolSlug of comp.tools) {
        expect(
          () => getToolBySlug(toolSlug),
          `${comp.slug} references tool that doesn't exist: ${toolSlug}`
        ).not.toThrow();
      }
    }
  });

  it("every comparison slug matches its filename", () => {
    const comparisonsDir = path.join(process.cwd(), "public", "content", "comparisons");
    const files = fs
      .readdirSync(comparisonsDir)
      .filter((f) => f.endsWith(".md") && !f.startsWith("_"));
    for (const file of files) {
      const expectedSlug = file.replace(".md", "");
      const comp = comparisons.find((c) => c.slug === expectedSlug);
      expect(comp, `No comparison with slug matching filename: ${file}`).toBeDefined();
    }
  });
});
