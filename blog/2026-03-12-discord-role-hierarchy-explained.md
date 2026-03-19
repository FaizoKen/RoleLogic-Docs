---
title: "Discord Role Hierarchy Explained: Why It Matters for Bots"
description: "Understand how Discord role hierarchy works and why it's critical for bot role management. Learn how to set up roles correctly for RoleLogic and other bots."
keywords:
  - Discord role hierarchy
  - Discord role order
  - Discord role permissions
  - role hierarchy Discord bot
  - Discord roles setup
  - Discord server roles order
  - how Discord roles work
  - bot role position Discord
authors: [rolelogic]
tags: [guide, roles, discord, permissions]
image: /img/social-preview.png
---

# Discord Role Hierarchy Explained: Why It Matters for Bots

Role hierarchy is one of the most misunderstood concepts in Discord server management. If you've ever wondered why a bot "can't manage" a certain role, or why your role automation isn't working, the answer is almost always role hierarchy.

<!-- truncate -->

## What Is Role Hierarchy?

In Discord, roles are stacked in a vertical order. This order determines:

- **Which roles can manage which** — higher roles can manage lower ones
- **Which permissions take priority** — when permissions conflict, higher roles win
- **What bots can do** — bots can only manage roles below their own role

The role at the top of the list has the most power. The `@everyone` role is always at the bottom.

## How Role Hierarchy Affects Bots

Every Discord bot gets a role when invited to a server. This role determines what the bot can and cannot manage.

**The rule is simple:** A bot can only assign or remove roles that are **below** its own role in the hierarchy.

### Example

```
Server Owner
────────────
Admin           (position 5)
RoleLogic       (position 4)  ← Bot's role
Moderator       (position 3)  ✅ Can manage
Member          (position 2)  ✅ Can manage
Unverified      (position 1)  ✅ Can manage
@everyone       (position 0)  ❌ Cannot manage
────────────
```

In this setup, RoleLogic can manage Moderator, Member, and Unverified — but **cannot** manage Admin because Admin is above the bot's role.

## Setting Up Role Hierarchy for RoleLogic

To use [RoleLogic](/), you need to position its role correctly:

1. Go to **Server Settings** > **Roles**
2. Find the **RoleLogic** role
3. **Drag it above** all roles you want RoleLogic to manage
4. Click **Save Changes**

For a detailed walkthrough, see the [Role Hierarchy guide](/concepts/role-hierarchy) in our documentation.

## Common Mistakes

### Mistake 1: Bot Role Too Low

If RoleLogic's role is below the roles it needs to manage, it cannot assign or remove them. You'll see a "Cannot manage this role" error.

**Fix:** Move RoleLogic's role higher in the hierarchy.

### Mistake 2: Forgetting @everyone

The `@everyone` role cannot be assigned or removed by any bot. If you're trying to manage `@everyone` permissions, use channel-level permission overrides instead.

### Mistake 3: Multiple Bots Conflicting

If two bots try to manage the same role, they can conflict. For example, if Bot A adds a role and Bot B removes it, you'll see roles flickering.

**Fix:** Only assign one bot per role management task. See [FAQ: Does RoleLogic work with other bots?](/faq#does-rolelogic-work-with-other-bots)

## Role Hierarchy Best Practices

1. **Place bot roles high** — Give RoleLogic a role above all roles it needs to manage
2. **Don't give bots Administrator** — Use the minimum permissions needed (RoleLogic only needs "Manage Roles")
3. **Organize roles logically** — Group related roles together (staff, rewards, verification)
4. **Test after changes** — Use the [Testing Sandbox](/features/testing-sandbox) to verify rules still work after moving roles

## Further Reading

- [Role Hierarchy in RoleLogic](/concepts/role-hierarchy) — Complete reference
- [Quick Start Guide](/quick-start) — Set up RoleLogic in 5 minutes
- [Troubleshooting: "Cannot manage this role"](/faq#cannot-manage-this-role) — Common fix
