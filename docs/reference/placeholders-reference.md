---
sidebar_position: 2
title: Webhook Placeholders Reference - Dynamic Variables
description: Complete list of RoleLogic webhook placeholders. User mentions, role names, server info, timestamps, and channel variables with examples.
image: /img/social-preview-og.png
---

# Placeholders Reference

Placeholders allow you to include dynamic information in webhook messages. When a notification is sent, placeholders are replaced with actual values.

## How to Use Placeholders

Type placeholders in curly braces within your message content:

```
Hello, {user.mention}! You received: {roles.added.names}
```

**Output:**

```
Hello, @JohnDoe! You received: VIP, Premium
```

### Tips

- Placeholders are case-sensitive
- Invalid placeholders appear as-is (not replaced)
- Use the placeholder dropdown in the editor for suggestions

---

## User Placeholders

Information about the member whose roles changed.

| Placeholder         | Description                                  | Example Output                         |
| ------------------- | -------------------------------------------- | -------------------------------------- |
| `{user.mention}`    | @mentions the user                           | @JohnDoe                               |
| `{user.nickname}`   | Server nickname (or username if no nickname) | JohnDoe                                |
| `{user.tag}`        | Username with discriminator                  | JohnDoe#1234                           |
| `{user.id}`         | User's Discord ID                            | 123456789012345678                     |
| `{user.avatar_url}` | URL to user's avatar image                   | https://cdn.discordapp.com/avatars/... |

### Usage Examples

**Simple mention:**

```
{user.mention} just got updated!
```

**Detailed log:**

```
User: {user.tag}
ID: {user.id}
```

---

## Role Placeholders

Information about the roles that were added or removed.

| Placeholder                | Description                      | Example Output |
| -------------------------- | -------------------------------- | -------------- |
| `{roles.added.names}`      | Names of roles that were added   | VIP, Premium   |
| `{roles.added.mentions}`   | @mentions of added roles         | @VIP, @Premium |
| `{roles.removed.names}`    | Names of roles that were removed | Guest, Trial   |
| `{roles.removed.mentions}` | @mentions of removed roles       | @Guest, @Trial |

### Usage Examples

**Simple notification:**

```
Roles added: {roles.added.names}
Roles removed: {roles.removed.names}
```

**Mentioning roles:**

```
{user.mention} now has: {roles.added.mentions}
```

### Notes

- If no roles were added, `{roles.added.names}` may be empty
- If no roles were removed, `{roles.removed.names}` may be empty
- Multiple roles are separated by commas

---

## Server Placeholders

Information about the Discord server.

| Placeholder             | Description                | Example Output                         |
| ----------------------- | -------------------------- | -------------------------------------- |
| `{server.name}`         | Server name                | My Awesome Server                      |
| `{server.id}`           | Server's Discord ID        | 987654321098765432                     |
| `{server.member_count}` | Total number of members    | 1,234                                  |
| `{server.description}`  | Server description         | Welcome to our community!              |
| `{server.icon_url}`     | URL to server icon         | https://cdn.discordapp.com/icons/...   |
| `{server.banner_url}`   | URL to server banner       | https://cdn.discordapp.com/banners/... |
| `{server.vanity_url}`   | Custom invite URL (if set) | discord.gg/myserver                    |
| `{server.boost_count}`  | Number of server boosts    | 15                                     |
| `{server.boost_tier}`   | Server boost level (0-3)   | 2                                      |

### Usage Examples

**Server branding:**

```
Welcome to {server.name}!
```

**Statistics:**

```
Server: {server.name} ({server.member_count} members)
Boost Level: {server.boost_tier} ({server.boost_count} boosts)
```

### Notes

- `{server.description}` may be empty if not set
- `{server.vanity_url}` may be empty if no vanity URL
- `{server.banner_url}` may be empty if no banner

---

## Channel Placeholders

Information about the channel receiving the webhook.

| Placeholder               | Description               | Example Output                   |
| ------------------------- | ------------------------- | -------------------------------- |
| `{channel.name}`          | Channel name              | role-logs                        |
| `{channel.mention}`       | #mentions the channel     | #role-logs                       |
| `{channel.topic}`         | Channel topic/description | Log channel for role changes     |
| `{channel.url}`           | Direct link to channel    | https://discord.com/channels/... |
| `{channel.category.name}` | Parent category name      | Admin Channels                   |

### Usage Examples

**Channel reference:**

```
This log was sent to {channel.mention}
```

**Full context:**

```
Channel: {channel.name}
Category: {channel.category.name}
```

### Notes

- `{channel.topic}` may be empty if not set
- `{channel.category.name}` may be empty if channel has no category

---

## Bot Placeholders

Information about the RoleLogic bot.

| Placeholder        | Description                  | Example Output                         |
| ------------------ | ---------------------------- | -------------------------------------- |
| `{bot.nickname}`   | Bot's nickname in the server | RoleLogic                              |
| `{bot.mention}`    | @mentions the bot            | @RoleLogic                             |
| `{bot.avatar_url}` | URL to bot's avatar          | https://cdn.discordapp.com/avatars/... |

### Usage Examples

**Attribution:**

```
Automated by {bot.mention}
```

---

## Time and Date Placeholders

Timestamps and date information.

| Placeholder     | Description                             | Example Output   |
| --------------- | --------------------------------------- | ---------------- |
| `{time:short}`  | Short time format                       | 3:45 PM          |
| `{time:long}`   | Long time format                        | 3:45:30 PM       |
| `{date:short}`  | Short date format                       | 01/15/2024       |
| `{date:long}`   | Long date format                        | January 15, 2024 |
| `{timestamp}`   | Discord timestamp (renders dynamically) | `<t:1705329930>` |
| `{timestamp:r}` | Relative timestamp                      | 5 minutes ago    |

### Usage Examples

**Simple timestamp:**

```
Changed at {time:short} on {date:short}
```

**Discord timestamp (recommended):**

```
Changed: {timestamp}
```

**Relative time:**

```
Updated {timestamp:r}
```

### About Discord Timestamps

Discord timestamps (like `{timestamp}` and `{timestamp:r}`) are special. They render differently for each user based on their timezone and Discord settings. This is usually the best choice for logging.

| Format   | Code            | Result                   |
| -------- | --------------- | ------------------------ |
| Default  | `{timestamp}`   | January 15, 2024 3:45 PM |
| Relative | `{timestamp:r}` | 5 minutes ago            |

---

## Complete Example

Here's a comprehensive webhook message using multiple placeholders:

```
🔔 **Role Update in {server.name}**

**Member:** {user.mention} ({user.tag})
**Added:** {roles.added.names}
**Removed:** {roles.removed.names}

📅 {timestamp}

_Automated by RoleLogic_
```

**Sample Output:**

```
🔔 **Role Update in My Awesome Server**

**Member:** @JohnDoe (JohnDoe#1234)
**Added:** VIP, Premium Access
**Removed:** Trial Member

📅 January 15, 2024 3:45 PM

_Automated by RoleLogic_
```

---

## Placeholder Suggestions

When typing in the webhook message editor:

1. Type `{` to open the suggestion dropdown
2. Continue typing to filter suggestions
3. Click a suggestion to insert it
4. Suggestions are organized by category

If you see "No matching placeholders," check your spelling.

---

## Troubleshooting

### Placeholder Not Replaced

If you see the raw placeholder (e.g., `{user.mention}`) in your output:

- Check spelling and capitalization
- Ensure curly braces are correct
- Try removing and re-typing the placeholder

### Empty Value

Some placeholders may be empty in certain situations:

- `{roles.added.names}` is empty if no roles were added
- `{server.description}` is empty if no description is set
- Design your messages to handle empty values gracefully

### Unexpected Format

Date and time formats may vary based on system settings. Discord timestamps (`{timestamp}`) are the most reliable for consistent display.

---

## Related

- **[Webhooks & Logging](../features/webhooks-logging)** — Set up webhook notifications
- **[Activity Log](../features/activity-log)** — Track configuration changes
