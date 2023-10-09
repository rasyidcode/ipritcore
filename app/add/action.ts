'use server'

import prisma from '@/utils/db'
import { TransactionType } from '@prisma/client'
import z from 'zod'

export async function create(formData: FormData) {
    const schema = z.object({
        type: z
            .string()
            .min(1)
            .transform((val) => {
                if (val == 'expense') {
                    return TransactionType.EXPENSE
                } else if (val == 'income') {
                    return TransactionType.INCOME
                } else {
                    return TransactionType.TRANSFER
                }
            }),
        date: z
            .string()
            .min(1)
            .transform((val) => new Date(val)),
        amount: z
            .string()
            .min(1)
            .transform((val) => parseInt(val)),
        note: z.string().min(1)
    })

    const result = schema.safeParse({
        type: formData.get('type'),
        date: formData.get('date'),
        amount: formData.get('amount'),
        note: formData.get('note')
    })

    if (!result.success) {
        return 
    }

    console.log(data)

    await prisma.transaction.create({
        data: {
            type: data.type,
            date: data.date,
            amount: data.amount,
            note: data.note
        }
    })
}