import Layout from "@/components/Layout";
import { TransactionItem } from "@/components/TransactionItem";
import * as transaction from "@/services/transaction";

export default async function Home() {
  const transactions = await transaction.getAll()

  return (
    <>
      <Layout home>
        <div className="p-4 border grid grid-cols-1 divide-y divide-dashed">
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
      </Layout>
    </>
  )
}
