/**
 * Copies prisma/schema.prisma → prisma/schema.runtime.prisma
 * and sets provider from DATABASE_URL (sqlite locally, postgresql on Vercel).
 */
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "prisma", "schema.prisma");
const dest = join(root, "prisma", "schema.runtime.prisma");
const url = process.env.DATABASE_URL || "";
const provider = url.startsWith("postgres") ? "postgresql" : "sqlite";

const schema = readFileSync(src, "utf8").replace(
  /provider\s*=\s*"(sqlite|postgresql)"/,
  `provider = "${provider}"`
);

const shouldPush = process.argv.includes("--push") && provider === "postgresql";

writeFileSync(dest, schema);
console.log(`wrote prisma/schema.runtime.prisma (${provider})`);

if (shouldPush) {
  const quotedSchema = `"${dest.replace(/"/g, '\\"')}"`;
  const result = spawnSync(
    `npx prisma db push --schema ${quotedSchema} --skip-generate`,
    { stdio: "inherit", cwd: root, env: process.env, shell: true }
  );
  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
}
