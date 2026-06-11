---
title: Cloudflare KV
category: entities
tags: [cloudflare, storage, key-value, edge]
summary: Workers KV is a global, low-latency key-value store for read-heavy workloads at the edge.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# Cloudflare KV

Workers KV is a key-value data store replicated across Cloudflare's edge network. Optimized for high-read, low-write workloads.

## Key Features

- Global replication with read-after-write consistency
- Sub-50ms reads at the edge
- **Max value size** — 25 MB
- **Max key size** — 512 bytes
- TTL support for automatic expiration
- Direct access from Workers via binding
- REST API for external access

## Use Cases

- Configuration storage
- Feature flags
- Static asset serving
- Session state (best-effort)
- A/B test configurations

## Limitations

- Eventually consistent (not suitable for transactional data)
- Higher write latency (propagation across global network)

## Related

- [[entities/cloudflare-workers]] — Primary access pattern
- [[entities/cloudflare-d1]] — Relational alternative
- [[entities/cloudflare-r2]] — Object storage alternative
