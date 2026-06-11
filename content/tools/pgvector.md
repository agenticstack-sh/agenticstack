---
name: pgvector
slug: pgvector
category: vectordb
type: self-hosted
website: https://github.com/pgvector/pgvector
pricing: open-source
pricing_tiers:
  - "Free (open-source PostgreSQL extension)"
  - "Available on managed Postgres: Supabase, Neon, RDS, Cloud SQL, Crunchy Bridge"
open_source: true
self_hosted: true
sdk_languages: [python, javascript, typescript, go, java, ruby, rust, csharp, php]
frameworks: [langchain, llamaindex, vercel-ai, haystack]
agent_features:
  hybrid_search: true
  metadata_filtering: true
  multi_tenancy: false
  managed_embeddings: false
  mcp_server: false
  serverless: false
compliance: [soc2, hipaa, gdpr, pci-dss]
best_for: "Teams already running Postgres who want vector search without adding a new database — ACID, joins, and one operational story"
limitations: "Slower at scale than purpose-built engines; no native multi-tenancy primitives beyond schemas; hybrid search and serverless depend on the host platform (Supabase, Neon, etc.), not pgvector itself"
verified_by: editorial
last_verified: 2026-06-10
source_urls:
  docs: https://github.com/pgvector/pgvector#readme
  changelog: https://github.com/pgvector/pgvector/releases
  ecosystem: https://github.com/pgvector/pgvector#hosted-postgres
---

# pgvector

pgvector is a PostgreSQL extension that adds vector storage and similarity search to a database many teams already run. It supports `halfvec`, `bit`, and `sparsevec` types, HNSW and IVFFlat indexes, and L2 / inner-product / cosine / Hamming / Jaccard distances. Combined with `tsvector` for full-text search, you get hybrid retrieval inside a single SQL query — no second datastore to deploy, monitor, or back up.

For AI agents, pgvector's biggest argument is operational simplicity. ACID guarantees, joins against your existing relational data, point-in-time recovery, and per-row row-level security all come for free. You can scope a vector query to a tenant with a `WHERE tenant_id = $1` clause and let Postgres do what it has done for decades.

The honest tradeoffs are performance and feature surface. At tens of millions of vectors with high QPS, dedicated engines (Qdrant, Pinecone, Milvus) typically deliver lower p99 latency and higher recall per dollar. pgvector itself has no built-in embedding generation, no MCP server, and no native multi-tenancy beyond Postgres schemas — though host platforms (Supabase, Neon, Crunchy Bridge) layer some of these on top.

**Agent-specific features:**
- Hybrid retrieval via `tsvector` + vector in a single SQL query
- Row-level security for per-tenant or per-user isolation
- Joins against existing relational data — no dual-write or sync pipeline
- Available on every major managed Postgres (Supabase, Neon, RDS, Cloud SQL, Crunchy Bridge)
- Same backups, replication, and observability as the rest of your Postgres fleet
