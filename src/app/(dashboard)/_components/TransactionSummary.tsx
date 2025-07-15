import { numberToIDRFormat } from "@/lib/stringUtils";

export default function TransactionSummary({
  balance,
  totalExpenses,
}: {
  balance: number;
  totalExpenses: number;
}) {
  return (
    <div className="flex gap-2 mt-4">
      <div className="border dark:border-white/[.09] flex-1 p-2 rounded-lg">
        <p className="text-sm uppercase tracking-wider font-semibold">Saldo</p>
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
  );
}
