import {
  getToolBySlug,
  getCategoryBySlug,
  getComparisonBySlug,
} from "@/lib/markdown";
import { NextRequest } from "next/server";

const VALID_TYPES = ["tools", "categories", "comparisons"] as const;
type ContentType = (typeof VALID_TYPES)[number];

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=3600",
  "Access-Control-Allow-Origin": "*",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: HEADERS });
}

function handleTool(slug: string) {
  try {
    return jsonResponse(getToolBySlug(slug).frontmatter);
  } catch {
    return jsonResponse({ error: "Tool not found" }, 404);
  }
}

function handleCategory(slug: string) {
  try {
    const { frontmatter } = getCategoryBySlug(slug);
    const tools = frontmatter.tools.map((toolSlug) => {
      try {
        return getToolBySlug(toolSlug).frontmatter;
      } catch {
        return null;
      }
    }).filter(Boolean);

    return jsonResponse({
      ...frontmatter,
      tools,
    });
  } catch {
    return jsonResponse({ error: "Category not found" }, 404);
  }
}

function handleComparison(slug: string) {
  try {
    const { frontmatter } = getComparisonBySlug(slug);
    const tools = frontmatter.tools.map((toolSlug) => {
      try {
        return getToolBySlug(toolSlug).frontmatter;
      } catch {
        return null;
      }
    }).filter(Boolean);

    return jsonResponse({
      ...frontmatter,
      tools,
    });
  } catch {
    return jsonResponse({ error: "Comparison not found" }, 404);
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  if (path.length !== 2) {
    return jsonResponse({ error: "Not found" }, 404);
  }

  const [type, slug] = path;

  switch (type as ContentType) {
    case "tools":
      return handleTool(slug);
    case "categories":
      return handleCategory(slug);
    case "comparisons":
      return handleComparison(slug);
    default:
      return jsonResponse({ error: "Not found" }, 404);
  }
}
