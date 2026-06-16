---
name: Elasticsearch
slug: elasticsearch
category: vectordb
type: hybrid
website: https://www.elastic.co/elasticsearch
pricing: freemium
pricing_tiers:
  - "Free (self-hosted, Elastic License v2 / SSPL)"
  - "Elastic Cloud Hosted $99+/mo (Standard, Gold, Platinum, Enterprise)"
  - "Elasticsearch Serverless (pay per use)"
open_source: true
self_hosted: true
sdk_languages: [python, javascript, typescript, go, java, ruby, php, csharp, rust]
frameworks: [langchain, llamaindex, vercel-ai, haystack]
agent_features:
  hybrid_search: true
  metadata_filtering: true
  multi_tenancy: true
  managed_embeddings: true
  mcp_server: true
  serverless: true
compliance: [soc2, hipaa, gdpr, pci-dss, iso27001]
best_for: "Hybrid search at scale on top of mature search infrastructure — combine BM25, ELSER sparse vectors, and dense vectors in one query"
limitations: "Heavier and more memory-hungry than purpose-built vector engines; license is no longer pure Apache 2.0; vector-only workloads are overserved by Elasticsearch's full feature surface"
verified_by: editorial
last_verified: 2026-06-10
source_urls:
  docs: https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html
  pricing: https://www.elastic.co/pricing
  changelog: https://www.elastic.co/docs/release-notes/elasticsearch
---

# Elasticsearch

Elasticsearch added dense vector storage and HNSW indexing in 7.x and has steadily made vector search a first-class workload alongside its long-standing BM25 search. The result is one of the strongest hybrid-search stories on the market: dense vectors, sparse vectors (ELSER), and lexical search can be combined in a single `_search` query with reciprocal rank fusion.

For AI agents that need to ground answers in technical, proper-noun-heavy, or domain-specific corpora — where pure vector search underperforms — Elasticsearch's hybrid retrieval is hard to beat. The `inference` API hosts embedding and reranker models (E5, ELSER, Cohere, OpenAI, Hugging Face) so you can ingest raw text without a separate embedding service. The official Elasticsearch MCP server exposes index, search, and inference operations to agents.

Elastic Cloud Serverless decouples storage from compute and bills per usage, making bursty agent workloads cheaper than the classic node-based pricing. Multi-tenancy is handled through dedicated indices, index aliases, or document-level security depending on isolation needs.

The tradeoffs are weight and license. Elasticsearch runs on the JVM, wants a lot of memory, and brings a much larger feature surface (full-text search, observability, security analytics) than a pure vector workload needs. The license shift to Elastic License v2 / SSPL also matters for some users — though Elasticsearch added an AGPL option in 2024.

**Agent-specific features:**
- Hybrid retrieval (dense + ELSER sparse + BM25) with RRF in a single query
- `inference` API hosts embedding and reranker models inside the cluster
- Document-level security for multi-tenant agent apps
- Official Elasticsearch MCP server for agent-driven search and ingest
- Elastic Cloud Serverless with separated storage and compute
