---
sidebar_position: 14
title: Role Automation for Community Discord Servers
description: "Automate role management for community Discord servers. Verification, member tiers, booster rewards, and staff management with RoleLogic."
keywords:
  - community Discord server roles
  - Discord community server setup
  - community role automation
  - Discord verification automation
  - community server role management
  - Discord member management
  - Discord booster rewards automation
  - community bot Discord
  - Discord server roles community
image: /img/social-preview.png
---

# Role Automation for Community Discord Servers

Community servers — whether for creators, brands, or interest groups — need smooth member onboarding, clear access levels, and reward systems. RoleLogic automates the repetitive parts so you can focus on building your community.

## Common Community Server Needs

### Member Onboarding Flow

The most common setup: automatically clean up verification roles.

```
New member joins → Gets "Unverified" (via Dyno/MEE6/Discord)
Member verifies  → Gets "Verified" (via verification bot)
RoleLogic         → Removes "Unverified" automatically
```

**RoleLogic rule:**

| Condition | Action |
|-----------|--------|
| Has "Verified" | Remove "Unverified" |

No more manual cleanup. No more members stuck with both roles.

### Member Tier System

Reward active and supportive members:

| Rule | Condition | Action |
|------|-----------|--------|
| Bronze to Silver | Has "Silver" | Remove "Bronze" |
| Silver to Gold | Has "Gold" | Remove "Silver", "Bronze" |
| Gold to Platinum | Has "Platinum" | Remove "Gold", "Silver", "Bronze" |

When a moderator promotes someone, all lower tiers are removed automatically.

### Server Booster Rewards

Recognize Nitro Boosters with automatic perks:

| Rule | Condition | Action |
|------|-----------|--------|
| Booster VIP | Has "Server Booster" | Add "VIP", "Booster Color" |
| Double supporter | Has All: "Server Booster", "Patron" | Add "Super Supporter" |

### Staff Role Management

Simplify staff onboarding:

| Rule | Condition | Action |
|------|-----------|--------|
| Mod tools | Has "Moderator" | Add "Staff Access", "Mod Tools Channel" |
| Admin access | Has "Admin" | Add "Staff Access", "Admin Panel", "Server Config" |
| Trial cleanup | Has "Moderator" | Remove "Trial Moderator" |

When someone is promoted from Trial Mod to Moderator, RoleLogic automatically removes the Trial Moderator role and adds all the necessary staff roles.

### Content Creator Access

For servers supporting content creators:

| Rule | Condition | Action |
|------|-----------|--------|
| Creator perks | Has "Verified Creator" | Add "Creator Channels", "Self Promo" |
| Partnered creator | Has All: "Verified Creator", "Partner" | Add "Partner Lounge" |

## Multi-Server Community Setup

If your community spans multiple Discord servers, use [cross-server rules](../features/cross-guild):

- **Main server:** Member gets "VIP" for supporting the community
- **RoleLogic:** Automatically adds "VIP Access" in your secondary/event server
- Members only need to earn recognition once

## Example: Complete Community Server Setup

### Rules (4 rules — fits Premium Starter plan)

1. **Verification:** Has "Verified" → Remove "Unverified"
2. **Booster rewards:** Has "Server Booster" → Add "VIP"
3. **Tier promotion:** Has "Gold" → Remove "Silver", "Bronze"
4. **Staff access:** Has "Moderator" → Add "Staff Access"

### Free Plan Setup (2 rules)

If you're on the free plan, pick the two most impactful rules:

1. **Verification cleanup** — saves the most manual work
2. **Booster rewards** — rewards your supporters automatically

## Best Practices

1. **Start simple** — Begin with verification cleanup, then add rules as needed
2. **Test everything** — Use the [testing sandbox](../features/testing-sandbox) before enabling rules
3. **Monitor changes** — Set up [webhook notifications](../features/webhooks-logging) in a staff channel
4. **Document your rules** — Keep a note of what each rule does and why
5. **Review the [activity log](../features/activity-log)** — Check for unexpected role changes weekly

## Get Started

1. [Add RoleLogic](https://api-rolelogic.faizo.net/api/discord/bot/invite) to your community server
2. Follow the [Quick Start Guide](../quick-start) — takes 5 minutes
3. Check [Common Scenarios](./common-scenarios) for more community templates
4. Read [Best Practices](./best-practices) for optimization tips
