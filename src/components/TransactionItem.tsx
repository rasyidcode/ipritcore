import Link from "next/link";
import { Transaction } from "@prisma/client";
import ExpenseDeleteButton from "./ExpenseDeleteButton";
import TransactionAmount from "@/components/ui/TransactionItemAmount";

const TransactionItem = ({ id, note, type, amount }: Transaction) => {
  return (
    <div className="flex justify-between items-center p-2 w-full">
      {/* Note */}
      <h3 className="font-light flex-1">{note}</h3>

      {/* Amount and Actions Button */}
      <div className="flex flex-row justify-center items-center gap-3">
        {/* Amount */}
        <TransactionAmount amount={amount} type={type} />

        {/* Actions Button */}
        <div className="flex items-center justify-center gap-2">
          {/* Edit button */}
          <Link
            href={`/edit/${id}`}
            className="text-orange-400 border 
          border-orange-400 p-1 hover:bg-orange-100 transition-all duration-150 
            ease-in-out"
          ></Link>

          {/* Delete button */}
          <ExpenseDeleteButton id={id} />
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
