---
name: Chroma
slug: chroma
category: vectordb
type: hybrid
website: https://www.trychroma.com
pricing: freemium
pricing_tiers:
  - "Free (self-hosted, Apache 2.0)"
  - "Free Chroma Cloud starter"
  - "Usage-based Chroma Cloud (from ~$0.40/GB/mo storage + query units)"
open_source: true
self_hosted: true
sdk_languages: [python, javascript, typescript, ruby]
frameworks: [langchain, llamaindex, vercel-ai, haystack, dspy]
agent_features:
  hybrid_search: true
  metadata_filtering: true
  multi_tenancy: true
  managed_embeddings: true
  mcp_server: true
  serverless: true
compliance: [soc2, gdpr]
best_for: "AI-native developer experience — the fastest path from `pip install` to a working RAG prototype, with a managed cloud when you're ready"
limitations: "Younger than Pinecone or Weaviate at scale; fewer index tuning knobs (HNSW only); compliance certifications are still maturing"
verified_by: editorial
last_verified: 2026-06-10
source_urls:
  docs: https://docs.trychroma.com
  pricing: https://www.trychroma.com/pricing
  changelog: https://github.com/chroma-core/chroma/releases
---

# Chroma

Chroma is the developer-first open-source vector database. Its API is intentionally minimal — `collection.add(documents=...)` handles embedding, indexing, and storage in one call — which makes it the fastest path from idea to a working RAG prototype.

For agents, Chroma's appeal is the same code path running on a laptop, a single server, or the managed Chroma Cloud. The same Python or JavaScript client talks to all three. Built-in embedding functions cover OpenAI, Cohere, Voyage, Hugging Face, and local SentenceTransformers, so you don't wire up a separate embeddings service for prototypes.

Chroma Cloud introduces serverless billing with separated storage and compute, plus a first-party MCP server that exposes collection and document operations as agent tools. Tenant and database scoping provides multi-tenant isolation without running multiple clusters.

The tradeoffs are scale and tunability. Chroma uses HNSW only — no IVF, PQ, or DiskANN — and is younger at billion-vector scale than Milvus or Pinecone. For prototypes, internal tools, and small-to-medium production RAG, those limits rarely bite; for very large or latency-critical workloads, look at Qdrant or Milvus.

**Agent-specific features:**
- One-line ingest with built-in embedding functions across major providers
- Tenant and database scoping for multi-tenant agent apps
- Official MCP server exposing collections and documents as agent tools
- Chroma Cloud serverless with usage-based billing
- Identical local and cloud APIs — no rewrite when graduating from prototype
