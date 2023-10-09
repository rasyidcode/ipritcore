'use client'

import { deleteExpense2 } from "@/utils/actions"
import { useTransition } from "react"
import { FaSpinner, FaTrash } from "react-icons/fa"

const ExpenseDeleteButton = ({ id }: { id: number }) => {
    const [isPending, startTransition] = useTransition()

    const onDelete = () => {
        if (confirm('Are you sure want to delete this?')) {
            startTransition(() => {
                deleteExpense2(id)
            })
        }
    }

    return (
        <button
            className="text-red-500 border border-red-500 p-1 
            hover:bg-red-100 transition-all duration-150 ease-in-out"
            onClick={onDelete} disabled={isPending}>
            {!isPending ? 
            (<FaTrash />) : 
            (<div className="animate-spin"><FaSpinner /></div>)}
        </button>
    )
}

export default ExpenseDeleteButton