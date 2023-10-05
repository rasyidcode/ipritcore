import { ExpenseItem } from "../components/ExpenseItem";
import { getAll as getAllExpense } from "../utils/db";

export default async function Home() {
  const expenses = await getAllExpense();

  return (
    <div className="p-4 border grid grid-cols-1 divide-y divide-dashed mb-2">
      {expenses.map(expense => ( <ExpenseItem {...expense} /> ))}
    </div>
  )
}
