'use client'

import { experimental_useFormStatus } from "react-dom"
import { FaSave, FaSpinner } from "react-icons/fa"

const ActionFormButton = ({ text, pendingText }: { text: string, pendingText: string }) => {
    const { pending } = experimental_useFormStatus()

    return (
        <button
            className="
                text-sm px-4 py-1
                uppercase 
                font-bold 
                text-teal-500
                border
                border-teal-500
                hover:bg-teal-100/60 flex justify-center items-center gap-2"
            aria-disabled={pending}
            disabled={pending}>
            {!pending ? (<FaSave />) : 
            (<div className="animate-spin">
                <FaSpinner />
            </div>)} {!pending ? text : pendingText}
        </button>
    )
}

export default ActionFormButton