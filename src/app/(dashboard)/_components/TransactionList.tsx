import TransactionItem from "./TransactionItem";
import TransactionGroupItem from "./TransactionGroupItem";

export default function TransactionList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const rows: React.ReactNode[] = [];
  let lastDate: string | null = null;

  transactions.forEach((transaction) => {
    if (transaction.date !== lastDate) {
      rows.push(
        <TransactionGroupItem date={transaction.date} key={transaction.date} />
      );
    }
    rows.push(
      <TransactionItem transaction={transaction} key={transaction.id} />
    );
    lastDate = transaction.date;
  });
  return (
    <div className="flex-1 divide-y border mt-2 overflow-y-auto rounded-lg">
      {rows}
    </div>
  );
}
