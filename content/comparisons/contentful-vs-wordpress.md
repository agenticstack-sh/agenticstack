---
title: "Contentful vs WordPress"
slug: contentful-vs-wordpress
tools: [contentful, wordpress]
category: cms
last_verified: 2026-04-28
verdict: contentful
---

WordPress was built as a publishing platform first; its REST API was added later. Contentful was designed from the start as a headless API. That design difference surfaces across every dimension that matters for agent-driven workflows: MCP support, webhooks, content API structure, and token security. WordPress's advantages—self-hosting flexibility and open-source licensing—are real but are not agent-relevant for net-new builds.

## Where Contentful wins

**Purpose-built delivery and management APIs.** Contentful separates concerns across four APIs: the Content Delivery API (read, CDN-backed), the Content Management API (write), the Content Preview API (unpublished drafts), and the Images API (transformations). The GraphQL API generates a schema automatically from the content model with no deploy step—agent queries stay valid after content model updates. WordPress exposes a single REST API at `/wp-json/wp/v2/` for both reads and writes; GraphQL requires a third-party plugin.

**Hosted MCP server and first-party SDK coverage.** Contentful's App Framework documentation describes a supported MCP server at `mcp.contentful.com/mcp` (Beta, OAuth) plus a local open-source option, making it available as a tool for any MCP-compatible agent without custom integration. Maintained SDKs cover JavaScript, Python, PHP, Ruby, Java, .NET, Android, and iOS. WordPress has no documented MCP server; client SDKs are community-maintained.

**Outgoing webhooks with retry.** Contentful's webhook system fires on content events with documented retry behavior and configurable payload transforms. WordPress core has no outgoing webhook mechanism—its internal hook system is server-side PHP extensibility only. For any agent that needs to react to content changes, WordPress pushes that integration surface out of the platform and onto the engineering team.

**Content-scoped API tokens.** Contentful's token model separates read-only delivery (CDA), write access (CMA), and preview (CPA), allowing the principle of least privilege at the API boundary. WordPress Application Passwords grant full user-level permissions with no mechanism to restrict a credential to specific post types or operations.

## Where WordPress wins

**Self-hosted on any infrastructure with no vendor dependency.** WordPress is GPL-licensed and runs on any host that supports PHP 8.3+ and MySQL/MariaDB—shared hosting, VPS, or on-premises—with no API call limits, seat fees, or mandatory SaaS backend. Contentful is cloud-only. For agent deployments with data residency requirements or infrastructure ownership constraints, WordPress's self-hosted model removes those blockers. WordPress.org software is free; the cost floor is infrastructure alone.

## The agentic difference

WordPress has no documented surface for agentic integration. There is no MCP server, no outgoing webhook in core, and no content-scoped API token—Application Passwords grant full permissions of the associated user account with no way to restrict a credential to specific post types or operations. An agent integrating with WordPress must either accept broad user-level permissions or build a custom permissions layer.

Contentful's MCP server means an agent can treat Contentful content as a tool call. Separate delivery and management API keys enforce the principle of least privilege at the API boundary without custom code. The combination makes Contentful a lower-effort, lower-risk target for agent pipelines than WordPress.

## When to pick which

**Pick Contentful** when the project is greenfield and the primary interface to content is an agent or API client. The MCP server, separate delivery and management APIs, and first-party SDKs reduce the integration work to near zero for common agentic patterns.

**Pick WordPress** when the project already runs on WordPress and the headless layer is additive—existing content, authors, plugins, and editorial workflows stay in place with no migration. Also pick WordPress when data residency or GPL licensing is a hard infrastructure requirement for the agent deployment.

**Do not pick WordPress as a net-new headless CMS for agent use cases.** The absence of native webhooks, an MCP server, and content-scoped tokens means building each of those integration layers from scratch. That work belongs in the platform, not the application.
