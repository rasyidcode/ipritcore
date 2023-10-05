import { Transaction, TransactionType } from "@prisma/client"
import { experimental_useFormStatus } from "react-dom"
import ActionFormButton from "./ActionFormButton"
import { FaArrowLeft, FaBackward } from "react-icons/fa"
import Link from "next/link"

type ActionFormType = {
  actionHandler: ((formData: FormData) => void),
  type: string,
  expense?: Transaction | null
}

const ActionForm = ({ actionHandler, type, expense }: ActionFormType) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Link href=".." className="text-sm text-teal-500 border border-teal-100 hover:bg-teal-100/60 p-1 rounded-full">
          <FaArrowLeft />
        </Link>
        <h4 className="font-bold text-teal-500">{type} Expense</h4>
      </div>

      <form action={actionHandler} className="grid gap-3 mt-4">
        {/* If edit add hidden input ID */}
        {expense && (
          <input type="hidden" name="id" defaultValue={expense?.id} />
        )}

        {/* Date that expense happen */}
        <div className="flex flex-row gap-3">
          <label
            htmlFor="date"
            className="basis-1/4 text-sm py-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="flex-1 border px-2 text-sm"
            defaultValue={expense?.date.toISOString().split('T')[0]} />
        </div>

        {/* Expense desc */}
        <div className="flex flex-row gap-3">
          <label
            htmlFor="desc"
            className="basis-1/4 text-sm py-1">
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            className="flex-1 border text-sm px-2"
            defaultValue={expense?.desc}></textarea>
        </div>

        {/* Expense Type */}
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
                value="expenses"
                defaultChecked={expense?.type === TransactionType.EXPENSES} />
              <span className="text-sm py-1">
                Expenses
              </span>
            </div>
            <div className="flex flex-row gap-3">
              <input
                type="radio"
                name="type"
                id="type"
                value="income"
                defaultChecked={expense?.type === TransactionType.INCOME} />
              <span className="text-sm py-1">
                Income
              </span>
            </div>
          </div>
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
            defaultValue={expense?.amount} />
        </div>

        {/* Submit button */}
        <div className="flex flex-row gap-3 justify-center items-center mt-5">
          <ActionFormButton text={"Save"} pendingText={"Saving..."} />
        </div>
      </form>
    </>
  )
}

export default ActionForm