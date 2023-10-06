'use client'

import ActionFormDeleteButton from "@/components/ActionFormDeleteButton";
import Modal from "@/components/Modal"
import { deleteExpense } from "@/utils/actions";
import { redirect, useRouter } from "next/navigation";
import { FaPencilAlt, FaSpinner, FaTrash } from "react-icons/fa"
import { experimental_useFormState as useFormState } from 'react-dom'
import { revalidatePath } from "next/cache";

const initialState = {
    success: null,
    message: null
}

const ItemAction = ({ params }: {
    params: { id: string }
}) => {
    const router = useRouter()
    const [state, deleteFormAction] = useFormState(deleteExpense, initialState)

    // WARNING: temporary solution to handle modal close and refresh data
    if (state.success) {
        router.refresh()
        
        setTimeout(() => {
            router.back()
        }, 250);
    }

    return (
        <Modal>
            <div className="flex flex-col gap-3">
                <p className="text-center border-b pb-2 text-bold font-bold text-teal-500 border-teal-100">
                    Choose Action
                </p>
                <div className="flex justify-evenly mt-2">
                    <button
                        className="px-2 border border-blue-100 text-teal-600 font-medium hover:bg-teal-100/60 transition duration-150 ease-in-out flex justify-center items-center gap-2"
                        onClick={() => {
                            router.back();

                            // WARNING: code below is hack, will find another way later
                            setTimeout(() => {
                                router.push(`/update-expense/${params.id}`);
                            }, 250);
                        }}>
                        <FaPencilAlt /> <span>Edit</span>
                    </button>
                    <form action={deleteFormAction}>
                        <input type="hidden" name="id" defaultValue={params.id} />
                        <ActionFormDeleteButton />
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default ItemAction