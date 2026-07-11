---
sidebar_position: 1
title: RoleLogic Conditions Reference - Complete Guide
description: Technical reference for all 9 RoleLogic conditions with truth tables. Has Some, Has All, Lacks, At Least N, Exactly N conditions explained.
keywords:
  - RoleLogic conditions reference
  - Discord role conditions guide
  - has roles condition syntax
  - lacks roles condition
  - threshold conditions reference
  - at least N roles syntax
  - role matching reference
image: /img/social-preview.png
---

# Conditions Reference

This reference covers all available condition types in RoleLogic. Each condition determines when a rule should trigger based on a member's current roles.

## Condition Basics

Every condition has:

- **Type**: How to evaluate the roles
- **Role Selection**: Which roles to check
- **Threshold** (some conditions): A number to compare against

Conditions evaluate to **true** (match) or **false** (no match). When true,
the rule's **THEN** actions execute. When false, the rule's **ELSE** actions
execute — if the rule has an ELSE branch. Rules without an ELSE branch do
nothing on a non-match.

---

## Role Presence Conditions

These conditions check whether a member has or lacks specific roles.

### Has Some Roles

**Syntax:** `Has Some Roles → [Role A, Role B, ...]`

**Matches when:** Member has **at least one** of the specified roles.

**Logic:** `Member has Role A OR Member has Role B OR ...`

| Member Has | Roles to Check | Result      |
| ---------- | -------------- | ----------- |
| [A]        | [A, B, C]      | ✅ Match    |
| [B, C]     | [A, B, C]      | ✅ Match    |
| [D]        | [A, B, C]      | ❌ No Match |
| [] (none)  | [A, B, C]      | ❌ No Match |

**Example:**

> IF has some of [Booster, Premium, VIP] → add Exclusive Access

Any member with Booster OR Premium OR VIP gets access.

---

### Has All Roles

**Syntax:** `Has All Roles → [Role A, Role B, ...]`

**Matches when:** Member has **every single one** of the specified roles.

**Logic:** `Member has Role A AND Member has Role B AND ...`

| Member Has   | Roles to Check | Result      |
| ------------ | -------------- | ----------- |
| [A, B, C]    | [A, B, C]      | ✅ Match    |
| [A, B, C, D] | [A, B, C]      | ✅ Match    |
| [A, B]       | [A, B, C]      | ❌ No Match |
| [A]          | [A, B, C]      | ❌ No Match |

**Example:**

> IF has all of [Verified, Level 10, Active] → add Trusted

Member must have ALL THREE roles to be trusted.

---

### Lacks Some Roles

**Syntax:** `Lacks Some Roles → [Role A, Role B, ...]`

**Matches when:** Member is **missing at least one** of the specified roles.

**Logic:** `Member lacks Role A OR Member lacks Role B OR ...`

| Member Has   | Roles to Check | Result                |
| ------------ | -------------- | --------------------- |
| [A, B]       | [A, B, C]      | ✅ Match (lacks C)    |
| [A]          | [A, B, C]      | ✅ Match (lacks B, C) |
| [A, B, C]    | [A, B, C]      | ❌ No Match           |
| [A, B, C, D] | [A, B, C]      | ❌ No Match           |

**Example:**

> IF lacks some of [Verified, Rules Accepted] → add Needs Setup

Member missing ANY verification step gets flagged.

---

### Lacks All Roles

**Syntax:** `Lacks All Roles → [Role A, Role B, ...]`

**Matches when:** Member has **none** of the specified roles.

**Logic:** `Member lacks Role A AND Member lacks Role B AND ...`

| Member Has | Roles to Check | Result      |
| ---------- | -------------- | ----------- |
| [D, E]     | [A, B, C]      | ✅ Match    |
| [] (none)  | [A, B, C]      | ✅ Match    |
| [A]        | [A, B, C]      | ❌ No Match |
| [B, C]     | [A, B, C]      | ❌ No Match |

**Example:**

> IF lacks all of [Bronze, Silver, Gold, Platinum] → add No Tier

Only members with ZERO tier roles get tagged.

:::warning
Remember that all members have @everyone. Include it in your testing!
:::

---

## Threshold Conditions

These conditions count matching roles and compare against a number.

### Exactly N Roles

**Syntax:** `Exactly N Roles → [Role A, Role B, ...], Threshold: N`

**Matches when:** Member has **exactly N** roles from the specified set.

**Logic:** `Count of matching roles = N`

| Member Has | Roles to Check | Threshold | Result      |
| ---------- | -------------- | --------- | ----------- |
| [A, B]     | [A, B, C, D]   | 2         | ✅ Match    |
| [A]        | [A, B, C, D]   | 2         | ❌ No Match |
| [A, B, C]  | [A, B, C, D]   | 2         | ❌ No Match |

**Example:**

> IF exactly 1 of [Bronze, Silver, Gold] → (rule logic)

Only members with precisely ONE tier role match.

---

### At Least N Roles

**Syntax:** `At Least N Roles → [Role A, Role B, ...], Threshold: N`

**Matches when:** Member has **N or more** roles from the specified set.

**Logic:** `Count of matching roles >= N`

| Member Has | Roles to Check | Threshold | Result      |
| ---------- | -------------- | --------- | ----------- |
| [A, B]     | [A, B, C, D]   | 2         | ✅ Match    |
| [A, B, C]  | [A, B, C, D]   | 2         | ✅ Match    |
| [A]        | [A, B, C, D]   | 2         | ❌ No Match |

**Example:**

> IF at least 3 of [Badge 1, Badge 2, Badge 3, Badge 4, Badge 5] → add Collector

Members with 3, 4, or 5 badges get the Collector role.

---

### At Most N Roles

**Syntax:** `At Most N Roles → [Role A, Role B, ...], Threshold: N`

**Matches when:** Member has **N or fewer** roles from the specified set.

**Logic:** `Count of matching roles <= N`

| Member Has | Roles to Check | Threshold | Result      |
| ---------- | -------------- | --------- | ----------- |
| [A]        | [A, B, C, D]   | 2         | ✅ Match    |
| [A, B]     | [A, B, C, D]   | 2         | ✅ Match    |
| []         | [A, B, C, D]   | 2         | ✅ Match    |
| [A, B, C]  | [A, B, C, D]   | 2         | ❌ No Match |

**Example:**

> IF at most 1 of [Warning 1, Warning 2, Warning 3] → add Good Standing

Members with 0 or 1 warnings are in good standing.

---

### More Than N Roles

**Syntax:** `More Than N Roles → [Role A, Role B, ...], Threshold: N`

**Matches when:** Member has **more than N** roles from the specified set.

**Logic:** `Count of matching roles > N`

| Member Has | Roles to Check | Threshold | Result              |
| ---------- | -------------- | --------- | ------------------- |
| [A, B, C]  | [A, B, C, D]   | 2         | ✅ Match (3 > 2)    |
| [A, B]     | [A, B, C, D]   | 2         | ❌ No Match (2 = 2) |
| [A]        | [A, B, C, D]   | 2         | ❌ No Match (1 < 2) |

**Example:**

> IF more than 3 of [Event 1, Event 2, Event 3, Event 4, Event 5] → add Event Veteran

Members with 4+ events are veterans.

---

### Less Than N Roles

**Syntax:** `Less Than N Roles → [Role A, Role B, ...], Threshold: N`

**Matches when:** Member has **fewer than N** roles from the specified set.

**Logic:** `Count of matching roles < N`

| Member Has | Roles to Check | Threshold | Result              |
| ---------- | -------------- | --------- | ------------------- |
| [A]        | [A, B, C, D]   | 2         | ✅ Match (1 < 2)    |
| []         | [A, B, C, D]   | 2         | ✅ Match (0 < 2)    |
| [A, B]     | [A, B, C, D]   | 2         | ❌ No Match (2 = 2) |
| [A, B, C]  | [A, B, C, D]   | 2         | ❌ No Match (3 > 2) |

**Example:**

> IF less than 2 of [Daily 1, Daily 2, Daily 3] → add Needs Activity

Members with 0 or 1 daily roles need more activity.

---

## Combining Conditions (AND)

You can add up to **9 additional conditions** to create complex logic.

### Syntax

```
IF [Condition 1]
AND [Condition 2]
AND [Condition 3]
...
THEN [Action]
ELSE [Action]   (optional)
```

**All conditions must be true** for the THEN actions to trigger. If **any**
condition is false and the rule has an ELSE branch, the ELSE actions trigger
instead.

### Example

```
IF has some of [Verified]
AND has at least 2 of [Event 1, Event 2, Event 3, Event 4]
AND lacks all of [Banned, Muted]
THEN add Event Regular
```

This fires when:

1. Member is Verified, AND
2. Member participated in 2+ events, AND
3. Member is not Banned or Muted

---

## The ELSE Branch

Any rule can carry an optional **ELSE** branch — actions that run when the
condition evaluates to **false**. The ELSE branch has the same capabilities
as THEN: Add or Remove, multiple roles, one combined action, and cross-server
roles.

### Syntax

```
IF has some of [VIP]
THEN add Gold
ELSE remove Gold
```

| Member Has  | Condition | Branch | Result       |
| ----------- | --------- | ------ | ------------ |
| [VIP]       | ✅ true   | THEN   | Gold added   |
| [VIP, Gold] | ✅ true   | THEN   | Gold kept    |
| [Gold]      | ❌ false  | ELSE   | Gold removed |
| [] (none)   | ❌ false  | ELSE   | No change    |

### Notes

- A rule **without** an ELSE branch does nothing on a non-match — exactly the
  pre-ELSE behavior.
- With multiple AND conditions, ELSE fires when **any** condition fails
  (the negation of the whole AND chain).
- A rule with an ELSE branch acts on **every** member — one branch always
  applies. The save-time loop check simulates both branches, so configurations
  that would oscillate (e.g. `IF has A → remove A, ELSE add A`) are rejected
  at save time.
- If two rules write the same role, the **higher-priority rule wins** each
  evaluation pass — ELSE branches compete for roles exactly like THEN actions.
- When a member **leaves** the server, rules are evaluated as if the member
  has no roles (this is how cross-server roles get revoked). ELSE branches
  fire during that evaluation, just like Lacks conditions do — keep this in
  mind for cross-server ELSE actions.

---

## Condition Selection Guide

| Goal                    | Recommended Condition |
| ----------------------- | --------------------- |
| Has any qualifying role | Has Some Roles        |
| Has all required roles  | Has All Roles         |
| Missing required step   | Lacks Some Roles      |
| Has none of a group     | Lacks All Roles       |
| Specific count required | Exactly N Roles       |
| Minimum count required  | At Least N Roles      |
| Maximum count allowed   | At Most N Roles       |
| Over a threshold        | More Than N Roles     |
| Under a threshold       | Less Than N Roles     |

---

## Tips

### Single Role Checks

For checking a single role, "Has Some Roles" with one role selected is simplest:

> IF has some of [Verified] → THEN ...

### @everyone Consideration

Remember @everyone is always present. This affects "Lacks" conditions especially.

### Testing Conditions

Always test conditions in the sandbox before going live, especially threshold conditions.

---

## Related

- **[Understanding Conditions](../concepts/conditions)** — Conceptual explanation
- **[Common Scenarios](../guides/common-scenarios)** — See conditions in action
- **[Testing Sandbox](../features/testing-sandbox)** — Test your conditions
