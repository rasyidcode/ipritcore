/*
  Warnings:

  - You are about to drop the `Grocery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Grocery" DROP CONSTRAINT "Grocery_userId_fkey";

-- DropTable
DROP TABLE "Grocery";

-- CreateTable
CREATE TABLE "GroceryPlan" (
    "id" SERIAL NOT NULL,
    "monthYear" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "userId" INTEGER,

    CONSTRAINT "GroceryPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroceryPlanItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "groceryPlanId" INTEGER,

    CONSTRAINT "GroceryPlanItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroceryPlan" ADD CONSTRAINT "GroceryPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroceryPlanItem" ADD CONSTRAINT "GroceryPlanItem_groceryPlanId_fkey" FOREIGN KEY ("groceryPlanId") REFERENCES "GroceryPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
