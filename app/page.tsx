import { prisma } from "../utils/db"
import { FaAngry, FaPlus } from "react-icons/fa"
import Link from "next/link"
import { Transaction, TransactionType } from "@prisma/client"
import CenteredMessage from "@/components/CenteredMessage"
import ExpenseItemNew2 from "@/components/ExpenseItemNew2"

const ExpenseItemList = ({ expenses }: { expenses: Transaction[] }) => {
  return (
    <div className="mt-5 flex flex-col justify-start items-start divide-y divide-dashed flex-1">
      {expenses.map(expense => (<ExpenseItemNew2 key={expense.id} {...expense} />))}
    </div>
  )
}

export default async function Home() {
  const currentDate = new Date()
  const expenses = await prisma.transaction.findMany({
    where: { date: currentDate },
    orderBy: { id: 'asc' }
  })
  const expensesTotal = await prisma.transaction.aggregate({
    _sum: {
      amount: true
    },
    where: {
      type: TransactionType.EXPENSES,
      date: currentDate
    }
  })
  const incomeTotal = await prisma.transaction.aggregate({
    _sum: {
      amount: true
    },
    where: {
      type: TransactionType.INCOME,
      date: currentDate
    }
  })

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center">
        {/* <h3 className="font-bold text-teal-500">Thursday, October 05</h3> */}
        <h3 className="font-bold text-teal-500">{`${currentDate.toLocaleDateString('en-US', {
          weekday: "long",
          month: "short",
          day: "numeric"
        })}`}</h3>
        <Link href="/create-expense" className="text-sm flex justify-center items-center gap-2 text-teal-500 border border-teal-500 px-2 py-1 hover:bg-teal-100/60 transition-all ease-in-out duration-150 font-medium"><FaPlus /> <span>Create New</span></Link>
      </div>

      {expenses.length > 0 ?
        (<ExpenseItemList expenses={expenses} />) :
        (<CenteredMessage message="No Data" icon={<FaAngry />} />)}

      <div className="flex flex-row gap-4">
        <div className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 p-0.5">
          <div className="bg-white w-full flex flex-col justify-center items-center py-1">
            <h4 className="font-semibold">Expense</h4>
            <p className="font-extrabold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              {expensesTotal._sum.amount != null ? `Rp${expensesTotal._sum.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : `Rp0`}
            </p>
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 p-0.5">
          <div className="bg-white w-full flex flex-col justify-center items-center py-1">
            <h4 className="font-semibold">Income</h4>
            <p className="font-extrabold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
              {incomeTotal._sum.amount != null ? `Rp${incomeTotal._sum.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : `Rp0`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
