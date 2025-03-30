"use client";

import { useModalFormTransaction } from "@/components/ModalFormTransactionProvider";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function NewTransactionButton() {
  const { handleOpen } = useModalFormTransaction();

  return (
    <>
      <button
        onClick={handleOpen}
        className="h-8 bg-foreground rounded-lg border border-solid px-4
        text-sm flex items-center justify-center hover:bg-[#383838]
        transition-colors duration-150 ease-linear gap-2 mt-2 text-background
        dark:hover:bg-[#ccc]"
      >
        <PlusCircleIcon className="w-5 h-5" />
        Catat Transaksi
      </button>
    </>
  );
}
