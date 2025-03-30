"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import TransactionForm from "./TransactionForm";

export default function NewTransactionButton() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="h-8 bg-foreground rounded-lg border border-solid px-4
        text-sm flex items-center justify-center hover:bg-[#383838]
        transition-colors duration-150 ease-linear gap-2 mt-2 text-background
        dark:hover:bg-[#ccc]"
      >
        <PlusCircleIcon className="w-5 h-5" />
        Catat Transaksi
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div
          className="bg-black/30 fixed inset-0 flex w-screen items-center
        justify-center p-4"
        >
          <DialogPanel
            className="max-w-md space-y-4 border border-solid border-white/[.15] bg-background
            p-4 rounded-lg shadow-lg w-full"
          >
            <DialogTitle className="font-bold">Form Transaksi</DialogTitle>
            <TransactionForm closeModal={() => setIsOpen(false)} />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
