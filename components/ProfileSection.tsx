import { getServerSession } from 'next-auth'
import Image from 'next/image'
import LogoutButton from './LogoutButton'

const ProfileSection = async () => {
    const session = await getServerSession()

    if (!session?.user) {
        return null
    }

    return (
        <div className='mt-2 p-4 border-2 border-teal-500 flex justify-between items-center'>
            <div className='flex gap-4'>
                <Image
                    src={session?.user?.image as string}
                    alt='User Image'
                    width={50}
                    height={50}
                    className='border-2 border-teal-500' />

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