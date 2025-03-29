"use client";

import { formatIdr } from "@/lib/stringUtils";
import {
  CloseButton,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function NewTransactionButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [amount, setAmount] = React.useState("0");

  function handleAmountOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(formatIdr(e.target.value));
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="h-8 rounded-lg border border-solid px-4
        text-sm flex items-center justify-center hover:bg-[#f2f2f2]
        transition-colors duration-150 ease-linear gap-2 mt-2"
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
            className="max-w-md space-y-4 border bg-white p-4 rounded-lg
          shadow-lg w-full"
          >
            <DialogTitle className="font-bold">Form Transaksi</DialogTitle>
            <form action={() => {}} className="flex flex-col gap-3 mt-4">
              <div className="flex flex-row gap-3">
                <label htmlFor="note" className="basis-1/4 text-sm py-1">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="flex-1 border text-sm px-2"
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
                  className="flex-1 border px-2 text-sm"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="flex flex-row gap-3">
                <label htmlFor="amount" className="basis-1/4 text-sm py-1">
                  Jumlah
                </label>
                <input
                  id="amount"
                  type="text"
                  name="amount"
                  className="flex-1 border text-sm px-2"
                  value={formatIdr(amount)}
                  onChange={handleAmountOnChange}
                  required
                />
              </div>

              <div className="flex flex-row gap-3 justify-center items-center mt-5">
                <CloseButton
                  as="button"
                  onClick={() => setIsOpen(false)}
                  className="h-8 rounded-lg border border-solid px-4
        text-sm flex items-center justify-center hover:bg-red-500/90
        transition-colors duration-150 ease-linear gap-2 mt-2 w-full
        active:bg-red-500/90 bg-red-500 text-white"
                >
                  <XCircleIcon className="size-5" />
                  Batal
                </CloseButton>
                <button
                  type="submit"
                  className="h-8 rounded-lg border border-solid px-4
        text-sm flex items-center justify-center hover:bg-[#f2f2f2]
        transition-colors duration-150 ease-linear gap-2 mt-2 w-full
        active:bg-[#f2f2f2]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 text-gray-700"
                  >
                    <path d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"></path>
                  </svg>
                  Simpan
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
