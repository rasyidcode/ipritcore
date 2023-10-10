'use server'

import prisma from '@/utils/db'
import { ActionError, ActionFormValidationError, getActionError } from '@/utils/error'
import { TransactionType } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import z from 'zod'

export async function create(formData: FormData): Promise<void | ActionError> {
    try {
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
            throw new ActionFormValidationError('Validation error', result.error.issues)
        }
    
        await prisma.transaction.create({
            data: {
                type: result.data.type,
                date: result.data.date,
                amount: result.data.amount,
                note: result.data.note
            }
        })

        revalidatePath('/')

        redirect('/')
    } catch(error) {
        return getActionError(error)
    }
}