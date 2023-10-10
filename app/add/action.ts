'use server'

import { revalidatePath } from 'next/cache'
import z from 'zod'
import { TransactionType } from '@prisma/client'
import prisma from '@/utils/db'

import { ActionFormValidationError, ActionResult, getActionError } from '@/utils/action'
import { redirect } from 'next/navigation'

export async function create(_: ActionResult, formData: FormData): Promise<ActionResult> {
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
                .number()
                .min(1000),
            note: z.string().min(1)
        })
    
        const result = schema.safeParse({
            type: formData.get('type'),
            date: formData.get('date'),
            amount: parseInt(formData.get('amount') as string),
            note: formData.get('note')
        })
    
        if (!result.success) {
            throw new ActionFormValidationError('Validation error', result.error.flatten().fieldErrors)
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

        return {
            success: true,
            message: 'Create successful!'
        }
    } catch(error) {
        const actionErr = getActionError(error)

        return actionErr
    }
}