-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- Seed default category for existing and future transactions.
INSERT INTO "Category" ("name")
VALUES ('Lain-lain')
ON CONFLICT ("name") DO NOTHING;

-- Add nullable first so existing rows can be backfilled.
ALTER TABLE "Transaction" ADD COLUMN "categoryId" INTEGER;

UPDATE "Transaction"
SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Lain-lain')
WHERE "categoryId" IS NULL;

ALTER TABLE "Transaction" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
