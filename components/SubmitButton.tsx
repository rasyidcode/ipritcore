'use client'

import { experimental_useFormStatus } from "react-dom"

const SubmitButton = () => {
    const { pending } = experimental_useFormStatus()

    return (
        <button className="
            text-sm px-2 
            uppercase 
            font-bold 
            text-gray-700
            border 
            hover:bg-slate-100" aria-disabled={pending} disabled={pending}>
            {!pending ? 'Save' : 'Saving...'}
        </button>
    )
}

export default SubmitButton