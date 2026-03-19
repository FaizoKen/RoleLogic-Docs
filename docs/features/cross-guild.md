---
sidebar_position: 4
title: Cross-Server Discord Roles - Multi-Server Sync
description: Sync Discord roles across multiple servers. Manage VIP, staff, and member roles across your entire server network with RoleLogic automation.
keywords:
  - cross-server Discord roles
  - multi-server role sync
  - Discord server network
  - linked servers roles
  - cross-guild automation
  - sync roles across servers
  - Discord network management
image: /img/social-preview.png
---

# Cross-Server Actions

RoleLogic can manage roles across multiple Discord servers, not just where you create the rule.

## What Are Cross-Server Actions?

Normally, rules work within one server. Cross-server actions let you:

- Check roles in **Server A**
- Add/remove roles in **Server B**

## Use Cases

### Server Networks

> When someone gets "VIP" in Main Server, add "VIP-Access" in Lounge Server.

### Partner Programs

> When someone gets "Partner" in Server A, add "Partner-Badge" in Servers B, C, and D.

### Organization Sync

> When an employee gets "Team-Lead" in HR Server, add "Leadership-Access" in all department servers.

## Requirements

1. **RoleLogic in all servers** — Bot must be present with "Manage Roles" permission
2. **Proper hierarchy in each server** — Bot's role above managed roles
3. **Member in both servers** — Actions only work for members in both

## Setup

1. Open rule editor in your primary server
2. Configure condition as usual
3. In action section, look for roles from other servers
4. Select cross-server roles
5. Save

## How It Works

1. Member's role changes in Server A
2. RoleLogic evaluates condition
3. If matched, attempts role change in Server B
4. Checks if member exists in Server B
5. Checks hierarchy permissions in Server B
6. Applies changes

## Linked Guilds View

Dashboard shows **Linked Guilds** section:

- Servers your rules can affect
- Manage connections
- **Purge** option to remove all cross-server actions for a server

## Limitations

- **Member must be in both servers** — Actions silently skip otherwise
- **Quota limits** — Cross-server uses role slots from quota
- **Hierarchy per server** — Bot may manage roles differently in each server
- **Bidirectional setups** — Be careful to avoid loops

## Example Setup

**Goal:** VIP in Main → Lounge Access in VIP Lounge

1. Ensure RoleLogic is in both servers
2. Open dashboard for Main Server
3. Create rule:
   - **IF:** Has Some Roles → Premium
   - **THEN:** Add Roles → Lounge Access (from VIP Lounge server)
4. Save

**Result:** Anyone with "Premium" in Main gets "Lounge Access" in VIP Lounge.

## Troubleshooting

**"Bot and User Not in Guild"**

- Member isn't in target server, or
- RoleLogic isn't in target server

**"Cannot manage role due to hierarchy"**

- RoleLogic's role too low in TARGET server
- Adjust hierarchy in that server

**Actions not working?**

1. Check "Manage Roles" permission in target server
2. Verify hierarchy in target server
3. Confirm member is in both servers

---

## Related

- **[Testing Sandbox](./testing-sandbox)** — Test cross-server rules
- **[Plans & Pricing](../plans)** — Cross-server quota limits
- **[FAQ](../faq)** — Cross-server troubleshooting
- **[Role Link API](../reference/role-link-api)** — Build custom cross-server integrations
- **[Plugins](/plugins)** — Extend RoleLogic with role link plugins
