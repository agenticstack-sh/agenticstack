---
title: "Payload vs WordPress"
slug: payload-vs-wordpress
tools: [payload, wordpress]
category: cms
last_verified: 2026-04-28
verdict: payload
---

Payload and WordPress are both open-source and self-hostable, but they diverge sharply on API design, content modeling, and access control. Payload is TypeScript-first with auto-generated REST and GraphQL; WordPress is PHP-first with REST only and no native GraphQL. The gap favors Payload on every high-weight dimension except AI/MCP support, where neither platform has a documented native offering.

## Where Payload wins

* **Auto-generated REST and GraphQL.** Payload generates a full REST API and a complete GraphQL API automatically from its TypeScript collection and global schemas. The REST API supports CRUD operations with query parameters for depth, joins, locale, sorting, filtering, and pagination. The GraphQL API mirrors the content model with custom queries and mutations, a built-in development playground, and query complexity limiting. A TypeScript SDK (`@payloadcms/sdk`) is available for typed client access. WordPress exposes a REST API at `/wp-json/wp/v2/` for core content types; GraphQL is not part of WordPress core and requires a third-party plugin.

* **Code-first TypeScript schema and content modeling.** Payload schemas are TypeScript files committed alongside application code—version-controlled, type-checked, and composable without a GUI. The system supports blocks (field groups with distinct layouts), conditional field logic, drafts, version history, and localization defined at the schema level. WordPress's content modeling relies on `register_post_type` and `register_meta` in PHP; structured field groups require a third-party plugin like ACF. There is no content type builder in WordPress core that produces a version-controlled schema file.

* **Operation-scoped access control and API keys.** Payload's access control is scoped per operation (`create`, `read`, `update`, `delete`) at the collection, global, and field level—all defined in code alongside the schema. API keys can be enabled on any auth-enabled collection and are designed specifically for third-party service integration, separate from the cookie and JWT auth used for end users. WordPress's Application Passwords are tied to a full user account with no mechanism to restrict a credential to specific post types or operations.

## Where WordPress wins

* **Existing WordPress installation.** For projects already running WordPress, the headless layer is additive—existing content, media, authors, and editorial workflows stay in place with no migration required. The REST API exposes that content to agent consumers without rebuilding the content model. This migration cost justification does not extend to net-new projects.

## The agentic difference

Neither platform has a documented native MCP server, so neither presents as a ready-made tool for MCP-compatible agents.

Payload's advantage for agent workflows is its in-process hook system and API design. Lifecycle hooks (`beforeChange`, `afterChange`, `beforeRead`, `afterRead`, `beforeDelete`, `afterDelete`) execute at the collection, global, and field level and are defined in code alongside the schema. An agent integrating with Payload can write to the REST or GraphQL API with operation-scoped access control enforced at the schema level without custom middleware. The Jobs Queue provides background task execution for offloading processing work, though it requires external cron triggers rather than native event-driven invocation.

WordPress offers REST read and write access but with Application Passwords that carry full user-level permissions—there is no documented mechanism to scope a credential to a specific post type or operation. Reactive patterns require a plugin for outgoing webhooks and custom infrastructure for retry logic. Neither capability is available in WordPress core.

## When to pick which

* **Pick Payload** for net-new projects where an agent or API client is the primary interface to content. TypeScript-first schema, operation-scoped access control, and auto-generated GraphQL reduce integration surface compared to WordPress's REST-only core with plugin-dependent extensibility.

* **Pick WordPress** when the project already runs on WordPress and the headless layer is additive—existing content, authors, and editorial workflows stay in place with no migration required.

* **Pick Payload** as a net-new headless CMS for agent use cases. Wordpress's absence of native outgoing webhooks, GraphQL in core, and content-scoped credentials means rebuilding those integration layers outside the platform. Payload addresses two of those three gaps natively.
