---
sidebar_position: 4
title: Role Link API Reference - External Token-Based REST API
description: Complete REST API reference for the RoleLogic Role Link external API. Manage Discord role-linked users programmatically with token authentication. Endpoints for listing, adding, removing, and batch-replacing users.
keywords:
  - RoleLogic API
  - RoleLogic Role Link API
  - Role Link REST API
  - external API
  - token authentication
  - Discord role API
  - Discord role automation API
  - REST API reference
  - role management API
  - manage Discord roles programmatically
  - Discord bot API
  - role link users endpoint
  - add user to Discord role API
  - remove user from Discord role API
  - batch replace Discord role users
  - check user role API
  - Discord snowflake
  - role link token
image: /img/social-preview.png
---

# Role Link API Reference

The RoleLogic Role Link external API lets you manage users linked to a Discord role programmatically over HTTP. Use it to integrate RoleLogic with your own applications, websites, or services — for example, granting a Discord role to users who complete a purchase, pass verification, or meet custom criteria on your platform.

**All endpoints require token-based authentication.** Each token is scoped to exactly one role link (one guild + one role combination).

## Quick Reference

| Method   | Endpoint                                                            | Description                          |
| -------- | ------------------------------------------------------------------- | ------------------------------------ |
| `GET`    | [`/api/role-link/:guildId/:roleId/users`](#list-users)              | Get all user IDs linked to this role |
| `PUT`    | [`/api/role-link/:guildId/:roleId/users`](#replace-users-batch-set) | Replace entire user list atomically  |
| `GET`    | [`/api/role-link/:guildId/:roleId/users/:userId`](#check-user)      | Check if a specific user exists      |
| `POST`   | [`/api/role-link/:guildId/:roleId/users/:userId`](#add-user)        | Add a single user (idempotent)       |
| `DELETE` | [`/api/role-link/:guildId/:roleId/users/:userId`](#remove-user)     | Remove a single user (idempotent)    |

---

## Authentication

Every request must include an `Authorization` header using the **`Token`** scheme (not `Bearer`):

```http
Authorization: Token your_token_here
```

Tokens always start with the `rl_` prefix.

### How to Generate a Token

1. Open the **RoleLogic Dashboard** for your server
2. Navigate to **Role Links**
3. Select or create a role link for the desired role
4. Click **Reset Token** to generate a new API token

:::warning
Tokens are shown **only once** when generated. Store your token securely — it cannot be retrieved later. If you lose it, generate a new one. Generating a new token **immediately invalidates** the previous token.
:::

### Token Scope

Each token is scoped to a **single role link** — a specific `guildId` + `roleId` pair. A token for one role link cannot access another role link's users, even within the same guild. If you need to manage multiple role links, generate a separate token for each.

---

## Base URL

```
https://api-rolelogic.faizo.net
```

All endpoint paths below are relative to this base URL.

---

## Path Parameters

These URL parameters are used across all endpoints:

| Parameter | Type   | Format                      | Description                          |
| --------- | ------ | --------------------------- | ------------------------------------ |
| `guildId` | string | Numeric (Discord snowflake) | The Discord server (guild) ID        |
| `roleId`  | string | Numeric (Discord snowflake) | The Discord role ID                  |
| `userId`  | string | 17–20 digit numeric string  | A Discord user ID (snowflake format) |

You can find guild, role, and user IDs by enabling **Developer Mode** in Discord Settings > Advanced, then right-clicking on a server, role, or user and selecting "Copy ID".

---

## Endpoints

### List Users

Retrieve all Discord user IDs currently linked to this role. Returns the complete list regardless of size.

```http
GET /api/role-link/:guildId/:roleId/users
```

**Headers**

| Header          | Value                   |
| --------------- | ----------------------- |
| `Authorization` | `Token your_token_here` |

**Response `200 OK`**

```json
{
  "data": ["123456789012345678", "234567890123456789"]
}
```

`data` is an array of Discord user ID strings. Returns an empty array `[]` if no users are linked.

---

### Replace Users (Batch Set)

Atomically replaces the entire user list with the provided array. The old list is fully removed and the new list is inserted in a single transaction. Use this for full synchronization from an external source.

```http
PUT /api/role-link/:guildId/:roleId/users
```

**Headers**

| Header          | Value                   |
| --------------- | ----------------------- |
| `Authorization` | `Token your_token_here` |
| `Content-Type`  | `application/json`      |

**Request Body**

A JSON array of Discord user ID strings (snowflake format, 17–20 digits each):

```json
["123456789012345678", "234567890123456789", "345678901234567890"]
```

- Each ID must be a valid Discord snowflake (17–20 digits).
- Duplicate IDs are automatically deduplicated.
- Maximum number of users depends on your plan (see [Limits](#limits)).
- An empty array `[]` removes all users.

**Response `200 OK`**

```json
{
  "data": {
    "user_count": 3
  }
}
```

`user_count` reflects the number of **unique** users stored after deduplication.

---

### Check User

Check whether a specific Discord user exists in the linked user list.

```http
GET /api/role-link/:guildId/:roleId/users/:userId
```

**Headers**

| Header          | Value                   |
| --------------- | ----------------------- |
| `Authorization` | `Token your_token_here` |

**Response `200 OK`**

```json
{
  "data": {
    "exists": true
  }
}
```

| Value           | Meaning                                 |
| --------------- | --------------------------------------- |
| `exists: true`  | The user is in the linked user list     |
| `exists: false` | The user is not in the linked user list |

---

### Add User

Add a single Discord user to the linked user list. This operation is **idempotent** — calling it for a user who already exists succeeds without error and returns `added: false`.

```http
POST /api/role-link/:guildId/:roleId/users/:userId
```

**Headers**

| Header          | Value                   |
| --------------- | ----------------------- |
| `Authorization` | `Token your_token_here` |

**Response `200 OK`**

```json
{
  "data": {
    "added": true
  }
}
```

| Value          | Meaning                               |
| -------------- | ------------------------------------- |
| `added: true`  | User was newly added to the list      |
| `added: false` | User already existed — no change made |

---

### Remove User

Remove a single Discord user from the linked user list. This operation is **idempotent** — calling it for a user who doesn't exist succeeds without error and returns `removed: false`.

```http
DELETE /api/role-link/:guildId/:roleId/users/:userId
```

**Headers**

| Header          | Value                   |
| --------------- | ----------------------- |
| `Authorization` | `Token your_token_here` |

**Response `200 OK`**

```json
{
  "data": {
    "removed": true
  }
}
```

| Value            | Meaning                                   |
| ---------------- | ----------------------------------------- |
| `removed: true`  | User was removed from the list            |
| `removed: false` | User was not in the list — no change made |

---

## Limits

| Resource              | Free Plan | Premium   |
| --------------------- | --------- | --------- |
| Users per role link   | 100       | 1,000,000 |
| Role links per server | 10        | 10        |

- Exceeding the user limit on **Add User** or **Replace Users** returns a `400` error with a message indicating the maximum allowed.
- If the user count in the database exceeds the allowed limit (e.g., due to a plan downgrade), the **bot will stop syncing** the role link entirely until the user count is reduced below the limit. No role assignments or removals will be processed.
- The **Replace Users** endpoint has a 2-minute timeout for very large payloads.
- Upgrade to a premium plan for higher user limits. See [Plans & Pricing](../plans).

---

## Error Responses

All errors return a JSON object with `statusCode` and `message`:

```json
{
  "statusCode": 401,
  "message": "Authorization header required"
}
```

### Error Reference

| Status Code | Message                                            | Cause                                                        |
| ----------- | -------------------------------------------------- | ------------------------------------------------------------ |
| `401`       | Authorization header required                      | Missing `Authorization` header                               |
| `401`       | Invalid authorization scheme. Use: Token \<token\> | Wrong scheme (e.g., `Bearer` instead of `Token`)             |
| `403`       | Invalid or revoked token                           | Token doesn't match the guild/role pair, or was reset        |
| `403`       | This role link is disabled                         | Role link exists but is disabled in the dashboard            |
| `400`       | Maximum N users per role link                      | User limit exceeded (see [Limits](#limits))                  |
| `400`       | Validation error                                   | Invalid request body (e.g., user ID not in snowflake format) |
| `404`       | Role link not found                                | No role link exists for this guild/role combination          |

---

## Examples

### cURL

```bash
# List all users linked to a role
curl -H "Authorization: Token your_token_here" \
  https://api-rolelogic.faizo.net/api/role-link/123456789/987654321/users

# Add a user
curl -X POST -H "Authorization: Token your_token_here" \
  https://api-rolelogic.faizo.net/api/role-link/123456789/987654321/users/111222333444555666

# Replace all users (batch set)
curl -X PUT -H "Authorization: Token your_token_here" \
  -H "Content-Type: application/json" \
  -d '["111222333444555666", "222333444555666777"]' \
  https://api-rolelogic.faizo.net/api/role-link/123456789/987654321/users

# Check if a user exists
curl -H "Authorization: Token your_token_here" \
  https://api-rolelogic.faizo.net/api/role-link/123456789/987654321/users/111222333444555666

# Remove a user
curl -X DELETE -H "Authorization: Token your_token_here" \
  https://api-rolelogic.faizo.net/api/role-link/123456789/987654321/users/111222333444555666
```

### JavaScript (fetch)

```javascript
const API_BASE = "https://api-rolelogic.faizo.net";
const TOKEN = "your_token_here";
const GUILD_ID = "123456789";
const ROLE_ID = "987654321";

const headers = { Authorization: `Token ${TOKEN}` };

// List all users
const users = await fetch(
  `${API_BASE}/api/role-link/${GUILD_ID}/${ROLE_ID}/users`,
  { headers },
).then((r) => r.json());
// → { data: ["123456789012345678", ...] }

// Add a user
const addResult = await fetch(
  `${API_BASE}/api/role-link/${GUILD_ID}/${ROLE_ID}/users/111222333444555666`,
  { method: "POST", headers },
).then((r) => r.json());
// → { data: { added: true } }

// Replace all users
const setResult = await fetch(
  `${API_BASE}/api/role-link/${GUILD_ID}/${ROLE_ID}/users`,
  {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(["111222333444555666", "222333444555666777"]),
  },
).then((r) => r.json());
// → { data: { user_count: 2 } }
```

### Python (requests)

```python
import requests

API_BASE = "https://api-rolelogic.faizo.net"
TOKEN = "your_token_here"
GUILD_ID = "123456789"
ROLE_ID = "987654321"

headers = {"Authorization": f"Token {TOKEN}"}

# List all users
resp = requests.get(
    f"{API_BASE}/api/role-link/{GUILD_ID}/{ROLE_ID}/users",
    headers=headers
)
users = resp.json()["data"]

# Add a user
resp = requests.post(
    f"{API_BASE}/api/role-link/{GUILD_ID}/{ROLE_ID}/users/111222333444555666",
    headers=headers
)

# Replace all users
resp = requests.put(
    f"{API_BASE}/api/role-link/{GUILD_ID}/{ROLE_ID}/users",
    headers=headers,
    json=["111222333444555666", "222333444555666777"]
)
```

---

## Frequently Asked Questions

### What is the Role Link API used for?

The Role Link API allows external applications to programmatically manage which Discord users are linked to a specific role through RoleLogic. Common use cases include: granting roles after a purchase or subscription, syncing role membership from an external database, automating verification flows, and integrating with third-party platforms.

### How do I get an API token?

Open the RoleLogic Dashboard, go to Role Links for your server, select or create a role link, and click "Reset Token". The token is shown once — copy and store it securely.

### What is the difference between Token and Bearer authentication?

The Role Link API uses the `Token` scheme (`Authorization: Token rl_...`), **not** `Bearer`. Using `Bearer` will return a `401` error. This distinguishes external API tokens from internal service authentication.

### Can one token access multiple role links?

No. Each token is scoped to exactly one role link (one guild + one role). To manage multiple role links, generate a separate token for each.

### What happens when I reset a token?

The old token is immediately invalidated and a new one is generated. Any systems using the old token will receive `403` errors. Update your integrations with the new token.

### Are the Add and Remove endpoints idempotent?

Yes. Adding a user who already exists returns `added: false` (no error). Removing a user who doesn't exist returns `removed: false` (no error). This makes it safe to retry requests.

### What is the user limit?

Free plan: 100 users per role link. Premium: 1,000,000 users per role link. The limit applies per individual role link, not per server.

### What happens if the user count exceeds the limit?

The API will reject any **Add User** or **Replace Users** request that would exceed the limit with a `400` error. Additionally, if the stored user count is already over the limit (for example, after a plan downgrade), the bot will **not sync** the role link at all — no role assignments or removals will be processed until the user count is reduced below the allowed limit.

### Does the API trigger role syncs?

Yes. When you modify the user list (Add, Remove, or Replace), RoleLogic automatically notifies the bot to sync the role assignments on Discord. Changes typically apply within seconds, provided the user count is within the allowed limit.

---

## Related

- **[Limits Reference](./limits-reference)** — All system limits and quotas
- **[Plans & Pricing](../plans)** — Upgrade options for higher user limits
- **[FAQ](../faq)** — Common questions answered
