import { prisma } from "@/utils/db"

export const DELETE = async (_request: Request, { params }: { params: { id: string } }) => {
    try {
        const id = parseInt(params.id)
        const expense = await prisma.transaction.findFirst({ where: { id: id } })
        
        if (!expense) return new Response('Expense not found', { status: 404 })

        await prisma.transaction.delete({ where: { id: id } })

        return new Response('Expense successfully deleted!', { status: 200 })
    } catch(error) {
        return new Response('Something went wrong', { status: 500 })
    }
}