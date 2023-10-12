'use client'

import PageContent from '@/components/PageContent'
import PageLoading from '@/components/PageLoading'
import PageWrapper from '@/components/PageWrapper'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FaEye, FaGithub, FaGoogle, FaInfo } from 'react-icons/fa'

const SignInButtons = () => {
    return (
        <div className='flex flex-col gap-4 max-w-max flex-1 justify-center'>
            {/* Login As Demo */}
            <button className='border border-yellow-300
                        px-3 py-1 flex justify-start items-center
                        gap-2 hover:bg-yellow-100/70 transition-all
                        duration-150 ease-in-out text-yellow-600'
                onClick={() => signIn('credentials', {
                    id: 'demo-login',
                    email: 'user@demo.com',
                    callbackUrl: '/'
                })}>
                <span><FaEye /></span>
                <span className='font-bold flex-1'>Login as Demo</span>
            </button>

            {/* Google Login */}
            <button className='border border-blue-200
                        px-3 py-1 flex justify-start items-center
                        gap-2 hover:bg-blue-100/70 transition-all
                        duration-150 ease-in-out text-blue-500'
                onClick={() => signIn('google', { callbackUrl: '/' })}>
                <span><FaGoogle /></span>
                <span className='font-bold flex-1'>Login with Google</span>
            </button>

            {/* GitHub Login */}
            <button className='border border-black-200
                        px-3 py-1 flex justify-start items-center
                        gap-2 hover:bg-black/10 transition-all
                        duration-150 ease-in-out text-black/70'
                onClick={() => signIn('github', { callbackUrl: '/' })}>
                <span><FaGithub /></span>
                <span className='font-bold flex-1'>Login with GitHub</span>
            </button>
        </div>
    )
}

const AuthenticatedText = () => {
    return (
        <p>
            You are already authenticated! Click <Link className='text-blue-500 underline' href='/'>
                here</Link> to go to the main page!
        </p>
    )
}

const LoginPage = () => {
    const session = useSession()

    if (session.status === 'loading') {
        return (<PageLoading />)
    }

    return (
        <PageWrapper>
            <PageContent>
                <div className='h-full flex flex-col justify-center items-center'>
                    {session.status === 'unauthenticated' ?
                        (<SignInButtons />) :
                        (<AuthenticatedText />)}

                    <div className='bg-yellow-100 border border-yellow-500 
                        w-full flex items-center gap-2 p-2 text-sm'>
                        <FaInfo /> 
                        <p>Click <span className='font-bold text-yellow-800'>Login as Demo</span> to look around!</p>
                    </div>
                </div>
            </PageContent>
        </PageWrapper>
    )
}

export default LoginPage