import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import * as transaction from "../../../utils/db";

const deleteTransaction = async (data: FormData) => {
    'use server'

    const id = data.get("id")?.valueOf()

    if (typeof id !== "string" || id.length === 0) {
        throw new Error("Invalid ID")
    }

    await transaction.purge(parseInt(id))

    revalidatePath('/')

    redirect('/')
}

const Page = async ({ params }: { params: { id: string } }) => {
    const trx = await transaction.get(parseInt(params.id))

    return (
        <div className="p-4 border grid grid-cols-1">
            <h4>Are you sure want to delete this data?</h4>
            <pre className="bg-slate-100 p-2 my-2">
                {JSON.stringify(trx, undefined, 4)}
            </pre>

            <form action={deleteTransaction}>
                <input type="hidden" name="id" defaultValue={params.id} />
                <button className="text-sm px-2 text-white font-bold uppercase bg-red-300 hover:bg-red-400">Delete</button>
            </form>
        </div>
    )
}

export default Page