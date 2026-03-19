---
title: "How to Auto-Assign Roles in Discord: Complete Guide"
description: "Learn how to automatically assign roles in Discord using RoleLogic. Step-by-step guide for setting up auto role assignment with IF-THEN rules. No coding required."
keywords:
  - auto assign roles Discord
  - Discord auto role
  - automatic role assignment Discord
  - Discord role bot
  - auto role bot Discord
  - Discord server roles automatic
  - assign roles automatically Discord
  - RoleLogic auto role
authors: [rolelogic]
tags: [tutorial, roles, automation, getting-started]
image: /img/social-preview.png
---

# How to Auto-Assign Roles in Discord: Complete Guide

Managing roles manually in a Discord server is tedious. Every time someone joins, gets verified, or earns a rank, you have to manually update their roles. This guide shows you how to automate all of it.

<!-- truncate -->

## Why Auto-Assign Roles?

If you run a Discord server, you've probably dealt with these scenarios:

- New members need a default role but you have to assign it manually
- Verified members still have the "Unverified" role because nobody removed it
- Server Boosters deserve a VIP role but you keep forgetting to add it
- Staff members need multiple roles and you have to add each one separately

**Auto-assigning roles eliminates all of this.** You set up rules once, and they run 24/7.

## Method: Using RoleLogic (IF-THEN Rules)

[RoleLogic](/) is a free Discord bot designed specifically for role automation. It uses simple IF-THEN rules that anyone can understand.

### Step 1: Invite RoleLogic

[Add RoleLogic to your server](https://api-rolelogic.faizo.net/api/discord/bot/invite) — it only needs the "Manage Roles" permission. No message access, no DM access.

### Step 2: Set Up Role Hierarchy

This is the most important step. In your Discord Server Settings > Roles:

1. Find the **RoleLogic** role
2. Drag it **above** all roles you want it to manage
3. Save changes

Without this, RoleLogic cannot assign or remove roles. Learn more about [role hierarchy](/concepts/role-hierarchy).

### Step 3: Create Your First Rule

Open the [RoleLogic Dashboard](https://rolelogic.faizo.net) and select your server.

**Example: Auto-remove "Unverified" when someone gets "Verified"**

1. Click **Add New Rule**
2. Set the condition: **Has Some Roles** > select **Verified**
3. Set the action: **Remove Roles** > select **Unverified**
4. Save the rule

That's it. Now whenever someone receives the "Verified" role, RoleLogic automatically removes "Unverified."

### Step 4: Test Before Going Live

Use the [Testing Sandbox](/features/testing-sandbox) to simulate role combinations and verify your rule works as expected.

## Common Auto-Role Configurations

Here are the most popular setups:

### Verification Cleanup

| Condition | Action |
|-----------|--------|
| Has "Verified" | Remove "Unverified" |

### Server Booster Rewards

| Condition | Action |
|-----------|--------|
| Has "Server Booster" | Add "VIP", "Color Role" |

### Tier-Based Upgrades

| Condition | Action |
|-----------|--------|
| Has "Gold" | Remove "Silver", "Bronze" |
| Has "Silver" | Remove "Bronze" |

### Staff Access

| Condition | Action |
|-----------|--------|
| Has "Moderator" | Add "Staff Access", "Mod Tools" |

For 50+ more examples, see the [Common Scenarios Guide](/guides/common-scenarios).

## RoleLogic's 9 Condition Types

RoleLogic isn't limited to simple "has role" checks. It supports [9 condition types](/concepts/conditions):

- **Has Some Roles** — member has ANY of the selected roles
- **Has All Roles** — member has EVERY selected role
- **Lacks Some Roles** — member is missing any selected role
- **Lacks All Roles** — member has none of the selected roles
- **Exactly N** — member has exactly N of the selected roles
- **At Least N / At Most N / More Than N / Less Than N** — threshold-based conditions

These allow complex automations like "If a member has at least 3 out of these 5 achievement roles, give them the Completionist role."

## Free vs Premium

RoleLogic is **free to use**:

- **Free plan:** 2 rules per server, all features included
- **Premium:** Up to 210 rules per server

Most small to medium servers work perfectly with the free plan. See [Plans & Pricing](/plans) for details.

## Troubleshooting

If your auto-role rules aren't working:

1. **Check role hierarchy** — RoleLogic's role must be above managed roles
2. **Verify the rule is enabled** — Check the toggle in the dashboard
3. **Test in the sandbox** — Simulate the exact role combination
4. **Check for conflicts** — Other bots managing the same roles can cause issues

For more help, see the [FAQ & Troubleshooting](/faq) page.

## Next Steps

- [Quick Start Guide](/quick-start) — Full setup walkthrough
- [Understanding Rules](/concepts/rules) — How IF-THEN rules work
- [Common Scenarios](/guides/common-scenarios) — 50+ ready-to-use configurations
- [Best Practices](/guides/best-practices) — Tips for optimal setup
