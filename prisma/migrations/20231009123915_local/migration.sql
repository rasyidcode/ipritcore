/*
  Warnings:

  - You are about to drop the column `desc` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `note` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "desc",
DROP COLUMN "type",
ADD COLUMN     "note" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ExpenseType";
