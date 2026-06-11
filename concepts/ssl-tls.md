---
title: SSL/TLS
category: concepts
tags: [cloudflare, ssl, tls, encryption, security]
summary: SSL/TLS encrypts traffic between clients and servers. Cloudflare provides flexible SSL modes for any deployment.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# SSL/TLS

SSL/TLS protocols encrypt data in transit. Cloudflare offers free SSL certificates and flexible encryption modes for any origin configuration.

## Key Ideas

- Cloudflare provides free shared SSL certificates for all domains
- **Universal SSL** — Auto-provisioned for all Cloudflare domains (free)
- **Custom SSL** — Upload your own certificate
- **SSL modes:** Flexible (client-to-Cloudflare only), Full (encrypted end-to-end), Full (strict with certificate validation)
- Automatic HTTPS rewrites prevent mixed content

## Related

- [[concepts/cdn]] — SSL termination at the edge
- [[entities/cloudflare]] — Platform overview
- [[skills/setup-custom-domain]] — Domain setup
