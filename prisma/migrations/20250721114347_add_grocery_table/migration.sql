-- CreateTable
CREATE TABLE "Grocery" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "userId" INTEGER,

    CONSTRAINT "Grocery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Grocery" ADD CONSTRAINT "Grocery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
