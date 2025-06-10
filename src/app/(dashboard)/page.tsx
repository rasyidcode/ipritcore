import { numberToIDRFormat } from "@/lib/stringUtils";
import TransactionList from "./_components/TransactionList";
import NewTransactionButton from "./_components/NewTransactionButton";
import prisma from "@/lib/prisma";
import { TransactionType } from "@prisma/client";
import { ModalFormTransactionProvider } from "@/app/(dashboard)/_components/ModalFormTransactionProvider";
import ModalFormTransaction from "@/app/(dashboard)/_components/ModalFormTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session?.user.id,
      date: {
        // this month
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
    orderBy: [
      {
        date: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
  const balance = transactions.reverse().reduce((acc, curr) => {
    if (curr.type === TransactionType.INCOME) {
      return acc + curr.amount;
    }

    return acc - curr.amount;
  }, 0);
  const totalExpenses = transactions
    .reverse()
    .reduce(
      (acc, curr) =>
        curr.type === TransactionType.EXPENSE ? acc + curr.amount : acc,
      0
    );
  return (
    <ModalFormTransactionProvider>
      <div className="flex-1 p-4 flex flex-col overflow-hidden md:max-h-[768px]">
        <h1 className="text-2xl font-bold">Dasbor</h1>
        <div className="flex gap-2 mt-4">
          <div className="border dark:border-white/[.09] flex-1 p-2 rounded-lg">
            <p className="text-sm uppercase tracking-wider font-semibold">
              Saldo
            </p>
            <h3 className="text-lg font-medium text-green-600">
              {numberToIDRFormat(balance)}
            </h3>
          </div>
          <div className="border dark:border-white/[.09] flex-1 p-2 rounded-lg">
            <p className="text-sm uppercase tracking-wider font-semibold">
              Pengeluaran
            </p>
            <h3 className="text-lg font-medium text-red-600">
              {numberToIDRFormat(totalExpenses)}
            </h3>
          </div>
        </div>
        <NewTransactionButton />
        <div className="flex-1 flex flex-col mt-4 overflow-hidden">
          <h2 className="text-lg font-semibold">Transaksi Terakhir</h2>
          <TransactionList transactions={transactions} />
        </div>
      </div>
      <ModalFormTransaction />
    </ModalFormTransactionProvider>
  );
}
