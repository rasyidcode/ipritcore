import { formatIdr } from "@/lib/stringUtils";
import { CloseButton } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { createTransactionAction } from "../action";
import { ActionResult } from "@/lib/action";

const initialState: ActionResult = {
  success: null,
  message: null,
};

export default function TransactionForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [amount, setAmount] = React.useState("0");
  const [state, formAction, pending] = React.useActionState(
    createTransactionAction,
    initialState
  );

  function handleClose(_e: React.MouseEvent<HTMLButtonElement>): void {
    setAmount("0");
    closeModal();
  }

  function handleAmountOnChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setAmount(formatIdr(e.target.value));
  }

  // ✅ Close modal only when state.success changes
  React.useEffect(() => {
    // Close modal after successful form submission
    if (state?.success) {
      closeModal();
    }
  }, [state?.success]); // Only runs when `state.success` changes

  return (
    <form action={formAction} className="flex flex-col gap-3 mt-4">
      <div className="flex flex-row gap-3">
        <label htmlFor="name" className="basis-1/4 text-sm py-1">
          Nama
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="flex-1 border dark:border-black/[.45] text-sm px-2 dark:bg-[#383838] rounded-md"
          placeholder="Contoh: Beli sayur, isi bensin..."
          required
        />
      </div>

      <div className="flex flex-row gap-3">
        <label htmlFor="type" className="basis-1/4 text-sm py-1">
          Tipe
        </label>
        <div className="flex-1">
          <div className="flex flex-row gap-3">
            <input
              type="radio"
              name="type"
              id="type"
              value="expense"
              defaultChecked={true}
              required
            />
            <span className="text-sm py-1">Pengeluaran</span>
          </div>
          <div className="flex flex-row gap-3">
            <input
              type="radio"
              name="type"
              id="type"
              value="income"
              defaultChecked={false}
            />
            <span className="text-sm py-1">Pemasukkan</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-3">
        <label htmlFor="date" className="basis-1/4 text-sm py-1">
          Tanggal
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="flex-1 border dark:border-black/[.45] text-sm px-2 dark:bg-[#383838] rounded-md"
          defaultValue={new Date().toISOString().split("T")[0]}
          required
        />
      </div>

      <div className="flex flex-row gap-3 items-start">
        <label htmlFor="amount" className="basis-1/4 text-sm">
          Jumlah
        </label>
        <div className="flex flex-col">
          <input
            id="amount"
            type="text"
            name="amount"
            className="flex-1 border dark:border-black/[.45] text-sm px-2 dark:bg-[#383838] rounded-md"
            value={formatIdr(amount)}
            onChange={handleAmountOnChange}
            required
          />
          {state?.errors !== undefined && state?.errors.amount && (
            <p className="text-xs text-red-500 mt-1">{state?.errors.amount}</p>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-3 justify-center items-center">
        <CloseButton
          as="button"
          onClick={handleClose}
          className="h-8 rounded-lg border border-solid border-black/[.08] px-4 text-sm flex
                  items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] dark:border-white/[.145]
                  transition-colors duration-150 ease-linear gap-2 mt-2 w-full hover:border-transparent"
        >
          <XCircleIcon className="size-5" />
          Batal
        </CloseButton>
        <button
          type="submit"
          className="h-8 bg-foreground text-background rounded-lg border border-solid px-4
                  text-sm flex items-center justify-center hover:bg-[#383838]
                  transition-colors duration-150 ease-linear gap-2 mt-2 w-full dark:hover:bg-[#ccc]
                  disabled:cursor-progress"
          disabled={pending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"></path>
          </svg>
          {!pending ? "Simpan" : "Loading..."}
        </button>
      </div>
    </form>
  );
}
