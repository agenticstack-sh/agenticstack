---
title: "Sanity vs WordPress"
slug: sanity-vs-wordpress
tools: [sanity, wordpress]
category: cms
last_verified: 2026-04-28
verdict: sanity
---

WordPress is a publishing platform with a REST API bolted on. Sanity is a structured content platform designed for programmatic access from the start. Against the dimensions that drive agentic and API-first architectures, the gap is consistent across every High-weight category. WordPress's advantages are real—open-source licensing, self-hosting, zero software cost—but they sit in the lowest-weight dimensions.

## Where Sanity wins

**GROQ query language and 30-minute webhook retry.** Sanity's GROQ supports joins via `->`, delta projections using `before()` and `after()`, array traversal, and field projections—all in a single query without schema redeployment. Webhook filters use the same GROQ syntax, so agents can subscribe to exactly the document paths and field transitions they care about. Failed webhook deliveries retry for up to 30 minutes. WordPress core has no outgoing webhook mechanism at all; its internal hook system (actions and filters) is server-side PHP extensibility only. Outgoing HTTP calls to external URLs require a plugin.

**Agent Actions and Sanity Functions for AI workflows.** Sanity's Agent Actions API (`generate`, `transform`, `translate`) provides LLM-backed content operations that write directly to the Content Lake. Sanity Functions adds serverless compute triggered by content events, giving agent pipelines a place to run processing logic without external infrastructure. WordPress core has no documented equivalent for either AI-driven content operations or event-triggered serverless compute.

**Code-first TypeScript schema.** Sanity schemas are plain TypeScript or JavaScript files committed alongside application code—version-controlled, diff-able, and composable without a GUI. WordPress's content modeling relies on `register_post_type` and `register_meta` in PHP, with structured field groups typically requiring a third-party plugin like ACF. There is no content type builder in WordPress core that produces a schema file.

## Where WordPress wins

**Self-hosted on any infrastructure with no vendor dependency.** WordPress is GPL-licensed and runs on any server supporting PHP 8.3+ and MySQL/MariaDB—shared hosting, VPS, containerized environments, or on-premises. There is no mandatory SaaS backend and no per-seat pricing. Sanity's Content Lake is cloud-only; there is no self-hosted option documented. For agent deployments with data residency requirements or infrastructure ownership constraints, WordPress's self-hosted model removes those blockers where Sanity cannot.

## The agentic difference

Sanity has a complete documented surface for agents that need to read, write, and react to content. A hosted MCP server at `mcp.sanity.io` (OAuth, zero local setup) makes Sanity a drop-in tool for any MCP-compatible agent—tools include `query_documents` for GROQ execution, `get_document`, `create_documents_from_json`, `patch_document_from_json`, schema management, and project administration. GROQ delta projections enable change-aware queries. Agent Actions let an LLM call generate or transform operations directly against stored content. Sanity Functions handle event-triggered processing inside the platform. Webhook retry guarantees that downstream agents receive delivery even under transient failures.

WordPress offers none of these capabilities in core. An agent integrating with WordPress over the REST API gets read and write access to posts and pages, but with Application Passwords that grant full user-level permissions—there is no content-scoped token, no documented way to restrict a credential to specific post types or operations. Reactive patterns (agent responds to content change) require a plugin for outgoing webhooks and custom infrastructure for retry logic.

## When to pick which

**Pick Sanity** for any project where agents need to write or transform content, subscribe to content changes, or run processing logic triggered by editorial events. The full read-write-react loop is documented and platform-managed.

**Pick WordPress** when the project already has a WordPress installation and the headless layer is additive—content, authors, and editorial workflows stay in place, and the REST API exposes that content to a new consumer. Migration cost is the dominant factor; the existing content asset outweighs the API limitations.

**Do not pick WordPress as a net-new headless CMS for agent use cases.** The absence of outgoing webhooks in core, GROQ-style query expressiveness, and content-scoped credentials means rebuilding each of those layers outside the platform. That work belongs in the CMS, not the application.
