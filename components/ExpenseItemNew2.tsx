import { Transaction, TransactionType } from "@prisma/client";
import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";
import ExpenseDeleteButton from "./ExpenseDeleteButton";

const ExpenseItemNew2 = ({ id, desc, type, amount }: Transaction) => {
  return (
    <div className="flex justify-between items-center p-2 w-full">
      <h3 className="font-light flex-1">{desc}</h3>
      <div className="flex flex-row justify-center items-center gap-3">
        {type === TransactionType.EXPENSES ?
          (<p className="font-medium text-red-500">
            -Rp{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>) :
          (<p className="font-medium text-green-500">
            Rp{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>)}
        <div className="flex items-center justify-center gap-2">
          <Link href={`/update-expense/${id}`} className="text-orange-400 border 
          border-orange-400 p-1 hover:bg-orange-100 transition-all duration-150 
            ease-in-out">
            <FaPencilAlt />
          </Link>
          <ExpenseDeleteButton id={id} />
        </div>
      </div>
    </div>
  )
}

export default ExpenseItemNew2