---
sidebar_position: 2
title: RoleLogic Best Practices - Optimization Guide
description: Expert tips for organizing and maintaining RoleLogic rules. Learn rule naming, priority management, testing strategies, and quota optimization.
image: /img/social-preview-og.png
---

# Best Practices

Learn from experienced users to build a reliable, maintainable RoleLogic setup. These practices help you avoid common pitfalls and keep your automation running smoothly.

## Planning Your Setup

### Start With Goals, Not Rules

Before creating rules, clearly define what you want to achieve:

1. **List your goals**: "Remove guest role when verified", "VIP for boosters", etc.
2. **Prioritize**: Which are most important?
3. **Identify dependencies**: Which goals depend on others?
4. **Then create rules**: Design rules to meet your goals

This prevents creating unnecessary rules and helps you think through edge cases.

### Map Your Role Structure

Sketch your role hierarchy before automating:

```
Admin
  ↳ Moderator
      ↳ Helper
          ↳ VIP
              ↳ Member
                  ↳ Verified
                      ↳ Unverified
```

Understanding relationships helps you design rules that work together.

### Consider All Paths

Think about how members move through your roles:

- What happens when someone joins?
- What happens when they get verified?
- What if they get un-verified?
- What about edge cases (multiple roles, role removals, etc.)?

---

## Writing Effective Rules

### One Purpose Per Rule

Each rule should do one logical thing:

**Good:**

- Rule 1: "If Verified, remove Unverified"
- Rule 2: "If Verified, add Member Access"

**Less Clear:**

- Rule 1: "If Verified, remove Unverified AND add Member Access AND add Welcome Channel AND remove Pending..."

Single-purpose rules are easier to understand, test, and debug.

### Use Descriptive Names

Future you will thank present you:

**Good names:**

- "Remove Unverified when member gets Verified"
- "Auto-VIP for Server Boosters"
- "Staff cleanup on demotion"

**Bad names:**

- "Rule 1"
- "New rule"
- "asdf"

### Keep Conditions Simple

When possible, use straightforward conditions:

**Simpler (preferred):**

> IF has some of [Verified] → THEN add [Member]

**More complex (when needed):**

> IF has all of [Verified, Level 10] AND lacks some of [Muted, Banned] → THEN add [Trusted]

Use complexity only when the situation requires it.

---

## Managing Priority

### Use Priority Intentionally

Don't just assign random priorities. Plan which rules should run first:

1. **Foundation rules first** (Priority 0-2): Verification, basic access
2. **Feature rules middle** (Priority 3-6): Tiers, rewards, perks
3. **Cleanup rules last** (Priority 7-10): Removing old roles, edge case handling

### Leave Gaps

Don't use consecutive priorities (0, 1, 2, 3...). Leave gaps for future rules:

**Better approach:**

- Rule A: Priority 0
- Rule B: Priority 5
- Rule C: Priority 10

Now you can add rules at priority 2 or 7 without renumbering everything.

### Document Priority Logic

Keep notes about why rules have certain priorities. This helps when reviewing later.

---

## Testing Strategies

### Always Test Before Enabling

Make sandbox testing a habit:

1. Create or modify a rule
2. Test with expected role combinations
3. Test edge cases
4. Then enable

### Test Edge Cases

Go beyond happy paths:

- Test with no roles (except @everyone)
- Test with all possible roles
- Test with conflicting roles
- Test roles that many members have

### Test Rule Interactions

When adding new rules, test how they interact with existing ones:

1. What rules exist that might trigger?
2. What rules might this new rule trigger?
3. Test the full cascade

### Verify After Major Changes

After significant modifications:

1. Manually verify a few members
2. Check the Activity Log
3. Monitor webhook notifications
4. Be available to fix issues quickly

---

## Maintenance Routines

### Regular Reviews

Schedule periodic rule reviews (monthly is good for most servers):

- [ ] Are all rules still needed?
- [ ] Are descriptions accurate?
- [ ] Any rules that never trigger?
- [ ] Any roles that no longer exist?

### Clean Up Unused Rules

Delete or disable rules that:

- Reference deleted roles
- Were for temporary events
- Are duplicated by other rules
- Were tests you forgot to remove

### Update After Server Changes

When your server changes (new roles, structure changes):

1. Review affected rules
2. Update as needed
3. Test the changes

---

## Organization Strategies

### Group Related Rules

Mentally group rules by purpose:

**Verification Group:**

- "Add Pending to new members"
- "Remove Pending when Verified"
- "Add Member Access when Verified"

**VIP Group:**

- "VIP for Boosters"
- "VIP Perks for VIP"
- "Remove VIP when no longer Booster"

### Use Consistent Naming

Establish naming patterns:

- "Remove [X] when [Y]"
- "Add [X] to [Y] members"
- "Auto-[action] for [trigger]"

Consistency makes scanning rule lists easier.

### Document Complex Logic

For intricate setups, maintain external documentation:

- Why rules are configured certain ways
- How rules work together
- Edge cases you've considered

---

## Performance Considerations

### Minimize Redundant Rules

Look for opportunities to consolidate:

**Instead of:**

- Rule 1: If "Bronze", add "Has Tier"
- Rule 2: If "Silver", add "Has Tier"
- Rule 3: If "Gold", add "Has Tier"

**Use:**

- Rule 1: If has some of [Bronze, Silver, Gold], add "Has Tier"

### Avoid Unnecessary Cascades

While cascading can be powerful, excessive cascades slow processing. Design rules to minimize chain reactions when possible.

### Use Threshold Conditions Wisely

Threshold conditions (At Least N, Exactly N, etc.) can replace multiple rules:

**Instead of:** Separate rules for 1 badge, 2 badges, 3 badges
**Use:** "At Least 3" badges → add Collector role

---

## Security Best Practices

### Protect Staff Roles

Position RoleLogic's role carefully—it shouldn't be able to assign Admin or Owner roles.

Recommended hierarchy:

```
Owner
Admin
RoleLogic ← Below staff roles
Moderator
VIP
Member
```

### Review Rule Changes

Use the Activity Log to:

- Verify only authorized users modify rules
- Catch unexpected changes
- Audit automation decisions

### Test Before Production

For important rules, test in a staging environment first if possible, or use the sandbox extensively.

### Be Careful With Remove Actions

Remove actions are powerful. Double-check:

- You're targeting the right roles
- You're not removing critical access
- The condition is specific enough

---

## Quota Management

### Stay Within Limits

Monitor your quota usage:

- Don't create rules you don't need
- Delete obsolete rules promptly
- Plan before hitting limits

### Consolidate Efficiently

Look for ways to do more with fewer rules:

- Combine similar conditions
- Use threshold conditions
- Let rules cascade

### Upgrade When Needed

If you consistently hit limits, consider upgrading rather than constantly managing around constraints.

---

## Backup and Recovery

### Document Your Setup

Keep records of your rules (screenshots, notes, etc.). If something goes wrong, you can recreate your setup.

### Make Changes Incrementally

When modifying rules:

1. Change one thing at a time
2. Test after each change
3. Know how to revert

### Use Disable Instead of Delete

When unsure about removing a rule, disable it first. You can delete later once you confirm it's not needed.

---

## Working With Teams

### Establish Ownership

If multiple people manage rules:

- Who has authority to create/modify rules?
- How are changes communicated?
- Who troubleshoots issues?

### Use the Activity Log

The Activity Log helps teams:

- See who changed what
- Coordinate modifications
- Investigate issues

### Document Decisions

When making rule decisions as a team, document the rationale. This helps future team members understand why things are configured certain ways.

---

## Summary Checklist

Use this checklist when setting up or reviewing your RoleLogic:

- [ ] Goals clearly defined before creating rules
- [ ] Each rule has one clear purpose
- [ ] Descriptive names on all rules
- [ ] Priorities assigned intentionally with gaps
- [ ] All rules tested in sandbox
- [ ] Edge cases considered and tested
- [ ] Regular review scheduled
- [ ] Unused rules cleaned up
- [ ] Complex logic documented
- [ ] Staff roles protected from automation
- [ ] Activity Log monitored

---

## Related Resources

- **[Common Scenarios](./common-scenarios)** — Patterns you can adapt
- **[FAQ](../faq)** — Troubleshooting and common questions
- **[Testing Sandbox](../features/testing-sandbox)** — Verify before going live
