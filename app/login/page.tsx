'use client'

import PageContent from '@/components/PageContent'
import PageLoading from '@/components/PageLoading'
import PageWrapper from '@/components/PageWrapper'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FaGithub, FaGoogle } from 'react-icons/fa'

const SignInButtons = () => {
    return (
        <div className='flex flex-col gap-4'>
            {/* Google Login */}
            <button className='border border-blue-200
                        px-3 py-1 flex justify-center items-center
                        gap-2 hover:bg-blue-100/70 transition-all
                        duration-150 ease-in-out text-blue-500'
                onClick={() => signIn('google', { callbackUrl: '/' })}>
                <span><FaGoogle /></span>
                <span className='font-bold'>Login with Google</span>
            </button>

            {/* GitHub Login */}
            <button className='border border-black-200
                        px-3 py-1 flex justify-center items-center
                        gap-2 hover:bg-black/10 transition-all
                        duration-150 ease-in-out text-black/70'
                onClick={() => signIn('github', { callbackUrl: '/' })}>
                <span><FaGithub /></span>
                <span className='font-bold'>Login with GitHub</span>
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
                <div className='h-full flex justify-center items-center'>
                    {session.status === 'unauthenticated' ?
                        (<SignInButtons />) :
                        (<AuthenticatedText />)}
                </div>
            </PageContent>
        </PageWrapper>
    )
}

export default LoginPage