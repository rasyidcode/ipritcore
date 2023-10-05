import { get as getExpense } from "../../../utils/db";
import ActionForm from "@/components/ActionForm";
import { updateExpense } from "@/utils/actions";

const UpdateExpense = async ({ params }: { params: { id: string } }) => {
    const expense = await getExpense(parseInt(params.id))

    return (
        <ActionForm
            actionHandler={updateExpense}
            type="Update"
            expense={expense} />
    )
}

export default UpdateExpense