import { experimental_useFormStatus } from 'react-dom'
import { FaTrash, FaSpinner } from 'react-icons/fa'

const ActionFormDeleteButton = () => {
    const { pending } = experimental_useFormStatus()
    return (
        <button
            type="submit"
            className="rounded-md border border-red-100 text-red-500 font-semibold hover:bg-red-100/60 px-2 transition duration-150 ease-in-out flex justify-center items-center gap-2"
            aria-disabled={pending}>
            {!pending ? (<><FaTrash /> <span>Delete</span></>) : (
                <><div className="animate-spin"><FaSpinner /></div> <span>Deleting...</span></>
            )}
        </button>
    )
}

export default ActionFormDeleteButton