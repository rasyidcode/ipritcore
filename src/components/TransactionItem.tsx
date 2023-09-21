import { TransactionType } from "@prisma/client"
import Link from "next/link"

type TransactionItemProps = {
    id: number,
    date: Date,
    amount: number,
    desc: string,
    type: TransactionType
}

export function TransactionItem({ id, date, amount, desc, type }: TransactionItemProps) {
    return (
        <div className="py-4">
            <div className="flex">
                <span className="font-light text-sm">{date.toISOString().split('T')[0]}</span>
                <span className="flex-1 text-sm font-semibold ml-2 text-gray-600">{desc}</span>
                <span className="text-sm">
                    {type === TransactionType.INCOME ? (
                        <span className={`text-green-500`}>&#43;</span>
                    ) : (<span className={`text-red-500`}>&#45;</span>)}
                    {' '}Rp. {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},00</span>
            </div>
            <div className="flex justify-end gap-2 mt-2">
                <Link href={`/edit/${id}`} className="text-sm bg-orange-100 px-1">edit</Link>
                <button className="text-sm bg-red-100 px-1">delete</button>
            </div>
        </div>
    )
}