import Link from 'next/link'

const PageTitleBar = ({ children, pageTitle, withBack }: {
    pageTitle: string,
    children?: React.ReactNode,
    withBack?: boolean
}) => {
    return (
        <div className='flex justify-between items-center'>
            <div className='flex justify-center items-center gap-2'>
                {withBack && (
                    <Link
                        href=".."
                        className="text-sm text-teal-500 border border-teal-500 
                        hover:bg-teal-100/60 p-1 rounded-full">
                    </Link>)}
                <h3 className="font-bold text-teal-500">
                    {pageTitle}
                </h3>
            </div>

            {children}
        </div>
    )
}

export default PageTitleBar