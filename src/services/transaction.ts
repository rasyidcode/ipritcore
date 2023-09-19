import { prisma } from "@/db";
import { Transaction, TransactionType } from "@prisma/client";

export type TransactionData = {
    date: string,
    amount: number,
    type: TransactionType,
    desc: string
}

export function getAll() {
    return prisma.transaction.findMany({ orderBy: { createdAt: 'desc' } })
}

export function get(id: number) {
    return prisma.transaction.findFirst({ where: { id: id } })
}

export async function create(transaction: TransactionData) {
    await prisma.transaction.create({ data: { 
        date: new Date(transaction.date), 
        desc: transaction.desc, 
        amount: transaction.amount, 
        type: transaction.type
    }
})
}

export function update(transaction: Transaction) {
    prisma.transaction.update({ where: { id: transaction.id }, data: { ...transaction } })
}

export function softDelete(id: number) {
    prisma.transaction.update({ where: { id: id }, data: { deletedAt: new Date() } })
}

export function restore(id: number) {
    prisma.transaction.update({ where: { id: id }, data: { deletedAt: null } })
}

export function purge(id: number) {
    prisma.transaction.delete({ where: { id: id } })
}