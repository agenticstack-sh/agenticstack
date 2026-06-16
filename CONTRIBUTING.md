# Contributing to AgenticStack

This guide covers how to add and maintain content in AgenticStack.

## Project structure

```
content/
├── tools/          # One .md per tool
├── categories/     # One .md per category (groups tools + defines features)
├── comparisons/    # One .md per head-to-head comparison
```

## Adding a tool

Create `content/tools/{slug}.md`. The slug must be lowercase, hyphenated, and match the filename.

Required frontmatter:

```yaml
---
name: Tool Name
slug: tool-name
category: auth          # must match an existing category file
type: cloud             # cloud | self-hosted | hybrid
website: https://example.com
pricing: freemium       # free | freemium | paid | open-source
pricing_tiers:
  - "Free up to 10k MAU"
  - "$29/mo Pro"
open_source: false
self_hosted: false
sdk_languages: [python, javascript, typescript]
frameworks: [langchain, vercel-ai]
agent_features:
  agent_sdk: true       # true | false | null (null = unverified)
  token_delegation: false
compliance: [soc2, gdpr]
best_for: "One sentence describing the ideal use case"
limitations: "One sentence describing the main tradeoff"
verified_by: editorial  # editorial | community | vendor
last_verified: 2026-06-04
source_urls:
  docs: https://example.com/docs
  pricing: https://example.com/pricing
  changelog: https://example.com/changelog
---
```

**Important:**
- `agent_features` keys must match the `feature_definitions` in the tool's category file
- Use `null` for unverified features, not `false`. `false` means confirmed unsupported.
- `last_verified` must be updated every time you re-check the tool's data

Body content (below frontmatter) is optional prose explaining the tool's agentic relevance.

## Adding a category

Create `content/categories/{slug}.md`.

```yaml
---
category: slug-here
title: "Human-readable Title"
description: "One sentence for SEO and page subtitle"
tools: [tool-a, tool-b, tool-c]   # ordered list of tool slugs
feature_definitions:
  feature_key: "Human-readable description of what this feature means"
---
```

Body content appears below the comparison table on the category page.

## Adding a comparison

Copy `content/comparisons/_template.md` and rename to `{tool-a}-vs-{tool-b}.md` (alphabetical order).

```yaml
---
title: "Tool A vs Tool B"
slug: tool-a-vs-tool-b    # must match filename
tools: [tool-a, tool-b]   # must exist in content/tools/
category: auth
last_verified: 2026-06-04
---
```

**Slug must match filename.** If the file is `auth0-vs-clerk.md`, the slug is `auth0-vs-clerk`.

Structure the body with these sections:
- `## Where [Tool A] wins`
- `## Where [Tool B] wins`
- `## The agentic difference`
- `## When to pick which`

Be specific and ground claims in features, not opinions.

## Content guidelines

- Update `last_verified` whenever you re-check a tool's data
- Content older than 90 days is considered stale
- Feature values: `true` (confirmed supported), `false` (confirmed unsupported), `null` (unverified)
- Keep prose concise — this is a reference site, not a blog
- Link to source URLs for any claim that could change

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # vitest
```

## Tests

Tests validate:
- All tools have required frontmatter fields
- `agent_features` keys match category `feature_definitions`
- Feature values are only `true`, `false`, or `null`
- Comparison slugs match filenames
- API routes return valid JSON

Run `npm test` before submitting a PR. CI runs tests automatically on all pull requests.
