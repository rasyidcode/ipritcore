const PageContent = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <div className='flex-1 mt-3'>
      {children}
    </div>
  )
}

export default PageContent