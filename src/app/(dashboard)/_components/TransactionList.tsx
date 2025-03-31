import TransactionItem from "./TransactionItem";
import TransactionGroupItem from "./TransactionGroupItem";
import { Transaction } from "@prisma/client";

export default function TransactionList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const rows: React.ReactNode[] = [];
  let lastDate: Date | null = null;

  transactions.forEach((transaction) => {
    if (transaction.date.getTime() != lastDate?.getTime()) {
      rows.push(
        <TransactionGroupItem
          date={transaction.date}
          key={transaction.date.getTime()}
        />
      );
    }
    rows.push(
      <TransactionItem transaction={transaction} key={transaction.id} />
    );
    lastDate = transaction.date;
  });

  return (
    <div
      className="flex-1 divide-y dark:divide-white/[.09] border dark:border-white/[.09] mt-2
    overflow-y-auto rounded-lg scrollbar"
    >
      {transactions.length > 0 && rows}
      {transactions.length === 0 && <p>No data</p>}
    </div>
  );
}
