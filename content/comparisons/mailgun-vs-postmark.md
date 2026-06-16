---
title: "Mailgun vs Postmark"
slug: mailgun-vs-postmark
tools: [mailgun, postmark]
category: email
last_verified: 2026-05-09
---

Postmark and Mailgun both ship official MCP servers. The comparison turns on inbound email processing quality and credential model. Postmark wins on structured inbound output. `StrippedTextReply` and `MailboxHash` reduce agent-side parsing to near zero. Mailgun wins on inbound routing expressiveness and minimal-privilege credentials.

## Where Postmark wins

* **Structured inbound output with pre-stripped reply text.** Postmark's inbound processing delivers `StrippedTextReply` (reply body with quoted history removed), `MailboxHash` (routing key in the To address), spam scores, and a fully parsed JSON envelope. Agents consuming email replies receive the reply content already extracted. `MailboxHash` enables routing messages to different handler functions. Mailgun's inbound webhook delivers a parsed JSON payload with full message body and headers but no `StrippedTextReply`. Agents extracting reply text from quoted-reply threads must implement that parsing themselves.

* **Message Streams for reputation isolation.** Postmark separates transactional and broadcast sends into distinct Message Streams with independent reputations and per-stream webhooks. Agents mixing notifications with broadcast sends protect transactional deliverability at the infrastructure level. Mailgun manages reputation at the domain level. Isolating transactional from bulk requires separate sending domains, not separate streams within a single domain.

## Where Mailgun wins

* **Inbound Routes with filter expressions.** Mailgun Routes filter inbound email at the provider before routing to an agent endpoint. Filter expressions like `match_recipient("support\\+(.*)@yourdomain.com")` route only matching messages to the handler URL. Agents receive pre-filtered messages instead of full incoming volume on a domain. Postmark's inbound processing delivers all incoming email on a configured address to the same webhook. Routing by recipient, subject, or header must be implemented inside the agent.

* **Domain Sending Keys for minimal-privilege credentials.** Mailgun Domain Sending Keys are per-domain, send-only credentials that cannot access logs, routes, suppressions, or account management. This is a named, first-class credential type for send-only access from a specific domain. Postmark offers Server Token (full operations on a server) and Account Token (all servers plus account administration). There is no send-only or per-operation scope within a Server Token. Any agent credential scoped to a Postmark server has full server-level write access.

## The agentic difference

Both tools are MCP-ready. The choice depends on the direction of email flow the agent prioritizes.

For inbound-heavy workflows, Postmark's `StrippedTextReply` and `MailboxHash` deliver the most agent-consumable inbound format. The reply body is already extracted. Routing state is already embedded in a parseable field. Mailgun's Routes provide pre-delivery filtering that reduces message volume at the agent endpoint. The content processing burden on matched messages is higher.

For outbound-only agents needing the tightest send credential, Mailgun's Domain Sending Keys provide a cleaner minimal-privilege story. A Postmark Server Token cannot narrow to send-only. Any credential that can send can also manage webhooks, read stats, and modify templates. For agents requiring a provably send-only identity, Mailgun's first-class Domain Sending Key is the better fit.

## When to pick which

* **Pick Postmark** when the agent workflow involves receiving and processing email replies. `StrippedTextReply` and `MailboxHash` eliminate reply-chain parsing and enable clean routing without additional code. Pick Postmark when transactional and broadcast reputation isolation via Message Streams is required.

* **Pick Mailgun** when inbound email must be filtered at the provider before reaching the agent. Routes reduce agent-side message volume. Pick Mailgun when a minimal-privilege send-only credential per domain is required and Postmark's Server Token scope is too broad.
