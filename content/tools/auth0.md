---
name: Auth0
slug: auth0
category: auth
type: cloud
website: https://auth0.com
pricing: freemium
pricing_tiers:
  - "Free up to 25k MAU"
  - "$35/mo Essentials"
  - "Custom Enterprise"
open_source: false
self_hosted: false
sdk_languages: [python, javascript, typescript, go, java, csharp]
frameworks: [langchain, llamaindex, vercel-ai, openai-agents]
agent_features:
  agent_sdk: true
  token_delegation: true
  human_in_the_loop: true
  fga: true
  mcp_support: true
  async_authorization: true
compliance: [soc2, hipaa, gdpr, pci-dss]
best_for: "Multi-tenant SaaS, token delegation for agents, fine-grained authorization at scale"
limitations: "Vendor lock-in on cloud plan; self-hosted (Private Cloud) is enterprise-tier only; dynamic client registration for MCP requires Enterprise plan to secure against abuse"
verified_by: editorial
last_verified: 2026-04-17
source_urls:
  changelog: https://auth0.com/changelog
  pricing: https://auth0.com/pricing
  docs: https://auth0.com/docs/get-started
---

# Auth0

Auth0 (now under Okta) is one of the most mature cloud identity platforms available. For agentic workloads, its standout capabilities are the AI SDK (Auth0 AI), Token Vault for managing downstream token delegation, a built-in FGA product for relationship-based access control, and dedicated MCP server authorization.

The human-in-the-loop support is implemented through async authorization flows — an agent can request an action, pause, and resume once the user approves it via a notification. This is particularly useful for high-stakes agentic operations.

Auth0's main tradeoff is cost and lock-in at scale. The free tier is generous for prototyping, but production pricing can be significant for high user volume. Self-hosting requires an enterprise contract.

**MCP support**

Auth0 ships a dedicated product called Auth for MCP (currently Early Access). It implements OAuth 2.1 and OIDC as the authorization layer for MCP servers — MCP clients authenticate through a standard browser-based flow and receive scoped access tokens tied to the user's identity. Both static and dynamic client registration are supported; dynamic registration requires the Enterprise plan to protect against abuse.

Token exchange (RFC 8693) lets an MCP server exchange the token it received from a client for a new token scoped to an upstream API, preserving user identity down the call chain. Token Vault handles third-party credentials (Google, Microsoft, Jira, Notion) so the MCP server doesn't manage credential storage directly.

FGA integrates directly with MCP tool authorization — individual tools can be gated by role, group membership, or temporal rules (e.g. a tool accessible for a fixed window after user approval). Primary SDKs are JavaScript/TypeScript and Python.

**Agent-specific features:**
- Auth0 AI SDK with `withTokenVault` for managing access tokens across agent sessions
- Async authorization via the `asyncAuthorizationRequest` pattern
- FGA for fine-grained, relationship-based authorization rules including per-tool MCP access control
- Token exchange and delegation flows for downstream API access
- OAuth 2.1 MCP server authorization with standards-based discovery and metadata endpoints
