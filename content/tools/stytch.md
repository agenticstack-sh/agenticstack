---
name: Stytch
slug: stytch
category: auth
type: cloud
website: https://stytch.com
pricing: freemium
pricing_tiers:
  - "Free up to 25 orgs"
  - "Usage-based Pro"
  - "Custom Enterprise"
open_source: false
self_hosted: false
sdk_languages: [javascript, typescript, python, ruby, go]
frameworks: [langchain, vercel-ai]
agent_features:
  agent_sdk: false
  token_delegation: true
  human_in_the_loop: null
  fga: false
  mcp_support: null
  async_authorization: null
compliance: [soc2, gdpr]
best_for: "API-first auth for AI startups; headless identity with flexible session management"
limitations: "No FGA, no dedicated agent SDK, no human-in-the-loop; good primitives but requires more DIY for complex agent patterns"
verified_by: editorial
last_verified: 2026-04-17
source_urls:
  changelog: https://stytch.com/blog
  pricing: https://stytch.com/pricing
  docs: https://stytch.com/docs
---

# Stytch

Stytch is popular in AI startup stacks because it's API-first, flexible, and gets out of the way. It supports a wide range of authentication methods (magic links, OTP, OAuth, biometrics, passkeys) without forcing a specific UI pattern.

For agents, the relevant capabilities are M2M tokens, session management with long-lived sessions, and impersonation support. Token delegation is achievable through standard OAuth flows.

Stytch doesn't have purpose-built agent features like FGA or human-in-the-loop approval. It's a strong base layer for developers who want control and prefer to build agent authorization logic themselves rather than rely on SDK-level abstractions.

**Agent-specific features:**
- M2M tokens for agent service authentication
- Flexible session management (useful for long-running agents)
- Impersonation for agent-acting-as-user scenarios
- OAuth token delegation through standard flows
