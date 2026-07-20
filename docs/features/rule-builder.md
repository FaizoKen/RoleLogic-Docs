---
sidebar_position: 1
title: Use the RoleLogic Visual Rule Builder
description: Configure, test, duplicate, pause, prioritize, and troubleshoot IF-THEN rules in the RoleLogic visual dashboard.
image: /img/social-preview-og.png
---

# Visual Rule Builder

The Rule Builder is RoleLogic's main interface for creating automation rules. No coding required—just point and click.

## Dashboard Layout

### Sidebar (Left)

- Server name and icon
- Rule list with status indicators
- Quota info (rules used / available)
- Navigation to other features

### Main Area (Right)

- Rule editor when creating/editing
- Test results when using sandbox

## Creating a Rule

### Step 1: Add New Rule

Click **"Add New Rule"** in the sidebar or main area.

### Step 2: Set the Condition (IF)

1. **Choose condition type:** Has Some, Has All, Lacks Some, etc.
2. **Select roles:** Click to pick roles from your server
3. **Set threshold:** For count-based conditions (At Least N, etc.)
4. **Add more conditions:** Click "Add AND Condition" for complex rules

### Step 3: Set the Action (THEN)

1. **Choose action type:** Add Roles or Remove Roles
2. **Select roles:** Pick roles to add or remove
3. **Add combined action:** Click to both add AND remove roles

### Step 3b: Add an ELSE Branch (Optional)

Click **"Add ELSE Branch"** below the IF/THEN cards to add actions that run
when the condition does **not** match.

1. **Choose action type:** Add Roles or Remove Roles
2. **Select roles:** Pick roles for the ELSE case
3. **Add combined action:** Same as THEN — one extra add/remove block

The classic use case is keeping a role in sync with a condition:

```
IF has some of [VIP]
THEN add Gold
ELSE remove Gold
```

Members with VIP get Gold; members without VIP lose it — one rule, both
directions. Rules without an ELSE branch behave exactly as before: nothing
happens when the condition doesn't match.

:::tip
A rule with an ELSE branch acts on **every** member (one branch always
applies). The save-time loop check covers ELSE branches, but test in the
[sandbox](./testing-sandbox) to make sure the reach is what you intend.
:::

### Step 4: Configure Settings

- **Description:** Name your rule clearly ("VIP for Boosters")
- **Priority:** Order of execution (0 runs first)
- **Enabled:** Toggle on to activate

### Step 5: Save

Click **"Save Changes"**. Rule activates immediately if enabled.

## Managing Rules

### Enable/Disable

Toggle the switch to pause rules without deleting them.

### Edit

Click any rule in the sidebar to modify it.

### Delete

Select rule → Find delete option → Confirm.

Deleted rules cannot be recovered.

## Rule Status

| Status   | Color  | Meaning                       |
| -------- | ------ | ----------------------------- |
| Enabled  | Green  | Active and processing         |
| Disabled | Gray   | Saved but not running         |
| Pending  | Yellow | Queued, waiting for sync      |
| Stopped  | Red    | Auto-stopped due to conflicts |

## Tips

- **Descriptive names:** "Remove Guest when Verified" not "Rule 1"
- **Start simple:** Test basic rules before complex chains
- **Test first:** Use the [sandbox](./testing-sandbox) before going live
- **Unique priorities:** Each rule needs a different priority number

---

## Related

- **[Testing Sandbox](./testing-sandbox)** — Verify rules before going live
- **[Common Scenarios](../guides/common-scenarios)** — Example configurations
- **[Conditions Reference](../reference/conditions-reference)** — All condition types
