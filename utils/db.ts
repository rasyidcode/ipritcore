import { PrismaClient, TransactionType } from "@prisma/client";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: ["query"]
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export type TransactionData = {
    id?: number,
    date?: string,
    amount?: number,
    type?: TransactionType,
    desc?: string
}

export function getAll() {
    return prisma.transaction.findMany({ orderBy: { createdAt: 'desc' } })
}

export function get(id: number) {
    return prisma.transaction.findFirst({ where: { id: id } })
}

export function getAllIds() {
    return prisma.transaction.findMany({ select: { id: true } })
}

export async function create(transaction: TransactionData) {
    await prisma.transaction.create({
        data: {
            date: new Date(transaction.date ?? ''),
            desc: transaction.desc ?? '',
            amount: transaction.amount ?? 0,
            type: transaction.type ?? 'EXPENSES'
        }
    })
}

export async function update(transaction: TransactionData) {
    await prisma.transaction.update({
        where: { id: transaction.id }, data: {
            date: new Date(transaction.date ?? ''),
            desc: transaction.desc,
            amount: transaction.amount,
            type: transaction.type
        }
    })
}

export function softDelete(id: number) {
    prisma.transaction.update({ where: { id: id }, data: { deletedAt: new Date() } })
}

export function restore(id: number) {
    prisma.transaction.update({ where: { id: id }, data: { deletedAt: null } })
}

export async function purge(id: number) {
    await prisma.transaction.delete({ where: { id: id } })
}