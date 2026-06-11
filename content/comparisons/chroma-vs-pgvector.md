---
title: "Chroma vs pgvector"
slug: chroma-vs-pgvector
tools: [chroma, pgvector]
category: vectordb
last_verified: 2026-06-10
verdict: "Chroma when the agent is vector-first; pgvector when Postgres is already the source of truth."
---

Chroma is a dedicated AI-native vector database. pgvector is a PostgreSQL extension that grafts vector search onto a database many applications already run. They appeal to opposite instincts: minimize new infrastructure, or maximize developer ergonomics for the vector workload itself.

## Where Chroma wins

* **Built-in embedding functions.** Chroma can call OpenAI, Cohere, Voyage, or local SentenceTransformers at ingest and query time. pgvector stores vectors but generates none — embedding is the application's job.

* **First-party MCP server and AI-native client APIs.** Agents get a clean `collection.query()` tool surface with built-in embedding. pgvector exposes SQL; the MCP wrapper, chunking, and embedding pipeline all live in your app.

* **Same client from laptop to Chroma Cloud.** No DBA or migration work — just point the client at a different host.

## Where pgvector wins

* **One database, one backup, one auth story.** Embeddings live in the same Postgres instance as users, documents, and audit logs. ACID transactions span vector and relational writes.

* **Row-level security enforces multi-tenancy in the database.** Chroma scopes tenants in the application — a filter bug leaks data. With RLS, Postgres refuses the query.

* **Available on every managed Postgres.** Supabase, Neon, RDS, Cloud SQL, Crunchy Bridge. No new vendor relationship needed.

## The agentic difference

For an agent that already reads and writes Postgres data — fetching user state, writing audit logs, joining vectors against relational rows — pgvector keeps it all in one transactional boundary and one RLS-enforced security model. For an agent whose primary workload *is* vector retrieval and whose data has no relational neighbor, Chroma's AI-native ergonomics shorten the iteration loop and give you a managed MCP server without writing any wrapper code.

## When to pick which

* **Pick Chroma** when the agent is vector-first, you want built-in embeddings and a first-party MCP server, and you don't already run Postgres.

* **Pick pgvector** when you already run Postgres, want vector queries to join against relational data, and need RLS to enforce per-tenant isolation in the database.
