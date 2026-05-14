import { authOptions } from "@/lib/auth";
import { formatIdr } from "@/lib/stringUtils";
import prisma from "@/lib/prisma";
import { TransactionType } from "@prisma/client";
import { ModalFormTransactionProvider } from "@/components/ModalFormTransactionProvider";
import { getServerSession } from "next-auth";
import TransactionList from "@/components/TransactionList";
import NewTransactionButton from "@/components/NewTransactionButton";
import ModalFormTransaction from "@/components/ModalFormTransaction";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import {
  addMonths,
  formatMonthLabel,
  getMonthStart,
  toMonthParam,
} from "@/lib/monthUtils";

type DashboardPageProps = {
  searchParams?: Promise<{
    month?: string;
  }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const session = await getServerSession(authOptions);
  const params = await searchParams;
  const selectedMonth = getMonthStart(params?.month);
  const nextMonth = addMonths(selectedMonth, 1);
  const previousMonth = addMonths(selectedMonth, -1);
  const isCurrentMonth =
    toMonthParam(selectedMonth) === toMonthParam(new Date());

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session?.user.id,
      date: {
        gte: selectedMonth,
        lt: nextMonth,
      },
    },
    include: {
      category: true,
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
  const { balance, totalExpenses } = transactions.reduce(
    (acc, curr) => {
      if (curr.type === TransactionType.INCOME) {
        acc.balance += curr.amount;
      } else {
        acc.balance -= curr.amount;
        acc.totalExpenses += curr.amount;
      }

      return acc;
    },
    { balance: 0, totalExpenses: 0 },
  );
  return (
    <ModalFormTransactionProvider>
      <div className="flex-1 p-4 flex flex-col overflow-hidden md:max-h-[768px]">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {!isCurrentMonth && (
            <Link
              href="/"
              className="text-sm font-semibold underline underline-offset-4"
            >
              Bulan ini
            </Link>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <Link
            href={`/?month=${toMonthParam(previousMonth)}`}
            aria-label="Bulan sebelumnya"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-solid border-black/[.08]
              hover:bg-[#f2f2f2] hover:border-transparent transition-colors duration-150
              dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            <ChevronLeftIcon className="size-5" />
          </Link>
          <div className="flex flex-col items-center">
            <p className="text-xs uppercase tracking-wider text-foreground/60">
              Periode
            </p>
            <h2 className="text-base font-semibold capitalize">
              {formatMonthLabel(selectedMonth)}
            </h2>
          </div>
          <Link
            href={`/?month=${toMonthParam(nextMonth)}`}
            aria-label="Bulan berikutnya"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-solid border-black/[.08]
              hover:bg-[#f2f2f2] hover:border-transparent transition-colors duration-150
              dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            <ChevronRightIcon className="size-5" />
          </Link>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="border dark:border-white/[.09] flex-1 p-2 rounded-lg">
            <p className="text-sm uppercase tracking-wider font-semibold">
              Saldo
            </p>
            <h3 className="text-lg font-medium text-green-600">
              {formatIdr(balance)}
            </h3>
          </div>
          <div className="border dark:border-white/[.09] flex-1 p-2 rounded-lg">
            <p className="text-sm uppercase tracking-wider font-semibold">
              Pengeluaran
            </p>
            <h3 className="text-lg font-medium text-red-600">
              {formatIdr(totalExpenses)}
            </h3>
          </div>
        </div>
        <NewTransactionButton />
        <div className="flex-1 flex flex-col mt-4 overflow-hidden">
          <h2 className="text-lg font-semibold">Transaksi Terakhir</h2>
          <TransactionList transactions={transactions} />
        </div>
      </div>
      <ModalFormTransaction categories={categories} />
    </ModalFormTransactionProvider>
  );
}
