---
title: "Payload vs WordPress"
slug: payload-vs-wordpress
tools: [payload, wordpress]
category: headless-cms
last_verified: 2026-05-09
---

Payload and WordPress are both open-source and self-hostable. Payload is TypeScript-first with auto-generated REST and GraphQL. WordPress is PHP-first with REST only, no native GraphQL. Payload wins on API design, content modeling, and access control.

## Where Payload wins

* **REST and GraphQL auto-generated.** Payload auto-generates full REST and GraphQL APIs from TypeScript collection schemas. REST supports CRUD with depth, joins, locale, sorting, filtering, pagination. GraphQL mirrors the content model with queries, mutations, dev playground, and complexity limits. Typed SDK `@payloadcms/sdk` available. WordPress exposes REST at `/wp-json/wp/v2/` for core types only. GraphQL needs a third-party plugin.

* **Code-first TypeScript schema.** Payload schemas are TypeScript files in version control alongside code. Type-checked, composable without a GUI. Built-in blocks (field groups), conditional fields, drafts, version history, and localization. WordPress content models use PHP `register_post_type` and `register_meta`; structured fields need a third-party plugin like ACF. No WordPress core schema file builder.

* **Operation-scoped access control and API keys.** Payload scopes access per operation (`create`, `read`, `update`, `delete`) at collection, global, and field level, all defined in code alongside schema. API keys work on auth-enabled collections for third-party integration, separate from cookie and JWT auth. WordPress Application Passwords tie to a full user with no post-type or operation restriction.

## Where WordPress wins

* **Existing WordPress installation.** For projects already on WordPress, the headless layer adds on top—existing content, media, authors, and workflows stay unchanged. REST API exposes content to agents without rebuilding the model. This cost benefit doesn't apply to new projects.

## The agentic difference

Neither has a documented native MCP server, so neither is a ready-made agent tool.

Payload's in-process hooks and API design help agent workflows. Lifecycle hooks (`beforeChange`, `afterChange`, `beforeRead`, `afterRead`, `beforeDelete`, `afterDelete`) run at collection, global, and field level in code alongside schema. Agents write to REST or GraphQL with operation-scoped control enforced at schema level, no custom middleware. Jobs Queue handles background work but needs external cron, not event-driven triggers.

WordPress offers REST read/write with Application Passwords that grant full user permissions. No post-type or operation scoping. Reactive patterns need plugin webhooks plus custom retry logic. WordPress core has neither.

## When to pick which

* **Pick Payload** for new projects where agents or API clients are the primary content interface. TypeScript-first schema, operation-scoped control, and auto-generated GraphQL cut integration surface versus WordPress REST-only core with plugin-dependent extensibility.

* **Pick WordPress** when you already run WordPress and just need to expose content to agents—existing content, authors, and workflows stay unchanged.

* **Skip WordPress** for new headless CMS projects for agents. Building webhooks, GraphQL, and content-scoped tokens belongs in the platform. Payload addresses two of those three natively.
