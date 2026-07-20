---
title: Automatic Discord Booster Role Rewards
description: Give Discord server boosters VIP, perks, and channel access automatically, then remove rewards when a boost ends. Includes exact RoleLogic rules.
image: /img/social-preview-og.png
---

import ProductCta from '@site/src/components/Seo/ProductCta';

# Give Discord Boosters Role Rewards Automatically

Discord assigns its built-in `Server Booster` role when a member boosts. RoleLogic can use that role as a signal to add your own `VIP`, perk, color, or channel-access roles—without modifying Discord's managed booster role.

## Add Rewards When a Member Boosts

Create this rule:

```text
IF Has Some Roles: Server Booster
THEN Add Roles: VIP, Booster Perks, Booster Lounge
```

Select only the rewards your server actually uses. Multiple reward roles can be added by the same action, so this setup consumes one rule.

## Remove Rewards When a Boost Ends

Discord removes `Server Booster` after the boost is no longer active. Use a second rule to keep derived rewards in sync:

```text
IF Lacks All Roles: Server Booster
THEN Remove Roles: VIP, Booster Perks, Booster Lounge
```

Together, the add and removal rules use two of the free plan's five rules.

:::warning[Shared VIP roles]
Do not remove a shared `VIP` role with this rule if members can earn it in other ways. Use a booster-specific role, or add conditions that protect other qualifying members.
:::

## Setup Checklist

1. [Add RoleLogic to Discord](https://api-rolelogic.faizo.net/api/discord/bot/invite).
2. In **Server Settings → Roles**, put RoleLogic above every reward role it will manage.
3. Leave Discord's managed `Server Booster` role alone; RoleLogic only checks whether a member has it.
4. Create the reward rule with `Has Some Roles`.
5. If rewards should expire, create the cleanup rule with `Lacks All Roles`.
6. Test both a current booster and a simulated non-booster in the [sandbox](../features/testing-sandbox).

## Safer Patterns for Shared Rewards

### Keep a booster-only source role

Use a dedicated role such as `Booster VIP` for benefits that must disappear when boosting ends. This avoids interfering with VIP access earned through subscriptions, staff status, or events.

### Reward boosters who meet another condition

Use an additional AND condition when a perk has a second requirement:

```text
IF Has Some Roles: Server Booster
AND Has Some Roles: Verified
THEN Add Roles: Booster Lounge
```

### Give different perks by existing tier

Create focused rules for each tier:

```text
IF Has Some Roles: Server Booster
AND Has Some Roles: Gold Tier
THEN Add Roles: Gold Booster Perks
```

Use [rule priority and clear names](./best-practices) when several reward rules can match the same member.

## Troubleshooting Booster Rewards

| Problem | What to check |
| --- | --- |
| Reward is not added | Rule enabled, correct `Server Booster` role selected, and reward below RoleLogic |
| Reward is not removed | Cleanup rule uses `Lacks All Roles` and targets the same reward role |
| Reward repeatedly disappears and returns | Another bot or conflicting rule manages the same reward |
| One reward works but another fails | The failing role is likely managed, integrated, or above RoleLogic |

[Follow the complete troubleshooting decision tree](./troubleshoot-discord-role-bot) if the sandbox result and live result differ.

<ProductCta title="Turn boosts into automatic perks">
  Add RoleLogic and build both rules on the free plan. RoleLogic follows Discord's booster role and keeps your own reward roles aligned.
</ProductCta>

## Related Guides

- [Conditional Discord role automation overview](https://rolelogic.faizo.net/discord-conditional-roles)
- [VIP and rewards templates](./common-scenarios#vip-and-rewards)
- [How rule conditions work](../concepts/conditions)
- [Discord role hierarchy](../concepts/role-hierarchy)
- [Webhook notifications for role changes](../features/webhooks-logging)
