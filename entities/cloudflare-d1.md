---
title: Cloudflare D1
category: entities
tags: [cloudflare, database, sql, serverless]
summary: D1 is Cloudflare's serverless SQL database built on SQLite, accessible via HTTP or Workers.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# Cloudflare D1

D1 is a serverless SQL database built on SQLite. It provides relational database capabilities integrated with the Workers ecosystem.

## Key Features

- SQLite-compatible — standard SQL queries
- Auto-scaling serverless — no provisioning
- Integrated with Workers via binding (zero-latency connection)
- **Time Travel** — Point-in-time recovery and branching
- Built-in replication for global reads
- HTTP API access for non-Workers clients

## Pricing

- **Free plan** — 5 GB storage, 5M reads/month, 100K writes/month
- Storage: $0.75/GB/month
- Reads: $0.001/million
- Writes: $1.00/million

## Related

- [[entities/cloudflare-workers]] — Primary query interface
- [[entities/cloudflare-kv]] — Key-value alternative
- [[concepts/edge-computing]] — Edge database concepts
