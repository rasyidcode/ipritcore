"use client";

import TransactionForm from "@/components/TransactionForm";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useModalFormTransaction } from "@/components/ModalFormTransactionProvider";
import { createTransactionAction, updateTransactionAction } from "@/app/(dashboard)/action";
import { Category } from "@prisma/client";

export default function ModalFormTransaction({
  categories,
}: {
  categories: Category[];
}) {
  const { isOpen, handleClose, transaction } = useModalFormTransaction();

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div
        className="bg-black/30 fixed inset-0 flex w-screen items-center
        justify-center p-4"
      >
        <DialogPanel
          className="max-w-md space-y-4 border border-solid border-white/[.15] bg-background
            p-4 rounded-lg shadow-lg w-full"
        >
          <DialogTitle className="font-bold">Form Transaksi</DialogTitle>
          <TransactionForm
            closeModal={handleClose}
            transaction={transaction}
            categories={categories}
            actionHandler={
              transaction !== null
                ? updateTransactionAction
                : createTransactionAction
            }
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
