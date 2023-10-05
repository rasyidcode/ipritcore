'use client'

import Modal from "@/components/Modal"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect, useRouter } from "next/navigation";
import { useState } from "react"
import { FaPencilAlt, FaSpinner, FaTrash } from "react-icons/fa"

const ItemAction = ({ params }: {
    params: { id: string }
}) => {
    const router = useRouter()

    const [isDeleting, setIsDeleting] = useState(false)

    const deleteExpense = async () => {
        setIsDeleting(true)

        await fetch(`/api/expenses/${params.id}`, {
            method: 'DELETE'
        })

        setIsDeleting(false)

        router.back()
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
                    <button
                        className="rounded-md border border-red-100 text-red-500 font-semibold hover:bg-red-100/60 px-2 transition duration-150 ease-in-out flex justify-center items-center gap-2"
                        disabled={isDeleting}
                        onClick={deleteExpense}>
                        {!isDeleting ? (<><FaTrash /> <span>Delete</span></>) : (
                            <><div className="animate-spin"><FaSpinner /></div> <span>Deleting...</span></>
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ItemAction