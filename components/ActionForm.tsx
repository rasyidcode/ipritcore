'use client'

import { Transaction, TransactionType } from '@prisma/client'
import ActionFormButton from './ActionFormButton'
import {
  experimental_useFormState as useFormState
} from "react-dom"
import { ActionResult } from "@/utils/action"
import ActionFormAlert from './ActionFormAlert'
import { useRouter } from 'next/navigation'

type ActionFormProps = {
  actionHandler: ((_: ActionResult, formData: FormData) => Promise<ActionResult>),
  data?: Transaction | null
}

const ActionForm = ({ actionHandler, data }: ActionFormProps) => {
  const router = useRouter()

  const [formState, dispatchActionHandler] = useFormState(actionHandler, {
    success: null,
    message: null
  })

  if (formState?.success) {
    setTimeout(() => {
      router.push('/')
    }, 1000);
  }

  return (
    <form action={dispatchActionHandler} className="flex flex-col gap-3 mt-4">
      {/* If edit add hidden input ID */}
      {data && (
        <input type="hidden" name="id" defaultValue={data?.id} />
      )}

      {/* Transaction Type */}
      <div className="flex flex-row gap-3">
        <label
          htmlFor="type"
          className="basis-1/4 text-sm py-1">
          Type
        </label>
        <div className="flex-1">
          <div className="flex flex-row gap-3">
            <input
              type="radio"
              name="type"
              id="type"
              value="expense"
              defaultChecked={true || data?.type === TransactionType.EXPENSE}
              required />
            <span className="text-sm py-1">
              Expense
            </span>
          </div>
          <div className="flex flex-row gap-3">
            <input
              type="radio"
              name="type"
              id="type"
              value="income"
              defaultChecked={data?.type === TransactionType.INCOME} />
            <span className="text-sm py-1">
              Income
            </span>
          </div>
          <div className="flex flex-row gap-3">
            <input
              type="radio"
              name="type"
              id="type"
              value="transfer"
              defaultChecked={data?.type === TransactionType.TRANSFER} />
            <span className="text-sm py-1">
              Transfer
            </span>
          </div>
        </div>
      </div>

      {/* Date that expense happen */}
      <div className="flex flex-row gap-3">
        <label
          htmlFor="date"
          className="basis-1/4 text-sm py-1">
          Date
        </label>
        {!data ? (
          <input
            type="date"
            id="date"
            name="date"
            className="flex-1 border px-2 text-sm"
            defaultValue={(new Date).toISOString().split('T')[0]}
            required />) : (
          <input
            type="date"
            id="date"
            name="date"
            className="flex-1 border px-2 text-sm"
            defaultValue={data?.date.toISOString().split('T')[0]}
            required />)}
      </div>

      {/* The amount of expense */}
      <div className="flex flex-row gap-3">
        <label
          htmlFor="amount"
          className="basis-1/4 text-sm py-1">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          className="flex-1 border text-sm px-2"
          defaultValue={data != null ? data?.amount : 0}
          required />
      </div>

      {/* Expense note */}
      <div className="flex flex-row gap-3">
        <label
          htmlFor="note"
          className="basis-1/4 text-sm py-1">
          Note
        </label>
        <textarea
          id="note"
          name="note"
          className="flex-1 border text-sm px-2"
          defaultValue={data?.note}
          placeholder='Enter a note e.g Groceries, Cat food'
          required></textarea>
      </div>

      {/* Submit button */}
      <div className="flex flex-row gap-3 justify-center items-center mt-5">
        <ActionFormButton text={"Save"} pendingText={"Saving..."} />
      </div>

      <ActionFormAlert {...formState}/>
    </form>
  )
}

export default ActionForm