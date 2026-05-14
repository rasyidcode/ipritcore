-- Give each user their own category rows. Existing global categories are cloned
-- per user and user-owned transactions/budgets are remapped to the clone.
ALTER TABLE "Category" ADD COLUMN "userId" INTEGER;

DROP INDEX "Category_name_type_key";

INSERT INTO "Category" ("name", "type", "createdAt", "updatedAt", "userId")
SELECT "Category"."name", "Category"."type", "Category"."createdAt", "Category"."updatedAt", "User"."id"
FROM "Category"
CROSS JOIN "User"
WHERE "Category"."userId" IS NULL;

UPDATE "Transaction"
SET "categoryId" = owned_category."id"
FROM "Category" original_category
JOIN "Category" owned_category
  ON owned_category."name" = original_category."name"
 AND owned_category."type" = original_category."type"
WHERE "Transaction"."categoryId" = original_category."id"
  AND original_category."userId" IS NULL
  AND "Transaction"."userId" IS NOT NULL
  AND owned_category."userId" = "Transaction"."userId";

UPDATE "Budget"
SET "categoryId" = owned_category."id"
FROM "Category" original_category
JOIN "Category" owned_category
  ON owned_category."name" = original_category."name"
 AND owned_category."type" = original_category."type"
WHERE "Budget"."categoryId" = original_category."id"
  AND original_category."userId" IS NULL
  AND owned_category."userId" = "Budget"."userId";

DELETE FROM "Category"
WHERE "userId" IS NULL
  AND NOT EXISTS (
    SELECT 1
    FROM "Transaction"
    WHERE "Transaction"."categoryId" = "Category"."id"
  )
  AND NOT EXISTS (
    SELECT 1
    FROM "Budget"
    WHERE "Budget"."categoryId" = "Category"."id"
  );

CREATE UNIQUE INDEX "Category_userId_name_type_key" ON "Category"("userId", "name", "type");

ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
