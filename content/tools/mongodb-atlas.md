---
name: MongoDB Atlas Vector Search
slug: mongodb-atlas
category: vectordb
type: cloud
website: https://www.mongodb.com/products/platform/atlas-vector-search
pricing: freemium
pricing_tiers:
  - "Free M0 cluster (512MB)"
  - "$57+/mo M10 dedicated"
  - "Search Nodes billed separately"
  - "Custom Enterprise"
open_source: false
self_hosted: false
sdk_languages: [python, javascript, typescript, go, java, csharp, ruby, php, rust]
frameworks: [langchain, llamaindex, vercel-ai, haystack]
agent_features:
  hybrid_search: true
  metadata_filtering: true
  multi_tenancy: true
  managed_embeddings: true
  mcp_server: true
  serverless: true
compliance: [soc2, hipaa, gdpr, pci-dss, iso27001]
best_for: "Teams already on MongoDB who want vector search next to operational data — one driver, one query language, one backup story"
limitations: "Vector indexes are tied to Atlas (not self-hosted Community Server); search nodes add cost; index build times can be long for large collections"
verified_by: editorial
last_verified: 2026-06-10
source_urls:
  docs: https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-overview/
  pricing: https://www.mongodb.com/pricing
  changelog: https://www.mongodb.com/docs/atlas/release-notes/
---

# MongoDB Atlas Vector Search

MongoDB Atlas Vector Search adds dense vector retrieval and hybrid (vector + Atlas Search BM25) queries to the operational MongoDB database many teams already run. Vectors live alongside the document they describe, so a single `$vectorSearch` aggregation can retrieve, filter, and join in one stage — no dual-write between an operational store and a vector store.

For agents, the value is the unified data model. The same document holds your business data, its metadata, and its embedding. You can scope queries with rich `$match` filters, run hybrid search through `$rankFusion`, and stream changes to keep embeddings fresh via change streams. MongoDB ships a first-party MCP server that exposes collection and vector search operations as agent tools.

Atlas runs the vector workload on dedicated Search Nodes that scale independently of the main cluster — effectively a serverless-style storage/compute split — and Atlas Stream Processing can keep embeddings in sync with upstream sources.

The tradeoff is platform lock-in: Vector Search is an Atlas feature, not part of MongoDB Community Server. Teams that need fully air-gapped deployments need MongoDB Enterprise Advanced with Search or a different engine.

**Agent-specific features:**
- Vectors stored next to operational data — no sync pipeline between two databases
- Hybrid search via `$rankFusion` combining `$vectorSearch` and Atlas Search (BM25)
- Independent Search Nodes scale vector workload separately from operational load
- First-party MongoDB MCP server for agent-driven CRUD and vector search
- Built-in `embedding` model bindings for ingestion via Atlas Stream Processing
