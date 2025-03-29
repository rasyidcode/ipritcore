import { PrismaClient, TransactionType } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // [seed user]
  await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@example.com",
      password: await bcrypt.hash("demo", 10),
    },
  });
  // end of [seed user]

  // [seed transactions]
  await prisma.transaction.createMany({
    data: [
      {
        name: "Beli sayur",
        amount: 54000,
        type: TransactionType.EXPENSE,
        date: new Date("2025-03-30 12:30:00"),
      },
    ],
  });
  // end of [seed transactions]
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
