---
sidebar_position: 4
title: Discord Role Hierarchy - Bot Permissions Guide
description: Learn Discord role hierarchy for bots. Position RoleLogic correctly to manage roles. Fix "Cannot manage this role" errors step by step.
image: /img/social-preview-og.png
---

# Role Hierarchy

Discord has security rules about which roles can manage others. This is essential to understand for RoleLogic to work.

## The Basic Rule

**A bot can only manage roles that are BELOW its own role in the server's role list.**

This is a Discord security feature, not a RoleLogic limitation.

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

## The Manage Roles Permission

RoleLogic also needs the **"Manage Roles"** permission (requested during invite).

To verify:

1. Go to **Server Settings → Roles**
2. Click the **RoleLogic** role
3. Check that **"Manage Roles"** is enabled

## What Happens If Hierarchy Is Wrong

- The action fails for roles above RoleLogic
- Other roles in the same action may still work
- An error appears in your dashboard
- The rule continues processing other members

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

The target role is above RoleLogic. Drag RoleLogic higher in server settings.

### Rules work for some roles but not others

Check hierarchy for each role. Some may be manageable while others aren't.

### Nothing is working

1. Confirm "Manage Roles" permission is enabled
2. Confirm RoleLogic is above target roles
3. Check rules are enabled
4. Verify conditions actually match

## Tips

- **Keep RoleLogic below Admin/Mod** — You rarely need to automate staff roles
- **Plan ahead** — Position RoleLogic before creating rules
- **New roles** — Remember to check hierarchy when adding new roles

---

## Related

- **[Quick Start](../quick-start)** — Initial setup
- **[Understanding Rules](./rules)** — Create effective rules
- **[FAQ](../faq)** — Common questions
