import { Transaction } from "@prisma/client";
import prisma from "@/lib/prisma";
import TransactionItem from "@/components/ui/TransactionItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const TransactionItemList = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <div
      className="flex flex-col justify-start items-start divide-y 
    divide-dashed flex-1"
    >
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} {...transaction} />
      ))}
    </div>
  );
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  const currentDate = new Date();
  const transactions = await prisma.transaction.findMany({
    where: {
      date: currentDate,
      userId: session?.user.id as number,
    },
    orderBy: { id: "asc" },
  });

  return <h1>Hello, World</h1>;
}
