import Link from "next/link";
import React from "react";

type LayoutProps = {
    children: React.ReactNode,
    home: boolean
}

export default function Layout({ children, home }: LayoutProps) {
    return (
        <div className="container p-2">
            <header className="p-4 border flex flex-row justify-between mb-2">
                <h1 className="font-semibold p-1">Expense Tracker</h1>
                {home ?
                    (<Link href="/add" className="
                        border 
                        px-1 
                        text-sm 
                        hover:bg-gray-100 
                        focus-within:bg-gray-100 
                        outline-none
                        font-light"><span className="text-lg">&#43;</span> Add New</Link>) :
                    (<Link href=".." className="
                        border 
                        px-1 
                        text-sm 
                        hover:bg-gray-100 
                        focus-within:bg-gray-100 
                        outline-none
                        py-1
                        font-light"><span className="text-sm">&#60;</span>{'  '}Back</Link>
                    )}
            </header>

            <main>{children}</main>
        </div>
    )
}