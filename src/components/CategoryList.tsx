"use client";

import {
  deleteCategoryAction,
  updateCategoryAction,
} from "@/app/(dashboard)/categories/action";
import { ActionResult } from "@/lib/action";
import { CategoryWithTransactionCount } from "@/types/category";
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const initialState: ActionResult = {
  success: null,
  message: null,
};

export default function CategoryList({
  title,
  categories,
}: {
  title: string;
  categories: CategoryWithTransactionCount[];
}) {
  return (
    <section className="min-h-0 flex flex-col">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-2 min-h-0 flex-1 divide-y overflow-y-auto rounded-lg border scrollbar dark:divide-white/[.09] dark:border-white/[.09]">
        {categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
        {categories.length === 0 && (
          <p className="p-3 text-sm text-foreground/60">Belum ada kategori.</p>
        )}
      </div>
    </section>
  );
}

function CategoryItem({
  category,
}: {
  category: CategoryWithTransactionCount;
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);
  const [updateState, updateFormAction, updatePending] = React.useActionState(
    updateCategoryAction,
    initialState
  );
  const [deletePending, startDeleteTransition] = React.useTransition();

  React.useEffect(() => {
    if (updateState.success) {
      setIsEditing(false);
    }
  }, [updateState.success]);

  function handleDelete() {
    setDeleteError(null);
    startDeleteTransition(async () => {
      const result = await deleteCategoryAction(category.id);

      if (!result.success) {
        setDeleteError(
          result.error ?? "Kategori gagal dihapus. Pastikan kategori tidak digunakan transaksi."
        );
      }
    });
  }

  if (isEditing) {
    return (
      <form action={updateFormAction} className="p-2">
        <input type="hidden" name="id" value={category.id} />
        <input type="hidden" name="type" value={category.type.toLowerCase()} />
        <div className="flex gap-2">
          <input
            type="text"
            name="name"
            defaultValue={category.name}
            className="min-w-0 flex-1 rounded-md border px-2 text-sm dark:border-black/[.45] dark:text-background"
            required
          />
          <button
            type="submit"
            disabled={updatePending}
            aria-label="Simpan kategori"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background
              hover:bg-[#383838] transition-colors duration-150 disabled:cursor-progress dark:bg-white
              dark:hover:bg-[#f2f2f2]"
          >
            <CheckIcon className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            disabled={updatePending}
            aria-label="Batal edit"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[.08]
              hover:bg-[#f2f2f2] hover:border-transparent transition-colors duration-150 dark:border-white/[.145]
              dark:hover:bg-[#1a1a1a]"
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>
        {updateState.success === false && updateState.error && (
          <p className="mt-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
            {updateState.error}
          </p>
        )}
      </form>
    );
  }

  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium">{category.name}</h3>
          <p className="text-xs text-foreground/60">
            {category._count.transactions} transaksi
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label="Edit kategori"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[.08]
            hover:bg-[#f2f2f2] hover:border-transparent transition-colors duration-150 dark:border-white/[.145]
            dark:hover:bg-[#1a1a1a]"
        >
          <PencilIcon className="size-4" />
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deletePending || category._count.transactions > 0}
          aria-label="Hapus kategori"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-600 text-red-600
            hover:bg-red-600 hover:text-white transition-colors duration-150 disabled:cursor-not-allowed
            disabled:border-black/[.08] disabled:text-foreground/30 disabled:hover:bg-transparent
            dark:disabled:border-white/[.145]"
        >
          <TrashIcon className="size-4" />
        </button>
      </div>
      {deleteError && (
        <p className="mt-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
          {deleteError}
        </p>
      )}
    </div>
  );
}
