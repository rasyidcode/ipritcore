import ActionFormButton from "@/components/ActionFormButton";
import { deleteExpense } from "@/utils/actions";
import { get as getExpense } from "@/utils/db";

const DeleteExpense = async ({ params }: { params: { id: string } }) => {
    const expense = await getExpense(parseInt(params.id))

    return (
        <div className="p-4 border grid grid-cols-1">
            <h4>Are you sure want to delete this data?</h4>
            <pre className="bg-slate-100 p-2 my-2">
                {JSON.stringify(expense, undefined, 4)}
            </pre>

            <form action={deleteExpense}>
                <input type="hidden" name="id" defaultValue={params.id} />
                <ActionFormButton text={"Delete"} pendingText={"Deleting..."} />
            </form>
        </div>
    )
}

export default DeleteExpense