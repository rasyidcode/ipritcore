import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// export function getAll() {
//     return prisma.transaction.findMany({ orderBy: { createdAt: 'desc' } })
// }

// export function get(id: number) {
//     return prisma.transaction.findFirst({ where: { id: id } })
// }

// export function getExpensesByDate(date: Date) {
//     return prisma.transaction.findMany({ where: { date: date }, orderBy: { createdAt: 'asc' } });
// }

// export function getAllIds() {
//     return prisma.transaction.findMany({ select: { id: true } })
// }

// export async function create(transaction: TransactionData) {
//     await prisma.transaction.create({
//         data: {
//             date: new Date(transaction.date ?? ''),
//             desc: transaction.desc ?? '',
//             amount: transaction.amount ?? 0,
//             type: transaction.type ?? 'EXPENSES'
//         }
//     })
// }

// export async function update(transaction: TransactionData) {
//     await prisma.transaction.update({
//         where: { id: transaction.id }, data: {
//             date: new Date(transaction.date ?? ''),
//             desc: transaction.desc,
//             amount: transaction.amount,
//             type: transaction.type
//         }
//     })
// }

// export function softDelete(id: number) {
//     prisma.transaction.update({ where: { id: id }, data: { deletedAt: new Date() } })
// }

// export function restore(id: number) {
//     prisma.transaction.update({ where: { id: id }, data: { deletedAt: null } })
// }

// export async function purge(id: number) {
//     await prisma.transaction.delete({ where: { id: id } })
// }