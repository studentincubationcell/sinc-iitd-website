# Deploy on Vercel Hobby with multiple GitHub contributors

Hobby **blocks Git auto-deploys** when the commit author is not the Vercel project owner. That is why other SInC members get “Deployment was blocked … Hobby teams do not support collaboration.”

Two legal ways around it (no Pro):

## Option A — GitHub Action (keep the repo private) — recommended

The Action in `.github/workflows/deploy-vercel.yml` deploys with the **owner’s** `VERCEL_TOKEN`. Contributors only push/merge GitHub. Vercel sees the owner deploying.

### 1. Add GitHub secrets (owner account)

On GitHub: **Settings → Secrets and variables → Actions**

| Secret | Where to get it |
|--------|-----------------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) (create while logged in as the Hobby owner) |
| `VERCEL_ORG_ID` | Vercel → Team / account **Settings → General → Team ID** |
| `VERCEL_PROJECT_ID` | Vercel project **Settings → General → Project ID** |

### 2. Stop Vercel from auto-deploying Git commits

Vercel project → **Settings → Git → Ignored Build Step** → custom command:

```bash
exit 0
```

That skips Vercel’s Git pipeline (the one that blocks). The GitHub Action is the only production deploy.

### 3. Merge to `main`

Any contributor can open a PR and merge. The Action runs on `main` and publishes production.

Manual rerun: **Actions → Deploy production → Run workflow**.

## Option B — Make the GitHub repo public

Vercel: “Collaboration is free for **public** repositories.”

GitHub repo → **Settings → General → Danger zone → Change repository visibility → Public**.

Then Git auto-deploy can stay on. Only use this if the site/code can be public.

## Production database

Hobby deploy still needs Postgres (SQLite will not persist on Vercel). See `docs/REGISTRY_DB.md`.

Set on the Vercel project (Production + Preview):

- `DATABASE_URL` — Neon `postgresql://…`
- `REGISTRY_PASSCODE` — coordinator secret
- SMTP vars — see `docs/REGISTRY_DB.md` (Gmail app password or Resend)

The production build creates registry tables when `DATABASE_URL` is Postgres.
Then `npx prisma studio` against Neon is optional, from a laptop.
