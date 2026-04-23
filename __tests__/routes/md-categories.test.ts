import { describe, it, expect } from "vitest";
import { getRawMarkdown } from "@/lib/markdown";

describe("/content/categories/:slug.md content", () => {
  it("returns content for auth category with valid YAML frontmatter", () => {
    const raw = getRawMarkdown("categories", "auth");
    expect(raw).not.toBeNull();
    expect(raw!.startsWith("---")).toBe(true);
    const closingIndex = raw!.indexOf("---", 3);
    expect(closingIndex).toBeGreaterThan(3);
  });

  it("returns null for nonexistent category", () => {
    const raw = getRawMarkdown("categories", "nonexistent");
    expect(raw).toBeNull();
  });

  it("auth category markdown contains category field", () => {
    const raw = getRawMarkdown("categories", "auth");
    expect(raw!).toContain("category: auth");
  });

  it("auth category markdown contains tools list", () => {
    const raw = getRawMarkdown("categories", "auth");
    expect(raw!).toContain("tools:");
  });
});
