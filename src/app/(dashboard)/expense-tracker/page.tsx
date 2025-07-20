import TransactionList from "../../../components/TransactionList";
import NewTransactionButton from "../_components/NewTransactionButton";
import prisma from "@/lib/prisma";
import { TransactionType } from "@prisma/client";
import { ModalFormTransactionProvider } from "@/app/(dashboard)/_components/ModalFormTransactionProvider";
import ModalFormTransaction from "@/app/(dashboard)/_components/ModalFormTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import TransactionSummary from "../_components/TransactionSummary";
// import ModalFormFilterDate from "./_components/ModalFormFilterDate";

export default async function ExpenseTrackerPage() {
  const session = await getServerSession(authOptions);
  const transactions = await getThisMonthTransactions(session?.user.id || 0);
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
      <div className="flex flex-col overflow-hidden flex-1">
        <h1 className="text-2xl font-bold">Catat Keuangan</h1>
        <TransactionSummary balance={balance} totalExpenses={totalExpenses} />
        <NewTransactionButton />
        <div className="flex-1 flex flex-col mt-4 overflow-hidden">
          <h2 className="text-lg font-semibold">Transaksi Bulan Ini</h2>
          <TransactionList transactions={transactions} />
        </div>
      </div>
      <ModalFormTransaction />
      {/* <ModalFormFilterDate /> */}
    </ModalFormTransactionProvider>
  );
}

async function getThisMonthTransactions(userId: number) {
  return await prisma.transaction.findMany({
    where: {
      userId: userId,
      date: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // first day of this month
        lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1), // first day of next month
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
}
