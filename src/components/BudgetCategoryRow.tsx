"use client";

import { upsertBudgetAction } from "@/app/(dashboard)/budgets/action";
import { ActionResult } from "@/lib/action";
import { formatIdr } from "@/lib/stringUtils";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

const initialState: ActionResult = {
  success: null,
  message: null,
};

export type BudgetCategoryRowData = {
  categoryId: number;
  categoryName: string;
  budgetAmount: number;
  spentAmount: number;
  month: string;
};

export default function BudgetCategoryRow({
  row,
}: {
  row: BudgetCategoryRowData;
}) {
  const [amount, setAmount] = React.useState(row.budgetAmount.toString());
  const [isSuccessMessageOpen, setIsSuccessMessageOpen] =
    React.useState(false);
  const [state, formAction, pending] = React.useActionState(
    upsertBudgetAction,
    initialState
  );
  const remainingAmount = row.budgetAmount - row.spentAmount;
  const isOverBudget = remainingAmount < 0;
  const progressPercentage = getProgressPercentage(
    row.spentAmount,
    row.budgetAmount
  );

  React.useEffect(() => {
    setAmount(row.budgetAmount.toString());
  }, [row.budgetAmount]);

  React.useEffect(() => {
    if (state.success) {
      setIsSuccessMessageOpen(true);
    }
  }, [state.success]);

  return (
    <form action={formAction} className="p-2">
      <input type="hidden" name="categoryId" value={row.categoryId} />
      <input type="hidden" name="month" value={row.month} />

      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium">{row.categoryName}</h3>
          <p className="text-xs text-foreground/60">
            Terpakai {formatIdr(row.spentAmount)}
          </p>
        </div>
        <div className="flex w-36 gap-2">
          <input
            type="text"
            name="amount"
            value={formatIdr(amount)}
            onChange={(e) => setAmount(e.target.value)}
            className="min-w-0 flex-1 rounded-md border px-2 text-right text-sm dark:border-black/[.45] dark:text-background"
            required
          />
          <button
            type="submit"
            disabled={pending}
            aria-label="Simpan anggaran"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground text-background
              hover:bg-[#383838] transition-colors duration-150 disabled:cursor-progress dark:bg-white
              dark:hover:bg-[#f2f2f2]"
          >
            <CheckIcon className="size-5" />
          </button>
        </div>
      </div>

      <div className="mt-2 h-1.5 rounded-full bg-foreground/10">
        <div
          className={`h-1.5 rounded-full ${
            isOverBudget ? "bg-red-600" : "bg-foreground"
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 text-xs">
        <span className="text-foreground/60">
          Anggaran {formatIdr(row.budgetAmount)}
        </span>
        {isOverBudget ? (
          <span className="font-semibold text-red-600">
            Lewat anggaran {formatIdr(Math.abs(remainingAmount))}
          </span>
        ) : (
          <span className="font-semibold text-green-600">
            Sisa {formatIdr(remainingAmount)}
          </span>
        )}
      </div>

      {state.success === false && state.error && (
        <p className="mt-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state.success && state.message && isSuccessMessageOpen && (
        <div className="mt-2 flex items-center gap-2 rounded-md border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-600">
          <p className="min-w-0 flex-1">{state.message}</p>
          <button
            type="button"
            onClick={() => setIsSuccessMessageOpen(false)}
            aria-label="Tutup pesan"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md hover:bg-green-500/10"
          >
            <XMarkIcon className="size-4" />
          </button>
        </div>
      )}
    </form>
  );
}

function getProgressPercentage(spentAmount: number, budgetAmount: number) {
  if (budgetAmount === 0) {
    return spentAmount > 0 ? 100 : 0;
  }

  return Math.min(100, Math.round((spentAmount / budgetAmount) * 100));
}
