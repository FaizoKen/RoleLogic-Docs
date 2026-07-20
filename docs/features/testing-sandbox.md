---
sidebar_position: 2
title: Test Discord Role Rules Safely - Sandbox Mode
description: Test RoleLogic rules before going live. Simulate role changes safely without affecting real Discord members. Preview automation results instantly.
image: /img/social-preview-og.png
---

# Testing Sandbox

The Testing Sandbox lets you simulate rule execution before affecting real members. See exactly what would happen—safely.

## Why Test First?

Rules can affect hundreds of members instantly. A mistake might:

- Add wrong roles to everyone
- Remove important roles accidentally
- Trigger unexpected cascades

The sandbox eliminates this risk.

## How to Test

### Step 1: Select Test Roles

In the sandbox, select roles to simulate a member having.

**Example:** To test "Verified + Level 5":

1. Click "Verified" to select
2. Click "Level 5" to select

### Step 2: Run Test

Click **"Run Test"** to simulate.

### Step 3: Review Results

The sandbox shows:

- **Roles added:** What would be given
- **Roles removed:** What would be taken
- **Rules triggered:** Which rules fired and in what order

### Step 4: Iterate

Adjust test roles and run again for different scenarios.

## What to Test

### Common Scenarios

- New member (no roles except @everyone)
- Verified member with basic roles
- VIP member with premium roles
- Staff member with mod roles

### Edge Cases

- Member with all roles
- Member with conflicting roles
- Member with only @everyone

### High-Population Roles

Test with roles many members have before going live. A mistake here affects more people.

## Understanding Results

### "Roles Added"

Roles that would be assigned.

### "Roles Removed"

Roles that would be taken away.

### "Rules Triggered"

Shows the cascade:

1. Rule A triggered first (priority 0)
2. Rule B triggered second (priority 1)
3. etc.

### No Changes

If no rules matched, either:

- Conditions don't match test roles
- Rule is working correctly by not matching

## Testing Cascades

The sandbox accurately simulates cascading:

1. Initial roles selected
2. Rule A fires → adds Role X
3. Sandbox checks if Role X triggers Rule B
4. Rule B fires → adds Role Y
5. Final result shows all changes

## Tips

- **Always include @everyone** — Every member has it
- **Test after changes** — Old results are invalid after modifying rules
- **Test incrementally** — Build complex rules step by step, testing each
- **Document expected results** — Compare with actual to catch surprises

## Limitations

- **Doesn't test permissions** — Role hierarchy issues won't show
- **Instant results** — Real execution has slight latency
- **Current rules only** — Save changes before testing new versions

---

## Related

- **[Common Scenarios](../guides/common-scenarios)** — Tested patterns to adapt
- **[Best Practices](../guides/best-practices)** — Build reliable automation
- **[FAQ](../faq)** — Troubleshooting help
