---
name: Descope
slug: descope
category: auth
type: cloud
website: https://descope.com
pricing: freemium
pricing_tiers:
  - "Free up to 7.5k MAU"
  - "$0.05/MAU Pro"
  - "Custom Enterprise"
open_source: false
self_hosted: false
sdk_languages: [javascript, typescript, python, go, java]
frameworks: [langchain, vercel-ai, openai-agents]
agent_features:
  agent_sdk: true
  token_delegation: true
  human_in_the_loop: true
  fga: true
  mcp_support: true
  async_authorization: true
compliance: [soc2, gdpr]
best_for: "AI agent auth from day one; built specifically for agentic workflows including MCP server authorization"
limitations: "Newer product with smaller community and ecosystem compared to Auth0 or Clerk; enterprise support is still maturing"
verified_by: editorial
last_verified: 2026-04-17
source_urls:
  changelog: https://docs.descope.com/changelog
  pricing: https://www.descope.com/pricing
  docs: https://docs.descope.com
---

# Descope

Descope is notable for being one of the few auth providers that explicitly targets AI agent developers as a primary audience, not an afterthought. The product includes native support for MCP (Model Context Protocol) server authorization, human-in-the-loop approval flows, and async authorization — all designed with agentic workflows in mind.

The AI/agent SDK covers token delegation, scoped access for agents acting on behalf of users, and fine-grained authorization rules. MCP support is the standout differentiator — if you're building or consuming MCP servers, Descope has native tooling for it.

The tradeoff is maturity. Descope is newer than Auth0 or Clerk, and the ecosystem (community resources, third-party integrations, StackOverflow coverage) reflects that. For greenfield agent projects, that's less of a concern; for teams that need battle-tested infrastructure, it's worth weighing.

**Agent-specific features:**
- Native MCP server authorization
- Human-in-the-loop approval workflows
- Async authorization for non-blocking agent approval requests
- Token delegation for downstream service access
- FGA for fine-grained permission modeling
