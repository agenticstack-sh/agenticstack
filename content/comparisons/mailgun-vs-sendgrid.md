---
title: "Mailgun vs SendGrid"
slug: mailgun-vs-sendgrid
tools: [mailgun, sendgrid]
category: email
last_verified: 2026-05-09
---

SendGrid and Mailgun both offer mature email APIs with REST and SMTP delivery. Mailgun ships an official MCP server. SendGrid does not. Mailgun also provides more expressive inbound routing. SendGrid wins on per-endpoint credential scoping.

## Where Mailgun wins

* **MCP server for agent tool calls.** Mailgun ships an official MCP server. SendGrid has no documented MCP server. MCP agents can invoke Mailgun operations as tool calls without building an adapter. Integrating SendGrid requires writing a custom adapter.

* **Inbound Routes with filter expressions.** Mailgun Routes filter inbound email at the provider before routing to an agent endpoint. Filter expressions like `match_recipient("support\\+(.*)@yourdomain.com")` route only matching messages to the configured URL or S3 store. The agent receives pre-filtered messages instead of every incoming email on the domain. SendGrid's Inbound Parse Webhook delivers structured JSON for all incoming email on a configured MX domain. Routing happens in the consumer. Agents must read every message and apply routing logic themselves.

* **Domain Sending Keys for minimal-privilege credentials.** Mailgun Domain Sending Keys are per-domain, send-only credentials that cannot access logs, routes, suppressions, or account management. This is a named, first-class credential type for send-only access. Resend and Postmark have comparable constructs. SendGrid's minimum send-scoped key can narrow to "Mail Send" only but draws from the same key type as broader administrative keys.

## Where SendGrid wins

* **Per-endpoint API key scoping.** SendGrid custom API keys restrict to specific endpoints. A key can scope to "Mail Send" with read-only "Suppressions" access. Agents monitoring bounces can send and read lists with one key that cannot create templates or modify contact lists. Mailgun offers Domain Sending Keys (send-only, per-domain) and standard API keys with role-based access. It does not offer the same per-endpoint mix-and-match capability.

* **Marketing Campaigns and list management.** SendGrid includes Marketing Campaigns with contact list management, segmentation, and single sends via API. Agents managing subscriber lists can operate both surfaces through a single provider. Mailgun focuses on transactional and bulk sending. Its contact list and marketing capabilities are less mature.

## The agentic difference

Mailgun's MCP server is the decisive advantage. Agents can invoke email operations as tool calls without building an adapter. Mailgun's inbound Routes provide filter-at-source routing that reduces agent-side processing. Only relevant messages are delivered to the handler. SendGrid requires custom MCP integration and handles all inbound routing inside consumer code.

SendGrid's per-endpoint API key model is more nuanced than Mailgun's. An agent can cover send plus suppression-read without covering template management. This matters for agents monitoring deliverability. For agents managing marketing lists, SendGrid covers both surfaces in one provider. Neither removes the need to build a custom MCP adapter for SendGrid.

## When to pick which

* **Pick Mailgun** when MCP tool-call surface is required without custom implementation. Pick Mailgun when inbound email routing with filter expressions reduces agent-side routing logic.

* **Pick SendGrid** when per-endpoint API key scoping with read-only suppression access is required. Pick SendGrid when the agent also manages marketing contact lists and you can build MCP integration custom.
