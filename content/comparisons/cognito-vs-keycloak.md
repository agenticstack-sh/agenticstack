---
title: "Amazon Cognito vs Keycloak"
slug: cognito-vs-keycloak
tools: [cognito, keycloak]
category: auth
last_verified: 2026-05-09
verdict: "Keycloak"
---
For developers building AI agents, Cognito and Keycloak use opposing architectural approaches. Cognito offers AWS-native machine identity governance with zero operations. Keycloak provides protocol-level control and self-hosting for regulated environments. Keycloak wins for agents needing asynchronous approval workflows (CIBA), on-premises deployment, or protocol customization. Cognito is better for AWS-scoped agent microservices where IAM roles work natively and managed simplicity matters.

## Where Keycloak wins

* **CIBA for Asynchronous Agent Governance.** Keycloak's CIBA (since v13) lets agents initiate requests, continue processing, and poll for approval without blocking. For regulated workflows needing human approval gates before agents access sensitive data, CIBA is a core protocol primitive.

* **Self-Hosted Deployment with Air-Gap Support.** Keycloak runs in your infrastructure, including air-gapped, classified environments. For regulated industries where agents must remain on-premises, self-hosting is mandatory.

* **No Per-Agent Licensing.** Keycloak's open-source license has zero per-MAU or per-machine-identity fees. Agent-heavy architectures scale with infrastructure costs only.

* **Protocol Customization via Java SPI.** Keycloak's Service Provider Interface layer enables custom authentication flows, token enrichment, and agent policies in token issuance. You can build domain-specific agent governance without external middleware.

## Where Cognito wins

* **AWS-Native Machine Identity for Microservices.** For agents deployed as Lambda functions, ECS containers, or EC2 instances, Cognito integrates directly with IAM. Agents assume IAM roles and get temporary credentials automatically.

* **Fully Managed with Zero Operations.** Cognito is completely managed: no database scaling, no clustering, no upgrades. AWS handles all operations and guarantees 99.9% availability via SLA.

* **Low Cost for AWS-Locked Deployments.** $0.015 per MAU after a 10,000-user free tier. For AWS-native agents, Cognito's cost is minimal compared to operating Keycloak's Java clustering.

* **Tight AWS Service Integration.** Direct integration with Lambda, API Gateway, CloudWatch, WAF, and other AWS services. AWS-native agents leverage integrations without custom code.

## The agentic difference

Keycloak's CIBA enables regulatory approval workflows. Keycloak supports CIBA (Client-Initiated Backchannel Authentication) since v13 — a protocol primitive where agents initiate requests, continue executing, and poll for approval asynchronously. For agents in regulated industries (healthcare, finance, defense) needing human-in-the-loop governance checkpoints, CIBA enables non-blocking execution. Cognito has no equivalent mechanism. Approval workflows must be modeled through external services or Lambda logic.

Cognito's IAM approach is AWS-resource-centric, not agent-centric. Cognito relies on IAM roles for authorization. It works well for AWS Lambda, EC2, or microservices mapping to resource-scoped permissions. But it's entirely AWS-locked. Agents cannot portably integrate third-party APIs or operate in multi-cloud environments. Keycloak's approach is agent-centric and portable across cloud providers.

Neither supports Dynamic Client Registration or token vaults natively. Both platforms lack mechanisms for agents to self-register as OAuth clients or maintain vaults of third-party API credentials. Keycloak's Java SPI extensibility allows custom agent logic. Cognito stays within AWS-native resource governance.

## When to pick which

* **Pick Keycloak** when building agent systems needing asynchronous human-in-the-loop governance. CIBA lets agents request approval, continue working, and poll for response without blocking.

* **Pick Keycloak** when agents operate in regulated industries needing on-premises or air-gapped deployment. Self-hosting gives you complete control over the auth stack.

* **Pick Cognito** when your agents are AWS Lambda functions or microservices mapping to IAM roles. AWS IAM provides native machine identity governance.

* **Pick Cognito** when building AWS-scoped agent deployments where operations simplicity matters. It's fully managed with zero infrastructure overhead.
