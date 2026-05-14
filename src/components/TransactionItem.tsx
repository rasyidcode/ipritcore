"use client";

import { numberToIDRFormat } from "@/lib/stringUtils";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Transaction, TransactionType } from "@prisma/client";
import { useModalFormTransaction } from "@/components/ModalFormTransactionProvider";
import { deleteByIdAction } from "@/app/(dashboard)/action";
import React from "react";

export default function TransactionItem({
  transaction,
}: {
  transaction: Transaction;
}) {
  const { handleClose, handleOpen, handleSetTransaction } =
    useModalFormTransaction();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);
  const [isDeleting, startDeleteTransition] = React.useTransition();

  function handleEdit(_e: React.MouseEvent<HTMLButtonElement>) {
    handleOpen();
    handleSetTransaction(transaction);
  }

  function handleDelete() {
    setDeleteError(null);
    startDeleteTransition(async () => {
      const result = await deleteByIdAction(transaction.id);

      if (result.success) {
        setIsDeleteDialogOpen(false);
        handleClose();
        return;
      }

      setDeleteError(result.error ?? "Gagal menghapus transaksi.");
    });
  }

  return (
    <>
      <div className="p-2 flex items-center w-full">
        <div className="flex-1 flex flex-col">
          <h4 className="font-light">{transaction.name}</h4>
          <p
            className={`${transaction.type === TransactionType.INCOME
                ? "text-green-600"
                : "text-red-600"
              } font-semibold`}
          >
            {numberToIDRFormat(transaction.amount)}
          </p>
        </div>
        <Menu>
          <MenuButton
            as="button"
            className="rounded-full h-6 w-6 border border-solid border-black/[.08]
                  flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#383838]
                  hover:border-transparent text-foreground transition-colors
                  duration-150 ease-linear dark:border-white/[.05]"
          >
            <EllipsisVerticalIcon className="w-5 h-5" />
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom"
            className="w-40 origin-top-right rounded-xl border border-black/5
          bg-background p-1 text-sm text-foreground transition duration-100 ease-out [--anchor-gap:var(--spacing-1)]
          focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 mt-2 shadow-lg
          dark:border-white/5"
          >
            <MenuItem>
              <button
                onClick={handleEdit}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10
              dark:data-[focus]:bg-white/10"
              >
                <PencilIcon className="size-4 fill-white/30" />
                Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => {
                  setDeleteError(null);
                  setIsDeleteDialogOpen(true);
                }}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-red-600 data-[focus]:bg-black/10
              dark:data-[focus]:bg-white/10"
              >
                <TrashIcon className="size-4 fill-red-600" />
                Delete
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => {
          if (!isDeleting) {
            setIsDeleteDialogOpen(false);
          }
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4">
          <DialogPanel className="w-full max-w-sm rounded-lg border border-solid border-white/[.15] bg-background p-4 shadow-lg">
            <DialogTitle className="font-bold">Hapus transaksi?</DialogTitle>
            <p className="mt-2 text-sm">
              Transaksi <strong>{transaction.name}</strong> akan dihapus
              permanen.
            </p>
            {deleteError && (
              <p className="mt-3 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
                {deleteError}
              </p>
            )}
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isDeleting}
                className="h-8 flex-1 rounded-lg border border-solid border-black/[.08] px-4 text-sm
                  hover:bg-[#f2f2f2] hover:border-transparent transition-colors duration-150
                  disabled:cursor-progress dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="h-8 flex-1 rounded-lg border border-solid border-red-600 bg-red-600 px-4 text-sm
                  font-semibold text-white hover:bg-red-700 transition-colors duration-150 disabled:cursor-progress"
              >
                {isDeleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
