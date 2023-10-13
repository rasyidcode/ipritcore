import { authOptions } from '@/utils/auth'
import prisma from '@/utils/db'
import { numberToIDRFormat } from '@/utils/stringUtils'
import { TransactionType } from '@prisma/client'
import { getServerSession } from 'next-auth'

const TransactionSummary = async () => {
    const session = await getServerSession(authOptions)
    const currentDate = new Date()
    const expensesTotal = await prisma.transaction.aggregate({
        _sum: {
            amount: true
        },
        where: {
            type: TransactionType.EXPENSE,
            date: currentDate,
            userId: session?.user.id
        }
    })
    const incomeTotal = await prisma.transaction.aggregate({
        _sum: {
            amount: true
        },
        where: {
            type: TransactionType.INCOME,
            date: currentDate,
            userId: session?.user.id
        }
    })

    return (
        <div className='flex flex-row gap-4'>
            <div className='flex-1 bg-gradient-to-r from-red-500 to-orange-500 p-0.5'>
                <div className='bg-white w-full flex flex-col justify-center 
                    items-center py-1'>
                    <h4 className='font-semibold text-black/80'>Expense</h4>
                    <p className='font-extrabold bg-gradient-to-r from-red-500 
                        to-orange-500 bg-clip-text text-transparent'>
                        {expensesTotal._sum.amount != null ?
                            numberToIDRFormat(expensesTotal._sum.amount) : `Rp0`}
                    </p>
                </div>
            </div>
            <div className='flex-1 bg-gradient-to-r from-green-500 to-teal-500 p-0.5'>
                <div className='bg-white w-full flex flex-col justify-center 
                    items-center py-1'>
                    <h4 className='font-semibold text-black/80'>Income</h4>
                    <p className='font-extrabold bg-gradient-to-r from-green-500 
                        to-teal-500 bg-clip-text text-transparent'>
                        {incomeTotal._sum.amount != null ?
                            numberToIDRFormat(incomeTotal._sum.amount) : `Rp0`}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TransactionSummary