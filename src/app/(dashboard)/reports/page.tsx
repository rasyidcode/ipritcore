import { authOptions } from "@/lib/auth";
import {
  addMonths,
  formatMonthLabel,
  getMonthStart,
  toMonthParam,
} from "@/lib/monthUtils";
import prisma from "@/lib/prisma";
import { formatIdr } from "@/lib/stringUtils";
import { TransactionType } from "@prisma/client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

type ReportsPageProps = {
  searchParams?: Promise<{
    month?: string;
  }>;
};

type CategorySummary = {
  categoryId: number;
  categoryName: string;
  amount: number;
  count: number;
};

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    redirect("/login");
  }

  const params = await searchParams;
  const selectedMonth = getMonthStart(params?.month);
  const nextMonth = addMonths(selectedMonth, 1);
  const previousMonth = addMonths(selectedMonth, -1);
  const isCurrentMonth =
    toMonthParam(selectedMonth) === toMonthParam(new Date());

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: selectedMonth,
        lt: nextMonth,
      },
    },
    include: {
      category: true,
    },
  });

  const expenseSummaries = getCategorySummaries(
    transactions.filter(
      (transaction) => transaction.type === TransactionType.EXPENSE
    )
  );
  const incomeSummaries = getCategorySummaries(
    transactions.filter(
      (transaction) => transaction.type === TransactionType.INCOME
    )
  );
  const totalExpenses = expenseSummaries.reduce(
    (total, summary) => total + summary.amount,
    0
  );
  const totalIncome = incomeSummaries.reduce(
    (total, summary) => total + summary.amount,
    0
  );

  return (
    <div className="flex-1 p-4 flex flex-col overflow-hidden md:max-h-[768px]">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Laporan</h1>
        {!isCurrentMonth && (
          <Link
            href="/reports"
            className="text-sm font-semibold underline underline-offset-4"
          >
            Kembali
          </Link>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <Link
          href={`/reports?month=${toMonthParam(previousMonth)}`}
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
          href={`/reports?month=${toMonthParam(nextMonth)}`}
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
            Pemasukkan
          </p>
          <h3 className="text-lg font-medium text-green-600">
            {formatIdr(totalIncome)}
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

      <div className="mt-4 grid min-h-0 flex-1 grid-rows-2 gap-4 overflow-hidden">
        <SummaryList
          title="Pengeluaran berdasarkan kategori"
          summaries={expenseSummaries}
          totalAmount={totalExpenses}
          amountClassName="text-red-600"
        />
        <SummaryList
          title="Pemasukkan berdasarkan kategori"
          summaries={incomeSummaries}
          totalAmount={totalIncome}
          amountClassName="text-green-600"
        />
      </div>
    </div>
  );
}

function getCategorySummaries(
  transactions: Array<{
    amount: number;
    categoryId: number;
    category: {
      name: string;
    };
  }>
): CategorySummary[] {
  const summaries = new Map<number, CategorySummary>();

  transactions.forEach((transaction) => {
    const summary = summaries.get(transaction.categoryId) ?? {
      categoryId: transaction.categoryId,
      categoryName: transaction.category.name,
      amount: 0,
      count: 0,
    };

    summary.amount += transaction.amount;
    summary.count += 1;
    summaries.set(transaction.categoryId, summary);
  });

  return Array.from(summaries.values()).sort((a, b) => b.amount - a.amount);
}

function SummaryList({
  title,
  summaries,
  totalAmount,
  amountClassName,
}: {
  title: string;
  summaries: CategorySummary[];
  totalAmount: number;
  amountClassName: string;
}) {
  return (
    <section className="min-h-0 flex flex-col">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-2 min-h-0 flex-1 divide-y overflow-y-auto rounded-lg border scrollbar dark:divide-white/[.09] dark:border-white/[.09]">
        {summaries.map((summary) => (
          <div className="p-2" key={summary.categoryId}>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-medium">
                  {summary.categoryName}
                </h3>
                <p className="text-xs text-foreground/60">
                  {summary.count} transaksi
                </p>
              </div>
              <p className={`text-sm font-semibold ${amountClassName}`}>
                {formatIdr(summary.amount)}
              </p>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-foreground/10">
              <div
                className="h-1.5 rounded-full bg-foreground"
                style={{
                  width: `${getPercentage(summary.amount, totalAmount)}%`,
                }}
              />
            </div>
          </div>
        ))}
        {summaries.length === 0 && (
          <p className="p-3 text-sm text-foreground/60">Belum ada transaksi.</p>
        )}
      </div>
    </section>
  );
}

function getPercentage(amount: number, totalAmount: number) {
  if (totalAmount === 0) {
    return 0;
  }

  return Math.max(4, Math.round((amount / totalAmount) * 100));
}
