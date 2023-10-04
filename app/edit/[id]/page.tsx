import * as transaction from "../../../services/transaction";
import { TransactionType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateExpense(data: FormData) {
    'use server'

    const id = data.get("id")?.valueOf()
    const date = data.get("date")?.valueOf()
    const amount = data.get("amount")?.valueOf()
    const type = data.get("type")?.valueOf()
    const desc = data.get("desc")?.valueOf()

    if (typeof id !== "string" || id.length === 0) {
        throw new Error("Invalid ID")
    }
    if (typeof date !== "string" || date.length === 0) {
        throw new Error("Invalid Date")
    }
    if (typeof amount !== "string" || amount.length === 0) {
        throw new Error("Invalid Amount")
    }
    if (typeof type !== "string" || type.length === 0) {
        throw new Error("Invalid Type")
    }
    if (typeof desc !== "string" || desc.length === 0) {
        throw new Error("Invalid Desc")
    }

    await transaction.update({
        id: parseInt(id),
        date: date,
        type: type === "expenses" ? TransactionType.EXPENSES : TransactionType.INCOME,
        desc: desc,
        amount: parseInt(amount)
    })

    revalidatePath('/')

    redirect("/")
}

export default async function Page({ params }: { params: { id: string } }) {
    const trx = await transaction.get(parseInt(params.id))

    return (
        <div className="p-4 border grid grid-cols-1">
            <h4 className="mb-4 font-medium underline">Edit Expense</h4>

            <form action={updateExpense} className="grid gap-3">
                <input type="hidden" name="id" defaultValue={params.id} />
                <div className="flex flex-row gap-3">
                    <label htmlFor="date" className="text-sm py-1 w-16">Date</label>
                    <input type="date" id="date" name="date" className="border text-sm w-60" defaultValue={trx?.date.toISOString().split('T')[0]} />
                </div>
                <div className="flex flex-row gap-3">
                    <label htmlFor="amount" className="text-sm py-1 w-16">Amount</label>
                    <input type="number" id="amount" name="amount" className="border text-sm w-60" defaultValue={trx?.amount} />
                </div>
                <div className="flex flex-row gap-3">
                    <label htmlFor="type" className="text-sm py-1 w-16">Type</label>
                    <div>
                        <div className="flex flex-row gap-3">
                            <input type="radio" name="type" id="expenses" value="expenses" defaultChecked={trx?.type === TransactionType.EXPENSES} />
                            <span className="text-sm py-1">Expenses</span>
                        </div>
                        <div className="flex flex-row gap-3">
                            <input type="radio" name="type" id="income" value="income" defaultChecked={trx?.type === TransactionType.INCOME} />
                            <span className="text-sm py-1">Income</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                    <label htmlFor="desc" className="text-sm py-1 w-16">Desc</label>
                    <textarea name="desc" className="border text-sm w-60" defaultValue={trx?.desc}></textarea>
                </div>
                <div className="flex flex-row gap-3">
                    <div className="py-1 w-16"></div>
                    <button className="text-sm px-2 uppercase font-bold text-gray-700 border hover:bg-slate-100">Save</button>
                </div>
            </form>
        </div>
    )
}