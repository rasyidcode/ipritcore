'use server';

import { TransactionType } from "@prisma/client";
import * as transaction from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createExpense(data: FormData) {
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