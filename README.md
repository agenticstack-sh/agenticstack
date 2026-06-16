# AgenticStack

Find the right tool for every layer of your agent stack. Check out the skills: [agenticstack-skills](https://github.com/agenticstack-sh/agenticstack-skills)

## What it is

A comparison site for tools used in AI agent development. The primary consumers are AI coding agents (Claude Code, Cursor, Copilot) that need structured data to recommend tools. Humans get a clean comparison site as the secondary interface.

When a developer asks their agent "help me add auth to my agent," the agent can fetch `/llms.txt`, discover categories, fetch `/api/json/tools?category=auth`, and make a recommendation based on structured, verifiable frontmatter.

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
content/
  categories/   # One .md file per category with feature_definitions
  tools/        # One .md file per tool with YAML frontmatter
  comparisons/  # Editorial comparison guides (2 tools each)
app/
  api/json/     # JSON API for agents
  llms.txt/     # GET /llms.txt — agent discovery index
  tools/        # Human-facing tool detail pages
  categories/   # Human-facing comparison table pages
  compare/      # Interactive comparison + editorial deep dives
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
| `GET /api/json/tools` | All tools (supports filtering, returns warnings on bad filters) |
| `GET /api/json/tools/:slug` | Single tool with `feature_labels` and available `comparisons` |
| `GET /api/json/tools/compare?tools=auth0,clerk` | Compare 2+ tools with editorial comparison if available |
| `GET /api/json/categories` | All categories |
| `GET /api/json/categories/:slug` | Category with all tools embedded |
| `GET /api/json/comparisons` | All editorial comparisons |
| `GET /api/json/comparisons/:slug` | Comparison with both tools embedded |
| `GET /api/json/schema` | API schema, valid values, feature aliases, and endpoint docs |

### Filtering tools

```
GET /api/json/tools?category=auth&language=python&open_source=true
```

Supported filters: `category`, `language`, `framework`, `open_source`, `self_hosted`, plus any `agent_features` key (e.g. `?fga=true`, `?mcp_support=null`).

Feature keys are category-specific. Using a key from the wrong category returns zero results with a `warnings` array explaining the mismatch.

### Cross-category feature search

```
GET /api/json/tools?feature=mcp
```

Feature aliases map a common concept to the right key per category (e.g. `mcp` checks `mcp_support` for auth and `mcp_hosting` for hosting).

### Versioning

All JSON responses include an `X-API-Version` header. Current version: `1.1`.

### Frontmatter schema

Each tool has YAML frontmatter with structured data. `agent_features` keys vary by category — check the category's `feature_definitions` or `GET /api/json/schema` for the full list.

```yaml
agent_features:
  agent_sdk: true   # true = supported, false = not supported, null = unverified
  fga: null          # null means unverified, NOT unsupported

last_verified: 2026-04-17   # ISO date — data older than 90 days is potentially stale
source_urls:                  # Primary sources for verification
  changelog: https://...
  pricing: https://...
  docs: https://...
```

---

## Adding content

**New tool:** create `content/tools/:slug.md` with the full frontmatter schema. Ensure `agent_features` keys match the category's `feature_definitions`. The tool appears on the category comparison page and gets its own detail page automatically.

**New category:** create `content/categories/:slug.md` with `feature_definitions` listing the comparison features for that category. Add tool slugs to the `tools` array.

---

## Tests

```bash
npm test
```

Covers markdown parsing, frontmatter validation, cross-reference integrity, and route correctness.

---

## Agent skills

The [agenticstack-skills](https://github.com/agenticstack-sh/agenticstack-skills) repo provides skills that query this API from any AI assistant.

```bash
npx skills add agenticstack-sh/agenticstack-skills
```

| Skill | What it does |
|-------|-------------|
| `/recommend-tool` | Given your requirements, recommends the best tool with reasoning |
| `/compare-tools` | Side-by-side comparison of 2-3 tools with editorial analysis |
| `/search-tools` | Filter tools by category, language, framework, or feature |
| `/explore-category` | Overview of a category with all tools and feature matrix |
| `/setup-tool` | Pick the right tool and get started with implementation guidance |
| `/add-tool` | Generate a correctly formatted tool file ready to submit as a PR |

---

## Tech stack

Next.js 15 · TypeScript · Tailwind CSS v4 · gray-matter · remark · Vitest
