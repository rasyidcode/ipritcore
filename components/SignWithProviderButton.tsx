'use client'

import { BuiltInProviderType } from "next-auth/providers/index"
import { LiteralUnion, signIn } from "next-auth/react"

type ColorStyle = 'red' | 'green' | 'blue' | 'gray'

const SignWithProviderButton = ({ provider, icon, text, color }: {
  provider: LiteralUnion<BuiltInProviderType>,
  icon: React.ReactNode,
  color: string, // black and white is not supported
  text: string
}) => {
  const mycolor = 'green'

  return (
    <button className={`border border-${mycolor}-500
    px-3 py-1 flex justify-center items-center
    gap-2 hover:bg-${mycolor}-100/70 transition-all
    duration-150 ease-in-out text-${mycolor}-500`}
      onClick={() => signIn(provider, { callbackUrl: '/' })}>
      <span>{icon}</span>
      <span className='font-bold'>{text}</span>
    </button>
  )
}

export default SignWithProviderButton