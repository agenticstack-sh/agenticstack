---
name: AWS SES
slug: aws-ses
category: email
type: cloud
website: https://aws.amazon.com/ses
pricing: paid
pricing_tiers:
  - "$0.10/1k emails"
  - "Free within EC2 (62k/mo)"
  - "Dedicated IPs from $25/mo"
open_source: false
self_hosted: false
sdk_languages: [python, javascript, go, java, ruby, csharp, php]
frameworks: []
agent_features:
  transactional: true
  marketing: true
  inbound_parsing: true
  template_engine: false
  deliverability_tools: true
compliance: [soc2, hipaa, gdpr, pci-dss, iso27001]
best_for: "Cheapest option at scale for AWS-native stacks — pay-per-email pricing with no monthly minimums"
limitations: "Bare-bones developer experience; no built-in templates or analytics dashboard; setup requires DNS configuration and sending reputation warm-up; support requires AWS support plan"
verified_by: editorial
last_verified: 2026-04-28
source_urls:
  docs: https://docs.aws.amazon.com/ses
  pricing: https://aws.amazon.com/ses/pricing
---

# AWS SES

Amazon Simple Email Service (SES) is AWS's email sending service. Its main advantage is cost — at $0.10 per 1,000 emails with no monthly minimum, it's the cheapest option at volume. If you're already running on AWS, SES is free for up to 62,000 emails per month from EC2.

The tradeoff is developer experience. SES is a low-level service — there's no built-in template editor, no analytics dashboard, and setup involves DNS verification and IP warm-up. For agent developers on AWS who just need to send email cheaply, it works. For anything more, consider wrapping it with a service like Resend.
