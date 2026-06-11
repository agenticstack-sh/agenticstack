---
name: Weaviate
slug: weaviate
category: vectordb
type: hybrid
website: https://weaviate.io
pricing: freemium
pricing_tiers:
  - "Free (self-hosted, open-source)"
  - "$25/mo Serverless Cloud (Sandbox free)"
  - "Custom Enterprise / BYOC"
open_source: true
self_hosted: true
sdk_languages: [python, javascript, typescript, go, java]
frameworks: [langchain, llamaindex, vercel-ai, haystack, dspy]
agent_features:
  hybrid_search: true
  metadata_filtering: true
  multi_tenancy: true
  managed_embeddings: true
  mcp_server: true
  serverless: true
compliance: [soc2, gdpr, hipaa]
best_for: "Hybrid RAG with built-in vectorizer modules, generative search, and strong multi-tenancy — runs anywhere from laptop to managed cloud"
limitations: "Resource-hungry compared to Qdrant or Chroma; module configuration has a learning curve; some advanced replication features are cloud-only"
verified_by: editorial
last_verified: 2026-06-10
source_urls:
  docs: https://weaviate.io/developers/weaviate
  pricing: https://weaviate.io/pricing
  changelog: https://github.com/weaviate/weaviate/releases
---

# Weaviate

Weaviate is an open-source vector database with the broadest "batteries-included" story of any vector engine. Its module system can pull embeddings from OpenAI, Cohere, Hugging Face, or local models, and its `generative-*` modules let you run RAG generation inside the database, returning grounded answers in a single query.

For agents, the killer feature is multi-tenancy: Weaviate's tenant-per-collection model can scale to hundreds of thousands of tenants on a single cluster, with per-tenant activation and offloading to cold storage. Hybrid search (BM25 + vector with configurable alpha) is first-class, not an add-on.

Weaviate publishes an official MCP server that exposes collection management and search to MCP-aware agents. The Serverless Cloud tier separates storage from compute for cost-efficient bursty workloads, and the BYOC (bring-your-own-cloud) option satisfies stricter data residency requirements without giving up the managed experience.

The tradeoff is resource appetite — Weaviate is heavier than Qdrant or Chroma in memory and CPU, and the module system rewards investment in configuration to get right.

**Agent-specific features:**
- Tenant-per-collection isolation that scales to 100k+ tenants per cluster
- Hybrid search (BM25F + vector) with configurable fusion
- Vectorizer and generative modules: embeddings and RAG happen inside the database
- Official MCP server for agent-driven collection and search operations
- Serverless Cloud with separated storage and compute, plus BYOC for data residency
