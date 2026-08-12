# Startup Registry — database setup

The form at `/registry` talks to Next.js API routes, which persist via **Prisma**.

## Local (already working)

- DB file: `.data/registry.db` (SQLite)
- Env: `.env` (copy from `.env.example`)
- Passcode: `REGISTRY_PASSCODE` (default in local `.env`)

```bash
npm install
npx prisma migrate dev
npm run dev
```

Browse data: `npm run db:studio`

## Production (Vercel) — you need Postgres

SQLite **does not work** on Vercel (serverless filesystem is ephemeral / read-only). Use a free Postgres host (Neon is simplest).

### 1. Create a Neon database

1. Go to https://console.neon.tech and sign up (GitHub login is fine).
2. **New project** → name it `sinc-registry` (or similar).
3. Copy the connection string (starts with `postgresql://…`). Prefer the one with `?sslmode=require`.

### 2. Point Prisma at Postgres

In `prisma/schema.prisma`, change:

```prisma
datasource db {
  provider = "postgresql"   // was "sqlite"
  url      = env("DATABASE_URL")
}
```

Then locally (with the Neon URL in `.env`):

```bash
# put Neon URL in .env as DATABASE_URL
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_postgres_init/migration.sql
# or simpler for first Postgres deploy:
npx prisma db push
```

For an existing SQLite migration history, the cleanest first production setup is:

```bash
npx prisma db push
```

against Neon (creates tables). Commit any schema changes if you alter models later.

### 3. Set Vercel environment variables

In the Vercel project → **Settings → Environment Variables**:

| Name | Value | Environments |
|------|--------|----------------|
| `DATABASE_URL` | Neon `postgresql://…` connection string | Production, Preview |
| `REGISTRY_PASSCODE` | a strong secret only coordinators know | Production, Preview |

### 4. Redeploy

Push to `main` or click **Redeploy** on Vercel. After deploy:

- Submit a test listing on `https://your-domain/registry`
- Unlock **View registry** with `REGISTRY_PASSCODE`
- Or open Neon → **Tables** → `RegistryEntry` to see rows

### 5. Optional: Prisma Studio against production

```bash
DATABASE_URL="postgresql://…" npx prisma studio
```

Never commit real `.env` or production passcodes.
