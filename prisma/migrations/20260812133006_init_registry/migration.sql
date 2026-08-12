-- CreateTable
CREATE TABLE "RegistryEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "venture" TEXT NOT NULL,
    "pitch" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "link" TEXT,
    "referral" TEXT,
    "deepJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "RegistryEntry_email_idx" ON "RegistryEntry"("email");

-- CreateIndex
CREATE INDEX "RegistryEntry_createdAt_idx" ON "RegistryEntry"("createdAt");
