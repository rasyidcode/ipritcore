'use server'

import { ActionFormValidationError, ActionResult, getActionError } from '@/utils/action'
import prisma from '@/utils/db'
import { TransactionType } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function update(_: ActionResult, formData: FormData): Promise<ActionResult> {
    try {
        const schema = z.object({
            id: z.number().min(1),
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
                .number()
                .min(1000),
            note: z.string().min(1),
            category: z.number().min(1),
            account: z.number().min(1),
        })
    
        const result = schema.safeParse({
            id: parseInt(formData.get('id') as string),
            type: formData.get('type'),
            date: formData.get('date'),
            amount: parseInt(formData.get('amount') as string),
            note: formData.get('note'),
            account: parseInt(formData.get('account') as string),
            category: parseInt(formData.get('category') as string),
        })
    
        if (!result.success) {
            throw new ActionFormValidationError('Validation error', result.error.flatten().fieldErrors)
        }
    
        await prisma.transaction.update({
            where: { id: result.data.id },
            data: {
                type: result.data.type,
                date: result.data.date,
                amount: result.data.amount,
                note: result.data.note,
                categoryId: result.data.category,
                accountId: result.data.account
            }
        })

        revalidatePath('/')

        return {
            success: true,
            message: 'Update successful!'
        }
    } catch(error) {
        const actionErr = getActionError(error)

        return actionErr
    }
}