import BudgetCategoryRow, {
  BudgetCategoryRowData,
} from "@/components/BudgetCategoryRow";
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

type BudgetsPageProps = {
  searchParams?: Promise<{
    month?: string;
  }>;
};

export default async function BudgetsPage({ searchParams }: BudgetsPageProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    redirect("/login");
  }

  const params = await searchParams;
  const selectedMonth = getMonthStart(params?.month);
  const monthParam = toMonthParam(selectedMonth);
  const nextMonth = addMonths(selectedMonth, 1);
  const previousMonth = addMonths(selectedMonth, -1);
  const isCurrentMonth =
    toMonthParam(selectedMonth) === toMonthParam(new Date());

  const [categories, budgets, transactions] = await Promise.all([
    prisma.category.findMany({
      where: {
        type: TransactionType.EXPENSE,
        userId,
      },
      orderBy: {
        name: "asc",
      },
    }),
    prisma.budget.findMany({
      where: {
        userId,
        month: selectedMonth,
      },
    }),
    prisma.transaction.findMany({
      where: {
        userId,
        type: TransactionType.EXPENSE,
        date: {
          gte: selectedMonth,
          lt: nextMonth,
        },
      },
      select: {
        amount: true,
        categoryId: true,
      },
    }),
  ]);

  const budgetByCategoryId = new Map(
    budgets.map((budget) => [budget.categoryId, budget.amount])
  );
  const spendingByCategoryId = transactions.reduce((acc, transaction) => {
    acc.set(
      transaction.categoryId,
      (acc.get(transaction.categoryId) ?? 0) + transaction.amount
    );

    return acc;
  }, new Map<number, number>());
  const rows: BudgetCategoryRowData[] = categories.map((category) => ({
    categoryId: category.id,
    categoryName: category.name,
    budgetAmount: budgetByCategoryId.get(category.id) ?? 0,
    spentAmount: spendingByCategoryId.get(category.id) ?? 0,
    month: monthParam,
  }));
  const totalBudget = rows.reduce((total, row) => total + row.budgetAmount, 0);
  const totalSpent = rows.reduce((total, row) => total + row.spentAmount, 0);

  return (
    <div className="flex-1 p-4 flex flex-col overflow-hidden md:max-h-[768px]">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Anggaran</h1>
        {!isCurrentMonth && (
          <Link
            href="/budgets"
            className="text-sm font-semibold underline underline-offset-4"
          >
            Bulan ini
          </Link>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <Link
          href={`/budgets?month=${toMonthParam(previousMonth)}`}
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
          href={`/budgets?month=${toMonthParam(nextMonth)}`}
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
            Anggaran
          </p>
          <h3 className="text-lg font-medium">{formatIdr(totalBudget)}</h3>
        </div>
        <div className="border dark:border-white/[.09] flex-1 p-2 rounded-lg">
          <p className="text-sm uppercase tracking-wider font-semibold">
            Terpakai
          </p>
          <h3 className="text-lg font-medium text-red-600">
            {formatIdr(totalSpent)}
          </h3>
        </div>
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto rounded-lg border divide-y scrollbar dark:border-white/[.09] dark:divide-white/[.09]">
        {rows.map((row) => (
          <BudgetCategoryRow row={row} key={row.categoryId} />
        ))}
        {rows.length === 0 && (
          <p className="p-3 text-sm text-foreground/60">
            Belum ada kategori pengeluaran.
          </p>
        )}
      </div>
    </div>
  );
}
