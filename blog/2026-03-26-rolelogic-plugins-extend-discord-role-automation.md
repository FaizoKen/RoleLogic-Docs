---
title: "RoleLogic Plugins: Extend Discord Role Automation Beyond Discord"
description: "Discover RoleLogic plugins that connect Discord roles to external platforms like YouTube, GitHub, Genshin Impact, and Top.gg. Automate role assignment based on real-world activity."
keywords:
  - RoleLogic plugins
  - Discord bot plugins
  - Discord role automation plugins
  - YouTube subscriber Discord role
  - GitHub contributor Discord role
  - Genshin Impact Discord role
  - Top.gg voter role Discord
  - Discord role link
  - external platform Discord roles
  - auto role based on activity
  - Discord role integration
  - extend Discord bot
authors: [rolelogic]
tags: [plugins, integrations, automation, guide]
image: /img/social-preview.png
---

# RoleLogic Plugins: Extend Discord Role Automation Beyond Discord

RoleLogic's IF-THEN rules handle role automation inside Discord. But what about roles based on activity **outside** Discord — YouTube subscriptions, GitHub contributions, game progress, or bot votes?

That's what **Role Link Plugins** solve.

<!-- truncate -->

## What Are Role Link Plugins?

Plugins extend RoleLogic by connecting Discord roles to external platforms. Instead of checking "does this member have Role X," plugins check things like:

- Is this member subscribed to your YouTube channel?
- Did this member contribute to your GitHub repository?
- What's this member's Adventure Rank in Genshin Impact?
- Did this member vote for your bot on Top.gg?

When the answer is yes, RoleLogic assigns the role automatically. When conditions change (unsubscribe, vote expires), the role is removed.

## Available Plugins

### YouTube Subscriber Role

**Category:** Utility | **Status:** Featured

Automatically assign a Discord role to members who subscribe to your YouTube channel. Members verify through Google OAuth, and the plugin periodically checks subscription status via the YouTube Data API.

**How it works:**
1. Connect the plugin to your YouTube channel
2. Choose which Discord role to assign
3. Members link their accounts via OAuth
4. Subscribers get the role — unsubscribers lose it

**Use cases:**
- Creator servers rewarding subscribers with exclusive channels
- Fan communities verifying real subscribers
- Content creator networks with subscriber-only perks

[Browse YouTube Subscriber Role →](/plugins/youtube-subscriber-role)

---

### GitHub Contributor Role

**Category:** Developer | **Status:** Featured

Assign Discord roles based on GitHub contribution activity. Track commits, pull requests, merged PRs, or issues on any public repository.

**How it works:**
1. Pick the GitHub repository to track
2. Set conditions (e.g., 5+ merged PRs)
3. Members link their GitHub and Discord accounts
4. Active contributors get the role automatically

**Use cases:**
- Open-source project servers recognizing contributors
- Developer communities with contribution-based tiers
- Hackathon servers tracking participation

[Browse GitHub Contributor Role →](/plugins/github-contributor-role)

---

### Genshin Player Role

**Category:** Games | **Status:** Featured

Assign Discord roles based on Genshin Impact player stats. Use Adventure Rank, World Level, Spiral Abyss progress, or other in-game data as conditions.

**How it works:**
1. Set up stat-based conditions (e.g., AR 55+)
2. Members link their Genshin UID
3. The plugin verifies stats and assigns roles
4. Roles update as players progress

**Use cases:**
- Gaming servers with rank-based channels
- Co-op servers requiring minimum World Level
- Achievement-based recognition systems

[Browse Genshin Player Role →](/plugins/genshin-player-role)

---

### Top.gg Voter Role

**Category:** Utility

Reward users who upvote your bot on Top.gg with a Discord role. Roles are granted instantly after voting and automatically removed when the vote expires (12 hours).

**How it works:**
1. Connect the plugin to your Top.gg bot listing
2. Choose the reward role
3. Users vote on Top.gg and instantly get the role
4. Role expires automatically after 12 hours

**Use cases:**
- Bot support servers rewarding voters
- Incentivizing Top.gg upvotes with exclusive access
- Time-limited perks for community supporters

[Browse Top.gg Voter Role →](/plugins/topgg-voter-role)

---

## Plugins + IF-THEN Rules = Full Automation

The real power comes from combining plugins with RoleLogic's existing IF-THEN rules.

**Example: YouTube Creator Server**

| Step | What Happens |
|------|-------------|
| Plugin | YouTube Subscriber Role → assigns "Subscriber" role |
| Rule 1 | IF has "Subscriber" AND "Server Booster" → add "Super Fan" |
| Rule 2 | IF has "Super Fan" → remove "Regular Member" |

The plugin handles the external check. Your rules handle the internal logic. Together, they create a fully automated system.

**Example: Open-Source Project Server**

| Step | What Happens |
|------|-------------|
| Plugin | GitHub Contributor Role → assigns "Contributor" role |
| Rule 1 | IF has "Contributor" → add "Dev Access" |
| Rule 2 | IF has "Dev Access" AND "Verified" → add "Core Team Candidate" |

## How Plugins Work Under the Hood

Plugins use RoleLogic's **Role Link API** — a REST API that lets external services manage role membership:

1. You install a plugin from the [Plugins page](/plugins)
2. The plugin connects to RoleLogic via a secure API token
3. The plugin monitors external activity (YouTube API, GitHub API, etc.)
4. When conditions are met, the plugin tells RoleLogic to add/remove the user
5. RoleLogic applies the role change in Discord

All of this happens automatically. No manual intervention needed.

**Want to build your own plugin?** Check the [Role Link API Reference](/reference/role-link-api) for the full technical specification.

## Getting Started with Plugins

1. **[Browse all plugins](/plugins)** — See what's available
2. **Pick a plugin** that fits your server
3. **Click "Use Plugin"** to configure it in your dashboard
4. **Link accounts** — Members verify through the plugin's OAuth flow
5. **Combine with rules** — Add IF-THEN rules for advanced automation

## What's Next?

We're actively expanding the plugin ecosystem. More integrations are coming — Twitch, Spotify, Steam, and more. If you have a plugin idea, let us know on the [support server](https://discord.gg/rolelogic).

---

**Ready to try plugins?** [Browse the Plugin Directory →](/plugins)

**New to RoleLogic?** [Get started in 5 minutes →](/quick-start)
