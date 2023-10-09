import Link from 'next/link'
import { FaPlus, FaSadTear } from 'react-icons/fa'
import { Transaction } from '@prisma/client'
import prisma from '@/utils/db'
import { dateToReadableFormat } from '@/utils/stringUtils'
import CenteredMessage from '@/components/CenteredMessage'
import TransactionItem from '@/components/TransactionItem'
import PageTitleBar from '@/components/PageTitleBar'
import PageContent from '@/components/PageContent'
import PageWrapper from '@/components/PageWrapper'
import TransactionSummary from '@/components/TransactionSummary'

const TransactionItemList = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <div className='mt-5 flex flex-col justify-start items-start divide-y 
    divide-dashed flex-1'>
      {transactions.map(transaction =>
      (<TransactionItem
        key={transaction.id}
        {...transaction} />))}
    </div>
  )
}

export default async function Home() {
  const currentDate = new Date()
  const transactions = await prisma.transaction.findMany({
    where: { date: currentDate },
    orderBy: { id: 'asc' }
  })

  return (
    <PageWrapper>
      <PageTitleBar
        pageTitle={dateToReadableFormat(currentDate)}>
        <Link
          href='/add'
          className='text-sm flex justify-center 
            items-center gap-2 text-teal-500 border 
            border-teal-500 px-2 py-1 hover:bg-teal-100/60 
            transition-all ease-in-out duration-150 font-medium'>
          <FaPlus />
          <span>Add New</span>
        </Link>
      </PageTitleBar>

      <PageContent>
        <div className='flex flex-col h-full'>
          {transactions.length > 0 ?
            (<TransactionItemList transactions={transactions} />) :
            (<CenteredMessage message='No Data'>
              <FaSadTear />
            </CenteredMessage>)}

          <TransactionSummary />
        </div>
      </PageContent>
    </PageWrapper>
  )
}
