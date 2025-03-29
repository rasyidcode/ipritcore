import { transactions } from "@/data/transactions";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { numberToIDRFormat } from "@/lib/stringUtils";
import TransactionList from "./_components/TransactionList";

export default function DashboardPage() {
  const balance = transactions.reverse().reduce((acc, curr) => {
    if (curr.type === "income") {
      return acc + curr.amount;
    }

    return acc - curr.amount;
  }, 0);
  const totalExpenses = transactions
    .reverse()
    .reduce(
      (acc, curr) => (curr.type === "expense" ? acc + curr.amount : acc),
      0
    );
  return (
    <div className="flex-1 p-4 flex flex-col overflow-hidden">
      <h1 className="text-2xl font-bold">Dasbor</h1>
      <div className="flex gap-2 mt-4">
        <div className="border flex-1 p-2 rounded-lg">
          <p className="text-sm uppercase tracking-wider font-semibold">
            Saldo
          </p>
          <h3 className="text-lg font-medium text-green-600">
            {numberToIDRFormat(balance)}
          </h3>
        </div>
        <div className="border flex-1 p-2 rounded-lg">
          <p className="text-sm uppercase tracking-wider font-semibold">
            Pengeluaran
          </p>
          <h3 className="text-lg font-medium text-red-600">
            {numberToIDRFormat(totalExpenses)}
          </h3>
        </div>
      </div>
      <button
        className="h-8 rounded-lg border border-solid px-4
        text-sm flex items-center justify-center hover:bg-[#f2f2f2]
        transition-colors duration-150 ease-linear gap-2 mt-2"
      >
        <PlusCircleIcon className="w-5 h-5" />
        Catat Transaksi
      </button>
      <div className="flex-1 flex flex-col mt-4 overflow-hidden">
        <h2 className="text-lg font-semibold">Transaksi Terakhir</h2>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
