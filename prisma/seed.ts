import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // [seed categories]
    const groceries = await prisma.category.upsert({
        where: { name: 'Groceries' },
        update: {},
        create: { name: 'Groceries' }
    })
    const eat = await prisma.category.upsert({
        where: { name: 'Eat'},
        update: {},
        create: { name: 'Eat' }
    })
    const rent = await prisma.category.upsert({
        where: { name: 'Rent'},
        update: {},
        create: { name: 'Rent' }
    })
    const salary = await prisma.category.upsert({
        where: { name: 'Salary'},
        update: {},
        create: { name: 'Salary' }
    })
    const bonus = await prisma.category.upsert({
        where: { name: 'Bonus'},
        update: {},
        create: { name: 'Bonus' }
    })
    // end of [seed categories]

    // [seed account]
    const myWallet = await prisma.account.upsert({
        where: { name: 'My Wallet' },
        update: {},
        create: { name: 'My Wallet' }
    })
    const wifeWallet = await prisma.account.upsert({
        where: { name: 'Wife\'s Wallet' },
        update: {},
        create: { name: 'Wife\'s Wallet' }
    })
    const atm = await prisma.account.upsert({
        where: { name: 'Bank' },
        update: {},
        create: { name: 'Bank' }
    })
    // end of [seed account]

    // [seed transaction]
    // await prisma.transaction.createMany({
    //     data: [
    //         {
    //             date: new Date(),
                
    //         }
    //     ]
    // })
    // end of [seed transaction]
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })