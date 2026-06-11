---
title: Configure DNS Records
category: skills
tags: [cloudflare, dns, setup]
summary: Step-by-step guide for managing DNS records in the Cloudflare dashboard and API.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# Configure DNS Records

Managing DNS records in Cloudflare via dashboard or API.

## Via Dashboard

1. Log in to Cloudflare Dashboard
2. Select the domain
3. Navigate to **DNS > Records**
4. Click **Add Record**
5. Choose record type, enter name and value
6. Toggle proxy status (orange cloud = proxied, grey cloud = DNS only)
7. Click **Save**

## Via API

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "A",
    "name": "example.com",
    "content": "192.0.2.1",
    "ttl": 120,
    "proxied": true
  }'
```

## Best Practices

- Use proxied (orange cloud) for web traffic to enable security features
- Keep TTL at Auto (120) for proxied records
- Set longer TTLs for records that change infrequently
- Use CNAME flattening for root domain CNAME support

## Related

- [[concepts/dns]] — DNS fundamentals
- [[skills/setup-custom-domain]] — Custom domain setup
