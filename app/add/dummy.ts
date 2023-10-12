import { Account, Category } from "@prisma/client";

export const accountsDummy = [
    {
        id: 1,
        name: 'My Wallet',
        createdAt: null,
        updatedAt: null
    },
    {
        id: 1,
        name: 'ATM',
        createdAt: null,
        updatedAt: null
    }
] satisfies Account[]

export const categoriesDummy = [
    {
        id: 1,
        name: 'Groceries',
        createdAt: null,
        updatedAt: null,
    },
    {
        id: 2,
        name: 'Eat',
        createdAt: null,
        updatedAt: null,
    },
    {
        id: 3,
        name: 'Salary',
        createdAt: null,
        updatedAt: null,
    },
    {
        id: 4,
        name: 'Bonus',
        createdAt: null,
        updatedAt: null,
    },
] satisfies Category[]