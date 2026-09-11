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

| Status       | Meaning                                                                 |
| ------------ | ----------------------------------------------------------------------- |
| **Enabled**  | Active and processing                                                   |
| **Disabled** | Saved but not running                                                   |
| **Pending**  | Queued, waiting for first sync                                          |
| **On hold**  | Saved, but withheld from the bot until you confirm it or fix a problem  |
| **Stopped**  | Auto-stopped because its changes were being undone (see [Safe Apply](#safe-apply)) |

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

RoleLogic also runs a continuous background scan to catch changes missed by event-driven processing. It runs about every 30 minutes on Free servers and about every 2 minutes on Premium servers, with Premium also scanning large servers far faster per pass. Event-driven rule processing takes about 10 seconds on Free or 1.5 seconds on Premium; the sweep is a safety net.

## Creating a Rule

1. Click **"Add New Rule"** in your dashboard
2. **Set condition:** Choose type and select roles
3. **Set action:** Choose add or remove, select roles
4. **Add description:** Name your rule clearly
5. **Save:** RoleLogic estimates how many members the rule would change. Ordinary rules go live about a minute later; a rule that would change many members at once waits for one confirmation click (see [Safe Apply](#safe-apply))

## Safe Apply

Most rule mistakes are small — a condition typed the wrong way round, a remove where an add was meant. What makes them expensive is scale: one wrong rule can touch thousands of members before anyone notices. Safe Apply is how RoleLogic keeps a wrong rule from becoming a wrong server.

### Estimate before apply

Every save is a dry run first. The bot works out, from the live member list, exactly which members would gain or lose which roles under the new rule set, and the dashboard tells you:

- how many members are affected, and how many role additions and removals that is;
- which roles, largest first, with the share of that role's holders it would touch;
- whether the change goes live on its own or needs your confirmation, and why.

There is nothing extra to run. The save message gives the number of members, and until an ordinary change goes live the status bar keeps its estimate beside the countdown. To see it before saving, use **Check impact** next to Save Changes in the rule editor.

Roles the rule changes in other servers are counted too, against each destination server's current members: a member counts only if they are in that server and would really gain or lose the role there. Those changes are part of the headline numbers, and below the role list there is one line per destination server (*Also in Lounge: +12 / −3*). If RoleLogic cannot read a destination server's members at that moment — its gateway budget for member lists is spent, or Discord does not answer in time — that server's numbers are an upper bound: the whole estimate is marked **Estimate** and *Things to double-check* names the server. If RoleLogic is not in the destination server, or the role there has been deleted, the dialog says so and those changes are not counted — it identifies the server by name, or by its id when RoleLogic is no longer a member. A role the bot cannot manage there is counted and flagged, since Discord will reject the change.

### Auto, or confirm

A change goes live by itself after a short settle window (about a minute — time to catch a typo) when it stays under the server's thresholds. It is put **on hold** and shown to you for a single informed click when it would:

- remove a role from about 3% of the server or more (at least 10 members, and at most 100 before trust widens it);
- remove a role from a quarter or more of the members who hold it (at least 10), here or in a destination server;
- add a role to a large share of the server;
- grant a role that carries moderation permissions;
- remove roles in a rule that matches every member or has an else branch — the classic sign of an inverted condition.

A held rule is saved and enabled, but the bot does not receive it. Nothing changes until you press **Apply** in the review dialog. If other role conditions changed after the numbers were shown, **Apply** checks again first: a change now under the thresholds goes ahead, and otherwise the dialog shows the current numbers for you to review. Servers with a history of clean deployments earn wider thresholds over time; a safety stop, a paused staged rollout or an undo resets them.

If the bot cannot estimate a change at that moment — while it restarts, for instance — the change is held the same way instead of going live unchecked. The review dialog says the impact could not be checked: test the rule first, or apply it if you are sure it is right.

### Applying in stages

The largest changes are applied to a small slice of members first — staff before everyone else — and then held for a few minutes. If moderators start undoing those first changes, RoleLogic pauses instead of continuing. You can also press **Continue now** to skip the wait, or **Stop** at any time. Roles the rule changes in other servers are part of the first slice and of the progress count, like the local ones.

### Undo

Every role the bot adds or removes is recorded. For 24 hours after a deployment finishes you can press **Undo changes** to put every role back — except roles that have changed again since (by a moderator, another bot or another rule), which are left alone. Roles the deployment changed in other servers are put back too. The rules that made the change are put on hold so they do not redo it.

### When a deployment stops early

A deployment that cannot finish says why in the status bar, in plain words: the role conditions changed between the check and the start, another deployment was still running, the member list could not be read from Discord, and so on. The bot's exact message is behind the info toggle. When nothing was applied, the role conditions are still live, and the background sync applies them at its normal pace — without the staged rollout or Undo. To run the deployment again with those, press **Pause Live** and then **Start Live**. Once you have read the row, you can dismiss it.

### When a rule is put on hold by the bot

Besides the impact gate, the bot itself holds a rule when it can no longer act on it safely:

- **Hierarchy** — the bot lost permission over a role the rule manages. Move the bot's role above it, then press **Resume**.
- **Role deleted** — a role the condition depends on is gone. Edit the rule, then resume.

The bot never holds a rule just for changing many members. Once a change has passed the checks above, large bursts — an event role handed to hundreds of members at once — run at your plan's normal pace.

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
