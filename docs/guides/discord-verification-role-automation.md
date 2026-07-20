---
title: Automate Discord Verification Roles
description: Automatically add member access and remove unverified roles after another Discord verification system assigns a Verified role. Includes exact RoleLogic rules.
image: /img/social-preview-og.png
---

import ProductCta from '@site/src/components/Seo/ProductCta';

# Automate Discord Roles After Verification

RoleLogic can turn a `Verified` role into the rest of your onboarding flow. When a verification bot or moderator assigns `Verified`, one RoleLogic rule can add member access and remove temporary roles automatically.

:::note[What RoleLogic does]
RoleLogic does not perform the identity or CAPTCHA check itself. It reacts to the Discord role created by your existing verification process.
:::

## The Recommended Verification Rule

This setup uses one of the free plan's five rules.

```text
IF Has Some Roles: Verified
THEN Add Roles: Member, Member Channels
AND Remove Roles: Unverified, Guest, Pending
```

The combined action keeps the transition atomic: once `Verified` appears, RoleLogic grants the permanent access roles and removes the temporary onboarding roles in the same rule.

## Set It Up Step by Step

### 1. Check the role flow

Your verification system must assign a dedicated role such as `Verified`. If it uses a different name, use that role in the condition.

### 2. Position RoleLogic correctly

In **Server Settings → Roles**, place the RoleLogic role above every role it should add or remove. It can read a role above itself, but Discord only lets it modify roles below itself.

[See the complete Discord role hierarchy guide](../concepts/role-hierarchy).

### 3. Create the condition

In the [RoleLogic dashboard](https://rolelogic.faizo.net/dashboard), create a rule and select:

- **Condition:** Has Some Roles
- **Role:** Verified

`Has Some Roles` is appropriate even with one selected role. The condition becomes true as soon as the member receives `Verified`.

### 4. Add and remove roles

Set the primary action to add your permanent member role. Then use **Add Combined Action** to remove `Unverified`, `Guest`, or any other temporary role.

### 5. Test before enabling

In the [testing sandbox](../features/testing-sandbox), simulate a member who has both `Verified` and `Unverified`. Confirm that the preview adds the member-access roles and removes the onboarding roles.

## Require Two Verification Signals

For a flow where members must both verify and accept rules, use `Has All Roles`:

```text
IF Has All Roles: Identity Verified, Rules Accepted
THEN Add Roles: Verified, Member
AND Remove Roles: Unverified, Pending
```

This rule waits until both source roles exist. It will not grant access after only one step.

## Revoke Access When Verification Is Removed

If removing `Verified` should also remove member access, add a second rule:

```text
IF Lacks All Roles: Verified
THEN Remove Roles: Member, Member Channels
```

Use this only when every legitimate member is expected to keep `Verified`. Test moderators, bots, and legacy members before enabling it server-wide.

## Common Problems

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `Verified` appears but nothing changes | Rule disabled or still pending | Enable it, run it immediately, and check its status |
| Only some target roles change | One role is above RoleLogic | Move each managed role below RoleLogic |
| Members receive access too early | Condition uses `Has Some` for a multi-step flow | Use `Has All Roles` when every prerequisite is required |
| Access returns after removal | Another rule or bot is adding it | Check the activity and webhook logs, then remove the conflict |

For a full diagnostic sequence, use [Discord role bot troubleshooting](./troubleshoot-discord-role-bot).

<ProductCta title="Automate the handoff after verification">
  Add RoleLogic to your server and build this flow with one combined rule. The verification check stays with your current system; RoleLogic handles the role cleanup and access handoff.
</ProductCta>

## Related Guides

- [Browse external verification and activity integrations](https://rolelogic.faizo.net/integrations/)
- [50+ Discord role automation templates](./common-scenarios)
- [Conditions explained](../concepts/conditions)
- [Add and remove role actions](../concepts/actions)
- [RoleLogic limits and quotas](../reference/limits-reference)
