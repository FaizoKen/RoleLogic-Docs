---
sidebar_position: 13
title: Role Automation for Gaming Discord Servers
description: "Set up automatic role management for gaming Discord servers. Achievement roles, rank tiers, game-specific access, and competitive team roles with RoleLogic."
keywords:
  - gaming Discord server roles
  - Discord gaming server setup
  - gaming role automation
  - Discord achievement roles
  - game server role management
  - Discord rank system
  - competitive Discord roles
  - gaming bot Discord roles
  - Discord server roles gaming
image: /img/social-preview.png
---

# Role Automation for Gaming Discord Servers

Gaming servers have unique role management needs: rank systems, achievement tracking, game-specific channels, and competitive team access. RoleLogic handles all of this automatically.

## Common Gaming Server Role Structures

### Rank/Tier System

```
Champion    → full access, mentor channels
Diamond     → advanced channels, coaching
Gold        → standard access
Silver      → beginner channels
Bronze      → limited access
```

**Automate tier transitions with RoleLogic:**

| Rule | Condition | Action |
|------|-----------|--------|
| Gold cleanup | Has "Gold" | Remove "Silver", "Bronze" |
| Diamond cleanup | Has "Diamond" | Remove "Gold", "Silver", "Bronze" |
| Champion cleanup | Has "Champion" | Remove "Diamond", "Gold", "Silver", "Bronze" |

When a moderator or another bot promotes someone to Diamond, RoleLogic automatically removes all lower ranks. No manual cleanup needed.

### Achievement System

Track accomplishments with achievement roles:

| Rule | Condition | Action |
|------|-----------|--------|
| Triple threat | Has All: "PvP Master", "Raid Expert", "Crafter" | Add "Triple Threat" |
| Completionist | At Least 5 of: [10 achievement roles] | Add "Completionist" |
| Dedicated gamer | Has All: "100 Hours", "Max Level" | Add "Dedicated Gamer" |

RoleLogic's [threshold conditions](../concepts/conditions) make this possible — "If member has at least 5 of these 10 achievement roles, add Completionist."

### Game-Specific Access

| Rule | Condition | Action |
|------|-----------|--------|
| Competitive access | Has All: "Verified", "Competitive Player" | Add "Tournament Channels" |
| Team captain perks | Has "Team Captain" | Add "Captain Tools", "Strategy Room" |

### Cross-Server Tournament System

If your gaming community spans multiple servers, use [cross-server rules](../features/cross-guild):

- Main Server: Member earns "Tournament Winner"
- RoleLogic: Automatically adds "Champion" role in the Lounge Server

## Example: Complete Gaming Server Setup

### Rules You Need (6 rules total)

1. **Verification:** Has "Verified" → Remove "Unverified"
2. **Gold promotion:** Has "Gold" → Remove "Silver", "Bronze"
3. **Diamond promotion:** Has "Diamond" → Remove "Gold", "Silver", "Bronze"
4. **Achievement reward:** Has All "PvP", "PvE", "Crafter" → Add "All-Rounder"
5. **Competitive access:** Has "Competitive" → Add "Tournament Access"
6. **VIP reward:** Has "Server Booster" → Add "VIP Gamer"

This requires a [Premium plan](../plans) (free plan covers 2 rules).

## Best Practices for Gaming Servers

1. **Use the [testing sandbox](../features/testing-sandbox)** to verify rank transitions before going live
2. **Set up [webhook notifications](../features/webhooks-logging)** in a staff channel to monitor role changes
3. **Keep role hierarchy correct** — see [role hierarchy guide](../concepts/role-hierarchy)
4. **Use descriptive role names** that match your game's terminology
5. **Review the [activity log](../features/activity-log)** regularly to catch unexpected behavior

## Get Started

1. [Add RoleLogic](https://api-rolelogic.faizo.net/api/discord/bot/invite) to your gaming server
2. Follow the [Quick Start Guide](../quick-start) — 5 minutes to first rule
3. Check [Common Scenarios](./common-scenarios) for more gaming templates
