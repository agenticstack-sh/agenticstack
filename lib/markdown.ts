import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type {
  ToolFrontmatter,
  CategoryFrontmatter,
  ComparisonFrontmatter,
  ParsedContent,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

// gray-matter parses bare YAML dates (2026-04-17) as JS Date objects.
// Normalize them back to ISO date strings before returning.
function normalizeFrontmatter(data: Record<string, unknown>): Record<string, unknown> {
  const result = { ...data };
  if (result.last_verified instanceof Date) {
    result.last_verified = result.last_verified.toISOString().split("T")[0];
  }
  return result;
}

export function getToolBySlug(slug: string): ParsedContent<ToolFrontmatter> {
  const filePath = path.join(CONTENT_DIR, "tools", `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Tool not found: ${slug}`);
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    frontmatter: normalizeFrontmatter(data) as unknown as ToolFrontmatter,
    body: content,
  };
}

export function getAllTools(): ToolFrontmatter[] {
  const toolsDir = path.join(CONTENT_DIR, "tools");
  const files = fs.readdirSync(toolsDir).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(toolsDir, file), "utf-8");
    const { data } = matter(raw);
    return normalizeFrontmatter(data) as unknown as ToolFrontmatter;
  });
}

export function getCategoryBySlug(
  slug: string
): ParsedContent<CategoryFrontmatter> {
  const filePath = path.join(CONTENT_DIR, "categories", `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Category not found: ${slug}`);
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    frontmatter: data as CategoryFrontmatter,
    body: content,
  };
}

export function getAllCategories(): CategoryFrontmatter[] {
  const categoriesDir = path.join(CONTENT_DIR, "categories");
  const files = fs.readdirSync(categoriesDir).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(categoriesDir, file), "utf-8");
    const { data } = matter(raw);
    return data as CategoryFrontmatter;
  });
}

export function getComparisonBySlug(slug: string): ParsedContent<ComparisonFrontmatter> {
  const filePath = path.join(CONTENT_DIR, "comparisons", `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Comparison not found: ${slug}`);
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    frontmatter: normalizeFrontmatter(data) as unknown as ComparisonFrontmatter,
    body: content,
  };
}

export function getAllComparisons(): ComparisonFrontmatter[] {
  const comparisonsDir = path.join(CONTENT_DIR, "comparisons");
  if (!fs.existsSync(comparisonsDir)) return [];
  const files = fs
    .readdirSync(comparisonsDir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(comparisonsDir, file), "utf-8");
    const { data } = matter(raw);
    return normalizeFrontmatter(data) as unknown as ComparisonFrontmatter;
  });
}

export function getRawMarkdown(type: "tools" | "categories" | "comparisons", slug: string): string | null {
  const filePath = path.join(CONTENT_DIR, type, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export async function renderToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);
  return result.toString();
}
