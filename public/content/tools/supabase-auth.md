---
name: Supabase Auth
slug: supabase-auth
category: auth
type: hybrid
website: https://supabase.com/docs/guides/auth
pricing: freemium
open_source: true
self_hosted: true
sdk_languages: [javascript, typescript, python, dart, swift, kotlin]
frameworks: [langchain, vercel-ai]
agent_features:
  agent_sdk: false
  token_delegation: false
  human_in_the_loop: false
  fga: false
  mcp_support: null
  async_authorization: false
compliance: [soc2, gdpr, hipaa]
best_for: "AI apps built on the Supabase BaaS stack; projects that need auth + database + storage in one platform"
limitations: "Auth is tightly coupled to Supabase's ecosystem; no token delegation, no FGA, no agent SDK; auth is secondary to the BaaS offering"
verified_by: editorial
last_verified: 2026-04-17
source_urls:
  changelog: https://supabase.com/changelog
  pricing: https://supabase.com/pricing
  docs: https://supabase.com/docs/guides/auth
---

# Supabase Auth

Supabase Auth is built on GoTrue and is part of the broader Supabase Backend-as-a-Service platform. It's widely used in the AI app development community because Supabase has become the dominant BaaS for rapid AI app prototyping — the vector store, database, and auth all in one.

The auth module supports standard flows: OAuth providers, magic links, OTP, and password auth. Row-level security (RLS) in Postgres can enforce fine-grained data access rules based on the authenticated user.

For agent-specific authorization, Supabase's limitations are similar to Firebase: no token delegation, no purpose-built agent SDK, and no human-in-the-loop capabilities. The RLS model provides database-level authorization, but that's different from the agent authorization patterns (async approval, scoped delegation) that complex agents require.

**Agent-specific features:**
- JWT-based session tokens for authenticating agent requests
- Row-level security for database authorization
- Service role key for backend/agent-to-database access
- Can self-host for data sovereignty requirements
