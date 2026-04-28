---
name: Mailgun
slug: mailgun
category: email
type: cloud
website: https://www.mailgun.com
pricing: freemium
pricing_tiers:
  - "Free trial (100 emails/day)"
  - "$35/mo Foundation"
  - "$90/mo Scale"
  - "Custom Enterprise"
open_source: false
self_hosted: false
sdk_languages: [python, javascript, go, java, ruby, csharp, php]
frameworks: []
agent_features:
  transactional: true
  marketing: true
  inbound_parsing: true
  template_engine: true
  deliverability_tools: true
compliance: [soc2, gdpr]
best_for: "Email API with strong inbound email parsing — useful for agents that need to receive and process emails, not just send"
limitations: "Free tier is limited to a trial period; UI is less polished than competitors; owned by Sinch, product direction less predictable"
verified_by: editorial
last_verified: 2026-04-28
source_urls:
  docs: https://documentation.mailgun.com
  pricing: https://www.mailgun.com/pricing
---

# Mailgun

Mailgun (by Sinch) is an email API platform with a strong focus on deliverability and inbound email processing. The inbound parsing feature is a differentiator — it can receive emails, parse them, and forward structured data to a webhook.

For AI agents that need to process incoming emails (parsing customer requests, extracting data from email threads), Mailgun's inbound routing is a useful capability that most competitors don't offer natively.
