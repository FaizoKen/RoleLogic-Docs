---
slug: /
sidebar_position: 1
title: Conditional Role Automation for Discord - Documentation
description: Automate Discord role management with RoleLogic. Free bot that uses simple IF-THEN rules to assign roles automatically. No coding required, set up in 5 minutes.
keywords:
  - RoleLogic
  - Discord role automation bot
  - free Discord bot
  - automatic role assignment Discord
  - Discord role management
  - auto role bot Discord
  - IF THEN Discord bot
  - role automation Discord server
  - Discord bot for roles
  - no-code Discord automation
  - Discord server role bot free
  - MEE6 alternative role bot
image: /img/social-preview.png
---

# What is RoleLogic?

**TL;DR:** RoleLogic is a free Discord bot that automates role management using IF-THEN rules. Free plan: 2 rules/server, all features. Premium: up to 210 rules. No coding required.

---

RoleLogic is a Discord bot that **automatically manages roles** for your server members. You create simple rules, and RoleLogic handles role assignments 24/7.

## How It Works

RoleLogic uses **IF-THEN rules** to automate role changes:

- **IF** a member has certain roles...
- **THEN** automatically add or remove other roles

**Example:** _"If someone has the Server Booster role, give them VIP."_

That's it. No coding, no complex setup—just simple rules that run automatically.

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
| **Role Link Plugins**     | Connect roles to YouTube, GitHub, and more|

## Free Plan Includes

RoleLogic is free to use with generous limits:

- **2 rules per server** — enough for most basic setups
- **All features unlocked** — no feature restrictions
- **5 cross-server links** — connect multiple servers
- **Testing sandbox** — test before going live
- **Full activity logging** — track all changes

Need more rules? [Premium plans](./plans) offer up to 210 rules per server.

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
| **Processing Speed**     | Real-time (within seconds)                                                                                     |
| **Background Sync**      | Every 10 minutes                                                                                               |
| **Cascade Limit**        | 100 passes (prevents infinite loops)                                                                           |
| **Cross-Server Links**   | 5 servers (free plan)                                                                                          |

## Get Started

Ready to automate your server? **[Add to Discord](https://api-rolelogic.faizo.net/api/discord/bot/invite)** to get started!

1. **[Quick Start Guide](./quick-start)** — Set up your first rule in 5 minutes
2. **[Understanding Rules](./concepts/rules)** — Learn how rules work
3. **[Common Scenarios](./guides/common-scenarios)** — Copy ready-made configurations

---

## Explore the Documentation

### Learn the Basics
- **[Understanding Rules](./concepts/rules)** — How IF-THEN rules work
- **[Condition Types](./concepts/conditions)** — All 9 condition types explained
- **[Actions](./concepts/actions)** — Add and remove roles automatically
- **[Role Hierarchy](./concepts/role-hierarchy)** — Why role position matters

### Features
- **[Visual Rule Builder](./features/rule-builder)** — Create rules by clicking, no coding
- **[Testing Sandbox](./features/testing-sandbox)** — Test rules before going live
- **[Cross-Server Management](./features/cross-guild)** — Manage roles across multiple servers
- **[Webhooks & Logging](./features/webhooks-logging)** — Get notified when roles change
- **[Activity Log](./features/activity-log)** — Track all changes

### Plugins
- **[Browse All Plugins](/plugins)** — Connect Discord roles to external platforms
- **[YouTube Subscriber Role](/plugins/youtube-subscriber-role)** — Roles for YouTube subscribers
- **[GitHub Contributor Role](/plugins/github-contributor-role)** — Roles for GitHub contributors
- **[Genshin Player Role](/plugins/genshin-player-role)** — Roles based on Genshin Impact stats
- **[Top.gg Voter Role](/plugins/topgg-voter-role)** — Temporary roles for bot voters

### Guides & Resources
- **[Common Scenarios](./guides/common-scenarios)** — 50+ ready-to-use configurations
- **[Best Practices](./guides/best-practices)** — Tips for optimal setup
- **[Gaming Servers](./guides/use-case-gaming-server)** — Role automation for gaming communities
- **[Community Servers](./guides/use-case-community-server)** — Automate community server roles

### Compare
- **[RoleLogic vs MEE6](./guides/comparison-mee6)** — Feature comparison
- **[RoleLogic vs Carl-bot](./guides/comparison-carlbot)** — When to use which
- **[RoleLogic vs Dyno](./guides/comparison-dyno)** — Auto-role differences

## Need Help?

- **[FAQ](./faq)** — Common questions answered
- **[Support](./support)** — Get help from the community
- **[Glossary](./glossary)** — Term definitions
- **[Plans & Pricing](./plans)** — Free and premium options
