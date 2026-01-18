"use client";

import { formatIdr } from "@/lib/stringUtils";
import {
  CloseButton,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function ModalGroceryForm() {
  const [item, setItem] = useState<{
    name: string;
    amount: number;
    price: string;
  }>({ name: "", amount: 1, price: "0" });
  return (
    <Dialog open={false} onClose={() => {}} className="relative z-50">
      <div
        className="bg-black/75 fixed inset-0 flex w-screen items-center
        justify-center p-4"
      >
        <DialogPanel
          className="max-w-md space-y-4 border border-solid border-white/[.15]
            p-4 rounded shadow-lg w-full bg-black"
        >
          <DialogTitle className="font-bold">Form Tambah Item</DialogTitle>
          <form action={() => {}} className="flex flex-col gap-3 mt-4">
            <div className="flex flex-row gap-3">
              <label htmlFor="name" className="basis-1/4 text-sm py-1">
                Nama
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="flex-1 text-black text-sm px-2 rounded"
                placeholder="Contoh: Mie Goreng"
                defaultValue={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-row gap-3">
              <label htmlFor="amount" className="basis-1/4 text-sm py-1">
                Jumlah
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="flex-1 text-black text-sm px-2 rounded"
                placeholder="Contoh: 5"
                defaultValue={item.amount}
                onChange={(e) =>
                  setItem({ ...item, amount: parseInt(e.target.value) })
                }
                required
              />
            </div>

            <div className="flex flex-row gap-3">
              <label htmlFor="amount" className="basis-1/4 text-sm py-1">
                Harga
              </label>
              <input
                id="amount"
                type="text"
                name="amount"
                className="flex-1 text-black text-sm px-2 rounded"
                value={formatIdr(item.price)}
                onChange={(e) => setItem({ ...item, price: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-row gap-3 justify-center items-center">
              <CloseButton
                as="button"
                onClick={() => {}}
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
                disabled={false}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
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
  );
}
