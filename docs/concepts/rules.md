---
sidebar_position: 1
title: Configure IF-THEN Rules in RoleLogic
description: Learn the RoleLogic rule model, including IF conditions, THEN actions, priority order, cascading, event timing, background sync, and rule lifecycle.
image: /img/social-preview-og.png
---

# Understanding Rules

A **rule** is an automated instruction that tells RoleLogic what to do when certain conditions are met.

## Basic Concept

Every rule has two parts:

1. **IF** (condition): When should this happen?
2. **THEN** (action): What should happen?

**Example:**

> **IF** a member has "Server Booster"
> **THEN** add "VIP"

Once active, RoleLogic automatically adds VIP to all boosters—current and future.

## Parts of a Rule

### Condition (IF)

Defines **which members** the rule applies to:

- **Condition type:** How to check roles (has some, has all, lacks some, etc.)
- **Roles to check:** Which roles to look for
- **Threshold:** For counting conditions (at least 3, exactly 2, etc.)

You can add up to 9 additional conditions with AND logic.

**[See all condition types →](./conditions)**

### Action (THEN)

Defines **what happens** when conditions are met:

- **Add roles:** Give members one or more roles
- **Remove roles:** Take away one or more roles

You can combine both in a single rule.

**[Learn about actions →](./actions)**

### Priority

Determines the **order** rules run:

- Priority **0** runs first
- Priority **1** runs second
- And so on...

Priority matters when rules depend on each other:

```
Rule A (priority 0): If has "Trial" → add "Member"
Rule B (priority 1): If has "Member" → remove "Trial"
```

Rule A runs first, then Rule B.

### Status

Rules can be:

| Status       | Meaning                        |
| ------------ | ------------------------------ |
| **Enabled**  | Active and processing          |
| **Disabled** | Saved but not running          |
| **Pending**  | Queued, waiting for first sync |
| **Stopped**  | Auto-stopped due to conflicts  |

## How Rules Process

### Trigger Events

Rules evaluate when:

- A member joins or leaves
- You or a moderator changes roles
- Another bot changes roles
- Discord changes roles (boosters)
- RoleLogic's own rules make changes

### Processing Flow

1. **Event occurs** (role change, member join, etc.)
2. **RoleLogic checks** all enabled rules in priority order
3. **Matching rules** execute their actions
4. **Cascade check**: If changes were made, rules are checked again
5. **Repeat** until no more rules match (max 100 passes)

### Cascading

One rule's action can trigger another rule:

1. Member gets "Level 10"
2. Rule A fires: "If Level 10 → add Premium"
3. Rule B fires: "If Premium → add VIP-Access"
4. No more rules match—done

This creates powerful automation chains.

### Background Sync

RoleLogic also runs a continuous background scan to catch changes missed by event-driven processing. It runs about every 10 minutes on Free servers and about every 2 minutes on Premium servers, with Premium also scanning large servers far faster per pass. Event-driven rule processing takes about 5 seconds on Free or 1.5 seconds on Premium; the sweep is a safety net.

## Creating a Rule

1. Click **"Add New Rule"** in your dashboard
2. **Set condition:** Choose type and select roles
3. **Set action:** Choose add or remove, select roles
4. **Add description:** Name your rule clearly
5. **Save:** Rule activates within 1 hour (or click Play for immediate)

## Combining Conditions

Add up to 9 additional conditions with AND:

> **IF** has "Verified" **AND** has "Level 5" **AND** lacks "Muted"
> **THEN** add "Trusted"

All conditions must be true.

## Combining Actions

Use "Add Combined Action" for add AND remove:

> **IF** has "Promoted"
> **THEN** add "Staff" **AND** remove "Trainee"

## Tips

- **Clear names:** "Remove Guest when Verified" not "Rule 7"
- **Start simple:** Test basic rules before complex chains
- **Use priority intentionally:** Think about which rules should run first
- **Test first:** Use the [sandbox](../features/testing-sandbox) before going live

---

## Next Steps

- **[Condition Types](./conditions)** — All 9 ways to match members
- **[Actions](./actions)** — Add and remove roles
- **[Testing Sandbox](../features/testing-sandbox)** — Test safely before going live
