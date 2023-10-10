'use client'

import { deleteById } from '@/app/action'
import { useTransition } from 'react'
import { FaSpinner, FaTrash } from 'react-icons/fa'

const ExpenseDeleteButton = ({ id }: { id: number }) => {
    const [isPending, startTransition] = useTransition()

    const onDelete = () => {
        if (confirm('Are you sure want to delete this?')) {
            startTransition(() => {
                deleteById(id)
            })
        }
    }

    return (
        <button
            className='text-red-400 border border-red-400 p-1 
            hover:bg-red-100 transition-all duration-150 ease-in-out'
            onClick={onDelete} 
            disabled={isPending}>
            {!isPending ? 
            (<FaTrash />) : 
            (<div className="animate-spin"><FaSpinner /></div>)}
        </button>
    )
}

export default ExpenseDeleteButton