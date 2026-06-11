---
title: "Elasticsearch vs pgvector"
slug: elasticsearch-vs-pgvector
tools: [elasticsearch, pgvector]
category: vectordb
last_verified: 2026-06-10
verdict: "Elasticsearch for hybrid retrieval at scale; pgvector when the agent already lives inside Postgres."
---

Elasticsearch and pgvector both add vector search to platforms you might already run. Elasticsearch is a heavyweight search engine; pgvector is a small extension on Postgres. The decision is whether your operational data is search-shaped or relational.

## Where Elasticsearch wins

* **Hybrid retrieval is the default, not an add-on.** Dense + ELSER sparse + BM25 with reciprocal rank fusion in a single query. pgvector + `tsvector` can do hybrid search, but you build the fusion yourself.

* **`inference` API hosts embedding and reranker models in-cluster.** pgvector has no embedding pipeline of its own.

* **Built for vector workloads at hundreds of millions of vectors.** Postgres with pgvector starts to feel the heat in that range, especially with concurrent writes.

## Where pgvector wins

* **One database, one backup, one auth story.** Vectors next to your users, documents, and audit logs. ACID transactions span everything.

* **Row-level security enforces multi-tenancy in the database.** Elasticsearch isolates with document-level security or separate indices — both work, but neither matches Postgres RLS for declarative simplicity.

* **No new vendor or operational surface.** Postgres is already in most stacks. Elasticsearch adds JVM tuning, cluster ops, and a separate observability story.

## The agentic difference

For agents that already read and write Postgres data, pgvector keeps retrieval inside the same transactional and security boundary — RLS scopes vectors automatically, and joins enrich results without a second round trip. For agents whose retrieval quality depends on hybrid lexical+vector relevance across large or domain-heavy corpora, Elasticsearch's in-cluster inference and RRF deliver consistently better grounding than pgvector's hand-built hybrid.

## When to pick which

* **Pick Elasticsearch** when hybrid retrieval, in-cluster embeddings, or large-corpus scale are required.

* **Pick pgvector** when the agent already lives in a Postgres-backed app and you want vectors inside the same database, backup, and auth model.
