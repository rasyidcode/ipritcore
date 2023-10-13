/*
  Warnings:

  - You are about to drop the column `amount` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_authorId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "amount",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "authorId";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
