import { HeaderNew } from '@/components/HeaderNew'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple Expense Tracker'
}

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode,
  modal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container p-2 mx-auto">
          <div className="mx-auto lg:w-1/2">
            <HeaderNew />

            <main className="mt-2 p-4 border-2 border-teal-500 
              h-[640px] overflow-hidden">
              {children}
            </main>
            {modal}
          </div>
        </div>
      </body>
    </html>
  )
}
