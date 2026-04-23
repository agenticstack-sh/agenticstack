# AgenticStack MVP - Implementation Plan

**Working name:** AgenticStack (also considering AgentKit, AgentPick)

## Context

A public comparison site for auth/identity tools aimed at AI agent developers. The key differentiator: it's **agentic-first**. The primary consumers are AI coding agents (Claude Code, Cursor, Copilot) that need structured data to recommend auth tools. Humans get a clean comparison site as the secondary interface.

The goal is that when a developer asks their AI agent "help me add auth to my agent," the agent can fetch this site's data and make an informed recommendation based on structured, verifiable frontmatter — not marketing copy.

The site is not affiliated with any vendor. Comparisons are maintained editorially to stay accurate and unbiased.

**MVP scope:** Auth & Identity category only, 10 tools, no MCP server.

---

## Use Cases

### Agent-facing (primary)

1. **Tool recommendation during development:** A developer asks Claude Code or Cursor "I need auth for my LangChain agent." The agent fetches `/llms.txt`, discovers the auth category, fetches `/api/md/categories/auth`, parses the frontmatter, and recommends tools based on `agent_sdk: true` and `frameworks: [langchain]`.

2. **Feature-specific queries:** A developer asks "which auth tools support human-in-the-loop approval?" The agent parses tool frontmatter, filters by `agent_features.human_in_the_loop: true`, and returns matching tools with their `best_for` descriptions.

3. **Stack assembly:** An agent building a full agentic architecture (orchestration + auth + memory + observability) fetches this site to fill the auth slot. The structured frontmatter lets it compare options programmatically without interpreting prose.

4. **Migration evaluation:** A developer says "I'm using Firebase Auth but need token delegation for my agent." The agent fetches both tool profiles, compares `agent_features`, and identifies the gap.

5. **Compliance-driven selection:** "I need an auth provider for my agent that's SOC2 and HIPAA compliant." The agent filters by `compliance` field in frontmatter.

6. **Freshness-aware queries:** An agent checks `last_verified` before trusting a recommendation. If a tool's data is stale (e.g., >90 days), it can flag this or deprioritize the result. The agent can also follow `source_urls` to verify claims against primary sources.

7. **Unknown vs. unsupported distinction:** An agent sees `mcp_support: null` and understands this means unverified — not the same as `false`. It can surface this to the developer as "MCP support is unconfirmed for this tool."

### Human-facing (secondary)

8. **Side-by-side comparison:** A developer evaluating auth tools visits `/categories/auth` and sees a feature matrix showing which tools have agent SDKs, FGA, token delegation, etc. at a glance.

9. **Deep dive on a specific tool:** A developer clicks through to `/tools/auth0` to read the full prose comparison, understand trade-offs, and see framework compatibility.

10. **Sharing and decision-making:** A tech lead shares the comparison page URL with their team to align on an auth tool for their agent project.

---

## Architecture: Three Layers

1. **Structured YAML frontmatter** in each markdown file (machine-parseable, no token waste)
2. **Prose body** below frontmatter (human-readable comparison guides, written editorially)
3. **`/llms.txt`** at root (agent discovery index following the llms.txt spec)

---

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- gray-matter (frontmatter parsing)
- remark + remark-html + remark-gfm (markdown to HTML)
- Tailwind CSS v4 (styling)
- Vitest (testing)
- Deploy to Vercel

---

## File Structure

```
agenticstack/
├── app/
│   ├── layout.tsx                        # Root layout, dark mode, nav/footer
│   ├── page.tsx                          # Landing page
│   ├── globals.css                       # Tailwind imports
│   ├── components/
│   │   ├── ComparisonTable.tsx           # Side-by-side feature table
│   │   ├── ToolCard.tsx                  # Tool preview card
│   │   ├── Navigation.tsx                # Top nav
│   │   └── Footer.tsx                    # Footer
│   ├── llms.txt/
│   │   └── route.ts                      # GET /llms.txt
│   ├── api/md/
│   │   ├── categories/[slug]/
│   │   │   └── route.ts                  # GET /api/md/categories/:slug (raw markdown)
│   │   └── tools/[slug]/
│   │       └── route.ts                  # GET /api/md/tools/:slug (raw markdown)
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.tsx                  # Rendered comparison page
│   └── tools/
│       └── [slug]/
│           └── page.tsx                  # Rendered tool detail page
├── content/
│   ├── categories/
│   │   └── auth.md                       # Category frontmatter + placeholder prose
│   └── tools/
│       ├── auth0.md
│       ├── clerk.md
│       ├── workos.md
│       ├── stytch.md
│       ├── descope.md
│       ├── ory.md
│       ├── keycloak.md
│       ├── firebase-auth.md
│       ├── supabase-auth.md
│       └── cognito.md
├── lib/
│   ├── types.ts                          # TypeScript interfaces
│   └── markdown.ts                       # Parsing + reading utilities
├── __tests__/
│   ├── lib/
│   │   └── markdown.test.ts             # Unit tests for parsing utilities
│   ├── routes/
│   │   ├── llms-txt.test.ts             # Integration test for /llms.txt
│   │   ├── md-tools.test.ts             # Integration test for /api/md/tools/:slug
│   │   └── md-categories.test.ts        # Integration test for /api/md/categories/:slug
│   └── content/
│       └── frontmatter.test.ts          # Validates all content files have valid frontmatter
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── next.config.ts
└── tailwind.config.ts
```

---

## Implementation Steps

### Step 1: Project setup
- `npx create-next-app@latest agenticstack --typescript --tailwind --app`
- Install: `gray-matter`, `remark`, `remark-html`, `remark-gfm`
- Install dev: `vitest`, `@vitejs/plugin-react`
- Configure Tailwind for dark mode

### Step 2: TypeScript types (`lib/types.ts`)
- `ToolFrontmatter` interface with all comparison dimensions
- `CategoryFrontmatter` interface
- `ParsedContent<T>` generic for frontmatter + markdown body
- `agent_features` booleans typed as `boolean | null` — `null` means unverified, `false` means confirmed unsupported

### Step 3: Markdown utilities (`lib/markdown.ts`)
- `getToolBySlug(slug)` - parse single tool markdown
- `getAllTools()` - read all tool files, return frontmatter array
- `getCategoryBySlug(slug)` - parse category markdown
- `getRawMarkdown(type, slug)` - return raw file contents for agent routes
- `renderToHtml(markdown)` - remark pipeline for human pages

### Step 4: Content scaffold (placeholder markdown files)

**Tool frontmatter schema** (example: `content/tools/auth0.md`):
```yaml
---
name: Auth0
slug: auth0
category: auth
type: cloud
website: https://auth0.com
pricing: freemium
open_source: false
self_hosted: false
sdk_languages: [python, javascript, go, java]
frameworks: [langchain, llamaindex, vercel-ai]
agent_features:
  agent_sdk: true
  token_delegation: true
  human_in_the_loop: true
  fga: true
  mcp_support: null        # null = unverified; false = confirmed unsupported
  async_authorization: true
compliance: [soc2, hipaa, gdpr]
best_for: "Multi-tenant SaaS, token delegation for agents, fine-grained authorization"
limitations: "Vendor lock-in on cloud; self-hosted option limited to enterprise tier"
verified_by: editorial     # editorial | community | vendor
last_verified: 2026-04-17
source_urls:
  changelog: https://auth0.com/changelog
  pricing: https://auth0.com/pricing
  docs: https://auth0.com/docs/get-started
---

# Auth0

Placeholder content for content editor.
```

**Category frontmatter schema** (`content/categories/auth.md`):
```yaml
---
category: auth
title: "Auth & Identity for AI Agents"
description: "Compare authentication and identity tools for building AI agents"
tools: [auth0, clerk, workos, stytch, descope, ory, keycloak, firebase-auth, supabase-auth, cognito]
---
```

**Tool roster and why each is included:**
- `auth0` — cloud identity, AI SDK, Token Vault, FGA, async authz
- `clerk` — developer-first, strong Next.js/AI app ecosystem adoption
- `workos` — strong M2M and enterprise SSO story
- `stytch` — API-first, flexible; popular in AI startup stacks
- `descope` — targets AI agent auth specifically
- `ory` — open source, self-hosted, Kubernetes-native
- `keycloak` — dominant self-hosted alternative to Ory; enterprise on-prem default
- `firebase-auth` — common in rapid prototyping and Google-native stacks
- `supabase-auth` — common in AI app dev (Supabase is a popular BaaS in this space)
- `cognito` — unavoidable for AWS-native agent stacks; wins on ecosystem, loses on DX

Create all 10 tool files with accurate frontmatter. `agent_features` must reflect what each tool actually supports — use `null` for anything unverified rather than defaulting to `false`.

### Step 5: Agent-facing routes

**`/llms.txt`** (`app/llms.txt/route.ts`):
- Dynamically generates the index from content files
- Returns `Content-Type: text/plain`
- Format:
```
# AgenticStack

> Compare tools for building AI agents. Structured data and comparison guides for auth, identity, and security tooling. Data is editorially maintained and not affiliated with any vendor.

## Auth & Identity
- [Auth & Identity Overview](/api/md/categories/auth): Compare 10 auth tools for AI agents
- [Auth0](/api/md/tools/auth0): Cloud identity platform with AI SDK, Token Vault, async authorization, and FGA
- [Clerk](/api/md/tools/clerk): Developer-first authentication with prebuilt UI components
...
```

**Raw markdown routes** (`app/api/md/tools/[slug]/route.ts` and `app/api/md/categories/[slug]/route.ts`):
- Read raw markdown file, return with `Content-Type: text/markdown`
- `generateStaticParams()` for build-time generation
- 404 for unknown slugs

### Step 6: Human-facing pages

**Landing page** (`app/page.tsx`):
- Hero: project name + tagline
- Brief explanation of what it is
- Grid of tool cards linking to detail pages
- Link to comparison table

**Category page** (`app/categories/[slug]/page.tsx`):
- Title + description from category frontmatter
- Comparison table: rows = tools, columns = agent_features + pricing + open_source + self_hosted
- Boolean features: ✓ (true) / ✗ (false) / ? (null/unverified)
- Array features (frameworks, sdk_languages) shown as badges
- Each tool name links to its detail page
- `last_verified` date shown per tool row
- Rendered prose body below the table

**Tool detail page** (`app/tools/[slug]/page.tsx`):
- Tool name, website link, type badge, pricing badge
- Agent features section: ✓ / ✗ / ? with null clearly labeled "unverified"
- Frameworks + SDK languages as badge lists
- Compliance badges
- `limitations` field displayed alongside `best_for`
- `last_verified` date + `verified_by` badge
- Rendered prose body
- Link back to category comparison
- "View as markdown" link to `/api/md/tools/[slug]`

### Step 7: Components + styling

**Design:** Dark mode, minimal, clean. Similar feel to techstack.sh.
- Background: near-black (#0a0a0a)
- Text: off-white (#fafafa)
- Accent: neutral — no vendor color associations
- Cards: subtle border, slight background lift
- Table: alternating row shading, sticky header
- `null` cells rendered distinctly from `false` (e.g., `?` in muted color vs. `✗`)

**Components:**
- `ComparisonTable` - accepts tools array, renders feature matrix
- `ToolCard` - name, type badge, "best for" text, link
- `FeatureBadge` - renders true/false/null with appropriate icon and color
- `Navigation` - logo + "Categories" link (expandable later)
- `Footer` - simple links

### Step 8: Tests

**Test framework:** Vitest (fast, TypeScript-native, works well with Next.js)

**Unit tests** (`__tests__/lib/markdown.test.ts`):
- `getToolBySlug` returns correct frontmatter and content for a known tool
- `getToolBySlug` throws/returns null for unknown slug
- `getAllTools` returns all 10 tools with valid frontmatter
- `getCategoryBySlug` returns correct category metadata
- `getRawMarkdown` returns raw file contents including frontmatter delimiters
- `renderToHtml` converts markdown to valid HTML

**Content validation tests** (`__tests__/content/frontmatter.test.ts`):
- Every tool file in `content/tools/` has required frontmatter fields (name, slug, category, type, website, pricing, agent_features, last_verified, source_urls)
- Every `agent_features` object has all required keys: agent_sdk, token_delegation, human_in_the_loop, fga, mcp_support, async_authorization
- Every `agent_features` value is `true`, `false`, or `null` — no other values
- Every tool slug matches its filename
- `last_verified` is a valid ISO date string
- `source_urls` has at least one entry
- Category file lists tools that actually exist as files
- No tool file has empty/missing `best_for` or `limitations` field

**Integration tests for routes** (`__tests__/routes/`):

`llms-txt.test.ts`:
- GET `/llms.txt` returns 200 with `Content-Type: text/plain`
- Response starts with `# AgenticStack`
- Response contains a link for each tool in content/tools/
- Response contains a link for each category in content/categories/
- All links in the response point to valid `/api/md/` paths

`md-tools.test.ts`:
- GET `/api/md/tools/auth0` returns 200 with `Content-Type: text/markdown`
- Response contains valid YAML frontmatter (starts with `---`, has closing `---`)
- GET `/api/md/tools/nonexistent` returns 404
- Response for each tool contains the tool's name in frontmatter

`md-categories.test.ts`:
- GET `/api/md/categories/auth` returns 200 with `Content-Type: text/markdown`
- Response contains valid YAML frontmatter
- GET `/api/md/categories/nonexistent` returns 404

### Step 9: Build and deploy

**Build verification:**
- `npm run test` passes all tests
- `npm run build` succeeds with all routes statically generated
- `npm run start` serves locally

**Deploy:**
- Push to GitHub
- Connect to Vercel
- Automatic deploys on push

---

## Post-MVP: Automated Freshness (GitHub Actions + Claude)

Maintains frontmatter accuracy without manual monitoring per tool.

**How it works:**
1. A GitHub Actions cron job runs weekly
2. For each tool, it fetches the URLs listed in `source_urls` (changelog, pricing, docs)
3. The fetched content + current frontmatter is passed to Claude with the prompt: *"Given this tool's current frontmatter and the following content from their docs and changelog, identify any fields that appear outdated or incorrect. Return a diff in YAML format, or 'no changes' if everything looks current."*
4. If changes are detected, the workflow opens a **draft PR** with the suggested frontmatter diffs — no auto-merge, editorial review required
5. If no changes, the workflow updates `last_verified` to today's date and commits directly to main

**Schema fields that enable this:**
- `last_verified` — updated automatically on clean passes; signals staleness to agents
- `source_urls` — tells the workflow what pages to crawl per tool
- `verified_by: editorial` — preserved on auto-passes; changed to `editorial` on human review of a suggested diff

**GitHub Actions workflow file:** `.github/workflows/freshness-check.yml` (post-MVP)

---

## Verification Plan

1. `npm run test` - all unit + integration tests pass
2. `npm run build` completes without errors
3. `npm run start` serves locally
4. `curl localhost:3000/llms.txt` returns valid plain text index with all 10 tools
5. `curl localhost:3000/api/md/tools/auth0` returns raw markdown with frontmatter including `last_verified` and `source_urls`
6. Browser: `/categories/auth` shows comparison table with all 10 tools; null cells render as `?`
7. Browser: `/tools/auth0` shows tool detail page with limitations, last_verified, and verified_by
8. All 10 tool detail pages render correctly
9. Responsive: check mobile layout
