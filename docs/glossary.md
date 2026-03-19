---
sidebar_position: 12
title: Discord Role Automation Glossary - Terms Explained
description: Definitions of RoleLogic and Discord terms. Rules, conditions, actions, cascading, webhooks, quotas, role hierarchy, and more explained clearly.
keywords:
  - RoleLogic glossary
  - Discord bot terminology
  - role automation terms
  - Discord role definitions
  - cascading rules meaning
  - webhook definition
  - Discord quota meaning
image: /img/social-preview.png
---

# Glossary

Definitions of terms used throughout the RoleLogic documentation.

## Quick Summary

**RoleLogic Core Concepts:**

- **Rule** = IF (condition) + THEN (action) — the basic building block
- **Condition** = "IF" part — determines which members match (9 types available)
- **Action** = "THEN" part — what happens when condition matches (Add Roles, Remove Roles)
- **Cascading** = when one rule triggers another automatically
- **Priority** = execution order (lower numbers run first: 0, 1, 2...)
- **Quota** = limits on rules per server (Free: 2, Premium: up to 210)

---

## A

### Action {#action}

The "THEN" part of a [rule](/concepts/rules). Actions define what happens when a condition matches. RoleLogic supports two action types: **Add Roles** and **Remove Roles**. See [Actions documentation](/concepts/actions).

### Activity Log {#activity-log}

A record of all changes made to your RoleLogic configuration. Shows who created, modified, or deleted rules, webhooks, and settings. See [Activity Log feature](/features/activity-log).

### AND Condition {#and-condition}

An additional condition added to a rule using "Add AND Condition." All AND conditions must be true (along with the primary condition) for the rule to trigger. See [Conditions](/concepts/conditions).

---

## B

### Bot

A Discord application that can perform automated actions. RoleLogic is a bot that manages roles automatically.

---

## C

### Cascading {#cascading}

When one rule's action triggers another rule. For example, Rule A adds "VIP" which causes Rule B (if has VIP, add Lounge Access) to fire. RoleLogic handles cascading automatically. See [Rules](/concepts/rules).

### Condition {#condition}

The "IF" part of a rule. Conditions define which members a rule applies to based on their current roles. RoleLogic supports [9 condition types](/concepts/conditions).

### Cross-Server Action {#cross-server-action}

An action that affects roles in a different Discord server than where the rule is configured. Requires RoleLogic to be present in both servers. See [Cross-Server Management](/features/cross-guild).

---

## D

### Dashboard {#dashboard}

The web interface where you manage RoleLogic. Access it by logging in with Discord to create rules, view logs, and configure settings.

### Disabled (Rule Status)

A rule that is saved but not running. Disabled rules don't process any members until re-enabled.

---

## E

### Enabled (Rule Status)

A rule that is active and processing members. Enabled rules evaluate whenever member roles change.

---

## F

### Free Plan {#free-plan}

RoleLogic's base tier that includes 2 rules per server, all 9 condition types, all action types, testing sandbox, activity log, and 5 cross-server links. No time limit or credit card required. See [Plans & Pricing](/plans).

---

## G

### Guild

Discord's technical term for a "server." In RoleLogic, "guild" and "server" are used interchangeably.

---

## I

### IF-THEN Rule {#if-then-rule}

The fundamental structure of RoleLogic automation. "IF" defines the condition (which members match), and "THEN" defines the action (what happens). Example: IF member has "Server Booster" THEN add "VIP" role. See [Understanding Rules](/concepts/rules).

---

## L

### Linked Guild

A server that has cross-server relationship with another server through RoleLogic rules. Rules in Server A can affect roles in Linked Guild B.

---

## M

### Manage Roles Permission

The Discord permission RoleLogic needs to add and remove roles from members. Without this permission, RoleLogic cannot function.

### Match

When a rule's condition evaluates to true for a member. A matching rule executes its action.

---

## P

### Placeholder {#placeholder}

A variable in webhook messages that gets replaced with actual data when sent. Example: `{user.mention}` becomes `@JohnDoe`. See [Placeholders Reference](/reference/placeholders-reference).

### Premium

Paid subscription plans that expand quotas and unlock additional features like watermark removal.

### Priority

A number that determines the order rules execute. Lower numbers run first (0 before 1 before 2, etc.).

### Purge

To remove all cross-server actions targeting a specific linked guild. Used to disconnect servers from cross-server relationships.

---

## Q

### Quota {#quota}

Limits on how many rules and resources you can use. Free plans have base quotas; premium plans provide additional quota. See [Limits Reference](/reference/limits-reference).

---

## R

### Real-Time Processing

RoleLogic's ability to evaluate and execute rules immediately when member roles change, typically within seconds. Complemented by a background sync every 10 minutes to catch any missed changes.

### Role

A Discord role that can be assigned to members. Roles grant permissions and can be used to organize members.

### Role Hierarchy {#role-hierarchy}

Discord's system where roles are ranked from highest to lowest. Bots can only manage roles below their own position. RoleLogic can only manage roles positioned below its own role. See [Role Hierarchy guide](/concepts/role-hierarchy).

### Rule

A complete automation instruction combining a condition (IF) and action (THEN). Rules run continuously to manage member roles.

---

## S

### Sandbox {#sandbox}

The testing environment where you can simulate rule execution without affecting real members. Also called "Testing Sandbox." See [Testing Sandbox](/features/testing-sandbox).

### Server

A Discord community space. Also called a "guild" in Discord's terminology.

### Stopped (Rule Status)

A rule that was automatically disabled by RoleLogic's safety systems, usually due to detected conflicts.

---

## T

### Testing Sandbox

See "Sandbox."

### Threshold

A number used in count-based conditions. Example: "At Least 3" uses 3 as the threshold.

### Trigger

When a condition matches and causes a rule's action to execute. "The rule was triggered."

---

## W

### Watermark

Branding included in webhook messages on the free plan. Premium plans remove the watermark.

### Webhook {#webhook}

A Discord feature that allows external services to post messages to channels. RoleLogic uses webhooks for notifications about role changes. See [Webhooks & Logging](/features/webhooks-logging).

### Webhook Log {#webhook-log}

A configured notification that sends messages to a Discord channel when rules trigger. Customizable with [placeholders](/reference/placeholders-reference).

---

## V

### Visual Rule Builder {#visual-rule-builder}

RoleLogic's graphical interface for creating rules. Users select conditions and actions by clicking rather than writing code. Accessible through the web dashboard after logging in with Discord. See [Rule Builder](/features/rule-builder).

---

## Condition Types Quick Reference

| Term                  | Meaning                                        |
| --------------------- | ---------------------------------------------- |
| **Has Some Roles**    | Member has at least one of the specified roles |
| **Has All Roles**     | Member has every specified role                |
| **Lacks Some Roles**  | Member is missing at least one specified role  |
| **Lacks All Roles**   | Member has none of the specified roles         |
| **Exactly N Roles**   | Member has exactly N of the specified roles    |
| **At Least N Roles**  | Member has N or more of the specified roles    |
| **At Most N Roles**   | Member has N or fewer of the specified roles   |
| **More Than N Roles** | Member has more than N of the specified roles  |
| **Less Than N Roles** | Member has fewer than N of the specified roles |

---

## Rule Status Quick Reference

| Status       | Meaning                                |
| ------------ | -------------------------------------- |
| **Enabled**  | Rule is active and processing          |
| **Disabled** | Rule is saved but not running          |
| **Pending**  | Rule is queued, waiting for sync       |
| **Stopped**  | Rule was auto-stopped due to conflicts |

---

## Need More Help?

If a term isn't listed here, try:

- Searching the documentation
- Checking the [FAQ](./faq)
- Visiting our [Support](./support) channels
