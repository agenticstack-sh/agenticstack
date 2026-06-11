---
name: Qdrant
slug: qdrant
category: vectordb
type: hybrid
website: https://qdrant.tech
pricing: freemium
pricing_tiers:
  - "Free (self-hosted, Apache 2.0)"
  - "Free Cloud (1GB cluster)"
  - "$25+/mo Cloud (usage-based)"
  - "Custom Hybrid Cloud / Private Cloud"
open_source: true
self_hosted: true
sdk_languages: [python, javascript, typescript, rust, go, java, csharp]
frameworks: [langchain, llamaindex, vercel-ai, openai-agents, haystack, dspy]
agent_features:
  hybrid_search: true
  metadata_filtering: true
  multi_tenancy: true
  managed_embeddings: false
  mcp_server: true
  serverless: true
compliance: [soc2, gdpr, hipaa]
best_for: "High-performance vector search with rich payload filtering — Rust-written, predictable latency, and a clean self-hosted path"
limitations: "No built-in embedding generation — bring your own embeddings; managed cloud is younger than Pinecone's; fewer turnkey RAG modules than Weaviate"
verified_by: editorial
last_verified: 2026-06-10
source_urls:
  docs: https://qdrant.tech/documentation
  pricing: https://qdrant.tech/pricing
  changelog: https://github.com/qdrant/qdrant/releases
---

# Qdrant

Qdrant is an open-source vector database written in Rust, optimized for predictable latency and rich payload filtering. Its query planner uses payload indexes to short-circuit vector search whenever a metadata filter would dominate — which makes it especially strong for agent workloads where every query is scoped by tenant, user, or document type.

For agents, Qdrant's standout features are dense + sparse + late-interaction hybrid retrieval in a single API, tenant-aware payload filtering, and shard-key-based multi-tenancy that scales horizontally. The official Qdrant MCP server exposes search, upsert, and snapshot operations as agent tools.

Qdrant deliberately stays out of the embedding business — you bring your own embeddings (OpenAI, Cohere, local models). For teams that want the embedding pipeline owned outside the database (versioning, replays, A/B tests), this is a feature, not a missing one. For teams that want one-click ingest of raw text, Weaviate or Pinecone are a closer fit.

**Agent-specific features:**
- Hybrid search: dense + sparse + ColBERT-style late interaction in a single `query_points` call
- Payload-aware query planner: heavy filters short-circuit the vector search
- Shard-key multi-tenancy with per-tenant snapshots and deletion
- Official MCP server (`mcp-server-qdrant`) for agent-driven retrieval
- Hybrid Cloud and Private Cloud for fully managed deployments inside your VPC
