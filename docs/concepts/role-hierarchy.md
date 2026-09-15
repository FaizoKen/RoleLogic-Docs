---
sidebar_position: 4
title: "Discord Role Hierarchy Explained: Bots, Mods & Fixes"
description: How Discord role hierarchy decides who can manage which roles, for bots and moderators alike, and how to fix "above my highest role" and "cannot manage this role".
image: /img/social-preview-og.png
---

# Discord Role Hierarchy

Discord ranks every role in a server by its position in **Server Settings → Roles**, and that order decides who can manage which roles. It applies to bots and moderators alike, and it is essential to understand for RoleLogic to work.

## The Basic Rule

**A bot can only manage roles that are BELOW its own highest role in the server's role list.**

Members follow the same rule: a moderator with the **Manage Roles** permission can only assign, remove, or edit roles below their own highest role. Only the server owner is exempt. This is a Discord security feature, not a RoleLogic limitation.

## Example

```
Admin          ← Cannot manage
Moderator      ← Cannot manage
RoleLogic      ← Bot's position
VIP            ← CAN manage
Member         ← CAN manage
Unverified     ← CAN manage
@everyone      ← CAN manage
```

## Setting Up RoleLogic's Position

1. In Discord, go to **Server Settings → Roles**
2. Find the **"RoleLogic"** role
3. Drag it **above** all roles you want it to manage
4. Save

**Example setup:**

```
Admin
Moderator
RoleLogic      ← Position here
VIP
Member
Unverified
@everyone
```

You don't need RoleLogic at the very top. Just above the roles it needs to manage.

## Moving a Role Above Another Role \{#reorder-roles}

The role list reads top to bottom: every role outranks the roles below it. To change the order:

1. Open **Server Settings → Roles**
2. Drag the role up or down the list
3. Save

You can only move roles that sit below your own highest role, and only to positions below it. To reorder roles higher than yours, ask the server owner or someone whose highest role is above them. `@everyone` always stays at the bottom.

For a bot, move the **bot's role** above the roles it should manage, or move those roles below it. Either way, what counts is the bot's highest role.

## "Above Your Highest Role" Errors \{#above-your-highest-role}

When a bot says it can't use a role because the role is **above my highest role**, it has hit Discord's hierarchy rule: the role is not below the bot's own highest role. Moderators run into the same wall when they try to give a member a role that ranks at or above their own. Discord only allows assigning roles below the assigner's highest role, so even that highest role itself can't be given to someone else.

- **For a bot:** drag the bot's role above the role it should assign ([how to reorder roles](#reorder-roles)). If RoleLogic put a rule on hold because of it, press **Resume** afterwards.
- **For a moderator:** ask the server owner, or someone whose highest role is above that role, to assign it for you or move your role higher.

Moderation follows the same ranking: a bot or member can only kick, ban, or change the nickname of members whose highest role is lower than their own.

## Administrator Does Not Override Role Position \{#administrator-does-not-override-role-position}

The **Administrator** permission grants every permission and bypasses channel permission overwrites, but it does not change where a role sits in the list. A bot or member with Administrator still can't assign, remove, or edit a role at or above their highest role, or kick or ban a member whose highest role is at or above theirs. Only the server owner ignores role position.

So giving a bot Administrator doesn't fix a hierarchy error; moving its role does. RoleLogic doesn't need Administrator: **Manage Roles** and the right position are enough for role automation.

## Roles Managed by an Integration \{#integration-managed-roles}

Some roles are controlled by Discord or by an integration rather than by your server's staff. No bot can assign them, however high its own role sits:

- **Bot roles** — the role Discord creates for a bot when you invite it, named after the bot. You can move it and edit its permissions, but it belongs to that bot alone and can't be given to anyone else.
- **Server Booster** — Discord adds and removes it as members start and stop boosting.
- **Linked Roles** — roles with connection requirements. Members claim them themselves once their connected accounts meet the requirements.
- **Other integration roles** — roles another integration creates and keeps in sync.

RoleLogic can still read these roles in a condition; only the roles it adds or removes must be manageable. For example, a rule can check **Server Booster** and add your own **VIP** role, as in [automatic booster role rewards](../guides/discord-booster-role-rewards). If an action targets one of these roles, point it at a role your server owns instead.

This is different from RoleLogic's own integrations, which assign an ordinary server role that you pick. Like any other target, that role only needs to sit below RoleLogic.

## The Manage Roles Permission

RoleLogic also needs the **"Manage Roles"** permission (requested during invite).

To verify:

1. Go to **Server Settings → Roles**
2. Click the **RoleLogic** role
3. Check that **"Manage Roles"** is enabled

## What Happens If Hierarchy Is Wrong

- The action fails for roles above RoleLogic
- Other roles in the same action may still work
- The refused change shows as **no permission** in the Activity Log's [Role changes](../features/activity-log#role-changes) history
- If Discord keeps refusing a role, RoleLogic puts every rule that changes it **on hold**, with the reason in the status bar; move RoleLogic above that role, then press **Resume**

## Common Setups

### VIP System

```
Admin
Moderator
RoleLogic
VIP Gold
VIP Silver
VIP Bronze
Member
```

RoleLogic manages all VIP tiers and Member.

### Limited Automation

```
Admin
Moderator
VIP
RoleLogic      ← Lower position
Member
Unverified
```

RoleLogic only manages Member and Unverified. Staff and VIP are protected.

### Full Automation

```
Owner
RoleLogic      ← High position
Admin
Moderator
VIP
Member
```

RoleLogic can manage almost everything (use carefully).

## Troubleshooting

### "Cannot manage this role"

The target role is above RoleLogic. Drag RoleLogic higher in server settings. If the role is [managed by an integration](#integration-managed-roles), no position fixes it; target a role your server owns instead.

### Rules work for some roles but not others

Check hierarchy for each role. Some may be manageable while others aren't.

### Nothing is working

1. Confirm "Manage Roles" permission is enabled
2. Confirm RoleLogic is above target roles
3. Check rules are enabled
4. Verify conditions actually match

If the hierarchy checks out and roles still don't change, work through the other causes in order with [Fix a Discord bot that is not assigning roles](https://rolelogic.faizo.net/discord-bot-not-assigning-roles), or use [Troubleshoot RoleLogic Rules](../guides/troubleshoot-discord-role-bot) for rule status, the sandbox, and deployments.

## Tips

- **Keep RoleLogic below Admin/Mod** — You rarely need to automate staff roles
- **Plan ahead** — Position RoleLogic before creating rules
- **New roles** — Remember to check hierarchy when adding new roles

---

## Related

- **[Quick Start](../quick-start)** — Initial setup
- **[Understanding Rules](./rules)** — Create effective rules
- **[Fix a Discord bot that is not assigning roles](https://rolelogic.faizo.net/discord-bot-not-assigning-roles)** — The causes that apply to any role bot, checked in order
- **[FAQ](../faq)** — Common questions
