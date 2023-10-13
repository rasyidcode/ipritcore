import { HeaderNew } from '@/components/HeaderNew'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider'
import ProfileSection from '@/components/ProfileSection'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple Expense Tracker'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='container p-2 mx-auto'>
          <AuthProvider>
            <div className='mx-auto lg:w-1/2'>
              <HeaderNew />

              <ProfileSection />

              <main className='mt-2 p-4 border-2 border-teal-500 
                h-[640px] overflow-hidden'>
                {children}
              </main>
            </div>
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}
