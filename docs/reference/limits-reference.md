---
sidebar_position: 3
title: RoleLogic Limits & Quotas - Technical Reference
description: Complete reference for RoleLogic system limits. Rules per server, conditions per rule, processing times, cascade limits, and quota management.
keywords:
  - RoleLogic limits
  - RoleLogic quota limits
  - rules per server limit
  - Discord bot rate limits
  - role automation constraints
  - cascade limit Discord
  - technical specifications
image: /img/social-preview.png
---

# Limits Reference

This page documents all limits and constraints in RoleLogic. Understanding these helps you plan your automation effectively and avoid unexpected issues.

## Quick Reference

Here's a summary of the most important limits:

| Category                  | Limit        | Value                  |
| ------------------------- | ------------ | ---------------------- |
| Rules per server (free)   | Default      | 2 rules                |
| Plugins per server (free) | Default      | 2 plugins              |
| Conditions per rule       | Maximum      | 10 (1 primary + 9 AND) |
| Actions per rule          | Maximum      | 2 (add + remove)       |
| Roles per action          | Maximum      | 250 roles              |
| Roles per condition       | Maximum      | 250 roles              |
| Cross-server syncs        | Default      | 5 linked servers       |
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

| Process                      | Timing                              |
| ---------------------------- | ----------------------------------- |
| Real-time processing         | Triggered instantly on role changes |
| Debounce delay               | 10 seconds                          |
| Scheduled sync interval      | Every 10 minutes                    |
| Rule activation after update | Within 1 hour                       |

**What these mean:**

- **Real-time processing**: When a member's roles change, RoleLogic evaluates rules immediately
- **Debounce delay**: Multiple rapid role changes are batched together (10 seconds) to prevent excessive processing
- **Scheduled sync**: A full server sync runs every 10 minutes, checking up to 1,000 members per interval to catch any missed changes. For larger servers, the sync will process members in batches across multiple intervals.
- **Rule activation**: New or updated rules are fully active within 1 hour of saving

---

## Quota Limits

Quotas determine how many rules, plugins, and features you can use per server. The same quota allocation increases both your rule limit and plugin limit.

### Free Plan

| Resource                | Limit                               |
| ----------------------- | ----------------------------------- |
| Rules per server        | 2 rules                             |
| Plugins per server      | 2 plugins                           |
| Cross-server role slots | 5 linked servers                    |
| Webhook watermark       | Included (shows RoleLogic branding) |
| All condition types     | ✅ Full access                      |
| All action types        | ✅ Full access                      |
| Testing sandbox         | ✅ Full access                      |
| Activity log            | ✅ Full access                      |

The free plan includes everything you need to get started. It's perfect for:

- Small servers testing RoleLogic
- Simple automation setups (verification, basic rewards)
- Servers with straightforward role hierarchies

### Premium Plans

Premium plans expand your capacity. The same quota applies to both rules and plugins:

| Resource            | Premium Benefit                                        |
| ------------------- | ------------------------------------------------------ |
| Rules per server    | +10 to +208 additional rules (varies by tier)          |
| Plugins per server  | +10 to +208 additional plugins (same quota as rules)   |
| Webhook watermark   | Removed for clean notifications                        |
| Priority support    | Faster response times                                  |

**Premium Tiers (total rules & plugins per server):**

- Tier 1: 12 rules + 12 plugins
- Tier 2: 38 rules + 38 plugins
- Tier 3: 76 rules + 76 plugins
- Tier 4: 132 rules + 132 plugins
- Tier 5: 210 rules + 210 plugins

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
- No messages are lost—just potentially delayed

---

## Server and Member Limits

### Servers Per Account

There's no strict limit on how many servers you can manage, but:

- Each server's rules consume quota separately
- Premium quota must be allocated to specific servers
- You can manage unlimited servers with the free tier (2 rules each)

### Members Per Server

RoleLogic is built to scale with any server size:

| Server Size                   | Expected Performance       |
| ----------------------------- | -------------------------- |
| Small (< 1,000 members)       | Instant processing         |
| Medium (1,000-10,000 members) | Near-instant processing    |
| Large (10,000-50,000 members) | Fast processing            |
| Very large (50,000+ members)  | Optimized batch processing |

For very large servers:

- Initial sync may take longer when first setting up
- Real-time processing remains fast for individual changes
- Batch operations (like rule changes affecting many members) are processed efficiently

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
| Linked server limit | 5 servers by default                                |

### @everyone Role

| Constraint     | Detail                                 |
| -------------- | -------------------------------------- |
| Presence       | Every member has @everyone             |
| Removability   | Cannot be removed (Discord constraint) |
| Testing impact | Always include in sandbox tests        |

---

## Safety Limits

RoleLogic includes automatic safety features to prevent runaway automation.

### Reverted Action Detection

If RoleLogic detects that its changes are being repeatedly undone (usually indicating a conflict with another bot or manual intervention), it will automatically stop the rule.

| Parameter        | Value                      |
| ---------------- | -------------------------- |
| Detection window | 1 hour                     |
| Action threshold | 100 reverted actions       |
| Result           | Rule automatically stopped |

**When this triggers:**

- The rule status changes to "Stopped"
- No further processing occurs for that rule
- You'll see a notification in your dashboard
- The Activity Log records the event

**To resolve:**

1. Identify what's conflicting (another bot, manual changes, etc.)
2. Fix the underlying conflict
3. Re-enable the rule from the dashboard

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
3. See "Role Condition Quota" and "Plugin Quota" showing current usage vs. limit

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

### What happens when I hit the rule or plugin limit?

You cannot create new rules or plugins until you free up quota. Options:

- Delete unused rules or plugins to make room
- Consolidate similar rules into one
- Upgrade to a premium plan for more quota

Existing rules and plugins continue working normally. Items beyond the quota are paused but not deleted.

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
