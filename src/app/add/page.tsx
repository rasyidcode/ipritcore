import SubmitButton from "@/components/SubmitButton";
import * as transaction from "@/services/transaction";
import { TransactionType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function createTransaction(data: FormData) {
    "use server"

    const date = data.get("date")?.valueOf()
    const amount = data.get("amount")?.valueOf()
    const type = data.get("type")?.valueOf()
    const desc = data.get("desc")?.valueOf()

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

    await transaction.create({
        date: date,
        type: type === "expenses" ? TransactionType.EXPENSES : TransactionType.INCOME,
        desc: desc,
        amount: parseInt(amount)
    })

    revalidatePath('/')

    redirect("/")
}

export default function Page() {
    return (
        <div className="p-4 border grid grid-cols-1">
            <h4 className="mb-4 font-medium underline">Add New Expense</h4>

            <form action={createTransaction} className="grid gap-3">
                <div className="flex flex-row gap-3">
                    <label htmlFor="date" className="text-sm py-1 w-16">Date</label>
                    <input type="date" id="date" name="date" className="border text-sm w-60" />
                </div>
                <div className="flex flex-row gap-3">
                    <label htmlFor="amount" className="text-sm py-1 w-16">Amount</label>
                    <input type="number" id="amount" name="amount" className="border text-sm w-60" />
                </div>
                <div className="flex flex-row gap-3">
                    <label htmlFor="type" className="text-sm py-1 w-16">Type</label>
                    <div>
                        <div className="flex flex-row gap-3">
                            <input type="radio" name="type" id="type" value="expenses" />
                            <span className="text-sm py-1">Expenses</span>
                        </div>
                        <div className="flex flex-row gap-3">
                            <input type="radio" name="type" id="type" value="income" />
                            <span className="text-sm py-1">Income</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                    <label htmlFor="desc" className="text-sm py-1 w-16">Desc</label>
                    <textarea id="desc" name="desc" className="border text-sm w-60"></textarea>
                </div>
                <div className="flex flex-row gap-3">
                    <div className="py-1 w-16"></div>
                    <SubmitButton />
                </div>
            </form>
        </div>
    )
}