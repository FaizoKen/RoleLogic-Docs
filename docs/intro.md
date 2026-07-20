---
slug: /
sidebar_position: 1
title: RoleLogic Documentation - Setup & Reference
description: Set up RoleLogic rules, integrations, cross-server sync, permissions, testing, and troubleshooting with step-by-step Discord role automation docs.
image: /img/social-preview-og.png
---

import ProductCta from '@site/src/components/Seo/ProductCta';
import StructuredData from '@site/src/components/Seo/StructuredData';

# RoleLogic Documentation: Setup, Guides & Reference

<StructuredData data={{
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://rolelogic.faizo.net/#software',
  name: 'RoleLogic',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Discord',
  description: 'Discord bot for automatic role management with no-code IF-THEN rules.',
  url: 'https://rolelogic.faizo.net/',
  mainEntityOfPage: 'https://rolelogic.faizo.net/docs/',
  provider: {
    '@id': 'https://rolelogic.faizo.net/#organization',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free plan with 5 rules and 5 integrations per server',
    url: 'https://rolelogic.faizo.net/upgrade',
  },
  featureList: [
    'Visual IF-THEN rule builder',
    'Real-time role processing',
    'Testing sandbox',
    'Cross-server role management',
    'Activity history',
    'Webhook notifications',
  ],
}} />

**TL;DR:** RoleLogic is a free Discord bot that adds or removes roles based on the roles a member already has. Build no-code IF-THEN rules, test them safely, and keep them running automatically. The free plan includes 5 rules per server; paid plans support up to 213.

---

RoleLogic is a Discord bot that **automatically manages roles** for your server members. You create simple rules, and RoleLogic handles role assignments 24/7.

## How It Works

RoleLogic uses **IF-THEN rules** to automate role changes:

- **IF** a member has certain roles...
- **THEN** automatically add or remove other roles

**Example:** _"If someone has the Server Booster role, give them VIP."_

That's it. No coding, no complex setup—just simple rules that run automatically.

For a focused walkthrough, see [how to give a Discord role based on another
role](https://rolelogic.faizo.net/discord-conditional-roles).

## Quick Example

**Problem:** You want to remove the "Unverified" role when someone gets verified.

**Without RoleLogic:**

- Manually check for newly verified members
- Remember to remove their old role
- Repeat forever...

**With RoleLogic:**

- Create one rule: "If has Verified → remove Unverified"
- Done. RoleLogic handles it automatically.

## Key Features

| Feature                   | Description                               |
| ------------------------- | ----------------------------------------- |
| **Visual Rule Builder**   | Create rules by clicking—no coding needed |
| **Real-Time Processing**  | Role changes happen within seconds        |
| **Testing Sandbox**       | Test rules safely before going live       |
| **Cross-Server Support**  | Manage roles across multiple servers      |
| **Activity Logging**      | Track all changes with full audit trail   |
| **Webhook Notifications** | Get notified when roles change            |

## Free Plan Includes

RoleLogic is free to use with generous limits:

- **5 rules per server** — enough for most setups
- **All 9 condition types, add/remove actions, sandbox testing, and activity logs** — core rule-building tools are included
- **Cross-server sync to 2 distinct destination servers** — Premium expands this to 10
- **Testing sandbox** — test before going live
- **Full activity logging** — track all changes

Need more capacity? [Premium plans](./plans) offer up to 213 rules and integrations per server.

## Common Use Cases

| Use Case             | Example Rule                     |
| -------------------- | -------------------------------- |
| Verification cleanup | If Verified → remove Unverified  |
| Booster rewards      | If Server Booster → add VIP      |
| Tier upgrades        | If Gold → remove Silver, Bronze  |
| Staff management     | If Moderator → add Staff Access  |
| Access control       | If Muted → remove General Access |

See [Common Scenarios](./guides/common-scenarios) for 50+ ready-to-use configurations.

## Who Uses RoleLogic?

RoleLogic works for Discord servers of any size:

- **Small communities** (50-500 members)
- **Growing servers** (500-5,000 members)
- **Large communities** (5,000-50,000+ members)

Whether you need simple verification cleanup or complex multi-tier reward systems, RoleLogic scales to fit.

## Technical Specifications

| Specification            | Value                                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **Permissions Required** | Manage Roles only                                                                                              |
| **Condition Types**      | 9 types (Has Some, Has All, Lacks Some, Lacks All, Exactly N, At Least N, At Most N, More Than N, Less Than N) |
| **Conditions per Rule**  | Up to 10 (1 primary + 9 AND)                                                                                   |
| **Actions per Rule**     | Up to 2 (Add + Remove)                                                                                         |
| **Processing Speed**     | Event-driven; about 5s debounce on Free and 1.5s on Premium                                                     |
| **Background Sync**      | ~Every 10 min (free) / ~every 2 min (premium)                                                                  |
| **Cascade Limit**        | 100 passes (prevents infinite loops)                                                                           |
| **Cross-Server Sync**    | 2 destination servers (free) / 10 (premium)                                                                    |

## Get Started

Ready to automate your server? **[Add to Discord](https://api-rolelogic.faizo.net/api/discord/bot/invite)** to get started!

<ProductCta title="Build your first automatic role rule" />

1. **[Quick Start Guide](./quick-start)** — Set up your first rule in 5 minutes
2. **[Understanding Rules](./concepts/rules)** — Learn how rules work
3. **[Common Scenarios](./guides/common-scenarios)** — Copy ready-made configurations

---

## Need Help?

- **[FAQ](./faq)** — Common questions answered
- **[Support](./support)** — Get help from the community
