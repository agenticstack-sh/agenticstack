---
title: "Sanity vs WordPress"
slug: sanity-vs-wordpress
tools: [sanity, wordpress]
category: cms
last_verified: 2026-05-09
---

WordPress is a publishing platform with REST API added later. Sanity was designed for programmatic access from the start. The gap spans every agentic dimension. WordPress self-hosting and GPL licensing are real, but less important for agents.

## Where Sanity wins

* **GROQ query language and webhook retry.** Sanity's GROQ supports joins via `->`, delta projections with `before()` and `after()`, array traversal, and projections in one query. No schema redeploy. Webhook filters use GROQ syntax—agents subscribe to document paths and field changes. Sanity retries webhooks twice with 30-second intervals (~1 minute total). WordPress core has no outgoing webhooks; its hook system is server-side PHP only. Outgoing HTTP needs a plugin.

* **Agent Actions and Sanity Functions.** Agent Actions (`generate`, `transform`, `translate`) write directly to the Content Lake. Sanity Functions runs serverless compute triggered by content events. Agents run processing logic in-platform without external infrastructure. WordPress core has no AI operations or event-triggered compute equivalent.

**Code-first TypeScript schema.** Sanity schemas are TypeScript or JavaScript files in version control alongside code. Version-controlled, diff-able, composable without a GUI. WordPress content models use PHP `register_post_type` and `register_meta`, typically with a third-party plugin like ACF for structured fields. WordPress core has no schema file builder.

## Where WordPress wins

* **Self-hosted, GPL-licensed, no vendor lock-in.** WordPress runs on any PHP 8.3+ and MySQL/MariaDB host: shared, VPS, containers, or on-premises. No mandatory SaaS backend or per-seat pricing. Sanity's Content Lake is cloud-only with no self-hosted option. For agent deployments needing data residency or ownership, WordPress self-hosting removes this blocker where Sanity cannot.

## The agentic difference

Sanity has a complete documented surface for agents that read, write, and react to content. MCP server at `mcp.sanity.io` (OAuth, no setup) is a drop-in tool for any MCP agent. Tools: `query_documents` for GROQ execution, `get_document`, `create_documents_from_json`, `patch_document_from_json`, schema management, and project administration. GROQ delta filters enable change-aware queries. Agent Actions invoke generate/transform directly on stored content. Sanity Functions handle event-triggered processing in-platform. Webhook retry guarantees delivery even under failures.

WordPress core has none of these. REST API gives read/write to posts and pages, but Application Passwords grant full user permissions—no content scoping, no operation restriction. Reactive patterns need a plugin for outgoing webhooks plus custom retry logic.

## When to pick which

* **Pick Sanity** when agents need to write or transform content, subscribe to changes, or run event-triggered logic. The full read-write-react loop is documented and platform-managed.

* **Pick WordPress** when you already have WordPress and just need to expose content to agents—existing content, authors, and workflows stay unchanged. Migration cost dominates the API limitations.

* **Skip WordPress** for new headless CMS projects for agents. Building webhooks, GROQ-style queries, and content-scoped tokens belongs in the CMS, not your application.
