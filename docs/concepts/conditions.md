---
sidebar_position: 2
title: All 9 RoleLogic Condition Types Explained
description: Complete guide to RoleLogic conditions. Has Some, Has All, Lacks, At Least N, and 5 more condition types with examples and truth tables.
keywords:
  - RoleLogic condition types
  - Discord role conditions
  - has roles condition Discord
  - lacks roles condition
  - threshold conditions Discord
  - at least N roles
  - role matching automation
  - Discord bot conditions
image: /img/social-preview.png
---

# Condition Types

Conditions are the "IF" part of your rules. They determine which members a rule applies to.

## Quick Reference

| Condition            | Matches When                  |
| -------------------- | ----------------------------- |
| **Has Some Roles**   | Member has ANY of the roles   |
| **Has All Roles**    | Member has EVERY role         |
| **Lacks Some Roles** | Member is missing ANY role    |
| **Lacks All Roles**  | Member has NONE of the roles  |
| **Exactly N**        | Member has exactly N roles    |
| **At Least N**       | Member has N or more roles    |
| **At Most N**        | Member has N or fewer roles   |
| **More Than N**      | Member has more than N roles  |
| **Less Than N**      | Member has fewer than N roles |

## Role Presence Conditions

### Has Some Roles

**Matches if:** Member has at least one of the specified roles.

**Example:**

> IF has some of [Booster, Premium, VIP] → add Exclusive-Access

Fires if member has Booster OR Premium OR VIP.

### Has All Roles

**Matches if:** Member has every specified role.

**Example:**

> IF has all of [Verified, Level 10, Active] → add Trusted

Only fires if member has ALL THREE roles.

### Lacks Some Roles

**Matches if:** Member is missing at least one role.

**Example:**

> IF lacks some of [Verified, Rules-Accepted] → add Needs-Setup

Fires if member is missing Verified OR Rules-Accepted.

### Lacks All Roles

**Matches if:** Member has none of the specified roles.

**Example:**

> IF lacks all of [Bronze, Silver, Gold] → add No-Tier

Only fires if member has NONE of the tier roles.

## Threshold Conditions

These count roles from a set and compare to a number.

### Exactly N Roles

**Example:**

> IF has exactly 1 of [Bronze, Silver, Gold] → add Single-Tier

Only members with precisely one tier role.

### At Least N Roles

**Example:**

> IF has at least 2 of [Helper, Mod, Admin] → add Multi-Staff

Members with 2 or more of these roles.

### At Most N Roles

**Example:**

> IF has at most 1 of [Warning-1, Warning-2, Warning-3] → add Good-Standing

Members with 0 or 1 warnings.

### More Than N Roles

**Example:**

> IF has more than 3 of [Badge-1, Badge-2, Badge-3, Badge-4, Badge-5] → add Collector

Members with 4 or 5 badges (not 3).

### Less Than N Roles

**Example:**

> IF has less than 2 of [Daily-1, Daily-2, Daily-3] → add Needs-Activity

Members with 0 or 1 daily roles.

## Combining Conditions (AND)

Add up to 9 additional conditions with AND logic. All must be true.

**Example:**

> IF has some of [Verified]
> AND has at least 2 of [Event-1, Event-2, Event-3, Event-4]
> AND lacks all of [Banned, Muted]
> THEN add Event-Regular

## Choosing the Right Condition

| Goal             | Use                           |
| ---------------- | ----------------------------- |
| Has this role    | Has Some Roles with 1 role    |
| Has both X and Y | Has All Roles                 |
| Missing setup    | Lacks All Roles               |
| Any tier role    | Has Some Roles with tier list |
| Minimum count    | At Least N                    |
| Exact count      | Exactly N                     |

## Tips

- **@everyone**: Every member has this role. Include it in testing with "Lacks" conditions.
- **Single role check**: Use "Has Some Roles" with one role selected.
- **Test first**: Use the [sandbox](../features/testing-sandbox) to verify conditions work.

---

## Related

- **[Understanding Rules](./rules)** — How rules work
- **[Actions](./actions)** — What happens when conditions match
- **[Common Scenarios](../guides/common-scenarios)** — See conditions in action
- **[Conditions Reference](../reference/conditions-reference)** — Complete technical reference for all condition types
- **[Rule Builder](../features/rule-builder)** — Create conditions visually in the dashboard
