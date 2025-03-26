import { numberToIDRFormat } from "@/lib/stringUtils"
import { TransactionType } from "@prisma/client"

const TransactionAmount = ({ amount, type }: {
    amount: number,
    type: TransactionType
}) => {
    let textColor: string

    if (type == TransactionType.EXPENSE) {
        textColor = 'text-red-500'
    } else if (type == TransactionType.INCOME) {
        textColor = 'text-green-500'
    } else {
        textColor = 'text-blue-500'
    }

    return (
        <p className={`font-medium ${textColor}`}>
            {numberToIDRFormat(amount)}
        </p>
    )
}

export default TransactionAmount