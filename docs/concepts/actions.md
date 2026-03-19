---
sidebar_position: 3
title: Add & Remove Discord Roles Automatically
description: RoleLogic actions automatically add or remove Discord roles when conditions match. Combine actions for complex role transitions and upgrades.
keywords:
  - add Discord roles automatically
  - remove Discord roles bot
  - RoleLogic actions
  - automatic role assignment Discord
  - role removal automation
  - Discord role transitions
  - combined role actions
image: /img/social-preview.png
---

# Actions (Add & Remove Roles)

Actions are the "THEN" part of your rules. They define what happens when a condition matches.

## Action Types

### Add Roles

Give members one or more roles.

**Example:**

> IF has "Server Booster" → add "VIP", "Booster Perks"

**Behavior:**

- Roles the member already has = no change
- Roles they don't have = added

### Remove Roles

Take away one or more roles.

**Example:**

> IF has "Verified" → remove "Unverified", "New Member"

**Behavior:**

- Roles the member has = removed
- Roles they don't have = no change

## Combining Actions

Click "Add Combined Action" to add AND remove in one rule.

**Example:**

> IF has "Promoted" → add "Staff" AND remove "Trainee", "Helper"

This handles the complete transition in one rule.

## When to Use Each

### Add Roles

- Granting rewards for achievements
- Unlocking access based on qualifications
- Onboarding new members

### Remove Roles

- Cleaning up temporary roles
- Enforcing mutual exclusivity
- Removing access when conditions change

### Combined (Add + Remove)

- Role upgrades (add new, remove old)
- Staff promotions
- Tier transitions

## Examples

| Scenario          | Condition                                  | Action                             |
| ----------------- | ------------------------------------------ | ---------------------------------- |
| Reward system     | Has some of [Achievement-1, Achievement-2] | Add [Achiever Badge]               |
| Role cleanup      | Has some of [Verified]                     | Remove [Guest, Unverified]         |
| Tier upgrade      | Has all of [Gold, Loyalty]                 | Add [Platinum] AND Remove [Gold]   |
| Access revocation | Has some of [Banned]                       | Remove [Member, VIP, All-Channels] |

## Action Behavior

**Idempotent:** Running the same action multiple times has the same result. Adding a role someone already has = no change.

**Real-time:** Changes happen within seconds of the condition matching.

**Cascading:** Actions can trigger other rules. RoleLogic processes all triggered rules automatically.

## Important Notes

### Role Hierarchy

RoleLogic can only manage roles **below** its position in your server's role list.

**[Learn about role hierarchy →](./role-hierarchy)**

### Cross-Server Roles

You can select roles from other servers where RoleLogic is present.

**[Learn about cross-server actions →](../features/cross-guild)**

## Troubleshooting

**Action not working?**

1. Check role hierarchy (RoleLogic above target role?)
2. Verify "Manage Roles" permission
3. Confirm condition matches
4. Check rule is enabled

**Unexpected results?**

- Review cascades (another rule interfering?)
- Check priority order
- Test in sandbox

---

## Related

- **[Role Hierarchy](./role-hierarchy)** — Permission requirements
- **[Cross-Server](../features/cross-guild)** — Manage roles across servers
- **[Testing Sandbox](../features/testing-sandbox)** — Test actions safely
- **[Webhooks & Logging](../features/webhooks-logging)** — Get notified when actions fire
- **[Common Scenarios](../guides/common-scenarios)** — 50+ example action configurations
