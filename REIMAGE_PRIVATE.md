# Locking `reimage` to RoleLogic only

The `reimage` image-proxy service at `reimage.faizo.net` runs in **private
mode**: only HMAC-signed URLs are accepted, and only Discord CDN hosts are
allowed as upstreams. Random visitors can't use it as a free image proxy.

```
                        ┌────────────────────────┐
       sign ──→         │   bot-rust (Rust)      │
        ╱               │   reimage_sign.rs      │──┐
   ┌────────┐           └────────────────────────┘  │
   │ secret │                                       │ signed URL
   │ shared │           ┌────────────────────────┐  ├─→ Discord CDN
   │ 3-way  │── sign ──→│   api (NestJS)         │  │   embed render
   └────────┘           │   /api/image-proxy/sign│──┤
        ╲               └────────────────────────┘  │
       sign ──→         ┌────────────────────────┐  │
                        │   web (dashboard)      │──┘
                        │   useSignedReimageUrl  │
                        └────────────────────────┘
                                                  ▼
                              ┌──────────────────────────────┐
                              │ reimage.faizo.net            │
                              │   REQUIRE_AUTH=true          │
                              │   HMAC_SECRET=<shared>       │
                              │   ALLOWED_DOMAINS=cdn.discord│
                              │                       …      │
                              └──────────────────────────────┘
```

## Components

| Side | What it does | Source |
|---|---|---|
| `reimage-rust` | Rejects any request without a valid `&expires=&sig=` HMAC. | [server/middleware/auth.rs](../../reimage-rust/src/server/middleware/auth.rs) |
| `bot-rust` | Signs every reimage URL embedded in a webhook payload, after placeholder substitution. | [`bot-rust/src/reimage_sign.rs`](../bot-rust/src/reimage_sign.rs), wired in [`placeholders.rs`](../bot-rust/src/placeholders.rs) |
| `api` | Exposes `POST /api/image-proxy/sign` so the dashboard can sign preview URLs without ever holding the secret in the browser. | [`api/src/api/image-proxy/`](../api/src/api/image-proxy/) |
| `web` | Calls the API signer through `useSignedReimageUrl` before putting a reimage URL in `<img src>`. | [`web/src/lib/Utils/reimageSign.ts`](../web/src/lib/Utils/reimageSign.ts) |

## Provisioning the secret

The same 32+ byte secret must be present in three places. Generate once:

```bash
openssl rand -hex 32
# or: python -c "import secrets; print(secrets.token_hex(32))"
```

Then put it in:

1. **reimage host** — `reimage-rust/private/.env` (sibling to
   `private/compose.yml`). The compose file interpolates
   `${REIMAGE_HMAC_SECRET}` into the container's env. Example file:
   [`reimage-rust/private/.env.example`](../../reimage-rust/private/.env.example).
2. **bot-rust** — `REIMAGE_HMAC_SECRET=<same value>` in the bot's runtime
   env (Docker secret, systemd EnvironmentFile, whatever you use).
3. **api** — `REIMAGE_HMAC_SECRET=<same value>` in the API's env. The
   schema in `api/src/common/env.validation.ts` enforces a minimum length
   of 16 so a misconfigured API won't silently boot.

A second optional knob in each:

| Var | Default | Purpose |
|---|---|---|
| `REIMAGE_BASE_URL` (bot, api) | `https://reimage.faizo.net` | Override the reimage host (staging, local). |
| `REIMAGE_SIG_TTL_SEC` (bot)   | `31536000` (1 year) | TTL for bot-emitted URLs. Long because Discord embeds are cached/rendered indefinitely. |
| `REIMAGE_PREVIEW_TTL_SEC` (api) | `3600` (1 hour) | TTL for dashboard preview signatures. Short so leaked preview URLs are short-lived. |

## What happens to existing posted URLs

Flipping `REQUIRE_AUTH=true` instantly **breaks every unsigned reimage URL
already posted to Discord channels**. Welcome banners, log embeds, etc.,
sent before this change will start returning 401 and Discord will render a
broken image in their place.

This is acceptable for most channels because Discord caches the rendered
image for a while — old messages keep working from cache for hours/days,
then degrade. New webhook sends use the signed flow.

If you ever need to "un-break" a specific old message, the bot can re-send
it (e.g. via your existing log-replay tooling); the new send will be signed.

## Rotating the secret

1. Generate a new secret.
2. Update **all three** env stores (reimage `.env`, bot env, api env).
3. Roll the services in any order — they don't have to be simultaneous:
   - bot/api signing with the old secret while reimage holds the new will
     break URLs minted during the gap; usually a few seconds is fine.
   - For zero-downtime, configure reimage to temporarily accept both
     secrets via `API_KEYS` (out-of-band), roll signing services, then
     remove the old secret. The current reimage build doesn't support
     dual HMACs yet — add that if downtime matters.
4. Once everything is rolled, Discord embeds containing URLs signed with
   the old secret will start 401-ing. Same blast radius as the initial
   flip; see above.

## Verifying the lockdown

After deploying, confirm reimage rejects unsigned traffic:

```bash
# Should return 401 Unauthorized.
curl -i 'https://reimage.faizo.net/image?src=https://cdn.discordapp.com/embed/avatars/0.png'

# Should also be 401 — domain not in allowlist even if signed.
curl -i 'https://reimage.faizo.net/image?src=https://evil.com/x.png&expires=…&sig=…'

# Should return an image — bot/api just minted this URL.
curl -i 'https://reimage.faizo.net/image?src=…&expires=…&sig=…'
```

## Signing algorithm (canonical reference)

All three implementations MUST produce byte-identical hashes. The protocol:

1. Take the URL's query string; split on `&` into `(key, raw_value)` pairs.
2. Drop any pre-existing `sig=` and `expires=` pairs.
3. Append `("expires", "<unix_seconds_in_future>")`.
4. **Stable**-sort the pairs by key.
5. Build `<path>?<joined>` where `<joined>` = `k=v&k=v&…`.
6. `sig = hex(HMAC-SHA256(secret, that string))`.
7. Append `&expires=<ts>&sig=<sig>` to the original URL.

Values stay URL-encoded — the verifier hashes raw query bytes. Stable sort
matters: `overlay[]=A&overlay[]=B` must keep that relative order through
the sort so client and server agree.

Source of truth: [`reimage-rust/src/server/middleware/auth.rs::verify_hmac_signature`](../../reimage-rust/src/server/middleware/auth.rs).
