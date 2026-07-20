---
sidebar_position: 4
title: Configure Cross-Server Actions in RoleLogic
description: Set up and troubleshoot RoleLogic cross-server actions, including source and destination roles, permissions, server links, limits, and downgrade behavior.
image: /img/social-preview-og.png
---

# Configure Cross-Server Actions

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

## Linked Servers View

The dashboard's linked-server section shows:

- Servers your rules can affect
- Manage connections
- **Purge** option to remove all cross-server actions for a server

## Plan Limits

The cross-server sync limit counts the **distinct destination servers** your enabled rules target, not the number of rules or roles. Ten rules pointing at the same other server use just 1 slot; one rule pointing at three servers uses 3.

| Tier               | Destination servers per server |
| ------------------ | ------------------------------ |
| Free               | 2                             |
| Premium (any tier) | 10                            |

If saving a rule would push your server over the limit, RoleLogic rejects the save with a message explaining the cap and how to upgrade.

### Downgrading

Cross-server rules are never deleted on downgrade. RoleLogic walks your enabled rules in priority order and keeps the highest-priority ones that still fit the new free limit; everything beyond gets paused with a yellow "rule paused" banner in the editor. Re-subscribing restores them; editing or deleting also works.

## Limitations

- **Member must be in both servers** — Actions silently skip otherwise
- **Rule quota** — Each rule still counts against your per-server rule quota
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

**"Bot and User Not in Server"**

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

- **[Cross-server role sync overview](https://rolelogic.faizo.net/discord-cross-server-role-sync)** — Compare the workflow and common server-network patterns
- **[Testing Sandbox](./testing-sandbox)** — Test cross-server rules
- **[Plans & Pricing](../plans)** — Cross-server quota limits
- **[FAQ](../faq)** — Cross-server troubleshooting
