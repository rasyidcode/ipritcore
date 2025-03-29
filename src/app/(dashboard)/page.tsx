import { transactions } from "@/data/transactions";
import { numberToIDRFormat } from "@/lib/stringUtils";
import TransactionList from "./_components/TransactionList";
import NewTransactionButton from "./_components/NewTransactionButton";

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
      <NewTransactionButton />
      <div className="flex-1 flex flex-col mt-4 overflow-hidden">
        <h2 className="text-lg font-semibold">Transaksi Terakhir</h2>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
