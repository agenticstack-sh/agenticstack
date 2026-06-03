---
name: WorkOS
slug: workos
category: auth
type: cloud
website: https://workos.com
pricing: freemium
pricing_tiers:
  - "Free up to 1M MAU"
  - "Pay-as-you-go after"
  - "Custom Enterprise"
open_source: false
self_hosted: false
sdk_languages: [javascript, typescript, python, go, ruby, java]
frameworks: [langchain, vercel-ai]
agent_features:
  agent_sdk: false
  token_delegation: true
  human_in_the_loop: null
  fga: true
  mcp_support: null
  async_authorization: null
compliance: [soc2, gdpr, hipaa]
best_for: "Enterprise SSO, M2M authentication, and fine-grained authorization for B2B agent products"
limitations: "No dedicated agent SDK; FGA is strong but relatively new; async authz patterns require custom integration"
verified_by: editorial
last_verified: 2026-04-17
source_urls:
  changelog: https://workos.com/changelog
  pricing: https://workos.com/pricing
  docs: https://workos.com/docs
---

# WorkOS

WorkOS is built for selling to enterprises. Its core strengths are SSO (SAML, OIDC), SCIM provisioning, and a fine-grained authorization product (AuthKit FGA). For AI agents operating in B2B SaaS contexts — where enterprise customers need to control exactly what the agent can access — WorkOS is a strong fit.

M2M (machine-to-machine) authentication is well-supported, which maps to agent-to-agent or agent-to-API scenarios. Token delegation is available through standard OAuth flows.

WorkOS doesn't have a dedicated agent SDK, so integration into agentic frameworks requires more custom work compared to Auth0 AI or Descope. The FGA product is capable but newer than alternatives like SpiceDB (Ory) or Auth0 FGA.

**Agent-specific features:**
- M2M authentication for agent-to-service calls
- FGA via AuthKit (relationship-based authorization)
- Enterprise SSO for B2B agent products
- Standard OAuth token delegation
