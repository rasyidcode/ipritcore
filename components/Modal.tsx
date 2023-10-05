'use client';

import { useRouter } from 'next/navigation';
import { FaTimes } from 'react-icons/fa'

const Modal = ({
    children
}: {
    children: React.ReactNode
}) => {
    const router = useRouter();

    return (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/10">
            <div className="relative w-8/12 max-w-2xl bg-white shadow-md p-5">
                <button 
                    className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100/60 text-sm rounded-full flex transition duration-150 ease-in-out"
                    onClick={() => { router.back() }}>
                    <FaTimes />
                </button>
                {children}
            </div>
        </div>)
}

export default Modal