import { createExpense } from "@/utils/actions";
import ActionForm from "@/components/ActionForm";

const CreateExpense = () => {
    return (
        <ActionForm
            type="Create"
            actionHandler={createExpense} />
    )
}

export default CreateExpense