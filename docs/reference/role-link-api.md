---
sidebar_position: 4
title: Role Link API Reference — Plugin Developer Guide
description: Complete reference for building RoleLogic Role Link plugins. Covers the plugin server contract (register, schema, config, delete endpoints), the external REST API for managing users, authentication, field types, validation, error handling, and best practices.
keywords:
  - RoleLogic API
  - RoleLogic Role Link API
  - RoleLogic plugin development
  - Role Link plugin
  - Role Link REST API
  - external API
  - token authentication
  - Discord role API
  - Discord role automation API
  - REST API reference
  - role management API
  - manage Discord roles programmatically
  - Discord bot API
  - plugin schema
  - plugin configuration
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

This reference covers everything you need to build a **Role Link plugin** for RoleLogic. A plugin is an external server that integrates with RoleLogic to control which Discord users receive a specific role — based on your own logic (purchases, verification, subscriptions, game stats, etc.).

## How It Works

A Role Link connects a **Discord role** to your **plugin server**. The flow is:

1. A server admin creates a Role Link in the RoleLogic Dashboard, providing your plugin's HTTPS URL.
2. RoleLogic calls your plugin's **register endpoint** to notify it that a role link was created, sending the `guild_id`, `role_id`, and the API token. If your plugin rejects the registration, the role link is not created.
3. RoleLogic calls your plugin's **config endpoint** (`GET /config`) to fetch a configuration form.
4. The admin fills out the form in the dashboard; RoleLogic validates it and sends it to your plugin's **config endpoint**.
5. Your plugin uses the **User Management API** (token-authenticated REST API) to add or remove users from the role link.
6. RoleLogic's bot syncs the user list to Discord role assignments automatically.

As a plugin developer, you need to implement **two things**:

- A **plugin server** that serves a configuration schema and accepts config submissions.
- Logic that calls the **User Management API** to manage which users have the role.

---

## Table of Contents

- [Plugin Server Contract](#plugin-server-contract) — Endpoints your plugin must implement
  - [GET /health](#get-health) — Report plugin health status
  - [POST /register](#post-register) — Acknowledge role link creation
  - [GET /config](#get-config) — Return a configuration form
  - [POST /config](#post-config) — Receive configuration from the dashboard
  - [DELETE /config](#delete-config) — Handle role link deletion
- [Schema Reference](#schema-reference) — All field types and validation options
- [User Management API](#user-management-api) — REST API to manage role-linked users
  - [Authentication](#authentication)
  - [List Users](#list-users)
  - [Replace Users (Batch Set)](#replace-users-batch-set)
  - [Check User](#check-user)
  - [Add User](#add-user)
  - [Remove User](#remove-user)
- [Limits](#limits)
- [Error Responses](#error-responses)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [FAQ](#faq)

---

## Plugin Server Contract

Your plugin server must expose endpoints under the **plugin URL** that the admin provides when creating a Role Link. RoleLogic appends paths to this base URL:

| Method   | Path        | Purpose                          | Called when                     |
| -------- | ----------- | -------------------------------- | ------------------------------- |
| `GET`    | `/health`   | Report plugin health status      | Status page polls plugin health |
| `POST`   | `/register` | Acknowledge role link creation   | Admin creates a role link       |
| `GET`    | `/config`   | Return configuration form schema | Dashboard loads the role link   |
| `POST`   | `/config`   | Receive submitted configuration  | Admin saves config in dashboard |
| `DELETE` | `/config`   | Clean up on role link deletion   | Admin deletes the role link     |

### Plugin URL Requirements

- Must use **HTTPS** — HTTP URLs are rejected.
- Must not point to private/internal addresses: `localhost`, `127.0.0.1`, `::1`, `0.0.0.0`, `10.*`, `192.168.*`, `172.16-31.*`, `*.internal`, `*.local`.
- Trailing slashes are automatically stripped (e.g., `https://example.com/` becomes `https://example.com`).
- Maximum length: **500 characters**.

### How RoleLogic Authenticates to Your Plugin

RoleLogic includes the role link's API token in requests to your server:

```http
Authorization: Token rl_...
User-Agent: RoleLogic/1.0
```

You can use this token to identify which role link the request belongs to. The same token is used for the User Management API, so you can verify it matches by calling the API with it.

---

### GET /health

RoleLogic periodically polls `GET {plugin_url}/health` to monitor your plugin's availability. The results are displayed on the **Server Status** page (`/status`). This endpoint is **not authenticated** — no `Authorization` header is sent.

**Expected response** (HTTP 200):

```json
{
  "status": "healthy",
  "timestamp": "2025-03-25T12:00:00.000Z",
  "checks": {
    "database": {
      "status": "up",
      "latency_ms": 3
    },
    "external_api": {
      "status": "up",
      "latency_ms": 45
    }
  }
}
```

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `status` | `"healthy"` \| `"degraded"` \| `"unhealthy"` | Yes | Overall plugin status. `healthy` = all checks pass, `degraded` = some checks failing but service is up, `unhealthy` = critical failure. |
| `timestamp` | string (ISO 8601) | No | When the health check was performed. |
| `checks` | object | No | Map of named dependency checks. Each check has a `status` (`"up"` or `"down"`), optional `latency_ms`, and optional `message` for error details. |

**Minimal response** — if your plugin has no internal dependencies to check, a simple response is fine:

```json
{
  "status": "healthy"
}
```

**Behavior when missing** — if your plugin does not implement `/health`, the status page will show it as **unreachable**. Implementing this endpoint is recommended but not required.

**Timeout** — RoleLogic waits up to **5 seconds** for a response before marking the plugin as unreachable.

---

### POST /register

When an admin creates a new Role Link, RoleLogic calls `POST {plugin_url}/register` to notify your plugin. This is a **blocking** call — if your plugin returns a non-2xx response, the role link creation is rolled back and the admin sees an error.

**Request from RoleLogic:**

```http
POST {plugin_url}/register
Authorization: Token rl_...
Content-Type: application/json
User-Agent: RoleLogic/1.0
```

```json
{
  "guild_id": "123456789012345678",
  "role_id": "987654321098765432"
}
```

| Field      | Type   | Description               |
| ---------- | ------ | ------------------------- |
| `guild_id` | string | Discord server (guild) ID |
| `role_id`  | string | Discord role ID           |

**Your server should:**
1. Store the token from the `Authorization` header — this is the token you'll use for the User Management API.
2. Record the `guild_id` and `role_id` for this role link.
3. Return a `200` response to confirm the registration.

**Error handling:** If your server returns a non-2xx response or is unreachable, the role link is **not created**. RoleLogic returns a `502 Bad Gateway` error to the admin.

**Timeout:** 5 seconds.

---

### GET /config

RoleLogic calls `GET {plugin_url}/config` to fetch the configuration form that admins see in the dashboard. The response defines sections, fields, validation rules, and optionally the current values.

**Request headers from RoleLogic:**

| Header          | Value               |
| --------------- | ------------------- |
| `Authorization` | `Token rl_...`      |
| `Accept`        | `application/json`  |
| `User-Agent`    | `RoleLogic/1.0`     |

**Your server must respond with `200 OK` and a JSON body matching this structure:**

```json
{
  "version": 1,
  "name": "My Plugin",
  "description": "Optional description shown in the dashboard",
  "sections": [
    {
      "title": "Section Title",
      "description": "Optional section description",
      "collapsible": false,
      "default_collapsed": false,
      "fields": [
        {
          "type": "text",
          "key": "api_key",
          "label": "API Key",
          "description": "Your platform API key",
          "placeholder": "Enter your API key",
          "validation": { "required": true, "max": 200 }
        }
      ]
    }
  ],
  "values": {
    "api_key": "sk_live_abc123"
  }
}
```

**Constraints:**

| Property   | Limit             |
| ---------- | ----------------- |
| `version`  | Must be `1`       |
| `name`     | Max 100 chars     |
| `description` | Max 500 chars  |
| `sections` | 1–10 sections     |
| Fields per section | 1–30 fields |
| Field keys | Unique across all sections, alphanumeric + underscores only (`^[a-zA-Z0-9_]+$`), max 100 chars |

**Caching:** RoleLogic caches the schema structure (without `values`) for **5 minutes**. The `values` object is always fetched fresh. Admins can force a cache refresh from the dashboard.

**Timeout:** 5 seconds. Response body capped at 50 KB.

**Fallback behavior:** If your server is unreachable or returns an invalid schema, RoleLogic falls back to the cached schema (if available). Otherwise, it returns a `502 Bad Gateway` error to the dashboard.

---

### POST /config

When an admin saves configuration in the dashboard, RoleLogic validates the data against your schema, then sends it to `POST {plugin_url}/config`.

**Request from RoleLogic:**

```http
POST {plugin_url}/config
Authorization: Token rl_...
Content-Type: application/json
User-Agent: RoleLogic/1.0
```

```json
{
  "guild_id": "123456789012345678",
  "role_id": "987654321098765432",
  "config": {
    "api_key": "sk_live_abc123",
    "sync_interval": 60,
    "enable_notifications": true
  }
}
```

| Field      | Type   | Description                                  |
| ---------- | ------ | -------------------------------------------- |
| `guild_id` | string | Discord server (guild) ID                    |
| `role_id`  | string | Discord role ID                              |
| `config`   | object | Key-value pairs matching your schema fields. Only non-`display` fields with submitted values are included. |

**Your server should:**
1. Validate and store the configuration.
2. Return a `200` response (the response body is forwarded to the dashboard).
3. Begin using the configuration to manage users via the User Management API.

**After a successful save:** The dashboard automatically refetches your plugin's `GET /config` endpoint to display the latest configuration values. Ensure your response reflects the newly saved config immediately.

**Error handling:** If your server returns a 4xx error, RoleLogic forwards the original status code and error message to the admin. For 5xx errors or network failures, RoleLogic returns a `502 Bad Gateway`. Include a meaningful error message in the response body:

```json
{ "error": "Invalid API key" }
```

or

```json
{ "message": "API key does not have required permissions" }
```

RoleLogic extracts the `error` or `message` field from your response and displays it.

**Timeout:** 10 seconds. Response body capped at 50 KB.

---

### DELETE /config

When an admin deletes a role link, RoleLogic notifies your plugin so you can clean up. This is a **fire-and-forget** call — failures are logged but do not block the deletion.

**Request from RoleLogic:**

```http
DELETE {plugin_url}/config
Authorization: Token rl_...
Content-Type: application/json
User-Agent: RoleLogic/1.0
```

```json
{
  "guild_id": "123456789012345678",
  "role_id": "987654321098765432"
}
```

**Your server should:** Remove any stored configuration and stop managing users for this role link. The API token included in the request will be invalidated after deletion.

**Timeout:** 5 seconds. Failures do not affect the deletion.

---

## Schema Reference

The schema defines the configuration form rendered in the RoleLogic Dashboard. Each field has a `type` that determines its appearance and validation behavior.

### Field Types

#### `text`

Single-line text input.

```json
{
  "type": "text",
  "key": "webhook_url",
  "label": "Webhook URL",
  "description": "URL to receive events",
  "placeholder": "https://example.com/webhook",
  "default_value": "",
  "validation": {
    "required": true,
    "min": 10,
    "max": 500,
    "pattern": "^https://",
    "pattern_message": "Must start with https://"
  }
}
```

| Property | Type | Description |
| --- | --- | --- |
| `placeholder` | string? | Placeholder text (max 200 chars) |
| `default_value` | string? | Default value (max 1,000 chars) |
| `validation.required` | boolean? | Whether the field must be filled |
| `validation.min` | number? | Minimum string length |
| `validation.max` | number? | Maximum string length |
| `validation.pattern` | string? | Regex pattern the value must match |
| `validation.pattern_message` | string? | Custom error message for pattern mismatch (max 200 chars) |

#### `textarea`

Multi-line text input.

```json
{
  "type": "textarea",
  "key": "welcome_message",
  "label": "Welcome Message",
  "rows": 5,
  "default_value": "Welcome to the server!",
  "validation": { "max": 2000 }
}
```

| Property | Type | Description |
| --- | --- | --- |
| `rows` | number? | Number of visible rows, 2–20 (default varies by UI) |
| `default_value` | string? | Default value (max 5,000 chars) |
| `validation` | object? | Same as `text` |

#### `number`

Numeric input.

```json
{
  "type": "number",
  "key": "sync_interval",
  "label": "Sync Interval (seconds)",
  "step": 5,
  "default_value": 60,
  "validation": { "required": true, "min": 10, "max": 3600 }
}
```

| Property | Type | Description |
| --- | --- | --- |
| `step` | number? | Step increment |
| `suffix` | string? | Unit label displayed after the input, e.g. `"days"`, `"users"`, `"%"` (max 20 chars) |
| `default_value` | number? | Default value |
| `validation.min` | number? | Minimum value |
| `validation.max` | number? | Maximum value |

#### `select`

Dropdown selection.

```json
{
  "type": "select",
  "key": "region",
  "label": "Region",
  "options": [
    { "label": "North America", "value": "na" },
    { "label": "Europe", "value": "eu" },
    { "label": "Asia Pacific", "value": "apac" }
  ],
  "default_value": "na",
  "validation": { "required": true }
}
```

| Property | Type | Description |
| --- | --- | --- |
| `options` | array | 1–100 options, each with `label` (max 100 chars) and `value` (string max 500 chars, or number) |
| `default_value` | string \| number? | Must match one of the option values |

#### `radio`

Radio button group.

```json
{
  "type": "radio",
  "key": "mode",
  "label": "Sync Mode",
  "options": [
    { "label": "Automatic", "value": "auto" },
    { "label": "Manual", "value": "manual" }
  ],
  "default_value": "auto"
}
```

| Property | Type | Description |
| --- | --- | --- |
| `options` | array | 1–50 options (same format as `select`) |
| `default_value` | string \| number? | Must match one of the option values |

#### `checkbox`

Boolean checkbox.

```json
{
  "type": "checkbox",
  "key": "enable_logging",
  "label": "Enable activity logging",
  "default_value": false
}
```

| Property | Type | Description |
| --- | --- | --- |
| `default_value` | boolean? | Default checked state |

#### `toggle`

Boolean toggle switch. Functionally identical to `checkbox`, rendered differently.

```json
{
  "type": "toggle",
  "key": "auto_sync",
  "label": "Auto-sync enabled",
  "default_value": true
}
```

#### `secret`

Masked text input for sensitive values like API keys and tokens. Functionally identical to `text` but rendered as a password field with a show/hide toggle.

```json
{
  "type": "secret",
  "key": "api_secret",
  "label": "API Secret",
  "placeholder": "sk_live_...",
  "validation": { "required": true, "min": 10 }
}
```

| Property | Type | Description |
| --- | --- | --- |
| `placeholder` | string? | Placeholder text (max 200 chars) |
| `default_value` | string? | Default value (max 1,000 chars) |
| `validation` | object? | Same as `text` |

#### `url`

URL input with built-in format validation. Must start with `http://` or `https://`. A clickable open-link button appears next to the input when a valid URL is entered.

```json
{
  "type": "url",
  "key": "callback_url",
  "label": "Callback URL",
  "placeholder": "https://example.com/callback",
  "validation": { "required": true }
}
```

| Property | Type | Description |
| --- | --- | --- |
| `placeholder` | string? | Placeholder text (max 200 chars) |
| `default_value` | string? | Default value (max 2,000 chars) |
| `validation` | object? | Same as `text` (URL format is always validated in addition to these) |

#### `color`

Color picker with a hex color input. Value is stored as a 7-character hex string (e.g. `#ff0000`).

```json
{
  "type": "color",
  "key": "brand_color",
  "label": "Brand Color",
  "description": "Color used for embed accents",
  "default_value": "#5865f2"
}
```

| Property | Type | Description |
| --- | --- | --- |
| `default_value` | string? | Default hex color (must match `#[0-9a-fA-F]{6}`) |

#### `slider`

Range slider for selecting a number within a bounded range. A visual alternative to `number` when the value has clear min/max bounds.

```json
{
  "type": "slider",
  "key": "sync_rate",
  "label": "Sync Rate",
  "min": 1,
  "max": 60,
  "step": 5,
  "default_value": 15,
  "show_value": true,
  "suffix": " min"
}
```

| Property | Type | Description |
| --- | --- | --- |
| `min` | number | **Required.** Minimum value |
| `max` | number | **Required.** Maximum value (must be greater than `min`) |
| `step` | number? | Step increment (default: 1) |
| `default_value` | number? | Default value |
| `show_value` | boolean? | Show current value next to the slider (default: `true`) |
| `suffix` | string? | Unit label appended to displayed values, e.g. `" min"`, `"%"` (max 20 chars) |

#### `multi_select`

Multi-select dropdown that allows selecting multiple options. Selected values are displayed as removable chips above the dropdown.

```json
{
  "type": "multi_select",
  "key": "allowed_regions",
  "label": "Allowed Regions",
  "options": [
    { "label": "North America", "value": "na" },
    { "label": "Europe", "value": "eu" },
    { "label": "Asia Pacific", "value": "apac" }
  ],
  "default_value": ["na", "eu"],
  "max_selections": 2
}
```

| Property | Type | Description |
| --- | --- | --- |
| `options` | array | 1–100 options (same format as `select`) |
| `default_value` | array? | Array of option values to select by default (each must match an option value) |
| `max_selections` | number? | Maximum number of options that can be selected |
| `validation.required` | boolean? | If `true`, at least one option must be selected |

The submitted value is an array of selected option values (e.g. `["na", "eu"]`).

#### `display`

Read-only text displayed in the form. Not submitted as configuration data. Supports basic inline formatting.

```json
{
  "type": "display",
  "key": "info_notice",
  "label": "Important",
  "value": "This plugin requires a **premium API key**. Visit [our website](https://example.com) to get one."
}
```

| Property | Type | Description |
| --- | --- | --- |
| `value` | string | Text content to display (max 2,000 chars). Supports `\n` for line breaks. |

**Formatting support:**

| Syntax | Renders as |
| --- | --- |
| `**bold text**` | **bold text** |
| `*italic text*` | *italic text* |
| `` `inline code` `` | `inline code` |
| `[link text](https://example.com)` | Clickable link (opens in new tab) |
| `https://example.com` | Auto-linked URL (opens in new tab) |

### Common Field Properties

All field types share these base properties:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | string | Yes | One of: `text`, `textarea`, `number`, `select`, `radio`, `checkbox`, `toggle`, `secret`, `url`, `color`, `slider`, `multi_select`, `display` |
| `key` | string | Yes | Unique identifier (`^[a-zA-Z0-9_]+$`, max 100 chars) |
| `label` | string | Yes | Display label (max 200 chars) |
| `description` | string? | No | Help text below the field (max 500 chars) |
| `condition` | object? | No | Single condition for conditional visibility (see below) |
| `conditions` | array? | No | Multiple conditions — **all** must match for the field to be visible (AND logic, max 5) |
| `pair_with` | string? | No | Key of another field to render inline alongside as a range pair (see [Range Pairs](#range-pairs)) |

### Conditional Fields

Fields can be shown or hidden based on another field's value. Use `condition` for a single check or `conditions` (array) when multiple checks must all pass.

#### Single condition

```json
{
  "type": "text",
  "key": "custom_endpoint",
  "label": "Custom Endpoint URL",
  "condition": {
    "field": "region",
    "equals": "custom"
  }
}
```

#### Multiple conditions (AND logic)

All conditions must match for the field to be visible:

```json
{
  "type": "number",
  "key": "value_end_level",
  "label": "Level (end of range)",
  "conditions": [
    { "field": "stat", "equals": "level" },
    { "field": "operator", "equals": "between" }
  ]
}
```

#### `equals_any` — match one of several values

Use `equals_any` instead of `equals` to show a field when the referenced field matches **any** value in the array:

```json
{
  "type": "select",
  "key": "operator",
  "label": "Comparison",
  "condition": {
    "field": "stat",
    "equals_any": ["level", "score", "rank"]
  }
}
```

#### Condition properties

| Property | Type | Description |
| --- | --- | --- |
| `field` | string | The `key` of another field in the schema (max 100 chars) |
| `equals` | string \| number \| boolean | The value that field must have for the condition to pass. Optional if `equals_any` is set |
| `equals_any` | array of string \| number \| boolean | The condition passes if the field's value matches **any** entry in the array. Optional if `equals` is set |

At least one of `equals` or `equals_any` should be provided. All referenced fields must exist in the schema — conditions referencing unknown fields cause a validation error.

### Range Pairs

Two fields can be rendered **side by side** as a range (e.g. `[30] to [55]`) by setting `pair_with` on the end field to the `key` of the start field. This is useful when your plugin supports "between" or range comparisons.

```json
[
  {
    "type": "number",
    "key": "value_level",
    "label": "Adventure Rank",
    "validation": { "required": true, "min": 1, "max": 60 },
    "condition": { "field": "stat", "equals": "level" }
  },
  {
    "type": "number",
    "key": "value_end_level",
    "label": "Adventure Rank (end)",
    "validation": { "required": true, "min": 1, "max": 60 },
    "pair_with": "value_level",
    "conditions": [
      { "field": "stat", "equals": "level" },
      { "field": "operator", "equals": "between" }
    ]
  }
]
```

When both fields are visible, the dashboard renders them as:

> **Adventure Rank** *(1–60)*
> `[30]` **to** `[55]`

| Property | Type | Description |
| --- | --- | --- |
| `pair_with` | string | The `key` of the start field to pair with. Must reference an existing field in the schema |

The end field's label and description are hidden in the inline layout — only the start field's label is shown. Both fields are still independently validated.

### Collapsible Sections

Sections can be made collapsible so admins can expand/collapse them in the dashboard. Useful for grouping advanced or optional settings.

```json
{
  "title": "Advanced Settings",
  "description": "Optional configuration for power users",
  "collapsible": true,
  "default_collapsed": true,
  "fields": [ ... ]
}
```

| Property | Type | Description |
| --- | --- | --- |
| `collapsible` | boolean? | Whether the section can be collapsed/expanded (default: `false`) |
| `default_collapsed` | boolean? | Whether the section starts collapsed (default: `false`). Only honored when `collapsible` is `true` |

### The `values` Object

Include a `values` key in your schema response to pre-populate the form with existing configuration:

```json
{
  "version": 1,
  "name": "My Plugin",
  "sections": [ ... ],
  "values": {
    "api_key": "sk_live_abc123",
    "sync_interval": 60,
    "enable_logging": true
  }
}
```

Keys in `values` correspond to field `key` properties. RoleLogic always fetches `values` fresh (not cached) so admins see the latest configuration.

---

## User Management API

The User Management API lets your plugin programmatically control which Discord users are linked to a role. When you add or remove users, the RoleLogic bot automatically syncs the corresponding Discord role assignments.

### Quick Reference

| Method   | Endpoint                                                            | Description                          |
| -------- | ------------------------------------------------------------------- | ------------------------------------ |
| `GET`    | [`/api/role-link/:guildId/:roleId/users`](#list-users)              | Get all user IDs linked to this role |
| `PUT`    | [`/api/role-link/:guildId/:roleId/users`](#replace-users-batch-set) | Replace entire user list atomically  |
| `GET`    | [`/api/role-link/:guildId/:roleId/users/:userId`](#check-user)      | Check if a specific user exists      |
| `POST`   | [`/api/role-link/:guildId/:roleId/users/:userId`](#add-user)        | Add a single user (idempotent)       |
| `DELETE` | [`/api/role-link/:guildId/:roleId/users/:userId`](#remove-user)     | Remove a single user (idempotent)    |

### Base URL

```
https://api-rolelogic.faizo.net
```

### Authentication

Every request must include an `Authorization` header using the **`Token`** scheme (not `Bearer`):

```http
Authorization: Token rl_...
```

Tokens start with the `rl_` prefix and are scoped to exactly **one role link** (one guild + one role combination). A token for one role link cannot access another, even within the same guild.

#### How to Get a Token

- **Plugin developers:** The token is automatically generated when a role link is created and sent to your plugin server in the `Authorization` header during the `POST /register` call. Extract and store it during registration.
- **Dashboard users:** Tokens are not manually visible or resettable. To get a new token, delete the role link and recreate it.

:::warning
Tokens cannot be reset independently. To regenerate a token, you must **delete and recreate** the role link. This will trigger a new `POST /register` call to your plugin with the new token.
:::

### Path Parameters

| Parameter | Type   | Format                      | Description                          |
| --------- | ------ | --------------------------- | ------------------------------------ |
| `guildId` | string | Numeric (Discord snowflake) | The Discord server (guild) ID        |
| `roleId`  | string | Numeric (Discord snowflake) | The Discord role ID                  |
| `userId`  | string | 17–20 digit numeric string  | A Discord user ID (snowflake format) |

---

### List Users

Retrieve all Discord user IDs currently linked to this role.

```http
GET /api/role-link/:guildId/:roleId/users
```

**Headers**

| Header          | Value              |
| --------------- | ---------------    |
| `Authorization` | `Token rl_...`     |

**Response `200 OK`**

```json
{
  "data": ["123456789012345678", "234567890123456789"]
}
```

`data` is an array of Discord user ID strings. Returns an empty array `[]` if no users are linked.

---

### Replace Users (Batch Set)

Atomically replaces the entire user list. The old list is fully removed and the new list is inserted in a single transaction. Use this for full synchronization from an external source.

```http
PUT /api/role-link/:guildId/:roleId/users
```

**Headers**

| Header          | Value                |
| --------------- | -------------------- |
| `Authorization` | `Token rl_...`       |
| `Content-Type`  | `application/json`   |

**Request Body**

A JSON array of Discord user ID strings (17–20 digits each):

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

**Timeout:** This endpoint has a **2-minute timeout** for very large payloads. Users are inserted in batches of 50,000.

---

### Check User

Check whether a specific Discord user exists in the linked user list.

```http
GET /api/role-link/:guildId/:roleId/users/:userId
```

**Headers**

| Header          | Value          |
| --------------- | -------------- |
| `Authorization` | `Token rl_...` |

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

| Header          | Value          |
| --------------- | -------------- |
| `Authorization` | `Token rl_...` |

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

| Header          | Value          |
| --------------- | -------------- |
| `Authorization` | `Token rl_...` |

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

### Role Sync Behavior

When you modify the user list (Add, Remove, or Replace), RoleLogic automatically notifies the bot to sync role assignments on Discord. Changes typically apply within seconds, provided the user count is within the allowed limit.

If the stored user count exceeds the allowed limit (e.g., after a plan downgrade), the bot **stops syncing** the role link entirely until the count is reduced.

---

## Limits

| Resource              | Free Plan | Premium   |
| --------------------- | --------- | --------- |
| Users per role link   | 100       | 1,000,000 |
| Role links per server | 10        | 10        |

- Exceeding the user limit on **Add User** or **Replace Users** returns a `400` error with a message indicating the maximum allowed.
- The error message includes a hint to upgrade if on the free plan.
- The **Replace Users** endpoint has a 2-minute timeout for large payloads.
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

### User Management API Errors

| Status Code | Message                                            | Cause                                                        |
| ----------- | -------------------------------------------------- | ------------------------------------------------------------ |
| `400`       | Maximum N users per role link                      | User limit exceeded (see [Limits](#limits))                  |
| `400`       | Validation error                                   | Invalid request body (e.g., user ID not in snowflake format) |
| `401`       | Authorization header required                      | Missing `Authorization` header                               |
| `401`       | Invalid authorization scheme. Use: Token \<token\> | Wrong scheme (e.g., `Bearer` instead of `Token`)             |
| `403`       | Invalid or revoked token                           | Token doesn't match the guild/role pair, or was reset        |
| `403`       | This role link is disabled                         | Role link exists but is disabled in the dashboard            |
| `404`       | Role link not found                                | No role link exists for this guild/role combination          |

### Plugin Server Errors (Shown to Admins)

These errors are returned to the dashboard when RoleLogic cannot communicate with your plugin:

| Status Code | Message                                                  | Cause                                        |
| ----------- | -------------------------------------------------------- | -------------------------------------------- |
| `502`       | Failed to register with plugin server                    | Your `/register` endpoint is down or returned an error |
| `502`       | Failed to fetch plugin schema: plugin server unreachable | Your `GET /config` endpoint is down or timed out |
| `502`       | Plugin returned invalid schema                           | Your `GET /config` response failed validation    |
| `4xx`       | Failed to submit config to plugin server: \<detail\>     | Your `/config` returned a 4xx client error — the original status code is forwarded |
| `502`       | Failed to submit config to plugin server                 | Your `/config` endpoint is down, timed out, or returned a 5xx error |

---

## Examples

### Minimal Plugin Server (Node.js / Express)

A minimal plugin server that manages a "VIP" role based on a configured API key:

```javascript
import express from "express";

const app = express();
app.use(express.json());

// Store config per guild+role (use a database in production)
const configs = new Map();
const tokens = new Map();

// POST /register — Acknowledge role link creation and store the token
app.post("/register", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { guild_id, role_id } = req.body;
  tokens.set(`${guild_id}:${role_id}`, token);
  res.json({ success: true });
});

// GET /config — Return the configuration form
app.get("/config", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const config = findConfigByToken(token);

  res.json({
    version: 1,
    name: "VIP Sync Plugin",
    description: "Syncs VIP status from your platform to Discord roles",
    sections: [
      {
        title: "Connection",
        fields: [
          {
            type: "text",
            key: "platform_api_key",
            label: "Platform API Key",
            description: "Your platform's API key for fetching VIP users",
            validation: { required: true, min: 10, max: 200 },
          },
          {
            type: "number",
            key: "sync_interval",
            label: "Sync Interval (minutes)",
            default_value: 30,
            validation: { required: true, min: 5, max: 1440 },
          },
          {
            type: "toggle",
            key: "auto_remove",
            label: "Auto-remove expired VIPs",
            default_value: true,
          },
        ],
      },
    ],
    // Return current values if config exists
    values: config
      ? {
          platform_api_key: config.platform_api_key,
          sync_interval: config.sync_interval,
          auto_remove: config.auto_remove,
        }
      : undefined,
  });
});

// POST /config — Receive configuration from the dashboard
app.post("/config", (req, res) => {
  const { guild_id, role_id, config } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  // Store config with the token for later API calls
  configs.set(`${guild_id}:${role_id}`, { ...config, token });

  res.json({ success: true });

  // Start syncing (in production, use a job scheduler)
  startSync(guild_id, role_id);
});

// DELETE /config — Clean up on role link deletion
app.delete("/config", (req, res) => {
  const { guild_id, role_id } = req.body;
  configs.delete(`${guild_id}:${role_id}`);
  res.json({ success: true });
});

// Sync logic: fetch VIP users from your platform, update RoleLogic
async function startSync(guildId, roleId) {
  const config = configs.get(`${guildId}:${roleId}`);
  if (!config) return;

  const API_BASE = "https://api-rolelogic.faizo.net";
  const headers = { Authorization: `Token ${config.token}` };

  // Fetch VIP user IDs from your platform
  const vipUserIds = await fetchVipUsers(config.platform_api_key);

  // Replace the entire user list atomically
  await fetch(`${API_BASE}/api/role-link/${guildId}/${roleId}/users`, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(vipUserIds),
  });
}

app.listen(3000);
```

### User Management API — cURL

```bash
# List all users linked to a role
curl -H "Authorization: Token rl_your_token_here" \
  https://api-rolelogic.faizo.net/api/role-link/123456789/987654321/users

# Add a user
curl -X POST -H "Authorization: Token rl_your_token_here" \
  https://api-rolelogic.faizo.net/api/role-link/123456789/987654321/users/111222333444555666

# Replace all users (batch set)
curl -X PUT -H "Authorization: Token rl_your_token_here" \
  -H "Content-Type: application/json" \
  -d '["111222333444555666", "222333444555666777"]' \
  https://api-rolelogic.faizo.net/api/role-link/123456789/987654321/users

# Check if a user exists
curl -H "Authorization: Token rl_your_token_here" \
  https://api-rolelogic.faizo.net/api/role-link/123456789/987654321/users/111222333444555666

# Remove a user
curl -X DELETE -H "Authorization: Token rl_your_token_here" \
  https://api-rolelogic.faizo.net/api/role-link/123456789/987654321/users/111222333444555666
```

### User Management API — JavaScript (fetch)

```javascript
const API_BASE = "https://api-rolelogic.faizo.net";
const TOKEN = "rl_your_token_here";
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

### User Management API — Python (requests)

```python
import requests

API_BASE = "https://api-rolelogic.faizo.net"
TOKEN = "rl_your_token_here"
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

## Best Practices

### Plugin Server

- **Always return `values` in your schema** so admins see their current configuration when revisiting the form. Only the schema structure is cached; values are fetched fresh every time.
- **Keep your `GET /config` endpoint fast** (under 5 seconds). If fetching current values is slow, consider caching them on your side.
- **Validate the `Authorization` header** on incoming requests from RoleLogic to ensure they're legitimate. You can verify the token by making a test call to the User Management API.
- **Handle `DELETE /config` gracefully.** The token will be invalidated after the role link is deleted, so clean up any stored state and stop sync jobs.
- **Return descriptive errors from `POST /config`.** Include an `error` or `message` field in your response body — RoleLogic displays it to the admin.
- **Use HTTPS** for your plugin URL. HTTP is rejected.

### User Management

- **Prefer `PUT` (Replace Users) for periodic full syncs.** It's atomic and handles additions and removals in one call.
- **Use `POST`/`DELETE` (Add/Remove User) for real-time, event-driven updates** — e.g., when a user completes a purchase.
- **All write endpoints are idempotent.** Adding an existing user or removing a non-existent user succeeds without error. Safe to retry on network failures.
- **Check your user count against limits** before calling Replace Users to avoid `400` errors.
- **Use the `Token` scheme, not `Bearer`.** Using `Bearer` returns `401`.
- **Store the token securely.** Tokens start with `rl_` and should be treated as secrets.

---

## FAQ

### What is the Role Link API used for?

The Role Link API allows external applications (plugins) to programmatically manage which Discord users are linked to a specific role through RoleLogic. Common use cases include: granting roles after a purchase or subscription, syncing role membership from an external database, automating verification flows, and integrating with third-party platforms.

### What does a plugin need to implement?

At minimum, three HTTP endpoints: `POST /register` (acknowledges role link creation and receives the API token), `GET /config` (returns the configuration form), and `POST /config` (receives submitted configuration). Optionally, `DELETE /config` for cleanup on role link deletion. Your plugin then calls the User Management API to add/remove users.

### How does RoleLogic authenticate to my plugin?

RoleLogic sends the role link's API token in the `Authorization: Token rl_...` header on all requests to your plugin server. You can verify this token by making a test call to the User Management API.

### How do I get the API token in my plugin?

RoleLogic includes the token in the `Authorization` header when it calls your plugin's `/register` and `/config` (GET, POST, DELETE) endpoints. The best place to extract and store the token is during the `POST /register` call, which is the first request your plugin receives when a role link is created.

### What is the difference between Token and Bearer authentication?

The User Management API uses the `Token` scheme (`Authorization: Token rl_...`), **not** `Bearer`. Using `Bearer` returns a `401` error. This distinguishes external API tokens from internal service authentication.

### Can one token access multiple role links?

No. Each token is scoped to exactly one role link (one guild + one role). To manage multiple role links, each will have its own token.

### How do I get a new token?

Tokens cannot be reset independently. To get a new token, delete the role link and recreate it. The new token will be sent to your plugin during the `POST /register` call.

### Are the Add and Remove endpoints idempotent?

Yes. Adding a user who already exists returns `added: false` (no error). Removing a user who doesn't exist returns `removed: false` (no error). This makes it safe to retry requests.

### What is the user limit?

Free plan: 100 users per role link. Premium: 1,000,000 users per role link. The limit applies per individual role link, not per server.

### What happens if the user count exceeds the limit?

The API rejects **Add User** or **Replace Users** requests that would exceed the limit with a `400` error. If the stored count already exceeds the limit (e.g., after a plan downgrade), the bot **stops syncing** the role link entirely until the count is reduced.

### How quickly do role changes take effect on Discord?

Changes typically apply within seconds after a User Management API call. RoleLogic notifies the bot immediately, and the bot processes the sync. Delays may occur during high-traffic periods or if the bot is rate-limited by Discord.

### What happens if my plugin server is down?

If the `GET /config` endpoint is unreachable, RoleLogic falls back to a cached schema (if available) for up to 5 minutes. If no cache exists, the dashboard shows a `502` error. The User Management API is unaffected by plugin server outages — it's hosted by RoleLogic.

---

## Related

- **[Limits Reference](./limits-reference)** — All system limits and quotas
- **[Plans & Pricing](../plans)** — Upgrade options for higher user limits
- **[FAQ](../faq)** — Common questions answered
