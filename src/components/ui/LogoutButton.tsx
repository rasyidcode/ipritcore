'use client'

import { signOut } from 'next-auth/react'

const LogoutButton = () => {

    return (
        <button className='text-red-500 border px-2 py-1 border-red-300
                  hover:bg-red-100/70 flex justify-center items-center gap-1'
            onClick={() => signOut()}>
            <span className='text-sm font-medium'>Logout</span>
        </button>
    )
}

export default LogoutButton