import { prisma } from "@/db";
import { Transaction } from "@prisma/client";

export function getAll() {
    return prisma.transaction.findMany({ orderBy: { createdAt: 'desc' } })
}

export function get(id: number) {
    return prisma.transaction.findFirst({ where: { id: id } })
}

export function create(transaction: Transaction) {
    prisma.transaction.create({ data: transaction })
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