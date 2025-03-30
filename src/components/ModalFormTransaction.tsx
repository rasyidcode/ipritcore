"use client";

import TransactionForm from "@/app/(dashboard)/_components/TransactionForm";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React from "react";
import { useModalFormTransaction } from "./ModalFormTransactionProvider";

export default function ModalFormTransaction() {
  const { isOpen, handleClose } = useModalFormTransaction();

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
          <TransactionForm closeModal={handleClose} />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
