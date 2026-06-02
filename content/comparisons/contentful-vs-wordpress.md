---
title: "Contentful vs WordPress"
slug: contentful-vs-wordpress
tools: [contentful, wordpress]
category: headless-cms
last_verified: 2026-05-09
verdict: contentful
---

WordPress was built for publishing; its REST API came later. Contentful was designed as headless from the start. That difference shows on every agentic dimension: MCP support, webhooks, API design, and token security. WordPress self-hosting is real but not relevant for new agent projects.

## Where Contentful wins

* **Four dedicated APIs.** Contentful separates Delivery API (read, CDN), Management API (write), Preview API (drafts), and Images API (transforms). GraphQL schema auto-generates with no deploy—agent queries stay valid after content updates. WordPress has one REST API at `/wp-json/wp/v2/` for reads and writes. GraphQL needs a third-party plugin.

* **MCP server and maintained SDKs.** Contentful's MCP server at `mcp.contentful.com/mcp` (Beta, OAuth) plus local open-source option. Agents use it as a tool without custom code. Maintained SDKs for JavaScript, Python, PHP, Ruby, Java, .NET, Android, iOS. WordPress has no documented MCP server; SDKs are community-maintained.

* **Outgoing webhooks with retry.** Contentful fires webhooks on content events with documented retry and payload transforms. WordPress core has no outgoing webhooks—its hook system is server-side PHP only. Agents that react to content changes require custom layers outside the platform.

* **Token scoped by API type.** Contentful tokens separate read (CDA), write (CMA), and preview (CPA) at the API boundary, enforcing least privilege. WordPress Application Passwords grant full user permissions with no way to restrict to post types or operations.

## Where WordPress wins

* **Self-hosted, GPL-licensed, no vendor lock-in.** WordPress runs on any PHP 8.3+ and MySQL/MariaDB host: shared, VPS, or on-premises. No API limits, seat fees, or mandatory SaaS backend. Contentful is cloud-only. For agent deployments needing data residency or ownership, WordPress self-hosting removes this blocker. WordPress software is free; only infrastructure costs.

## The agentic difference

WordPress has no documented agentic integration. No MCP server, no outgoing webhooks in core, no content-scoped tokens. Application Passwords grant full user permissions with no way to scope to post types or operations. Agents accept broad permissions or build custom layers.

Contentful's MCP server lets agents call content as tool calls. Separate delivery and management tokens enforce least privilege at the API boundary without custom code. This makes Contentful a simpler, lower-risk target for agents than WordPress.

## When to pick which

* **Pick Contentful** when the project is new and agents or API clients are the primary content interface. MCP server, separate APIs, and maintained SDKs cut integration work to near zero for agentic patterns.

* **Pick WordPress** when you already run WordPress and just need to expose content to agents—existing content, authors, plugins, and workflows stay unchanged.

* **Skip WordPress** for new headless CMS projects for agents. Building webhooks, MCP servers, and content-scoped tokens from scratch belongs in the platform, not your application.
