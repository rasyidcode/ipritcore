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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ModalGroceryPlanningForm() {
  const [plan, setPlan] = useState<{
    monthYear: Date | null;
    budget: string;
  }>({ monthYear: new Date(), budget: "0" });
  return (
    <Dialog open={true} onClose={() => {}} className="relative z-50">
      <div
        className="bg-black/75 fixed inset-0 flex w-screen items-center
        justify-center p-4"
      >
        <DialogPanel
          className="max-w-md space-y-4 border border-solid border-white/[.09]
            p-4 rounded shadow-lg w-full bg-black"
        >
          <DialogTitle className="font-bold">Form Rencana Belanja</DialogTitle>
          <form className="flex flex-col gap-3 mt-4 modal-groceries-planning-form">
            <div className="flex flex-row gap-3">
              <label htmlFor="name" className="basis-1/4 text-sm py-1">
                Bulan
              </label>
              <div className="flex-1">
                <DatePicker
                  className="text-black rounded px-2 w-full text-sm py-1"
                  selected={plan.monthYear}
                  onChange={(date) => setPlan({ ...plan, monthYear: date })}
                  showMonthYearPicker
                  dateFormat="MM-yyyy"
                />
              </div>
            </div>

            <div className="flex flex-row gap-3">
              <label htmlFor="budget" className="basis-1/4 text-sm py-1">
                Budget
              </label>
              <input
                id="budget"
                type="text"
                name="budget"
                className="flex-1 text-black text-sm px-2 rounded"
                value={formatIdr(plan.budget)}
                onChange={(e) => setPlan({ ...plan, budget: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-row gap-3 justify-center items-center">
              <CloseButton
                as="button"
                onClick={() => {}}
                className="h-8 rounded border border-white/[0.09] text-sm flex
                  items-center justify-center hover:bg-white/10 transition-colors
                  duration-150 ease-linear gap-2 mt-2 flex-1"
              >
                <XCircleIcon className="size-5" />
                Batal
              </CloseButton>
              <button
                type="submit"
                className="h-8 rounded border border-white/[0.09] text-sm flex
                  items-center justify-center hover:bg-white/10 transition-colors
                  duration-150 ease-linear gap-2 mt-2 flex-1 disabled:cursor-progress"
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
