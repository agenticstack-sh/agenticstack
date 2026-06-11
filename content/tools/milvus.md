---
name: Milvus
slug: milvus
category: vectordb
type: hybrid
website: https://milvus.io
pricing: freemium
pricing_tiers:
  - "Free (self-hosted, Apache 2.0)"
  - "Free Zilliz Cloud Serverless tier"
  - "$99+/mo Zilliz Cloud Dedicated"
  - "Custom Enterprise / BYOC"
open_source: true
self_hosted: true
sdk_languages: [python, javascript, typescript, go, java, csharp, ruby]
frameworks: [langchain, llamaindex, vercel-ai, haystack, dspy]
agent_features:
  hybrid_search: true
  metadata_filtering: true
  multi_tenancy: true
  managed_embeddings: true
  mcp_server: false
  serverless: true
compliance: [soc2, gdpr, hipaa, iso27001]
best_for: "Billion-scale vector workloads with the widest selection of ANN index types — HNSW, IVF, DiskANN, SCANN, GPU indexes"
limitations: "Self-hosted deployment is operationally complex (depends on etcd, MinIO, Pulsar/Kafka); no first-party MCP server yet; managed offering is through Zilliz, not Milvus directly"
verified_by: editorial
last_verified: 2026-06-10
source_urls:
  docs: https://milvus.io/docs
  pricing: https://zilliz.com/pricing
  changelog: https://github.com/milvus-io/milvus/releases
---

# Milvus

Milvus is the highest-scale open-source vector database, designed for billion-vector workloads. Its distributed architecture separates compute, storage, and coordination, and its index zoo (HNSW, IVF_FLAT, IVF_PQ, DiskANN, SCANN, GPU-CAGRA) is the broadest of any open-source engine.

For AI agents at scale, Milvus's strengths are partition-based multi-tenancy, hybrid search across multiple vector fields (dense + sparse + multi-vector reranking), and a managed serverless tier through Zilliz Cloud with pay-per-use billing. The integrated `pymilvus[model]` package exposes OpenAI, Cohere, Voyage, and SentenceTransformer embedders so you can ingest text directly.

The tradeoff is operational complexity. Self-hosting Milvus in production means running etcd, MinIO (or S3-compatible storage), and Pulsar or Kafka — far more moving parts than Qdrant or Chroma. Milvus Lite (single-file embedded mode) covers prototyping, but production teams typically end up on Zilliz Cloud to avoid the ops burden. Milvus does not yet ship a first-party MCP server.

**Agent-specific features:**
- Partition keys for cheap per-tenant isolation inside a single collection
- Hybrid search with multi-vector fields and pluggable rerankers (RRF, weighted)
- DiskANN and GPU-CAGRA indexes for billion-scale corpora that don't fit in RAM
- Built-in embedding functions via `pymilvus[model]`
- Serverless and dedicated tiers on Zilliz Cloud; BYOC on AWS, GCP, and Azure
