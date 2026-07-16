---
sidebar_position: 3
title: Discord Webhook Notifications for Role Changes
description: Get Discord notifications when roles change. Set up RoleLogic webhooks with custom messages using dynamic placeholders for complete audit trails.
keywords:
  - Discord webhook notifications
  - role change logging Discord
  - RoleLogic webhooks setup
  - Discord audit trail
  - role notification bot
  - webhook placeholders Discord
  - activity notifications roles
image: /img/social-preview.png
---

# Webhooks & Notifications

RoleLogic can send notifications to Discord channels when roles change. Keep your team informed with an automatic audit trail.

## Setting Up Webhooks

### Step 1: Grant Permission

RoleLogic needs **"Manage Webhooks"** in the target channel.

1. Go to channel settings in Discord
2. Open **Permissions**
3. Add RoleLogic and enable **"Manage Webhooks"**

### Step 2: Create Webhook Log

1. In dashboard, go to **Logs** or **Webhooks** section
2. Click **"Create New Log"**
3. Select target channel
4. Configure message content
5. Save

### Step 3: Attach to Rules

1. Open a rule in the editor
2. Find the "Log" or "Webhook" option
3. Select your configured log
4. Save the rule

## Using Placeholders

Placeholders add dynamic information to messages.

```
{user.mention} received: {roles.added.names}
```

Becomes:

```
@JohnDoe received: VIP, Premium
```

### Common Placeholders

| Placeholder             | Output            |
| ----------------------- | ----------------- |
| `{user.mention}`        | @JohnDoe          |
| `{user.tag}`            | JohnDoe#1234      |
| `{roles.added.names}`   | VIP, Premium      |
| `{roles.removed.names}` | Guest, Trial      |
| `{server.name}`         | My Server         |
| `{timestamp}`           | Discord timestamp |
| `{timestamp:r}`         | "5 minutes ago"   |

See [Placeholders Reference](../reference/placeholders-reference) for the full list.

## Example Messages

### Simple Notification

```
🔔 {user.mention} received: {roles.added.names}
```

### Detailed Log

```
**Member:** {user.tag}
**Added:** {roles.added.names}
**Removed:** {roles.removed.names}
**Time:** {timestamp}
```

## Customization

- **Webhook name:** Custom sender name (default: "RoleLogic")
- **Avatar URL:** Custom avatar image
- **Accent color:** Color for embed messages

## Premium Features

- **No watermark:** Clean notifications without branding
- **Advanced components:** Enhanced message formatting

## Tips

- **Don't over-log:** Too many notifications = noise
- **Meaningful messages:** Include who, what, when
- **Protect channels:** Use private staff channels for sensitive logs
- **Review periodically:** Check logs to verify rules work

## Troubleshooting

**Messages not appearing?**

1. Check "Manage Webhooks" permission
2. Verify log is attached to an enabled rule
3. Confirm rule is actually triggering

**Placeholders showing raw?**

- Check for typos
- Use correct format: `{placeholder.name}`

---

## Related

- **[Placeholders Reference](../reference/placeholders-reference)** — Complete list
- **[Activity Log](./activity-log)** — Track configuration changes
- **[Best Practices](../guides/best-practices)** — Logging tips
- **[DWEEB](https://dweeb.faizo.net)** — Our free visual builder for standalone Discord webhook messages (announcements, welcome posts, interactive panels). RoleLogic Premium from Tier 2 also unlocks [DWEEB Premium](../plans#dweeb-premium-included)
