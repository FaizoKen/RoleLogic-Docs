---
sidebar_position: 11
title: FAQ & Troubleshooting - RoleLogic Help Center
description: Get answers to common RoleLogic questions. Troubleshoot issues with rules not working, permission errors, and cross-server setup. Complete help guide.
keywords:
  - RoleLogic FAQ
  - RoleLogic not working fix
  - Discord bot troubleshooting
  - RoleLogic help
  - role automation problems
  - RoleLogic permission error
  - Discord bot help
  - RoleLogic rules not working
  - fix role automation
  - RoleLogic support
  - Discord role bot issues
image: /img/social-preview.png
---

# FAQ & Troubleshooting

Find answers to common questions and solutions for issues.

## Getting Started

### What is RoleLogic?

RoleLogic is a Discord bot that automatically manages roles. You create IF-THEN rules like "If member has Booster → add VIP," and RoleLogic handles it 24/7.

### Is RoleLogic free?

Yes. The free plan includes:

- 5 rules per server
- All features (conditions, actions, sandbox, logs)
- Cross-server sync to 2 other servers (premium expands this to 10)

Need more rules? See [Plans & Pricing](./plans).

### What permissions does RoleLogic need?

Only **"Manage Roles"**. RoleLogic cannot read messages, access DMs, or see any private information.

### Is my data safe?

Yes. We only store Discord IDs and your rule configurations. We don't store messages, passwords, or personal information. See our Privacy Policy for details.

---

## Rules & Features

### How many rules can I create?

- **Free:** 5 rules per server
- **Premium:** Up to 210 rules (varies by tier)

See [Plans & Pricing](./plans) for tier details.

### Can rules trigger other rules?

Yes, this is called **cascading**. Example:

- Rule A: If has Gold → add Silver
- Rule B: If has Silver → add Bronze

When someone gets Gold, both rules fire automatically. RoleLogic limits this to 100 passes to prevent infinite loops.

### What condition types are available?

| Condition        | Matches When                           |
| ---------------- | -------------------------------------- |
| Has Some Roles   | Member has ANY selected role           |
| Has All Roles    | Member has EVERY selected role         |
| Lacks Some Roles | Member is missing ANY selected role    |
| Lacks All Roles  | Member has NONE of the selected roles  |
| Exactly N        | Member has exactly N selected roles    |
| At Least N       | Member has N or more selected roles    |
| At Most N        | Member has N or fewer selected roles   |
| More Than N      | Member has more than N selected roles  |
| Less Than N      | Member has fewer than N selected roles |

### Can I add AND remove roles in the same rule?

Yes. Use "Add Combined Action" to add some roles AND remove others in one rule.

### How quickly do changes happen?

- **Real-time:** Rules trigger immediately when roles change — same on free and premium
- **Background sync:** A safety sweep catches anything missed in real time — about every 10 minutes on free, about every 2 minutes on premium (and premium scans large servers far faster)
- **Debounce:** 10-second delay to batch rapid changes

---

## Troubleshooting

### My rule isn't working

Check these in order:

1. **Is the rule enabled?** Check the toggle in the dashboard
2. **Is the role hierarchy correct?** RoleLogic's role must be ABOVE roles it manages
3. **Does the condition match?** Test in the sandbox with exact roles
4. **Does RoleLogic have permissions?** Verify "Manage Roles" is granted
5. **Is there a conflict?** Another bot or moderator might be reverting changes

### "Cannot manage this role"

The role is above RoleLogic in the hierarchy.

**Fix:**

1. Go to Discord Server Settings → Roles
2. Find the "RoleLogic" role
3. Drag it ABOVE roles you want to manage
4. Save

### My rule keeps getting stopped

RoleLogic stops rules when it detects conflicts (100+ reverted actions per hour).

**Common causes:**

- Another bot fighting over the same role
- A moderator manually reverting changes
- Two of your rules conflicting

**Fix:** Identify the conflict, resolve it, then re-enable the rule.

### Rule works for some members but not others

**Possible causes:**

- Role hierarchy only allows some roles to be managed
- Cross-server rule: member isn't in both servers
- Unusual role combination causes different condition to match

**Fix:** Test in sandbox with the exact role combination.

### Changes keep reverting

Another system is undoing RoleLogic's changes.

**Check:**

- Other bots managing the same roles
- Moderators manually changing roles
- Discord integrations affecting roles
- Your own rules conflicting

### Webhook notifications not appearing

Check in order:

1. RoleLogic needs **"Manage Webhooks"** permission in the channel
2. Webhook must be attached to an enabled rule
3. Rule must actually be triggering

### Can't see my server in the dashboard

- Verify you have Administrator or Manage Roles permission
- Make sure RoleLogic is invited to the server
- Try logging out and back in

### Changes are delayed

Normal delays:

- Debounce: 10 seconds
- New rule activation: up to 1 hour for full propagation

For longer delays, check [Discord status](https://status.discord.com).

---

## Cross-Server

### Can RoleLogic manage roles across servers?

Yes. Create rules that affect roles in other servers where RoleLogic is present.

**Example:** When someone gets "VIP" in Main Server, add "VIP Access" in Lounge Server.

### Cross-server action not working

**Requirements:**

- RoleLogic must be in BOTH servers
- Member must be in BOTH servers
- Role hierarchy must be correct in the TARGET server
- "Manage Roles" permission needed in both servers

### How many other servers can a guild sync to?

The cross-server sync limit counts distinct destination servers, not rules:

- **Free:** 2 destination servers per guild
- **Premium (any tier):** 10 destination servers per guild

If saving a rule would push you over the limit, the dashboard rejects the save and tells you the cap.

### What happens to my cross-server rules if I downgrade?

Nothing is deleted. RoleLogic keeps the highest-priority rules that fit your new free limit (2 distinct destination servers) and pauses the rest with a yellow "rule paused" banner in the editor. Re-subscribing reactivates them; editing or deleting also works.

---

## Premium & Billing

### How do I upgrade?

1. Open **Upgrade** in your dashboard
2. Choose a plan (monthly or annual — annual saves the most)
3. Subscribe securely through Stripe
4. Quota activates automatically right after checkout

### What happens if I downgrade?

Rules are **deactivated, not deleted**. Most recent rules stay active within your new quota. Cross-server rules that target more than 2 distinct other servers are also paused until you fit the free limit. If you upgrade again, deactivated rules reactivate automatically.

### Can I move quota between servers?

Yes, but there's a 7-day cooldown after assigning quota to prevent abuse.

### How do I cancel?

Open **Upgrade → Manage subscription** to cancel through the Stripe billing portal anytime. Features remain active until the billing period ends. (Existing Patreon supporters cancel through Patreon.)

### Refunds?

Contact support for a refund. Stripe payments can be refunded directly; legacy Patreon subscriptions are refunded through Patreon.

---

## Other Bots

### Does RoleLogic work with other bots?

Yes. When other bots (MEE6, Carl-bot, etc.) change roles, RoleLogic evaluates if your rules apply.

**Warning:** Avoid bots managing the same roles. They can conflict.

### What happens during Discord outages?

Changes may be delayed but are queued automatically. Nothing is lost.

---

## Privacy & Security

### What data does RoleLogic store?

**Stored:**

- Discord user IDs
- Server IDs
- Role IDs
- Rule configurations
- Activity logs

**NOT stored:**

- Messages or channel content
- DMs or passwords
- Payment info (handled by our payment processor, Stripe)

### How do I delete my data?

- Remove RoleLogic from your server (deletes server data)
- Contact support for complete deletion
- Revoke dashboard access in Discord settings

### Is RoleLogic secure?

Yes. We use:

- AES-256 encryption
- Secure OAuth2 via Discord
- Automatic backups
- Minimal permissions

---

## Still Need Help?

1. **Test in the sandbox** — Many issues can be diagnosed by testing
2. **Check the Activity Log** — See what's happening with your rules
3. **Search documentation** — Use the search bar
4. **Join the support server** — Get help from the community

See [Support](./support) for contact options.
