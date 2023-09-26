import { TransactionItem } from "@/components/TransactionItem";
import * as transaction from "@/services/transaction";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const transactions = await transaction.getAll()

  revalidatePath("/")

  return (
    <>
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
      <h3 className="text-sm font-bold uppercase text-gray-700">Total Data: {transactions.length}</h3>
    </>
  )
}
