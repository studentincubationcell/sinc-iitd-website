# Startup Registry — database + email

The form at `/registry` saves via Prisma and emails the founder a confirmation
(listing details, then the full profile if they add it).

## 1. Local (SQLite — already works)

```bash
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev
```

- DB file: `.data/registry.db`
- Browse rows: `npm run db:studio`
- Coordinator view: `REGISTRY_PASSCODE` in `.env`

SMTP is optional locally. Without `SMTP_USER` / `SMTP_PASS`, listings still save;
the page tells the founder email could not be sent.

---

## 2. Production database (Neon Postgres)

SQLite does **not** persist on Vercel. Use free [Neon](https://console.neon.tech).

### Create the database

1. Open https://console.neon.tech and sign in (GitHub is fine).
2. **New project** → name `sinc-registry` → region close to India (e.g. Singapore / Mumbai if offered).
3. After create, open **Dashboard → Connection details**.
4. Copy the **pooled** URI if shown (`…-pooler.….neon.tech`), otherwise the direct URI.
5. It looks like:
   `postgresql://neondb_owner:PASSWORD@ep-….neon.tech/neondb?sslmode=require`

### Put it on Vercel

Vercel project **sinc-iitd-website** → **Settings → Environment Variables**.
Add for **Production** and **Preview**:

| Name | Value |
|------|--------|
| `DATABASE_URL` | the Neon `postgresql://…` string |
| `REGISTRY_PASSCODE` | a strong secret only coordinators know |

Redeploy after saving env vars (Deployments → … → Redeploy, or push to `main`).

The production build runs `prisma db push` when `DATABASE_URL` starts with `postgres`,
so the `RegistryEntry` table is created automatically. You do **not** edit
`prisma/schema.prisma` by hand.

### Check it worked

1. Submit a test listing on https://www.sinciitd.in/registry
2. Unlock **View registry** with `REGISTRY_PASSCODE`
3. Or Neon → **Tables** → `RegistryEntry`

Optional, from your laptop (does not change local SQLite):

```bash
$env:DATABASE_URL="postgresql://…"
npx prisma studio
```

Never commit `.env` or production URLs.

---

## 3. SMTP (confirmation emails)

Emails go to the founder who registered. If they later save a **full profile**
(problem, solution, funds, deck, revenue, next 6–12 months), a second email
includes those fields too.

Optional `REGISTRY_NOTIFY_EMAIL` BCCs coordinators (`studentincubationcell@gmail.com`).

### Option A — Gmail (`studentincubationcell@gmail.com`)

SInC mail currently goes through this Gmail account (`sinc@iitd.ac.in` is not in use).

1. Sign in at https://mail.google.com as `studentincubationcell@gmail.com`.
2. Google Account → **Security** → turn on **2-Step Verification** if it is off.
3. Search Google Account for **App passwords** → create one for “Mail” / “SInC website”.
4. Copy the 16-character password (spaces optional). **Do not** use the normal inbox password.
5. Add these Vercel env vars (Production + Preview):

| Name | Value |
|------|--------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` |
| `SMTP_USER` | `studentincubationcell@gmail.com` |
| `SMTP_PASS` | the 16-character app password |
| `SMTP_FROM` | `SInC IIT Delhi <studentincubationcell@gmail.com>` |
| `SMTP_REPLY_TO` | `studentincubationcell@gmail.com` |
| `SITE_URL` | `https://www.sinciitd.in` |
| `REGISTRY_NOTIFY_EMAIL` | `studentincubationcell@gmail.com` |

6. Redeploy. Submit `/registry` with a real email you can open. Check **Spam**.

### Option B — Resend SMTP (often more reliable on Vercel)

1. Sign up at https://resend.com
2. Add and verify domain `sinciitd.in` (DNS records Resend shows).
3. Create an API key. SMTP:

| Name | Value |
|------|--------|
| `SMTP_HOST` | `smtp.resend.com` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | `resend` |
| `SMTP_PASS` | `re_…` API key |
| `SMTP_FROM` | `SInC IIT Delhi <noreply@sinciitd.in>` |

### Local `.env`

Same names as above. Use `SITE_URL=http://localhost:3000`.

Campus SMTP (`smtp.iitd.ac.in`) usually only works on IIT Delhi networks, so it
will fail from Vercel. Prefer Gmail Workspace or Resend.

---

## 4. What the founder email contains

**After listing:** entry number, name, email, venture, pitch, stage, sector,
link, referral, time (IST), plus a link to add a fuller profile.

**After full profile:** the same listing block plus problem, solution, funds,
deck/demo, revenue/customers, and 6–12 month plans (empty fields omitted).

Listings stay private to the SInC team.
