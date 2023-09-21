import * as transaction from "@/services/transaction";
import { Transaction, TransactionType } from "@prisma/client";
import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from "next";

// export async function getStaticPaths(): GetStaticPaths {
//     const ids = await transaction.getAllIds()
//     const paths = ids.map((id) => ({
//         params: {
//             id: id
//         }
//     }))

//     return {
//         paths: paths,
//         fallback: false,
//     }
// }

type TransactionData = {
    id: number,
    amount: number,
    desc: string,
    type: TransactionType | null,
    date: Date | null
}

export const getStaticPaths = (async () => {
    const ids = await transaction.getAllIds()
    console.log('ids: ', ids)
    const paths = ids.map((id) => ({ params: { id: id.toString() } }))

    return {
        paths: paths,
        fallback: true
    }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
    const id = context.params?.id
    if (typeof id !== "string") {
        return {
            props: { trans: null }
        }
    }
    const data = await transaction.get(parseInt(id))
    const dataProps: TransactionData = {
        id: data?.id ?? 0,
        amount: data?.amount ?? 0,
        date: data?.date ?? null,
        type: data?.type ?? null,
        desc: data?.desc ?? ''
    }

    return {
        props: { trans: dataProps }
    }
}) satisfies GetStaticProps<{ trans: TransactionData | null }>

export default function Page({ trans }: InferGetServerSidePropsType<typeof getStaticProps>) {
    console.log(trans)

    return (
        <div className="p-4 border grid grid-cols-1">
            <h4 className="mb-4 font-medium underline">Edit New Expense</h4>

            <form className="grid gap-3">
                <div className="flex flex-row gap-3">
                    <label htmlFor="date" className="text-sm py-1 w-16">Date</label>
                    <input type="date" id="date" name="date" className="border text-sm w-60" />
                </div>
                <div className="flex flex-row gap-3">
                    <label htmlFor="amount" className="text-sm py-1 w-16">Amount</label>
                    <input type="number" id="amount" name="amount" className="border text-sm w-60" value={0} />
                </div>
                <div className="flex flex-row gap-3">
                    <label htmlFor="type" className="text-sm py-1 w-16">Type</label>
                    <div>
                        <div className="flex flex-row gap-3">
                            <input type="radio" name="type" id="type" value="expenses" />
                            <span className="text-sm py-1">Expenses</span>
                        </div>
                        <div className="flex flex-row gap-3">
                            <input type="radio" name="type" id="type" value="income" />
                            <span className="text-sm py-1">Income</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                    <label htmlFor="desc" className="text-sm py-1 w-16">Desc</label>
                    <textarea className="border text-sm w-60"></textarea>
                </div>
                <div className="flex flex-row gap-3">
                    <div className="py-1 w-16"></div>
                    <button className="text-sm px-1 border hover:bg-slate-100">Save</button>
                </div>
            </form>
        </div>
    )
}