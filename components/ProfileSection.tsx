import { getServerSession } from 'next-auth'
import Image from 'next/image'
import LogoutButton from './LogoutButton'
import { authOptions } from '@/utils/auth'
import { FaUserAlt } from 'react-icons/fa'

const ProfileSection = async () => {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return null
    }

    return (
        <div className='mt-2 p-4 border-2 border-teal-500 flex justify-between items-center'>
            <div className='flex gap-4'>
                {session?.user?.image != null ? (<Image
                    src={session?.user?.image as string}
                    alt='User Image'
                    width={50}
                    height={50}
                    className='border-2 border-teal-500' />)
                    : (<div className='w-[50px] h-[50px] border-2
                         border-teal-500 flex justify-center items-center
                         text-2xl text-teal-500'>
                        <FaUserAlt />
                    </div>)}

                <div className='flex flex-col'>
                    <h4 className='font-bold text-teal-500'>{session?.user?.name}</h4>
                    <p className='text-gray-500 text-base'>{session?.user?.email}</p>
                </div>
            </div>

            <LogoutButton />

        </div>
    )
}

export default ProfileSection