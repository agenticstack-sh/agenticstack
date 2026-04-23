import { describe, it, expect } from "vitest";
import { getRawMarkdown, getAllTools } from "@/lib/markdown";

describe("/content/tools/:slug.md content", () => {
  it("returns content for auth0 containing valid YAML frontmatter", () => {
    const raw = getRawMarkdown("tools", "auth0");
    expect(raw).not.toBeNull();
    expect(raw!.startsWith("---")).toBe(true);
    // Find closing ---
    const closingIndex = raw!.indexOf("---", 3);
    expect(closingIndex).toBeGreaterThan(3);
  });

  it("returns null for nonexistent tool", () => {
    const raw = getRawMarkdown("tools", "nonexistent");
    expect(raw).toBeNull();
  });

  it("each tool's raw markdown contains its name in frontmatter", () => {
    const tools = getAllTools();
    for (const tool of tools) {
      const raw = getRawMarkdown("tools", tool.slug);
      expect(raw, `Missing raw markdown for ${tool.slug}`).not.toBeNull();
      expect(raw!).toContain(`name: ${tool.name}`);
    }
  });

  it("each tool markdown contains last_verified and source_urls", () => {
    const tools = getAllTools();
    for (const tool of tools) {
      const raw = getRawMarkdown("tools", tool.slug);
      expect(raw!).toContain("last_verified:");
      expect(raw!).toContain("source_urls:");
    }
  });
});
