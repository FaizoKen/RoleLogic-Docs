---
sidebar_position: 5
title: Activity Log - Track RoleLogic Configuration Changes
description: Full audit trail for RoleLogic. See who created, modified, or deleted rules. Track configuration changes with timestamps for accountability.
image: /img/social-preview-og.png
---

# Activity Log

The Activity Log tracks every change to your RoleLogic configuration. It's your audit trail for who changed what and when.

## What It Tracks

- Rule creation, updates, deletions
- Webhook/log configuration changes
- Server settings modifications
- Quota changes

**Note:** This tracks _configuration_ changes, not role changes to members (that's [Webhook Logs](./webhooks-logging)).

## Why Use It?

### Accountability

"Who disabled this rule?" — Check the log.

### Troubleshooting

"When did this start behaving differently?" — Find recent changes.

### Compliance

Complete audit trail for server governance.

## Reading Log Entries

Each entry shows:

| Field         | Description                                |
| ------------- | ------------------------------------------ |
| **Timestamp** | When it happened                           |
| **User**      | Who made the change                        |
| **Action**    | Create, Update, Delete, Pause, Start, Stop |
| **Entity**    | Rule, Log, Quota, Guild                    |
| **Details**   | What specifically changed                  |

## Action Types

| Action | Meaning                  |
| ------ | ------------------------ |
| Create | New item added           |
| Update | Existing item modified   |
| Delete | Item removed             |
| Pause  | Rule temporarily stopped |
| Start  | Rule enabled/resumed     |
| Stop   | Rule disabled            |

## Filtering

Filter by:

- **Action type:** Only creates, only updates, etc.
- **Entity type:** Only rules, only logs, etc.
- **Combined:** "Update" + "Rule" = all rule modifications

## Activity Log Channel

Send configuration changes to a Discord channel:

1. Go to server settings in dashboard
2. Find **Activity Log Channel**
3. Select a channel
4. Enable

Now configuration changes post to Discord automatically.

**Best practice:** Use a staff-only channel.

## Use Cases

### Investigate Unexpected Behavior

1. Filter to "Update" + "Rule"
2. Look for recent changes
3. Identify what was modified

### Security Monitoring

- Review regularly
- Verify changes by authorized users
- Investigate unexpected entries

### Restore Previous Config

1. Find entry in log
2. Note previous configuration
3. Manually restore old settings

## Tips

- **Regular reviews:** Weekly for active servers
- **Descriptive rule names:** Makes log entries meaningful
- **Investigate anomalies:** If you see unexpected changes, ask who/why

## Activity Log vs. Webhook Logs

|            | Activity Log                 | Webhook Logs              |
| ---------- | ---------------------------- | ------------------------- |
| **Tracks** | Configuration changes        | Role changes to members   |
| **Who**    | Admins modifying RoleLogic   | Members affected by rules |
| **Where**  | Dashboard + optional channel | Discord channel           |

---

## Related

- **[Webhooks & Notifications](./webhooks-logging)** — Track role changes to members
- **[Best Practices](../guides/best-practices)** — Maintain well-documented setup
- **[FAQ](../faq)** — Troubleshooting help
