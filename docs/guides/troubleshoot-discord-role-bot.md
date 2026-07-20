---
title: Discord Role Bot Not Working? Fix It
description: Diagnose a Discord bot that is not assigning or removing roles. Check hierarchy, permissions, conditions, rule state, conflicts, and cross-server setup.
image: /img/social-preview-og.png
---

import ProductCta from '@site/src/components/Seo/ProductCta';

# Fix a Discord Role Bot That Is Not Assigning Roles

Most Discord role automation failures come from one of four places: the bot cannot manage the target role, the rule is not active, the member does not match the condition, or another automation reverses the result. Use this order so you can isolate the cause quickly.

## Fast Diagnostic Checklist

| Check | Expected result | If it fails |
| --- | --- | --- |
| Rule status | Enabled | Enable or start the rule |
| Sandbox | Expected add/remove result | Correct the condition or action |
| Bot permission | `Manage Roles` allowed | Restore the permission |
| Role hierarchy | Target role below RoleLogic | Move RoleLogic above the target |
| Live member | Has the exact source roles | Correct the member's roles or condition |
| Other automation | No immediate reversal | Stop the conflicting rule, bot, or integration |

## 1. Confirm the Rule Is Active

Open the dashboard and inspect the rule status:

- **Enabled:** available for processing.
- **Disabled:** saved but intentionally inactive.
- **Pending:** waiting for its scheduled activation; use the play control if you need to start it now.
- **Stopped:** RoleLogic detected repeated reversals or another conflict. Fix the conflict before restarting it.

Saving a rule does not guarantee that its condition currently matches a member.

## 2. Test the Exact Role Combination

Open the [testing sandbox](../features/testing-sandbox) and select the same roles the affected member has.

- If the sandbox does **not** show the expected action, the condition is the problem.
- If the sandbox **does** show the action, check Discord permissions, hierarchy, and competing automations next.

Pay special attention to these condition differences:

- `Has Some Roles` means any selected role is enough.
- `Has All Roles` means every selected role is required.
- `Lacks Some Roles` means at least one selected role is missing.
- `Lacks All Roles` means none of the selected roles may be present.

[Compare every condition with examples and truth tables](../reference/conditions-reference).

## 3. Fix “Cannot Manage This Role”

Discord only lets a bot modify roles below the bot's highest role.

1. Open **Server Settings → Roles**.
2. Find the `RoleLogic` role.
3. Drag it above each role used in an add or remove action.
4. Save the hierarchy.

RoleLogic cannot modify the server owner's role, roles above itself, or roles managed by another integration. Reading a source role and modifying a target role are different: only the target must be manageable.

[See diagrams and edge cases in the role hierarchy guide](../concepts/role-hierarchy).

## 4. Verify the Manage Roles Permission

The RoleLogic server role needs Discord's **Manage Roles** permission. Channel-specific permissions do not replace the server-level permission needed to assign roles.

Webhook notifications are separate: the bot also needs **Manage Webhooks** in the chosen log channel if you configured webhook logs.

## 5. Look for Reversals and Rule Conflicts

If a role appears and then disappears, the original action probably succeeded. Check for:

- another RoleLogic rule with the opposite action;
- another bot that manages the same target role;
- a moderator changing the role manually;
- a Discord integration that owns or synchronizes the role.

Use [webhook notifications](../features/webhooks-logging) for member role changes and the [activity log](../features/activity-log) for configuration changes. They answer different questions.

## 6. Check Processing Timing

Role changes trigger evaluation automatically. Rapid changes are grouped for
about 5 seconds on Free and 1.5 seconds on Premium. The background safety sweep
runs about every 10 minutes on Free and every 2 minutes on Premium.

New or updated rules can take up to one hour to activate through the scheduled path; use the play control to start one immediately.

## 7. Diagnose Cross-Server Rules

For a cross-server action, verify all of the following:

- RoleLogic is present in both servers.
- The member belongs to both servers.
- RoleLogic has `Manage Roles` in the destination server.
- The destination role is below RoleLogic in that server.
- The source and destination servers are linked in the dashboard.
- The rule is within the cross-server destination limit: 2 on free or 10 on premium.

[Review the complete cross-server setup](../features/cross-guild).

## Symptom-to-Fix Reference

### The rule works for some members only

Reproduce both a working and failing member in the sandbox. Their source-role combinations usually differ, or the failing target is a role RoleLogic cannot manage.

### The rule works in the sandbox but not in Discord

The rule logic is sound. Focus on permission, hierarchy, member presence, current rule status, and activation timing.

### The rule keeps stopping

RoleLogic can stop a rule after repeated reverted actions. Find the system removing or restoring the same role, resolve that conflict, and then re-enable the rule.

### Webhook notifications are missing

Confirm the rule actually triggers, the log is attached to it, and RoleLogic has `Manage Webhooks` in the target channel.

<ProductCta title="Test the fix before changing live roles">
  Open RoleLogic's sandbox to reproduce the member's role combination, then enable the corrected rule when the preview matches your intent.
</ProductCta>

## Still Stuck?

Collect the server ID, affected rule, target role, approximate time, and what the sandbox showed. Then use the [RoleLogic support options](../support) so the issue can be reproduced without sharing sensitive credentials.
