import {
  getAllTools,
  getToolBySlug,
  getAllCategories,
  getCategoryBySlug,
  getAllComparisons,
  getComparisonBySlug,
} from "@/lib/markdown";
import { NextRequest } from "next/server";
import type { ToolFrontmatter } from "@/lib/types";

const API_VERSION = "1.0";

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=3600",
  "Access-Control-Allow-Origin": "*",
  "X-API-Version": API_VERSION,
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: HEADERS });
}

function handleToolsList(searchParams: URLSearchParams) {
  let tools = getAllTools();

  const category = searchParams.get("category");
  if (category) {
    tools = tools.filter((t) => t.category === category);
  }

  const language = searchParams.get("language");
  if (language) {
    const lang = language.toLowerCase();
    tools = tools.filter((t) =>
      t.sdk_languages.some((l) => l.toLowerCase() === lang)
    );
  }

  const framework = searchParams.get("framework");
  if (framework) {
    const fw = framework.toLowerCase();
    tools = tools.filter((t) =>
      t.frameworks.some((f) => f.toLowerCase() === fw)
    );
  }

  const openSource = searchParams.get("open_source");
  if (openSource === "true") tools = tools.filter((t) => t.open_source);
  if (openSource === "false") tools = tools.filter((t) => !t.open_source);

  const selfHosted = searchParams.get("self_hosted");
  if (selfHosted === "true") tools = tools.filter((t) => t.self_hosted);
  if (selfHosted === "false") tools = tools.filter((t) => !t.self_hosted);

  // Filter by any agent_feature key: ?agent_sdk=true, ?mcp_support=false, etc.
  for (const [key, value] of searchParams.entries()) {
    if (["category", "language", "framework", "open_source", "self_hosted"].includes(key)) continue;
    if (value === "true" || value === "false" || value === "null") {
      const expected = value === "true" ? true : value === "false" ? false : null;
      tools = tools.filter((t) => t.agent_features[key] === expected);
    }
  }

  return jsonResponse({
    count: tools.length,
    tools,
  });
}

function handleTool(slug: string) {
  try {
    const { frontmatter, body } = getToolBySlug(slug);
    return jsonResponse({
      ...frontmatter,
      body: body.trim() || null,
    });
  } catch {
    return jsonResponse({ error: "Tool not found" }, 404);
  }
}

function handleCategoriesList() {
  const categories = getAllCategories();
  return jsonResponse({
    count: categories.length,
    categories,
  });
}

function handleCategory(slug: string) {
  try {
    const { frontmatter, body } = getCategoryBySlug(slug);
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
      body: body.trim() || null,
    });
  } catch {
    return jsonResponse({ error: "Category not found" }, 404);
  }
}

function handleComparisonsList() {
  const comparisons = getAllComparisons();
  return jsonResponse({
    count: comparisons.length,
    comparisons,
  });
}

function handleComparison(slug: string) {
  try {
    const { frontmatter, body } = getComparisonBySlug(slug);
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
      body: body.trim() || null,
    });
  } catch {
    return jsonResponse({ error: "Comparison not found" }, 404);
  }
}

function handleSchema() {
  const categories = getAllCategories();
  const tools = getAllTools();

  const featuresByCategory: Record<string, Record<string, string>> = {};
  for (const cat of categories) {
    const { frontmatter } = getCategoryBySlug(cat.category);
    if (frontmatter.feature_definitions) {
      featuresByCategory[cat.category] = frontmatter.feature_definitions;
    }
  }

  const allLanguages = [...new Set(tools.flatMap((t) => t.sdk_languages))].sort();
  const allFrameworks = [...new Set(tools.flatMap((t) => t.frameworks))].filter(Boolean).sort();
  const allCompliance = [...new Set(tools.flatMap((t) => t.compliance))].sort();

  return jsonResponse({
    api_version: API_VERSION,
    staleness_threshold_days: 90,
    tool_fields: {
      name: "string",
      slug: "string",
      category: "string",
      type: ["cloud", "self-hosted", "hybrid"],
      pricing: ["free", "freemium", "paid", "open-source"],
      open_source: "boolean",
      self_hosted: "boolean",
      sdk_languages: allLanguages,
      frameworks: allFrameworks,
      agent_features: "Record<string, true | false | null> — keys vary by category, see feature_definitions",
      compliance: allCompliance,
      best_for: "string",
      limitations: "string",
      verified_by: ["editorial", "community", "vendor"],
      last_verified: "ISO 8601 date (YYYY-MM-DD)",
      source_urls: "Record<string, url>",
    },
    feature_definitions_by_category: featuresByCategory,
    categories: categories.map((c) => c.category),
    null_semantics: "null on any agent_features field means unverified — not the same as false (confirmed unsupported). Agents should surface this distinction.",
    endpoints: {
      "GET /api/json/tools": "List all tools. Supports filtering: ?category=auth&language=python&open_source=true&agent_sdk=true",
      "GET /api/json/tools/:slug": "Get a single tool with full frontmatter and body",
      "GET /api/json/categories": "List all categories",
      "GET /api/json/categories/:slug": "Get a category with all tools embedded",
      "GET /api/json/comparisons": "List all editorial comparisons",
      "GET /api/json/comparisons/:slug": "Get a comparison with both tools embedded",
      "GET /api/json/schema": "This endpoint — API schema and metadata",
    },
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const [type, slug] = path;

  // Single segment: list endpoints
  if (path.length === 1) {
    switch (type) {
      case "tools":
        return handleToolsList(request.nextUrl.searchParams);
      case "categories":
        return handleCategoriesList();
      case "comparisons":
        return handleComparisonsList();
      case "schema":
        return handleSchema();
      default:
        return jsonResponse({ error: "Not found" }, 404);
    }
  }

  // Two segments: detail endpoints
  if (path.length === 2) {
    switch (type) {
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

  return jsonResponse({ error: "Not found" }, 404);
}
