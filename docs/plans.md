---
sidebar_position: 10
title: RoleLogic Pricing - Free & Premium Plans
description: RoleLogic includes 5 free rules and integrations per server. Compare plans with up to 213 of each, faster sync, no webhook watermark, and DWEEB benefits.
image: /img/social-preview-og.png
---

# Plans & Pricing

RoleLogic offers a generous free plan and premium options for servers that need more capacity.

## Plan Comparison

| Feature               | Free           | Premium      |
| --------------------- | -------------- | ------------ |
| Rules per server      | 5              | Up to 213    |
| Integrations per server | 5            | Up to 213    |
| All condition types   | ✅             | ✅           |
| All action types      | ✅             | ✅           |
| Testing sandbox       | ✅             | ✅           |
| Activity log          | ✅             | ✅           |
| Distinct destination servers | 2             | 10           |
| Users per role link   | 1,000          | Up to 30 million |
| Real-time response    | Within ~5 seconds | Within ~1.5 seconds (3× faster) |
| Background sync speed  | Every ~10 min  | Every ~2 min (large servers fully catch up far faster) |
| Webhook notifications | With watermark | No watermark |
| [DWEEB Premium](https://dweeb.faizo.net) (webhook builder) | — | Plus ($5+ plans) or Pro ($10+ plans) included |
| Support               | Community      | Priority     |

## Free Plan

The free plan includes everything you need to get started:

- **5 rules per server** — enough for verification cleanup, booster rewards, and more
- **5 integrations per server** — connect external services to manage roles
- **All 9 condition types** — full access to every matching option
- **All action types** — add and remove roles freely
- **Testing sandbox** — test rules before going live
- **Activity log** — track all configuration changes
- **Cross-server sync to 2 distinct destination servers** — connect a small network (upgrade to Premium for up to 10)
- **Real-time response within ~5 seconds** — role changes are evaluated within a few seconds, with a background safety sync about every 10 minutes to catch anything missed

**Perfect for:**

- Small servers testing RoleLogic
- Basic verification systems
- Simple booster rewards
- Servers with 1-2 automation needs

**Example free plan setup:**

1. Rule 1: "If has Verified → remove Unverified"
2. Rule 2: "If has Server Booster → add VIP"

That's a complete verification + booster system with just 2 of your 5 free rules.

## Premium Plans

Premium plans expand your capacity through a Stripe subscription (monthly or annual). Existing Patreon supporters keep their benefits.

### Premium Tiers

| Tier       | Price     | Additional Slots | Total Rules | Total Integrations | DWEEB Tier Included | Best For                            |
| ---------- | --------- | ---------------- | ----------- | ------------- | ------------------- | -------------------------------------- |
| **Tier 1** | $2.00/mo  | +10              | 15          | 15            | —                   | Small servers with moderate needs      |
| **Tier 2** | $5.00/mo  | +36              | 41          | 41            | DWEEB Plus          | Growing servers with complex setups    |
| **Tier 3** | $7.00/mo  | +74              | 79          | 79            | DWEEB Plus          | Large servers with tier systems        |
| **Tier 4** | $10.00/mo | +130             | 135         | 135           | DWEEB Pro           | Very active servers with many features |
| **Tier 5** | $14.00/mo | +208             | 213         | 213           | DWEEB Pro           | Enterprise/network-level automation    |

### Premium Benefits

- **More rules** — Up to 213 per server
- **More integrations** — Up to 213 per server
- **Faster background sync** — Premium servers are re-checked about every 2 minutes instead of every 10, and each pass scans far more members. Large servers fully reconcile dramatically faster — a 100,000-member server catches up in roughly 10 minutes on premium versus a few hours on free. Event-driven role changes are evaluated in about 1.5 seconds on Premium versus 5 seconds on Free; the periodic safety sweep catches anything missed.
- **No watermark** — Clean webhook notifications
- **Priority support** — Faster response times
- **Expanded cross-server sync** — 10 distinct destination servers per server (vs. 2 on free)
- **Higher role link capacity** — Up to 30 million users per role link (vs. 1,000 per link on free)
- **Faster real-time response** — When a member's roles change, Premium servers run the rule engine in about 1.5 seconds instead of about 5 seconds. Cascading edits (rule A triggers rule B triggers rule C) feel snappier, while both plans still coalesce bursty edits safely
- **DWEEB Premium included** — Tier 2 and up also unlocks premium in [DWEEB](https://dweeb.faizo.net), our visual Discord webhook message builder (see below)

### DWEEB Premium Included

RoleLogic shares its premium system with **[DWEEB](https://dweeb.faizo.net)** — the visual builder for Discord webhook messages from the same developer. One subscription powers both apps:

| RoleLogic Plan        | DWEEB Tier Unlocked |
| --------------------- | ------------------- |
| Tier 2 or 3 ($5–$7)   | **DWEEB Plus**      |
| Tier 4 or 5 ($10–$14) | **DWEEB Pro**       |

- **Automatic** — sign in to DWEEB with the same Discord account and your subscription is applied to a server of your choice. No extra checkout, no extra cost.
- **What DWEEB premium adds** — more scheduled posts, never-expiring interactive panels, more saved messages and posted history, more live co-editors, and additional custom bot identities.
- **One server at a time** — like RoleLogic quota, DWEEB premium applies to a chosen server; you can move it or stack additional subscriptions for more servers.

DWEEB itself is free to use — the core builder needs no account. The bundle simply means your RoleLogic upgrade goes further.

### How Many Rules Do You Need?

| Use Case                     | Rules Needed | Recommended |
| ---------------------------- | ------------ | ----------- |
| Verification + booster       | 2            | Free        |
| Basic tier system            | 4-6          | Tier 1      |
| Verification + tiers + VIP   | 8-12         | Tier 1-2    |
| Staff management + access    | 10-15        | Tier 2      |
| Full server automation       | 20-40        | Tier 3      |
| Complex multi-feature server | 40-80        | Tier 4      |
| Server network/enterprise    | 80+          | Tier 5      |

## How to Upgrade

1. Open the **Upgrade** section in your RoleLogic dashboard
2. Choose a plan (monthly or annual — annual saves the most)
3. Subscribe securely through Stripe
4. Your quota activates automatically right after checkout
5. Assign quota to your server(s)

## Managing Premium

### Changing Tiers

Add, switch, or cancel subscriptions anytime through **Upgrade → Manage subscriptions** (the Stripe billing portal). Quota from multiple subscriptions stacks.

### Canceling

Cancel through the Stripe billing portal anytime. Premium features remain active until the billing period ends. (Existing Patreon supporters cancel through Patreon.)

### Refunds

Contact support for a refund. Stripe payments can be refunded directly; legacy Patreon subscriptions are refunded through Patreon.

## Quota System

### How Quota Works

Premium quota is allocated per server and applies to both rules and integrations:

- You assign your quota to specific servers
- Multiple servers can share your total quota
- Each server has its own rule and integration limit
- The same quota increases both your rule limit and integration limit

**Example:** With Tier 2 (41 total), you could:

- Give one server all 41 rules + 41 integrations, OR
- Split the 36 paid slots between two servers. Each server keeps its 5 free slots and receives the paid slots assigned to it.

### Quota Cooldown

After assigning quota to a server, there's a **7-day cooldown** before you can reassign it elsewhere. This ensures service stability.

### Checking Your Quota

In the dashboard, you'll see:

- **Rule quota:** "Rule Quota: 5 / 41"
- **Integration quota:** The dashboard's integration quota usage and limit
- **Quota allocation:** Which servers have what

## What Happens When Downgrading?

When you downgrade to a lower tier or cancel:

- **Rules and integrations are paused, not deleted** — Your configuration stays saved
- **Most recent items stay active** — Within your new quota limit
- **Cross-server rules beyond the free limit are paused** — Highest-priority rules covering up to 2 distinct destination servers stay active; the rest are paused alongside any over-quota rules
- **Automatic reactivation on upgrade** — If you upgrade again, paused items come back

**Example:** If you have 30 rules and downgrade to Tier 1 (15 slots), 15 rules are paused but preserved. The same applies to integrations. Upgrade back, and all 30 reactivate.

**Cross-server example:** Your Premium server syncs to 7 other servers. If Premium lapses, RoleLogic keeps the two highest-priority cross-server rules running and pauses the rest. Nothing is deleted — re-subscribing restores full reach, or you can edit/delete the paused rules to clean up.

## Tips for Staying Within Quota

### Consolidate Rules

**Instead of 3 rules:**

```
Rule 1: If Booster → add VIP
Rule 2: If Premium → add VIP
Rule 3: If Supporter → add VIP
```

**Use 1 rule:**

```
Rule 1: If has some of [Booster, Premium, Supporter] → add VIP
```

### Use Threshold Conditions

Replace multiple rules with "At Least N" or "Exactly N" conditions.

### Let Rules Cascade

Design rules that trigger each other for complex automation without using extra rule slots.

## FAQ

### What payment methods are accepted?

Payments are processed securely through Stripe (credit/debit cards and local payment methods). Existing Patreon supporters keep their benefits through Patreon.

### Is there a free trial?

The free plan (5 rules) serves as your trial. No time limit.

### Can I share premium across servers?

Yes. Assign your quota across multiple servers as needed.

### What if I need more than 213 rules?

Contact support for custom enterprise plans.

### Do I lose rules if I cancel?

No. Rules are deactivated but not deleted. Re-subscribe to reactivate them.

### Does RoleLogic Premium include DWEEB Premium?

Yes. Plans from Tier 2 ($5/mo) also unlock **DWEEB Plus**, and plans from Tier 4 ($10/mo) unlock **DWEEB Pro** in [DWEEB](https://dweeb.faizo.net), the visual Discord webhook message builder by the same developer — applied to one server of your choice at no extra cost. See [DWEEB Premium Included](#dweeb-premium-included).

---

## Ready to Upgrade?

<a className="button button--primary" href="https://rolelogic.faizo.net/upgrade" data-analytics-id="view_upgrade_plans">Open upgrade options</a>

1. Log in to the RoleLogic dashboard
2. Go to **Upgrade**
3. Choose your plan
4. Subscribe securely through Stripe
5. Assign quota to your servers

---

## Related

- **[FAQ](./faq)** — More questions answered
- **[Limits Reference](./reference/limits-reference)** — Technical limits
- **[Support](./support)** — Get help
