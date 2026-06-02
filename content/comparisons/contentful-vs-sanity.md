---
title: "Contentful vs Sanity"
slug: contentful-vs-sanity
tools: [contentful, sanity]
category: headless-cms
last_verified: 2026-05-09
verdict: Sanity
---

Both Contentful and Sanity offer hosted MCP servers with OAuth, so neither requires local setup. Sanity wins on query depth, AI tools, and webhook features. Contentful wins for non-JavaScript runtimes and existing installations.

## Where Sanity wins

* **GROQ query language and webhook retry.** Sanity's GROQ supports joins via `->`, array traversal, delta functions (`before()`, `after()`), and projections in a single query. No schema redeploy needed. The same syntax filters webhooks—agents subscribe to specific document paths and field changes. Sanity retries webhooks twice with 30-second intervals (~1 minute total). Contentful retries for 1 minute only.

* **MCP server with GROQ queries.** Sanity's MCP server at `mcp.sanity.io` includes `query_documents` for GROQ execution from tool calls. Full join and projection power without custom adapters. Additional tools: `get_document`, `create_documents_from_json`, `create_documents_from_markdown`, `patch_document_from_json`, `patch_document_from_markdown`, schema management, publish/unpublish, releases, versioned documents, dataset creation, CORS config, and API token management.

* **Code-first schema, no GUI changes outside review.** Sanity schemas are TypeScript or JavaScript files in version control alongside code. Agents introspecting `get_schema` see the same schema in the repository. Contentful content types live in the API or web app, with no code-first workflow. Schema changes can bypass code review.

* **Agent Actions and Sanity Functions.** Agent Actions (`generate`, `transform`, `translate`) write directly to the Content Lake. Agents modify stored content without fetching and pushing back. Sanity Functions runs serverless compute triggered by content events. Contentful has no documented equivalent.

## Where Contentful wins

* **SDKs for Python, Java, .NET.** Contentful maintains SDKs for JavaScript, Python, PHP, Ruby, Java, .NET, Android, and iOS. Non-JavaScript agent pipelines get maintained SDKs, no custom HTTP layer. Sanity documents JavaScript only, plus community libraries.

* **GraphQL schema syncs automatically.** Contentful generates GraphQL schemas from content models automatically. Content type changes reflect instantly. Agent queries stay valid after updates with no redeploy or manual schema sync.

## The agentic difference

Both have MCP servers and OAuth. The gap is tooling depth.

Sanity's MCP includes `query_documents` for GROQ—agents execute complex joins and delta projections directly. Agent Actions modify stored content. Sanity Functions run event-triggered logic in-platform. Webhook retries are guaranteed. The read-write-react loop is complete and platform-managed.

Contentful's MCP server (Beta at `mcp.contentful.com/mcp`, plus open-source local option) covers entries, content types, assets, spaces, environments, locales, tags, and AI Actions. Good for reads and writes, but the query model is field lookups, not a full language. No Agent Actions or Sanity Functions equivalent.

## When to pick which

* **Pick Sanity** when agents need to write or transform content. Agent Actions, GROQ delta filters, Sanity Functions, and MCP support give a complete loop inside the CMS. Also pick Sanity when schema must live in version control with no GUI drift.

* **Pick Contentful** when the agent pipeline runs in Python, Java, .NET, or another non-JavaScript language with a maintained SDK. Also pick Contentful when GraphQL schema must stay in sync with content model changes automatically.

* **Pick Contentful over Sanity** if your team already uses Contentful and just needs to expose content to agents. MCP handles that without custom work, and migration cost outweighs the agentic gap.
