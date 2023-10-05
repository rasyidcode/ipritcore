'use client'

import { experimental_useFormStatus } from "react-dom"

const ActionFormButton = ({ text, pendingText }: { text: string, pendingText: string }) => {
    const { pending } = experimental_useFormStatus()

    return (
        <button 
            className="
                text-sm px-2 
                uppercase 
                font-bold 
                text-gray-700
                border 
                hover:bg-slate-100"
            aria-disabled={pending} 
            disabled={pending}>
            {!pending ? text : pendingText}
        </button>
    )
}

export default ActionFormButton