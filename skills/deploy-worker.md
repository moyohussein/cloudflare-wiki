---
title: Deploy a Cloudflare Worker
category: skills
tags: [cloudflare, workers, deploy, serverless]
summary: How to create and deploy a Cloudflare Worker using wrangler CLI.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# Deploy a Cloudflare Worker

Deploying a Worker using Wrangler (Cloudflare's CLI tool).

## Prerequisites

- Node.js installed
- Cloudflare account
- Wrangler installed (`npm install -g wrangler`)

## Quick Start

```bash
# Authenticate
wrangler login

# Create a new Worker
npx wrangler init my-worker
cd my-worker

# Develop locally
npx wrangler dev

# Deploy
npx wrangler deploy
```

## Configuration (wrangler.toml)

```toml
name = "my-worker"
main = "src/index.ts"
compatibility_date = "2026-06-11"

[[d1_databases]]
binding = "DB"
database_name = "my-db"
database_id = "<db-id>"
```

## Related

- [[entities/cloudflare-workers]] — Workers platform
- [[concepts/edge-computing]] — Edge computing concepts
- [[entities/cloudflare-kv]] — KV storage binding
