"use client";

import React from "react";
import { formatIdr } from "@/lib/stringUtils";
import { CloseButton } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { ActionResult } from "@/lib/action";
import { Category, TransactionType } from "@prisma/client";
import { TransactionWithCategory } from "@/types/transaction";

const initialState: ActionResult = {
  success: null,
  message: null,
};

export default function TransactionForm({
  closeModal,
  transaction,
  categories,
  actionHandler,
}: {
  closeModal: () => void;
  transaction: TransactionWithCategory | null;
  categories: Category[];
  actionHandler: (
    prevState: ActionResult,
    formData: FormData
  ) => Promise<ActionResult>;
}) {
  const [amount, setAmount] = React.useState(
    transaction != null ? transaction.amount.toString() : "0"
  );
  const [state, formAction, pending] = React.useActionState(
    actionHandler,
    initialState
  );
  const defaultCategoryId =
    transaction?.categoryId ??
    categories.find((category) => category.name === "Lain-lain")?.id ??
    categories[0]?.id ??
    "";

  function handleClose(_e: React.MouseEvent<HTMLButtonElement>): void {
    closeModal();
  }

  function handleAmountOnChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setAmount(formatIdr(e.target.value));
  }

  function getFieldError(field: string): string | null {
    return state?.errors?.[field]?.[0] ?? null;
  }

  React.useEffect(() => {
    if (state?.success) {
      closeModal();
    }
  }, [closeModal, state?.success]);

  return (
    <form action={formAction} className="flex flex-col gap-3 mt-4">
      {transaction !== null && (
        <input type="hidden" name="id" value={transaction.id} />
      )}
      {state?.success === false && state.error && (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
          {state.error}
        </p>
      )}
      <div className="flex flex-row gap-3">
        <label htmlFor="name" className="basis-1/4 text-sm py-1">
          Nama
        </label>
        <div className="flex-1">
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border dark:border-black/[.45] text-sm px-2 rounded-md dark:text-background"
            placeholder="Contoh: Beli sayur, isi bensin..."
            defaultValue={transaction != null ? transaction.name : ""}
            required
          />
          {getFieldError("name") && (
            <p className="text-xs text-red-500 mt-1">{getFieldError("name")}</p>
          )}
        </div>
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
              id="type-expense"
              value="expense"
              defaultChecked={
                transaction !== null
                  ? transaction?.type === TransactionType.EXPENSE
                  : true
              }
              required
            />
            <span className="text-sm py-1">Pengeluaran</span>
          </div>
          <div className="flex flex-row gap-3">
            <input
              type="radio"
              name="type"
              id="type-income"
              value="income"
              defaultChecked={transaction?.type === TransactionType.INCOME}
            />
            <span className="text-sm py-1">Pemasukkan</span>
          </div>
          {getFieldError("type") && (
            <p className="text-xs text-red-500 mt-1">{getFieldError("type")}</p>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-3">
        <label htmlFor="date" className="basis-1/4 text-sm py-1">
          Tanggal
        </label>
        <div className="flex-1">
          <input
            type="date"
            id="date"
            name="date"
            className="w-full border dark:border-black/[.45] text-sm px-2 dark:text-background rounded-md"
            defaultValue={
              transaction != null
                ? transaction.date.toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            required
          />
          {getFieldError("date") && (
            <p className="text-xs text-red-500 mt-1">{getFieldError("date")}</p>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-3">
        <label htmlFor="categoryId" className="basis-1/4 text-sm py-1">
          Kategori
        </label>
        <div className="flex-1">
          <select
            id="categoryId"
            name="categoryId"
            className="w-full border dark:border-black/[.45] text-sm px-2 py-1 dark:text-background rounded-md"
            defaultValue={defaultCategoryId}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {getFieldError("categoryId") && (
            <p className="text-xs text-red-500 mt-1">
              {getFieldError("categoryId")}
            </p>
          )}
        </div>
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
            className="flex-1 border dark:border-black/[.45] text-sm px-2 dark:text-background rounded-md"
            value={formatIdr(amount)}
            onChange={handleAmountOnChange}
            required
          />
          {getFieldError("amount") && (
            <p className="text-xs text-red-500 mt-1">
              {getFieldError("amount")}
            </p>
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
