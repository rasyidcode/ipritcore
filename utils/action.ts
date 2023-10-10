import { z } from 'zod'

export type ActionResult = {
    success: boolean | null,
    message?: string | null,
    error?: string,
    errors?: Record<string, string[] | undefined>
}

export const getActionError = (error: unknown): ActionResult => {
    let actionError: ActionResult = {
        success: false,
        error: 'Something went wrong'
    }

    if (error instanceof ActionFormValidationError) {
        actionError.error = error.message
        actionError.errors = error.errors
    } else if (error instanceof Error) {
        actionError.error = error.message
    } else if (error && typeof error === 'object' && 'message' in error) {
        actionError.error = String(error.message)
    } else if (typeof error === 'string') {
        actionError.error = error
    }

    return actionError
}

export class ActionFormValidationError extends Error {
    errors: Record<string, string[] | undefined>;

    constructor(message: string, errors: Record<string, string[] | undefined>) {
        super(message)

        this.errors = errors
    }
}

// export async function createExpense(data: FormData) {
//     const date = data.get("date")?.valueOf()
//     const amount = data.get("amount")?.valueOf()
//     const type = data.get("type")?.valueOf()
//     const desc = data.get("desc")?.valueOf()

//     if (typeof date !== "string" || date.length === 0) {
//         throw new Error("Invalid Date")
//     }
//     if (typeof amount !== "string" || amount.length === 0) {
//         throw new Error("Invalid Amount")
//     }
//     if (typeof type !== "string" || type.length === 0) {
//         throw new Error("Invalid Type")
//     }
//     if (typeof desc !== "string" || desc.length === 0) {
//         throw new Error("Invalid Desc")
//     }

//     await transaction.create({
//         date: date,
//         type: type === "expenses" ? TransactionType.EXPENSES : TransactionType.INCOME,
//         desc: desc,
//         amount: parseInt(amount)
//     })

//     revalidatePath('/')

//     redirect("/")
// }

// export async function updateExpense(data: FormData) {
//     const id = data.get("id")?.valueOf()
//     const date = data.get("date")?.valueOf()
//     const amount = data.get("amount")?.valueOf()
//     const type = data.get("type")?.valueOf()
//     const desc = data.get("desc")?.valueOf()

//     if (typeof id !== "string" || id.length === 0) {
//         throw new Error("Invalid ID")
//     }
//     if (typeof date !== "string" || date.length === 0) {
//         throw new Error("Invalid Date")
//     }
//     if (typeof amount !== "string" || amount.length === 0) {
//         throw new Error("Invalid Amount")
//     }
//     if (typeof type !== "string" || type.length === 0) {
//         throw new Error("Invalid Type")
//     }
//     if (typeof desc !== "string" || desc.length === 0) {
//         throw new Error("Invalid Desc")
//     }

//     await transaction.update({
//         id: parseInt(id),
//         date: date,
//         type: type === "expenses" ? TransactionType.EXPENSES : TransactionType.INCOME,
//         desc: desc,
//         amount: parseInt(amount)
//     })

//     revalidatePath('/')

//     redirect("/")
// }

// export const deleteExpense = async (/*prevState: any, */formData: FormData) => {
//     const id = formData.get("id")?.valueOf()

//     if (typeof id !== "string" || id.length === 0) {
//         throw new Error("Invalid ID")
//     }

//     await transaction.purge(parseInt(id))

//     return { success: true, message: "Success deleted!" }
// }

// export const deleteExpense2 = async(id: number) => {
//     await transaction.prisma.transaction.delete({ where: { id: id } })
//     revalidatePath('/')
// }