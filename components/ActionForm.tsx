import { Transaction, TransactionType } from "@prisma/client"
import { experimental_useFormStatus } from "react-dom"
import ActionFormButton from "./ActionFormButton"

type ActionFormType = {
  actionHandler: ((formData: FormData) => void),
  type: string,
  expense?: Transaction | null
}

const ActionForm = ({ actionHandler, type, expense }: ActionFormType) => {
  return (
    <div className="p-4 border grid grid-cols-1">
      <h4 className="mb-4 font-medium underline">{type} Expense</h4>

      <form action={actionHandler} className="grid gap-3">
        {/* If edit add hidden input ID */}
        {expense && (
          <input type="hidden" name="id" defaultValue={expense?.id} />
        )}

        {/* Date that expense happen */}
        <div className="flex flex-row gap-3">
          <label
            htmlFor="date"
            className="text-sm py-1 w-16">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="border text-sm w-60"
            defaultValue={expense?.date.toISOString().split('T')[0]} />
        </div>

        {/* The amount of expense */}
        <div className="flex flex-row gap-3">
          <label
            htmlFor="amount"
            className="text-sm py-1 w-16">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="border text-sm w-60"
            defaultValue={expense?.amount} />
        </div>
        
        {/* Expense Type */}
        <div className="flex flex-row gap-3">
          <label
            htmlFor="type"
            className="text-sm py-1 w-16">
            Type
          </label>
          <div>
            <div className="flex flex-row gap-3">
              <input
                type="radio"
                name="type"
                id="type"
                value="expenses"
                defaultChecked={expense?.type === TransactionType.EXPENSES}/>
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
        
        {/* Expense desc */}
        <div className="flex flex-row gap-3">
          <label
            htmlFor="desc"
            className="text-sm py-1 w-16">
            Desc
          </label>
          <textarea
            id="desc"
            name="desc"
            className="border text-sm w-60"
            defaultValue={expense?.desc}></textarea>
        </div>
        
        {/* Submit button */}
        <div className="flex flex-row gap-3">
          <div className="py-1 w-16"></div>
          <ActionFormButton text={"Save"} pendingText={"Saving..."} />
        </div>
      </form>
    </div>
  )
}

export default ActionForm