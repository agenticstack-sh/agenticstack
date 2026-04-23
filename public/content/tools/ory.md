---
name: Ory
slug: ory
category: auth
type: hybrid
website: https://ory.sh
pricing: open-source
open_source: true
self_hosted: true
sdk_languages: [javascript, typescript, python, go, java, php, ruby]
frameworks: [langchain]
agent_features:
  agent_sdk: false
  token_delegation: true
  human_in_the_loop: false
  fga: true
  mcp_support: null
  async_authorization: false
compliance: [soc2, gdpr]
best_for: "Self-hosted identity infrastructure with Kubernetes-native deployment; strong FGA via Keto (SpiceDB-compatible)"
limitations: "No dedicated agent SDK; requires significant ops expertise to run at scale; no human-in-the-loop out of the box"
verified_by: editorial
last_verified: 2026-04-17
source_urls:
  changelog: https://github.com/ory/kratos/releases
  pricing: https://www.ory.sh/pricing/
  docs: https://www.ory.sh/docs
---

# Ory

Ory is the dominant open-source identity stack for teams that need to run their own infrastructure. It's a suite of components: Kratos (identity management), Hydra (OAuth 2.0/OIDC), Keto (FGA via SpiceDB-compatible model), and Oathkeeper (API gateway / access proxy).

For agents in regulated industries or organizations that can't use cloud-hosted identity providers, Ory is the most capable self-hosted option. The FGA via Keto is powerful — it uses Google Zanzibar's relationship-based model, the same foundation as Auth0 FGA and Google's own IAM.

The complexity cost is real. Running Ory in production requires Kubernetes experience and ongoing ops investment. There's no hosted agent SDK, and human-in-the-loop approval flows need to be built on top of the underlying primitives.

**Agent-specific features:**
- OAuth 2.0 token delegation via Hydra
- Relationship-based FGA via Keto (Zanzibar model)
- API access control via Oathkeeper
- Full infrastructure control for compliance-sensitive deployments
