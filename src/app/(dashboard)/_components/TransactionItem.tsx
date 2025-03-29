import { numberToIDRFormat } from "@/lib/stringUtils";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function TransactionItem({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <div className="p-2 flex items-center">
      <div className="flex-1 flex flex-col">
        <h4 className="font-light">{transaction.name}</h4>
        <p
          className={`${
            transaction.type === "income" ? "text-green-600" : "text-red-600"
          } font-semibold`}
        >
          {numberToIDRFormat(transaction.amount)}
        </p>
      </div>
      <button
        className="rounded-full h-6 w-6
                flex items-center justify-center hover:bg-[#f2f2f2]
                hover:border-transparent text-gray-500"
      >
        <EllipsisVerticalIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
