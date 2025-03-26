import TransactionSummary from "@/components/ui/TransactionSummary"

const PageContent = ({ children, isHome }: {
  children: React.ReactNode,
  isHome?: boolean
}) => {
  return (
    <>
      <div className='flex-1 overflow-y-auto scrollbar'>
        {children}
      </div>

      {isHome && (<TransactionSummary />)}
    </>
  )
}

export default PageContent