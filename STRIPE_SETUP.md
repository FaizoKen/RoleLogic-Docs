# Stripe setup (default payment rail)

RoleLogic uses **Stripe** as the main payment system. Patreon still works for
existing patrons (their subscriptions keep granting quota untouched), but all
new subscriptions go through Stripe.

## How it fits together

```
Stripe Checkout → subscription → webhook → stripe_subscriptions (local mirror)
  → SyncService merges Stripe + Patreon entitlements → Quota rows
  → premium gating (is_premium_1, rule/cross-guild limits) → bot
```

Nothing downstream of the `Quota` table cares which rail funded a slot, so
Stripe and Patreon coexist. A Stripe subscription to a price grants
`ROLES_QUOTA[price_id]` slots — exactly like a Patreon tier.

Stripe is **off** until `STRIPE_SECRET_KEY` is set: checkout/portal/webhook
endpoints return 503 and the app runs Patreon-only. This makes the code safe to
deploy before Stripe is configured.

Products & prices are managed by the idempotent setup script
(`cd api && STRIPE_SECRET_KEY=sk_... bun run src/scripts/stripe-setup.ts`),
which prints the `ROLES_QUOTA` additions for **api/.env** and the
`VITE_UPGRADE_PLAN` JSON for **web/.env**.

## Tax (optional)

Both options below charge tax **on top** of the plan price (tax-behavior
*exclusive*), so the listed price is what **you** receive: a $2 plan stays $2 of
revenue and the buyer pays $2 + tax, shown as its own line in Checkout, which you
collect and remit. (Inclusive behavior would instead carve the tax *out* of the
$2, leaving you less.) Both are **off by default** and mutually exclusive — pick
one. **You're responsible for whether you should collect tax at all** (thresholds,
registration); confirm with an accountant before enabling either.

**Option A — Stripe Tax (automatic, rate by buyer location).** The accurate
option, but only for accounts whose *business location* Stripe Tax supports
(US, UK, EU, Canada, Singapore, Australia, etc.). Check the
[supported-countries table](https://docs.stripe.com/tax/supported-countries):
if your country shows ❌ under "business location" (e.g. **Malaysia**),
`/settings/tax` just redirects to the dashboard and this option is unavailable —
use Option B. To enable:

1. **Activate Stripe Tax** — Dashboard ▸ Tax: origin address + registrations.
2. **Set the default tax behavior** — Tax settings ▸ "Include tax in prices" →
   **Exclusive** (this also makes older prices without a per-price
   `tax_behavior` tax-ready). The setup script stamps `exclusive` on prices it
   creates (override with `STRIPE_TAX_BEHAVIOR=inclusive`).
3. Set `STRIPE_AUTOMATIC_TAX=true` in **api/.env** and restart.

When on, Checkout also collects a billing address (to locate the buyer) and
offers business buyers a VAT/Tax ID field. ⚠️ Turning the flag on *before*
Stripe Tax is active makes Checkout session creation **fail** — keep it false
until activated. For portal-initiated upgrades, enable Stripe Tax in the
Customer Portal settings too.

**Option B — Manual fixed rate (works on any account, no activation).** You
choose one flat percentage applied to every buyer (Stripe doesn't vary it by
location here). This is the path for Malaysia-based accounts:

1. Create an **exclusive** Tax rate — Dashboard ▸ Product catalog ▸ Tax rates
   (name + %, "exclusive"), **or** run the setup script with
   `STRIPE_TAX_PERCENT=8` (optionally `STRIPE_TAX_NAME="SST"`), which mints one
   and prints its `txr_…` id.
2. Set `STRIPE_TAX_RATE_ID=txr_…` in **api/.env** and restart.

Checkout then adds that % on top of the plan price and it recurs on every
invoice. Leave `STRIPE_TAX_RATE_ID` unset to charge no tax.

## Go-live checklist

- [ ] Re-run the setup script with the **live** key; update env with the live
      price ids.
- [ ] Create a **live** webhook endpoint at `POST <API_BASE>/api/stripe/webhook`
      (raw body, no auth, throttle-exempt) subscribed to
      `checkout.session.completed`, `customer.subscription.created`,
      `customer.subscription.updated`, `customer.subscription.deleted`,
      `invoice.payment_failed`; set the live `STRIPE_WEBHOOK_SECRET`.
- [ ] Enable the Customer Portal in live mode (allow cancellation + plan
      switching + payment-method updates).
- [ ] (If charging tax) Either activate Stripe Tax + `STRIPE_AUTOMATIC_TAX=true`
      (supported countries), or create a live exclusive Tax rate and set
      `STRIPE_TAX_RATE_ID` (e.g. Malaysia). See the Tax section above.
- [ ] Deploy; verify a real subscription end-to-end (a small plan), then the
      portal cancel flow.
- [ ] Confirm an existing Patreon patron still syncs unchanged.

## Why Stripe (fees)

- Removes Patreon's ~8% platform fee — the main saving. Stripe is ~2.9% + $0.30
  (+0.5% Billing) per charge.
- Annual billing (default in the UI) = one charge/year instead of twelve, saving
  ~11×$0.30 fixed fees per subscriber/year and reducing the 0.5% Billing-fee
  frequency.
- Promotion codes are available in Checkout (no extra cost) but off by default.
