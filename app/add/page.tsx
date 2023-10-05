import { createExpense } from "@/utils/actions";
import ActionForm from "@/components/ActionForm";

const AddPage = () => {
    return (
        <ActionForm
            type="Create"
            actionHandler={createExpense}/>
    )
}

export default AddPage