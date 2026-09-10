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
- Safe Apply events: rules held, confirmed, resumed; deployments started, paused, finished; undos
- Webhook/log configuration changes
- Server settings modifications
- Quota changes

The same page also carries **Role changes** — a per-member history of every role the bot added or removed (see below). Real-time notifications for individual members are still the job of [Webhook Logs](./webhooks-logging).

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

## Role Changes

Under the configuration log sits a second list: every role the bot added or removed, one line per member and role, with the rule condition behind it, where it came from (a member update, the scheduled sweep, a deployment, an integration, a cross-server rule, or an undo), and what happened (applied, already so, no permission, member left, failed, skipped).

- **Filter by member** — paste a member ID, or click one in the list, to answer "why did this person lose that role?" in one place.
- **Filter by outcome** — for example, only the changes Discord refused.
- **reverted by someone** marks a change a moderator or another bot has since undone.

History is kept for 30 days on Free servers and 90 days on Premium.

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
