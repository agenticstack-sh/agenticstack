---
title: "Contentful vs Sanity"
slug: contentful-vs-sanity
tools: [contentful, sanity]
category: cms
popular: true
last_verified: 2026-04-28
verdict: sanity
---

Both Contentful and Sanity offer hosted MCP servers with OAuth authentication and zero local setup, making either a viable CMS layer for agent pipelines. Sanity edges ahead on query expressiveness, AI integration depth, and the completeness of its event model. Contentful holds real advantages for agent pipelines running in non-JavaScript runtimes and for teams already invested in the platform.

## Where Sanity wins

**GROQ query language with 30-minute webhook retry.** Sanity's GROQ provides joins via `->`, array traversal, delta functions (`before()`, `after()`), and projections—all in a single query without schema redeployment. The same GROQ syntax drives webhook filters, so agents can subscribe to exactly the document paths and field transitions they care about. Failed deliveries retry for up to 30 minutes. Contentful's webhooks retry for only 1 minute.

**MCP server with GROQ-native querying.** Sanity's hosted MCP server at `mcp.sanity.io` (OAuth, zero local setup) exposes `query_documents` for GROQ execution directly from tool calls—the full expressiveness of joins, delta projections, and filtered queries without a custom adapter. Additional tools cover `get_document`, `create_documents_from_json`, `create_documents_from_markdown`, `patch_document_from_json`, `patch_document_from_markdown`, schema management, publish/unpublish, releases, versioned documents, dataset creation, CORS config, and API token management.

**Code-first schema with no GUI drift.** Sanity schemas are plain TypeScript or JavaScript files committed alongside application code—version-controlled, diff-able, and composable without touching a UI. Agents that introspect the content model via `get_schema` see the same schema that lives in the repository. Contentful's content types are managed through the Content Management API or the web app; there is no first-class code-first authoring workflow, which means schema changes can be introduced outside the normal code review cycle.

**Agent Actions and Sanity Functions for AI workflows.** Sanity's Agent Actions API (`generate`, `transform`, `translate`) provides LLM-backed content operations that write directly to the Content Lake—an agent can call transform on stored content without pulling it out, modifying it, and pushing it back. Sanity Functions adds serverless compute triggered by content events, giving agent pipelines a place to run processing logic without external infrastructure. Neither capability has a documented equivalent in Contentful.

## Where Contentful wins

**Wide SDK coverage for non-JavaScript agent runtimes.** Contentful ships maintained SDKs for JavaScript, Python, PHP, Ruby, Java, .NET, Android, and iOS. Agent pipelines built in Python, Java, or .NET have a maintained SDK without writing a custom HTTP layer. Sanity's documented SDK list covers JavaScript and a smaller set of community libraries.

**Auto-syncing GraphQL schema.** Contentful's GraphQL Content API generates a schema directly from the content model automatically—changes to content types are reflected without a manual step or deploy. Agent queries built against the GraphQL schema stay valid after content model updates without a redeploy or schema sync step.

## The agentic difference

Both platforms have hosted MCP servers with OAuth authentication and zero local setup. The difference is depth of tooling.

Sanity's MCP server includes `query_documents` for GROQ execution—an agent can issue complex joins, delta projections, and filtered queries directly from tool calls with the same expressiveness available in the REST API. Combined with Agent Actions (generate/transform/translate against stored content), Sanity Functions (event-triggered server-side logic inside the platform), and 30-minute webhook retry, Sanity provides a complete read-write-react loop that is documented and platform-managed.

Contentful's hosted MCP server (at `mcp.contentful.com/mcp`, Beta, plus a local open-source option) covers entries, content types, assets, spaces and environments, locales, tags, and AI Actions. It is a capable surface for content reads and writes, but the query model is filtered field lookups rather than a full query language, and there are no platform-managed equivalents to Agent Actions or Sanity Functions for in-platform AI processing.

## When to pick which

**Pick Sanity** when agents need to write or transform content—not just read it. Agent Actions, GROQ delta projections, Sanity Functions, and an MCP server that exposes GROQ natively give agentic pipelines a complete read-write-react loop inside the CMS. Also pick Sanity when the schema must live in version control alongside application code and GUI-introduced schema drift is unacceptable.

**Pick Contentful** when the agent pipeline runs in Python, Java, .NET, or another non-JavaScript runtime where a maintained SDK reduces integration surface. Also pick Contentful when the GraphQL schema needs to stay synchronized with content model changes without manual steps.

**Pick Contentful over Sanity** if the organization is already on Contentful and the primary integration need is exposing existing content to an MCP-compatible agent—the hosted MCP server handles that without custom wiring, and migration cost outweighs the gap in agentic depth.
