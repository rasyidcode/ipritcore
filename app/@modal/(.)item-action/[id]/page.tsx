import Modal from "@/components/Modal"
import { FaPencilAlt, FaTrash } from "react-icons/fa"

const ItemAction = ({ params }: {
    params: { id: string }
}) => {
    console.log(params.id);

    return (
        <Modal>
            <div className="flex flex-col gap-3">
                <p className="text-center border-b pb-2 text-bold font-bold text-teal-500 border-teal-100">
                    Choose Action
                </p>
                <div className="flex justify-evenly mt-2">
                    <button
                        className="px-2 border border-blue-100 text-teal-600 font-medium hover:bg-teal-100/60 transition duration-150 ease-in-out flex justify-center items-center gap-2">
                        <FaPencilAlt /> <span>Edit</span>
                    </button>
                    <button
                        className="rounded-md border border-red-100 text-red-500 font-semibold hover:bg-red-100/60 px-2 transition duration-150 ease-in-out flex justify-center items-center gap-2">
                        <FaTrash /> <span>Delete</span>
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ItemAction