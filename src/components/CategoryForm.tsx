"use client";

import { createCategoryAction } from "@/app/(dashboard)/categories/action";
import { ActionResult } from "@/lib/action";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const initialState: ActionResult = {
  success: null,
  message: null,
};

export default function CategoryForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = React.useActionState(
    createCategoryAction,
    initialState
  );

  React.useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-4 rounded-lg border dark:border-white/[.09] p-3"
    >
      <div className="flex gap-2">
        <input
          type="text"
          name="name"
          placeholder="Nama kategori"
          className="min-w-0 flex-1 rounded-md border px-2 text-sm dark:border-black/[.45] dark:text-background"
          required
        />
        <select
          name="type"
          className="rounded-md border px-2 text-sm dark:border-black/[.45] dark:text-background"
          defaultValue="expense"
          required
        >
          <option value="expense">Pengeluaran</option>
          <option value="income">Pemasukkan</option>
        </select>
      </div>

      {state.success === false && state.error && (
        <p className="mt-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state.success && state.message && (
        <p className="mt-2 rounded-md border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-600">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-3 h-8 w-full rounded-lg bg-foreground px-4 text-sm font-semibold text-background
          hover:bg-[#383838] transition-colors duration-150 disabled:cursor-progress dark:bg-white
          dark:hover:bg-[#f2f2f2] flex items-center justify-center gap-2"
      >
        <PlusCircleIcon className="size-5" />
        {pending ? "Menyimpan..." : "Tambah kategori"}
      </button>
    </form>
  );
}
