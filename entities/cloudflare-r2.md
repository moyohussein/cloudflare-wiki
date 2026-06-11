---
title: Cloudflare R2
category: entities
tags: [cloudflare, storage, s3-compatible, object-storage]
summary: R2 is Cloudflare's S3-compatible object storage with zero egress fees.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# Cloudflare R2

R2 provides object storage compatible with the S3 API, with the key differentiator of **zero egress fees** — data transfer out is free. 

## Key Features

- S3-compatible API — migrate from AWS S3 with minimal changes
- **Zero egress fees** — No charge for reading data out
- Global replication across Cloudflare's network
- **Cache Reserve** — Long-term CDN caching backed by R2
- Integration with Workers for data processing pipelines
- Public buckets with custom domains

## Pricing

- **Free plan** — 10 GB storage, 1M read/month, 1M write/month
- Storage: $0.015/GB/month
- Class A operations (writes): $4.50/million
- Class B operations (reads): $0.36/million

## Related

- [[entities/cloudflare]] — Platform overview
- [[entities/cloudflare-workers]] — Data processing at the edge
- [[concepts/cdn]] — Performance delivery
