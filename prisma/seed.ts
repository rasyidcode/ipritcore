import { PrismaClient, TransactionType } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Lain-lain", type: TransactionType.EXPENSE },
    { name: "Makanan", type: TransactionType.EXPENSE },
    { name: "Transportasi", type: TransactionType.EXPENSE },
    { name: "Belanja", type: TransactionType.EXPENSE },
    { name: "Tagihan", type: TransactionType.EXPENSE },
    { name: "Hiburan", type: TransactionType.EXPENSE },
    { name: "Kesehatan", type: TransactionType.EXPENSE },
    { name: "Lain-lain", type: TransactionType.INCOME },
    { name: "Gaji", type: TransactionType.INCOME },
    { name: "Bonus", type: TransactionType.INCOME },
    { name: "Hadiah", type: TransactionType.INCOME },
  ];

  await Promise.all(
    categories.map((category) =>
      prisma.category.upsert({
        where: {
          name_type: {
            name: category.name,
            type: category.type,
          },
        },
        update: {},
        create: category,
      })
    )
  );

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
