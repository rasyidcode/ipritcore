"use client";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function NewTransactionButton() {
  const [isOpen, setIsOpen] = React.useState(false);
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
        <div className="bg-black/50 fixed inset-0 flex w-screen items-center
        justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-4 rounded-lg">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
<form action={() => {}} className="flex flex-col gap-3 mt-4">
      {/* If edit add hidden input ID */}
      {/* {data && <input type="hidden" name="id" defaultValue={data?.id} />} */}

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
          Type
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
            <span className="text-sm py-1">Expense</span>
          </div>
          <div className="flex flex-row gap-3">
            <input
              type="radio"
              name="type"
              id="type"
              value="income"
              defaultChecked={false}
            />
            <span className="text-sm py-1">Income</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-3">
        <label htmlFor="date" className="basis-1/4 text-sm py-1">
          Date
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
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          className="flex-1 border text-sm px-2"
          defaultValue={}
          required
        />
      </div>



      {/* Submit button */}
      <div className="flex flex-row gap-3 justify-center items-center mt-5">
        <ActionFormButton text={"Save"} pendingText={"Saving..."} />
      </div>

      <ActionFormAlert {...formState} />
    </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
