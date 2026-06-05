import {
  getAllTools,
  getToolBySlug,
  getAllCategories,
  getCategoryBySlug,
  getAllComparisons,
  getComparisonBySlug,
} from "@/lib/markdown";
import { rateLimit } from "@/lib/rate-limit";
import { captureEvent } from "@/lib/posthog";
import { NextRequest } from "next/server";
import type { ToolFrontmatter } from "@/lib/types";

const API_VERSION = "1.1";

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "private, no-store",
  "Access-Control-Allow-Origin": "*",
  "X-API-Version": API_VERSION,
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: HEADERS });
}

// --- Helpers ---

const RESERVED_PARAMS = ["category", "language", "framework", "open_source", "self_hosted", "feature"];

// Cross-category feature aliases: map a common concept to category-specific keys
const FEATURE_ALIASES: Record<string, Record<string, string>> = {
  mcp: { auth: "mcp_support", hosting: "mcp_hosting" },
  self_host: { auth: "self_hosted", cms: "self_hosted", observability: "self_hosted" },
};

function getFeatureDefinitions(): Record<string, Record<string, string>> {
  const categories = getAllCategories();
  const result: Record<string, Record<string, string>> = {};
  for (const cat of categories) {
    const { frontmatter } = getCategoryBySlug(cat.category);
    if (frontmatter.feature_definitions) {
      result[cat.category] = frontmatter.feature_definitions;
    }
  }
  return result;
}

function getFeatureLabelsForTool(tool: ToolFrontmatter): Record<string, string> {
  try {
    const { frontmatter } = getCategoryBySlug(tool.category);
    const defs = frontmatter.feature_definitions ?? {};
    const labels: Record<string, string> = {};
    for (const key of Object.keys(tool.agent_features)) {
      if (defs[key]) labels[key] = defs[key];
    }
    return labels;
  } catch {
    return {};
  }
}

function getComparisonsForTool(slug: string): { slug: string; title: string; vs: string }[] {
  const comparisons = getAllComparisons();
  return comparisons
    .filter((c) => c.tools.includes(slug))
    .map((c) => ({
      slug: c.slug,
      title: c.title,
      vs: c.tools.find((t) => t !== slug) ?? c.tools[1],
    }));
}

function findComparison(slugA: string, slugB: string) {
  const sorted = [slugA, slugB].sort();
  const slug = `${sorted[0]}-vs-${sorted[1]}`;
  try {
    return getComparisonBySlug(slug);
  } catch {
    return null;
  }
}

// --- Handlers ---

function handleToolsList(searchParams: URLSearchParams) {
  const featureDefs = getFeatureDefinitions();
  let tools = getAllTools();
  const warnings: string[] = [];

  const category = searchParams.get("category");
  if (category) {
    const validCategories = getAllCategories().map((c) => c.category);
    if (!validCategories.includes(category)) {
      return jsonResponse({
        count: 0,
        tools: [],
        filters_applied: Object.fromEntries(searchParams.entries()),
        warnings: [`Unknown category '${category}'. Valid categories: ${validCategories.join(", ")}`],
      });
    }
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

  // Cross-category feature alias: ?feature=mcp
  const featureAlias = searchParams.get("feature");
  if (featureAlias) {
    const alias = FEATURE_ALIASES[featureAlias.toLowerCase()];
    if (alias) {
      tools = tools.filter((t) => {
        const key = alias[t.category];
        return key ? t.agent_features[key] === true : false;
      });
    } else {
      warnings.push(`Unknown feature alias '${featureAlias}'. Available aliases: ${Object.keys(FEATURE_ALIASES).join(", ")}`);
    }
  }

  // Filter by any agent_feature key
  for (const [key, value] of searchParams.entries()) {
    if (RESERVED_PARAMS.includes(key)) continue;
    if (value === "true" || value === "false" || value === "null") {
      const expected = value === "true" ? true : value === "false" ? false : null;

      // Check if this feature key is valid for the filtered category
      if (category && featureDefs[category] && !featureDefs[category][key]) {
        const validKeys = Object.keys(featureDefs[category]);
        warnings.push(`'${key}' is not a recognized feature for category '${category}'. Valid features: ${validKeys.join(", ")}`);
      }

      tools = tools.filter((t) => t.agent_features[key] === expected);
    }
  }

  // Enrich each tool with feature_labels
  const enrichedTools = tools.map((t) => ({
    ...t,
    feature_labels: getFeatureLabelsForTool(t),
  }));

  const response: Record<string, unknown> = {
    count: enrichedTools.length,
    tools: enrichedTools,
  };

  if (warnings.length > 0) {
    response.warnings = warnings;
  }

  if (tools.length === 0) {
    response.filters_applied = Object.fromEntries(searchParams.entries());
    if (category && featureDefs[category]) {
      response.valid_features_for_category = Object.keys(featureDefs[category]);
    }
  }

  return jsonResponse(response);
}

function handleTool(slug: string) {
  try {
    const { frontmatter, body } = getToolBySlug(slug);
    const featureLabels = getFeatureLabelsForTool(frontmatter);
    const comparisons = getComparisonsForTool(slug);

    return jsonResponse({
      ...frontmatter,
      feature_labels: featureLabels,
      comparisons,
      body: body.trim() || null,
    });
  } catch {
    return jsonResponse({ error: "Tool not found" }, 404);
  }
}

function handleToolsCompare(searchParams: URLSearchParams) {
  const toolsParam = searchParams.get("tools");
  if (!toolsParam) {
    return jsonResponse({ error: "Missing 'tools' param. Usage: /api/json/tools/compare?tools=auth0,clerk" }, 400);
  }

  const slugs = toolsParam.split(",").map((s) => s.trim()).filter(Boolean);
  if (slugs.length < 2) {
    return jsonResponse({ error: "Provide at least 2 tool slugs separated by commas" }, 400);
  }

  const tools: ToolFrontmatter[] = [];
  for (const slug of slugs) {
    try {
      tools.push(getToolBySlug(slug).frontmatter);
    } catch {
      return jsonResponse({ error: `Tool not found: ${slug}` }, 404);
    }
  }

  // Find editorial comparison (only works for pairs)
  let comparison = null;
  if (slugs.length === 2) {
    const found = findComparison(slugs[0], slugs[1]);
    if (found) {
      comparison = {
        ...found.frontmatter,
        body: found.body.trim() || null,
      };
    }
  }

  // Get feature definitions from the first tool's category
  const category = tools[0].category;
  let featureDefinitions = null;
  try {
    featureDefinitions = getCategoryBySlug(category).frontmatter.feature_definitions ?? null;
  } catch {}

  // Find other available comparisons for these tools
  const comparisons = getAllComparisons();
  const availableComparisons = comparisons
    .filter((c) => slugs.some((s) => c.tools.includes(s)))
    .map((c) => ({ slug: c.slug, title: c.title }));

  return jsonResponse({
    tools,
    feature_definitions: featureDefinitions,
    editorial_comparison: comparison,
    available_comparisons: availableComparisons,
  });
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

    const allComparisons = getAllComparisons();
    const categoryComparisons = allComparisons
      .filter((c) => c.category === slug)
      .map((c) => ({ slug: c.slug, title: c.title, tools: c.tools, popular: c.popular ?? false }));

    return jsonResponse({
      ...frontmatter,
      tools,
      comparisons: categoryComparisons,
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
  const featuresByCategory = getFeatureDefinitions();

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
      feature_labels: "Record<string, string> — human-readable descriptions of each agent_features key (included in tool responses)",
      comparisons: "Array of { slug, title, vs } — editorial comparisons available for this tool (included in tool responses)",
      compliance: allCompliance,
      best_for: "string",
      limitations: "string",
      verified_by: ["editorial", "community", "vendor"],
      last_verified: "ISO 8601 date (YYYY-MM-DD)",
      source_urls: "Record<string, url>",
    },
    feature_definitions_by_category: featuresByCategory,
    feature_aliases: FEATURE_ALIASES,
    categories: categories.map((c) => c.category),
    null_semantics: "null on any agent_features field means unverified — not the same as false (confirmed unsupported). Agents should surface this distinction.",
    endpoints: {
      "GET /api/json/tools": "List all tools. Supports filtering: ?category=auth&language=python&open_source=true&agent_sdk=true. Returns warnings when feature keys don't match the category.",
      "GET /api/json/tools/:slug": "Get a single tool with feature_labels and available comparisons",
      "GET /api/json/tools/compare?tools=auth0,clerk": "Compare 2+ tools. Returns both tool profiles, editorial comparison if available, and feature_definitions for the category. Order doesn't matter.",
      "GET /api/json/categories": "List all categories",
      "GET /api/json/categories/:slug": "Get a category with all tools embedded",
      "GET /api/json/comparisons": "List all editorial comparisons",
      "GET /api/json/comparisons/:slug": "Get a comparison with both tools embedded",
      "GET /api/json/schema": "This endpoint — API schema and metadata",
    },
    skills: {
      repo: "https://github.com/agenticstack-sh/agenticstack-skills",
      description: "Claude Code slash commands that wrap this API: /recommend-tool, /compare-tools, /search-tools, /explore-category",
    },
  });
}

// --- Router ---

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed, remaining } = rateLimit(ip);

  if (!allowed) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again in 60 seconds." }), {
      status: 429,
      headers: {
        ...HEADERS,
        "Retry-After": "60",
        "X-RateLimit-Remaining": "0",
      },
    });
  }

  const { path } = await params;
  const [type, slug] = path;

  let response: Response;

  // Single segment: list endpoints
  if (path.length === 1) {
    switch (type) {
      case "tools":
        response = handleToolsList(request.nextUrl.searchParams);
        break;
      case "categories":
        response = handleCategoriesList();
        break;
      case "comparisons":
        response = handleComparisonsList();
        break;
      case "schema":
        response = handleSchema();
        break;
      default:
        response = jsonResponse({ error: "Not found" }, 404);
    }
  } else if (path.length === 2) {
    // Two segments: detail endpoints + compare
    if (type === "tools" && slug === "compare") {
      response = handleToolsCompare(request.nextUrl.searchParams);
    } else {
      switch (type) {
        case "tools":
          response = handleTool(slug);
          break;
        case "categories":
          response = handleCategory(slug);
          break;
        case "comparisons":
          response = handleComparison(slug);
          break;
        default:
          response = jsonResponse({ error: "Not found" }, 404);
      }
    }
  } else {
    response = jsonResponse({ error: "Not found" }, 404);
  }

  response.headers.set("X-RateLimit-Remaining", String(remaining));

  const eventName = `agent_api_${type}${slug ? `_${slug}` : ""}`;
  const publicUrl = `https://${request.headers.get("host")}${request.nextUrl.pathname}${request.nextUrl.search}`;
  const phResult = await captureEvent(eventName, ip, {
    $current_url: publicUrl,
    path: `/${path.join("/")}`,
    endpoint_type: type,
    slug: slug ?? null,
    status: response.status,
    user_agent: request.headers.get("cloudfront-viewer-user-agent") ?? request.headers.get("x-forwarded-user-agent") ?? request.headers.get("user-agent") ?? "unknown",
  });

  // Temporary debug: inject PostHog status into response body
  const body = await response.json();
  body._posthog_debug = phResult;
  return new Response(JSON.stringify(body), { status: response.status, headers: response.headers });
}
