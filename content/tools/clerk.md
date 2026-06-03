---
name: Clerk
slug: clerk
category: auth
type: cloud
website: https://clerk.com
pricing: freemium
pricing_tiers:
  - "Free up to 10k MAU"
  - "$25/mo Pro"
  - "Custom Enterprise"
open_source: false
self_hosted: false
sdk_languages: [javascript, typescript]
frameworks: [vercel-ai, langchain, nextjs, remix]
agent_features:
  agent_sdk: true
  token_delegation: false
  human_in_the_loop: false
  fga: false
  mcp_support: null
  async_authorization: false
compliance: [soc2, gdpr]
best_for: "Next.js and React AI apps needing fast auth setup with prebuilt UI components"
limitations: "JavaScript/TypeScript only; no token delegation or FGA; not designed for complex agent authorization patterns"
verified_by: editorial
last_verified: 2026-04-17
source_urls:
  changelog: https://clerk.com/changelog
  pricing: https://clerk.com/pricing
  docs: https://clerk.com/docs
---

# Clerk

Clerk is the go-to auth solution in the Next.js and React ecosystem, known for its polished prebuilt UI components and tight Vercel integration. It's popular in AI app development because it gets auth working in minutes with minimal boilerplate.

For simple agentic use cases — an AI app where a user logs in and the agent acts within that session — Clerk works well. For more complex agent scenarios involving token delegation, inter-agent authorization, or fine-grained permission models, Clerk isn't the right fit.

The AI-specific support centers on making session tokens available within AI SDK route handlers and server actions, rather than purpose-built agent authorization primitives.

**Agent-specific features:**
- Session token access within AI SDK route handlers
- Middleware integration for protecting AI endpoints
- No built-in token delegation or FGA
