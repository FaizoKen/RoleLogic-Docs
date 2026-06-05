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
deploy before you've configured Stripe.

## One-time setup

Do everything in **Test mode** first, validate end-to-end, then repeat with live
keys.

### 1. Create products & prices

```bash
cd api
STRIPE_SECRET_KEY=sk_test_xxx bun run src/scripts/stripe-setup.ts
# or: npx ts-node -r tsconfig-paths/register src/scripts/stripe-setup.ts
```

It creates 5 products (Small → Maximized), each with a monthly and an annual
price (annual ≈ 2 months free), and prints:

- the `ROLES_QUOTA` additions (price_id → slot count) for **api/.env**
- the full `VITE_UPGRADE_PLAN` JSON for **web/.env**

The script is idempotent (matches products by metadata and prices by
`lookup_key`), so re-running it won't create duplicates.

### 2. Configure env

**api/.env**

```
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx          # from step 3
# merge the printed Stripe price ids into the existing map:
ROLES_QUOTA={"8971826":10, ... ,"price_smallM":10,"price_smallY":10, ...}
```

**web/.env** — paste the printed `VITE_UPGRADE_PLAN=[...]`.

Optional redirect overrides (defaults derive from `WEB_REDIRECT_URI`):
`STRIPE_SUCCESS_URL`, `STRIPE_CANCEL_URL`, `STRIPE_PORTAL_RETURN_URL`.

### 3. Webhook

The API verifies every webhook against `STRIPE_WEBHOOK_SECRET`. The endpoint is
`POST <API_BASE>/api/stripe/webhook` (raw body, no auth, throttle-exempt).

Subscribe the endpoint to these events:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_failed`

**Local:**

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
# copy the printed whsec_... into STRIPE_WEBHOOK_SECRET, restart the API
```

**Production:** Dashboard ▸ Developers ▸ Webhooks ▸ Add endpoint → use the
endpoint's signing secret.

### 4. Customer Portal

Enable the Customer Portal once (Dashboard ▸ Settings ▸ Billing ▸ Customer
portal) and allow cancellation + plan switching + payment-method updates. The
"Manage subscription" button on the upgrade page opens it.

### 5. Database

The `stripe_customer_id` column and `stripe_subscriptions` table ship in the
`add_stripe` migration. Production applies it automatically via
`prisma migrate deploy` (already in `start:docker`). Locally:

```bash
cd api && npx prisma migrate deploy   # or: npx prisma migrate dev
```

## Go-live checklist

- [ ] Re-run the setup script with the **live** key; update env with live price ids.
- [ ] Create a **live** webhook endpoint; set the live `STRIPE_WEBHOOK_SECRET`.
- [ ] Enable the Customer Portal in live mode.
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
