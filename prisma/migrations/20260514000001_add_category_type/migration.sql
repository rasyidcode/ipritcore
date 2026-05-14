-- DropIndex
DROP INDEX "Category_name_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN "type" "TransactionType";

-- Preserve useful existing categories before enforcing type.
UPDATE "Category"
SET "type" = CASE
    WHEN "name" = 'Gaji' THEN 'INCOME'::"TransactionType"
    ELSE 'EXPENSE'::"TransactionType"
END
WHERE "type" IS NULL;

-- Seed type-specific defaults.
INSERT INTO "Category" ("name", "type")
VALUES
    ('Lain-lain', 'INCOME'::"TransactionType"),
    ('Bonus', 'INCOME'::"TransactionType"),
    ('Hadiah', 'INCOME'::"TransactionType")
ON CONFLICT DO NOTHING;

-- Existing transactions were previously backfilled to one Lain-lain category.
-- Move income transactions to the income-specific Lain-lain category.
UPDATE "Transaction"
SET "categoryId" = (
    SELECT "id"
    FROM "Category"
    WHERE "name" = 'Lain-lain' AND "type" = 'INCOME'::"TransactionType"
)
WHERE "type" = 'INCOME'::"TransactionType"
  AND "categoryId" IN (
      SELECT "id"
      FROM "Category"
      WHERE "type" <> 'INCOME'::"TransactionType"
  );

-- Move expense transactions with income categories back to expense Lain-lain.
UPDATE "Transaction"
SET "categoryId" = (
    SELECT "id"
    FROM "Category"
    WHERE "name" = 'Lain-lain' AND "type" = 'EXPENSE'::"TransactionType"
)
WHERE "type" = 'EXPENSE'::"TransactionType"
  AND "categoryId" IN (
      SELECT "id"
      FROM "Category"
      WHERE "type" <> 'EXPENSE'::"TransactionType"
  );

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "type" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_type_key" ON "Category"("name", "type");
