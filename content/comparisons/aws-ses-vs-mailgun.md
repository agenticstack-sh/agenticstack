---
title: "AWS SES vs Mailgun"
slug: aws-ses-vs-mailgun
tools: [aws-ses, mailgun]
category: email
last_verified: 2026-05-09
---

Mailgun and AWS SES diverge on every agentic dimension. Mailgun ships an official MCP server and delivers events directly to HTTP endpoints. AWS SES has no MCP server and routes events through SNS. AWS SES provides the most granular credential model via IAM and operates within the AWS compliance boundary. Pick Mailgun for tool-call surface and minimal infrastructure. Pick AWS SES for IAM-level scoping or regulated-data compliance.

## Where Mailgun wins

* **MCP server for agent tool calls.** Mailgun ships an official MCP server. AWS SES has no documented MCP server. MCP agents can invoke Mailgun operations as tool calls without building an adapter. Integrating SES requires writing an adapter that wraps the AWS SDK in an MCP tool schema.

* **Direct HTTP webhook delivery without SNS infrastructure.** Mailgun delivers delivery events directly to configured HTTPS endpoints with HMAC-SHA256 signature verification and documented retry behavior. It includes delivered, bounced, complained, opened, clicked, and unsubscribed events. AWS SES publishes delivery events to SNS topics. Consuming those events requires configuring an SNS HTTP subscription, Lambda function, or SQS queue. For agent pipelines not already in AWS, SNS is infrastructure that must be provisioned and maintained before a single delivery event reaches the agent.

* **Inbound Routes with filter expressions.** Mailgun Routes filter inbound email at the provider before routing to an agent endpoint. Filter expressions like `match_recipient("agent\\+(.*)@yourdomain.com")` route only matching messages to the handler URL and can extract embedded routing parameters from the To address. AWS SES Receipt Rules route inbound email to S3, Lambda, SNS, or WorkMail. No path delivers a structured JSON payload directly to an HTTP endpoint. Receiving inbound email via SES requires reading from S3 or processing inside Lambda. All routing logic is implemented by the agent.

## Where AWS SES wins

* **IAM credential scoping for agent identities.** AWS IAM policies restrict agent credentials to specific SES API actions (`ses:SendEmail`, `ses:SendRawEmail`), specific sender identity ARNs, and condition keys such as `ses:FromAddress` and `ses:Recipients`. This is action-level, resource-level, and condition-level scoping in one policy. It is the most granular minimal-privilege model for email-sending agents. Mailgun Domain Sending Keys are per-domain, send-only credentials that cannot access logs, routes, suppressions, or account management. This is a strong minimal-privilege construct. Domain Sending Keys cannot restrict to a specific sender address within a domain or apply condition-based constraints. The IAM model goes substantially further.

* **Data residency and compliance.** AWS SES runs within a specific AWS region. All email content, event data, and configuration metadata stay in that region unless explicitly routed elsewhere. SES participates in AWS's SOC 2, HIPAA BAA, and FedRAMP programs. For agent pipelines handling healthcare, federal, or PII-sensitive workloads, SES's AWS compliance boundary is not matched by a managed provider. Mailgun is cloud-hosted and SOC 2 certified. It does not offer self-hosting or HIPAA BAA or FedRAMP authorization.

## The agentic difference

Mailgun is the faster path to a working agent email integration. The MCP server works with any MCP-compatible runtime without custom code. Direct HTTP webhooks provide delivery event access without SNS. Inbound Routes let the provider filter messages before they reach the agent endpoint. This reduces the routing and filtering logic the agent must implement.

AWS SES has no MCP server and routes all events through SNS. Building an SES-based email tool requires writing an MCP adapter, configuring SNS subscribers, and either implementing S3-based inbound retrieval or parsing inside Lambda. The payoff is infrastructure ownership. IAM provides tighter agent credential scoping than any managed provider. Mailgun's Domain Sending Keys are a good minimal-privilege construct. IAM's action-plus-resource-plus-condition model has no equivalent. SES's AWS compliance posture covers regulated workloads Mailgun cannot.

## When to pick which

* **Pick Mailgun** when the agent requires MCP tool-call surface without building an adapter. Pick Mailgun when delivery events must reach the agent via direct HTTP without SNS infrastructure. Pick Mailgun when inbound email routing with provider-side filter expressions is needed.

* **Pick AWS SES** when the agent pipeline runs in AWS and requires IAM-level credential scoping per sender identity and configuration set. Pick AWS SES when you need condition-level constraints that Domain Sending Keys cannot express. Pick AWS SES when the workload must satisfy HIPAA, FedRAMP, or SOC 2 requirements within the AWS compliance boundary.
