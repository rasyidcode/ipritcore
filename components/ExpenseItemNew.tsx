'use client';

import { Transaction, TransactionType } from "@prisma/client";
import { useRouter } from "next/navigation";

const ExpenseItemNew = ({ id, desc, type, amount }: Transaction) => {
  const router = useRouter();

  return (
    <div className="
        flex justify-between 
        items-center cursor-pointer
        p-2 hover:bg-teal-50
        w-full"
      onClick={() => { router.push(`/item-action/${id}`) }}>
      <h3 className="font-light flex-1">{desc}</h3>
      {type === TransactionType.EXPENSES ?
        (<span className="font-medium text-red-500">
          -Rp{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </span>) :
        (<span className="font-medium text-green-500">
          Rp{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </span>)}
    </div>
  )
}

export default ExpenseItemNew