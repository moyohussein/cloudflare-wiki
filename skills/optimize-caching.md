---
title: Optimize Caching
category: skills
tags: [cloudflare, caching, performance, cdn]
summary: Strategies for tuning Cloudflare cache behavior to maximize performance and reduce origin load.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# Optimize Caching

Configuring Cloudflare's cache for optimal performance.

## Cache Rules (Recommended)

Use Cache Rules (replacing Page Rules) for fine-grained control:

```json
{
  "description": "Cache static assets for 30 days",
  "expression": "http.request.uri.path contains \"/static/\"",
  "actions": {
    "cache_ttl": {
      "override_ttl": 2592000
    },
    "edge_ttl": {
      "override_ttl": 2592000
    }
  }
}
```

## Best Practices

- Set appropriate Cache-Control headers on your origin
- Leverage **Tiered Cache** to reduce origin requests
- Use **Cache Reserve** for long-tail content
- **Purge cache** selectively by URL, tag, or hostname
- Exclude dynamic content from caching

## Related

- [[concepts/cdn]] — CDN fundamentals
- [[entities/cloudflare]] — Platform overview
