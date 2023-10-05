import { prisma } from "@/utils/db"

export const GET = async (_request: Request) => {
    try {
        const currentDate = new Date()
        const expenses = await prisma.transaction.findMany({ where: { date: currentDate } })

        return new Response(JSON.stringify(expenses), { status: 200 })
    } catch (error) {
        return new Response('Something went wrong', { status: 500 })
    }
}