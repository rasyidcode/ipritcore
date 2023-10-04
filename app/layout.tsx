import { Header } from '../components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
        <div className="container p-2 mx-auto">
          <div className="mx-auto lg:w-1/2">
            <Header />

            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
