import { TransactionItem } from "../components/TransactionItem";
import * as transaction from "../utils/db";

export default async function Home() {
  const transactions = await transaction.getAll()

  return (
    <div className="p-4 border grid grid-cols-1 divide-y divide-dashed mb-2">
      {transactions.map(t => (
        <TransactionItem
          key={t.id}
          id={t.id}
          amount={t.amount}
          desc={t.desc}
          type={t.type}
          date={t.date} />
      ))}
    </div>
  )
}
