const PageWrapper = ({ children }: {
    children: React.ReactNode
}) => {
  return (
    <div className='flex flex-col h-full'>
        {children}
    </div>
  )
}

export default PageWrapper