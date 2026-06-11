---
title: Setup Custom Domain
category: skills
tags: [cloudflare, dns, domain, setup]
summary: Configuring a custom domain to use Cloudflare's DNS and proxy services.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# Setup Custom Domain

Pointing a custom domain to Cloudflare.

## Steps

1. Add your domain in Cloudflare Dashboard
2. Cloudflare scans existing DNS records
3. Update your registrar's nameservers to Cloudflare's
4. Wait for propagation (up to 48 hours)
5. Once active (Status: Active), configure DNS records

## Nameservers

Cloudflare assigns two nameservers per domain (e.g., `ns1.cloudflare.com`, `ns2.cloudflare.com`). Update these at your domain registrar.

## Verification

- Dashboard shows domain status (Pending → Active)
- `dig example.com NS` shows Cloudflare nameservers
- DNSSEC must be disabled at the registrar before migration

## Related

- [[skills/configure-dns]] — Managing DNS records
- [[concepts/dns]] — DNS fundamentals
- [[concepts/ssl-tls]] — SSL certificate auto-provisioning
