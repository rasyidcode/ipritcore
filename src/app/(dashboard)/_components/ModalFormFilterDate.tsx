"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function ModalFormFilterDate() {
  const currentYear = new Date().getFullYear();
  const oldestYearInRecords = 2025;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const years = Array.from(
    { length: currentYear - oldestYearInRecords + 1 },
    (_, i) => oldestYearInRecords + i
  );

  return (
    <Dialog open={false} onClose={() => {}} className="relative z-50">
      <div
        className="bg-black/30 fixed inset-0 flex w-screen items-center
        justify-center p-4"
      >
        <DialogPanel
          className="max-w-md space-y-4 border border-solid border-white/[.15] bg-background
            p-4 rounded-lg shadow-lg w-full"
        >
          <DialogTitle className="font-bold">Form Filter Date</DialogTitle>
          <form className="flex items-center gap-2 max-w-max">
            <select className="flex-1 border dark:border-black/[.45] text-sm px-2 dark:text-background rounded-md">
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select className="flex-1 border dark:border-black/[.45] text-sm px-2 dark:text-background rounded-md">
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
