import CategoryForm from "@/components/CategoryForm";
import CategoryList from "@/components/CategoryList";
import prisma from "@/lib/prisma";
import { TransactionType } from "@prisma/client";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
    orderBy: [{ type: "asc" }, { name: "asc" }],
  });

  const expenseCategories = categories.filter(
    (category) => category.type === TransactionType.EXPENSE
  );
  const incomeCategories = categories.filter(
    (category) => category.type === TransactionType.INCOME
  );

  return (
    <div className="flex-1 p-4 flex flex-col overflow-hidden md:max-h-[768px]">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Kategori</h1>
      </div>

      <CategoryForm />

      <div className="mt-4 grid min-h-0 flex-1 grid-rows-2 gap-4 overflow-hidden">
        <CategoryList title="Pengeluaran" categories={expenseCategories} />
        <CategoryList title="Pemasukkan" categories={incomeCategories} />
      </div>
    </div>
  );
}
