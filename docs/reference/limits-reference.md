---
sidebar_position: 3
title: RoleLogic Limits & Quotas - Technical Reference
description: Complete reference for RoleLogic system limits. Rules per server, conditions per rule, processing times, cascade limits, and quota management.
image: /img/social-preview-og.png
---

# Limits Reference

This page documents all limits and constraints in RoleLogic. Understanding these helps you plan your automation effectively and avoid unexpected issues.

## Quick Reference

Here's a summary of the most important limits:

| Category                  | Limit        | Value                  |
| ------------------------- | ------------ | ---------------------- |
| Rules per server (free)   | Default      | 2 rules                |
| Integrations per server (free) | Default  | 2 integrations         |
| Users per role link (free) | Synced      | 100 users (rest held)  |
| Conditions per rule       | Maximum      | 10 (1 primary + 9 AND) |
| Actions per rule          | Maximum      | 2 (add + remove)       |
| Roles per action          | Maximum      | 250 roles              |
| Roles per condition       | Maximum      | 250 roles              |
| Cross-server sync (free)  | Default      | 2 destination servers  |
| Cross-server sync (premium) | Default    | 10 destination servers |
| Cascade passes            | Safety limit | 100 passes             |

---

## Rule Limits

### Conditions Per Rule

| Limit                         | Value        |
| ----------------------------- | ------------ |
| Primary condition             | 1 (required) |
| Additional AND conditions     | Up to 9      |
| **Total conditions per rule** | **Up to 10** |

You can combine up to 10 conditions with AND logic in a single rule. This allows for precise targeting of specific member role combinations.

---

### Actions Per Rule

| Limit                           | Value        |
| ------------------------------- | ------------ |
| Primary action                  | 1 (required) |
| Additional combined actions     | Up to 1      |
| **Total action types per rule** | **Up to 2**  |

You can have one "Add Roles" action and one "Remove Roles" action in the same rule using the "Add Combined Action" feature.

---

### Roles Per Condition/Action

| Limit               | Value     |
| ------------------- | --------- |
| Roles per condition | Up to 250 |
| Roles per action    | Up to 250 |

You can select up to 250 roles in each condition or action. This is more than enough for virtually any server setup.

---

## Processing Limits

### Rule Evaluation Passes

| Limit                     | Value |
| ------------------------- | ----- |
| Maximum evaluation passes | 100   |

When rules cascade (one rule triggers another), RoleLogic continues processing until:

1. No more rules match, OR
2. 100 passes have been completed

This prevents infinite loops from misconfigured rules. If your rules require more than 100 passes, consider simplifying your rule structure.

---

### Processing Timing

| Process                      | Timing                                      |
| ---------------------------- | ------------------------------------------- |
| Event-driven processing      | Triggered automatically by role changes    |
| Debounce delay               | Free: ~10 sec · Premium: ~1.5 sec            |
| Scheduled sync interval      | Free: ~every 30 min · Premium: ~every 2 min |
| Rule activation after update | About 1 minute (held changes: when you confirm) |

**What these mean:**

- **Event-driven processing**: When a member's roles change, RoleLogic queues the member for evaluation automatically.
- **Debounce delay**: Multiple rapid role changes are batched for about 10 seconds on Free and 1.5 seconds on Premium to avoid redundant work.
- **Scheduled sync**: A background safety sweep re-checks the whole server to catch any changes missed in real time (e.g. during a restart or Discord outage). On **free** it runs about every 30 minutes; on **premium** about every 2 minutes, and each premium pass scans far more members per cycle. For large servers this means premium fully reconciles dramatically faster — a 100,000-member server catches up in roughly 10 minutes on premium versus about 10 hours on free. Both plans stay safely within Discord's rate limits.
- **Rule activation**: A saved change settles for about a minute before the bot acts on it, so a typo can still be fixed. Changes above the Safe Apply thresholds (below), or that the bot could not check at the time, are held until you confirm them.

---

## Quota Limits

Quotas determine how many rules and integrations you can use per server. The same quota allocation increases both limits.

### Free Plan

| Resource                | Limit                               |
| ----------------------- | ----------------------------------- |
| Rules per server        | 2 rules                             |
| Integrations per server | 2 integrations                      |
| Users per role link     | 100 synced per link (up to 10,000 stored and held) |
| Cross-server sync       | Up to 2 destination servers         |
| Webhook watermark       | Included (shows RoleLogic branding) |
| All condition types     | ✅ Full access                      |
| All action types        | ✅ Full access                      |
| Testing sandbox         | ✅ Full access                      |
| Activity log            | ✅ Full access                      |

**About held role-link users:** a free role link syncs its lowest 100 user IDs. If an integration qualifies more people than that, the extras are stored and held rather than dropped — the link keeps working for the 100 it syncs, and the held users receive their role automatically the moment you upgrade, with no re-upload and no action from the integration. Which users are held is decided by user ID, so the synced set does not rotate between syncs.

The free plan includes everything you need to get started. It's perfect for:

- Small servers testing RoleLogic
- Simple automation setups (verification, basic rewards)
- Servers with straightforward role hierarchies

### Premium Plans

Premium plans expand your capacity. The same quota applies to both rules and integrations:

| Resource             | Premium Benefit                                              |
| -------------------- | ------------------------------------------------------------ |
| Rules per server     | +10 to +208 additional rules (varies by tier)                |
| Integrations per server | +10 to +208 additional integrations (same quota as rules) |
| Users per role link  | Up to 30 million per link (vs. 100 on free) — any users held on free start syncing immediately |
| Cross-server sync    | Up to 10 destination servers per server (vs. 2 on free)      |
| Webhook watermark    | Removed for clean notifications                              |
| Priority support     | Faster response times                                        |

**Premium tiers (total rules and integrations per server):**

- Tier 1: 12 rules + 12 integrations
- Tier 2: 38 rules + 38 integrations
- Tier 3: 76 rules + 76 integrations
- Tier 4: 132 rules + 132 integrations
- Tier 5: 210 rules + 210 integrations

Check the Upgrade page in your dashboard for current pricing and options.

---

### Quota Allocation and Cooldowns

| Behavior              | Detail                           |
| --------------------- | -------------------------------- |
| Quota assignment      | Per-server allocation            |
| Reassignment cooldown | 7 days                           |
| Unused quota          | Can be reassigned after cooldown |

**About the cooldown:**
After assigning premium quota to a server, you must wait 7 days before reassigning it to a different server. This prevents abuse and ensures service stability.

---

## Webhook Limits

### Message Content

| Limit             | Value                             |
| ----------------- | --------------------------------- |
| Message length    | ~2,000 characters (Discord limit) |
| Embed description | ~4,096 characters (Discord limit) |
| Total embed size  | ~6,000 characters (Discord limit) |

### Webhook Delivery

Webhooks are subject to Discord's rate limits:

- High-frequency events may experience slight delays
- Messages are queued and sent in order
- Delivery can be delayed or fail during Discord/API outages; check the configured channel and logs before retrying

---

## Server and Member Limits

### Servers Per Account

RoleLogic does not add a separate account-wide server cap, but Discord account
and installation limits still apply:

- Each server's rules consume quota separately
- Premium quota must be allocated to specific servers
- Every eligible server retains its free base quota

### Members Per Server

For large servers:

- Initial sync may take longer when first setting up
- Individual changes use the event-driven path and the tier-specific debounce
- Batch operations (like rule changes affecting many members) are processed efficiently
- **Premium significantly shortens full-server reconcile time** — large servers are swept more frequently and with more members per pass, so a full catch-up that takes about 10 hours on free (100,000 members) completes in minutes on premium

---

## Technical Constraints

### Role Hierarchy

| Constraint       | Detail                            |
| ---------------- | --------------------------------- |
| Manageable roles | Only roles below RoleLogic's role |
| Bot's own role   | Cannot be modified by RoleLogic   |
| Roles above bot  | Cannot be assigned or removed     |

This is a Discord security constraint, not a RoleLogic limitation. [Learn how to configure role hierarchy →](../concepts/role-hierarchy)

### Cross-Server Requirements

| Requirement         | Detail                                              |
| ------------------- | --------------------------------------------------- |
| Bot presence        | RoleLogic must be in all involved servers           |
| Member presence     | Member must exist in both source and target servers |
| Permissions         | "Manage Roles" required in each server              |
| Linked server limit | 2 destination servers (free) / 10 (premium)         |

#### Cross-Server Sync Limit

The cross-server sync limit counts the **distinct destination servers** referenced by your enabled rules' action roles, not the number of rules or roles. One rule that touches 3 other servers consumes 3 of your slots; ten rules that all target the same server consume just 1.

| Tier                 | Distinct destination servers per server |
| -------------------- | --------------------------------------- |
| Free                 | 2                                      |
| Premium (any tier)   | 10                                     |

**When you try to save a rule that would push your server over the limit**, the API rejects the save with a clear message naming the limit and (if you're free) the premium ceiling. Existing rules are not modified.

**When you downgrade from premium to free**, no rules are deleted. RoleLogic walks your enabled rules in priority order and keeps the highest-priority ones whose destinations fit within the new limit; the rest are automatically paused alongside any over-quota rules. The dashboard shows them with a yellow "rule paused" banner explaining that the cross-server sync limit was exceeded. Editing or deleting the paused rules — or re-subscribing — restores them.

### @everyone Role

| Constraint     | Detail                                 |
| -------------- | -------------------------------------- |
| Presence       | Every member has @everyone             |
| Removability   | Cannot be removed (Discord constraint) |
| Testing impact | Always include in sandbox tests        |

---

## Safety Limits

RoleLogic includes automatic safety features to prevent runaway automation. See [Safe Apply](../concepts/rules#safe-apply) for how they fit together.

### Safe Apply Thresholds

Every save is estimated against the live member list before the bot acts. A change is held for a confirmation click when it crosses any of these.

| Gate                          | Threshold                                                               |
| ----------------------------- | ----------------------------------------------------------------------- |
| Removals per role             | 3% of members, never below 10 or above 100, × trust                     |
| Removals as a share of a role | 25% of the role's current holders (at least 10) — never scales          |
| Additions per role            | 20% of members, never below 25 or above 1,000, × trust                  |
| Privileged role granted       | Always held (Administrator, Manage Roles/Server/Channels, Ban, Kick, …) |
| Structural removal            | Always held (the rule removes roles and matches every member or has an else branch) |
| Cross-server change           | Always shown; judged against the removal and addition thresholds of the server the rule belongs to |

**Trust** starts at ×1 and rises ×1.5 for every deployment that stays clean for 72 hours, up to ×8. A safety stop, a paused staged rollout or an undo resets it to ×1. Each gate is checked per role, and a change is held when it reaches the threshold.

| Parameter                       | Free              | Premium           |
| ------------------------------- | ----------------- | ----------------- |
| Settle window before going live | ~60 seconds       | ~60 seconds       |
| Staged rollout (first slice)    | 2% of affected members, at least 25, staff first | same |
| Staged rollout hold             | 10 minutes        | 5 minutes         |
| Undo window after a deployment  | 24 hours          | 24 hours          |
| Role-change history kept        | 30 days           | 90 days           |

A staged rollout is used when a single role loses 4× the removal threshold or more, or when a privileged role is granted — and only when more than 25 members are affected.

### Reverted Action Detection

If RoleLogic's changes are being undone faster than normal (another bot, a moderator, or two rules fighting), it stops the server's rules and clears anything still queued.

| Parameter        | Value                                                                     |
| ---------------- | ------------------------------------------------------------------------- |
| Detection window | 20 minutes                                                                |
| Action threshold | 5% of the bot's own changes in the window, at least 10 and at most 20    |
| During a staged rollout | 10% of the first slice, at least 3 — pauses the deployment instead |
| Result           | Rules stopped; queued work discarded; trust reset                          |

**When this triggers:**

- The status banner turns red and names the safety stop
- No further processing occurs for that server
- The Activity Log records the event
- Roles already changed stay as they are — use **Undo changes** on the deployment if needed

**To resolve:**

1. Identify what's conflicting (another bot, manual changes, etc.)
2. Fix the underlying conflict
3. Press **Start Live** in the dashboard — the whole rule set is estimated again first

### Large Bursts After Going Live

Once a rule is live there is no cap on how many roles it may change: an event or seasonal role can move hundreds of members at once. Those changes are paced by your plan's processing speed (see [Processing Timing](#processing-timing)) and Discord's rate limits, never paused for their size. Setup mistakes are caught before a change runs instead — every save and every **Start** is estimated against the thresholds above, and a change the bot cannot estimate at that moment waits for your confirmation.

### Role Link Removal Gate

An integration that sends a member list shrinking by a quarter or more (at least 10 members), or emptying it, has the removal held until the server owner confirms it in the dashboard — or the link is marked as a trusted integration. See the [Role Link API](./role-link-api#large-removals-need-a-confirmation).

### Cascade Limit

| Limit          | Value                  |
| -------------- | ---------------------- |
| Maximum passes | 100                    |
| Purpose        | Prevent infinite loops |

If rules trigger each other in a chain, processing stops after 100 passes. This protects your server from accidental infinite loops.

---

## Activity Log Limits

| Limit                 | Value                                      |
| --------------------- | ------------------------------------------ |
| Log entries displayed | 50 entries per page                        |
| Log retention         | Indefinite (kept as long as server exists) |

---

## Checking Your Limits

### In the Dashboard

View your current usage:

1. Open your server's dashboard
2. Check the sidebar for quota information
3. Review the rule and integration quota usage shown in the dashboard

### On the Upgrade Page

View detailed quota information:

1. Go to the Upgrade section
2. See your current plan and quota
3. View all available upgrade options
4. Track cooldown periods for reassignment

---

## Planning Around Limits

### Optimizing Rule Count

Consolidate where possible to maximize your quota:

**Instead of 3 separate rules:**

```
Rule 1: If Booster → add VIP
Rule 2: If Premium → add VIP
Rule 3: If Supporter → add VIP
```

**Use 1 combined rule:**

```
Rule 1: If has some of [Booster, Premium, Supporter] → add VIP
```

More tips:

- Use "Has Some Roles" with multiple roles instead of multiple rules
- Use threshold conditions ("At Least N") to consolidate counting logic
- Let rules cascade for complex multi-step automation

### Managing Quota

- Delete unused or test rules promptly
- Review rules periodically and remove obsolete ones
- Consider upgrading if consistently at capacity
- Use the 7-day cooldown wisely when reallocating quota

### Handling Large Servers

For servers with many members:

- Initial rule setup may take time to process all members
- Real-time processing remains fast for individual changes
- Test rules thoroughly before enabling on high-population roles
- Consider rule priority to optimize processing order

---

## Frequently Asked Questions

### What happens when I hit the rule or integration limit?

You cannot create new rules or integrations until you free up quota. Options:

- Delete unused rules or integrations to make room
- Consolidate similar rules into one
- Upgrade to a premium plan for more quota

Existing rules and integrations continue working normally. Items beyond the quota are paused but not deleted.

### Can I request higher limits?

Premium plans offer expanded quotas for most users. For enterprise needs beyond the highest premium tier, contact support about custom plans.

### Why is there a 7-day cooldown on quota reassignment?

The cooldown prevents abuse and ensures service stability. It encourages thoughtful allocation rather than constant switching between servers.

### Are these limits permanent?

Limits may be adjusted over time as the service evolves. The dashboard always shows current limits, which supersede this documentation if different.

---

## Related

- **[Plans & Pricing](../plans)** — Upgrade options and quota details
- **[Best Practices](../guides/best-practices)** — Optimize within limits
- **[Role Hierarchy](../concepts/role-hierarchy)** — Configure permissions correctly
- **[FAQ](../faq)** — Common questions answered
