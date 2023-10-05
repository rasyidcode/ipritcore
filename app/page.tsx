import ExpenseItemNew from "@/components/ExpenseItemNew";
import { getAll as getAllExpense, getExpensesByDate } from "../utils/db";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default async function Home() {
  const today = new Date();
  const expenses = await getExpensesByDate(today);

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-teal-500">Thursday, October 05</h3>
        <Link href="/create-expense" className="text-sm flex justify-center items-center gap-2 text-teal-500 border border-teal-100 px-2 py-1 hover:bg-teal-100/60 transition-all ease-in-out duration-150 font-medium"><FaPlus /> <span>Create New</span></Link>
      </div>

      <div className="mt-5 grid divide-y divide-dashed">
        {expenses.map(expense => (<ExpenseItemNew {...expense} />))}
      </div>
    </>
  )
}
