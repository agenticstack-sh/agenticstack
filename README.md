# AgenticStack

Structured tool comparisons for AI agent developers. Auth & identity category live, more categories coming.

## What it is

A comparison site for tools used in AI agent development. The primary interface is human-readable, but every tool page is also available as structured markdown with YAML frontmatter — designed to be fetched and parsed by AI coding agents.

When a developer asks their agent "help me add auth to my agent," the agent can fetch `/llms.txt`, discover the available categories, pull a tool profile from `/content/tools/:slug.md`, and make a recommendation based on structured, verifiable data.

---

## Running locally

Requires Node 20+.

```bash
npm install
npm run dev
```

---

## Project structure

```
public/
  content/
    categories/   # One .md file per category — served as static assets
    tools/        # One .md file per tool — served as static assets
app/
  llms.txt/     # GET /llms.txt — agent discovery index
  tools/        # Human-facing tool detail pages
  categories/   # Human-facing comparison table pages
lib/
  types.ts      # TypeScript interfaces
  markdown.ts   # Parsing and rendering utilities
__tests__/      # Vitest unit, content validation, and route tests
```

---

## Agent-facing endpoints

| Endpoint | Description |
|---|---|
| `GET /llms.txt` | Discovery index following the [llms.txt spec](https://llmstxt.org) |
| `GET /content/categories/:slug.md` | Raw markdown + frontmatter for a category (static file) |
| `GET /content/tools/:slug.md` | Raw markdown + frontmatter for a tool (static file) |

### Frontmatter schema

```yaml
agent_features:
  agent_sdk: true        # Dedicated SDK for agentic workflows
  token_delegation: true # Issue scoped tokens for downstream services
  human_in_the_loop: true # Pause and require user approval
  fga: true              # Fine-grained / relationship-based authorization
  mcp_support: true      # Native MCP server authorization
  async_authorization: true # Non-blocking approval workflows

# null = unverified, false = confirmed unsupported
mcp_support: null

last_verified: 2026-04-17   # ISO date of last editorial check
source_urls:                 # Primary sources for verification
  changelog: https://...
  pricing: https://...
  docs: https://...
```

`null` on any `agent_features` field means unverified — not the same as `false` (confirmed unsupported). Agents should surface this distinction to developers.

---

## Adding content

**New tool:** create `public/content/tools/:slug.md` with the full frontmatter schema. The tool appears on the category comparison page and gets its own detail page automatically. The `.md` file is also served as a static asset at `/content/tools/:slug.md`.

**New category:** create `public/content/categories/:slug.md`. Add tool slugs to the `tools` array. The category card appears on the homepage and the comparison table is generated from the tool files.

---

## Tests

```bash
npm test
```

Covers markdown parsing utilities, frontmatter validation for all content files, and llms.txt correctness.

---

## Tech stack

Next.js 15 · TypeScript · Tailwind CSS v4 · gray-matter · remark · Vitest
