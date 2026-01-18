"use client";

import { PlusCircleIcon } from "@heroicons/react/16/solid";

export default function NewGroceryPlanButton() {
  return (
    <button
      onClick={() => {
        console.log("add new grocery plan");
      }}
      className="border border-white/[0.09] flex items-center rounded justify-center
      py-2 gap-2 text-sm hover:bg-white/10 transition-colors duration-150 ease-linear"
    >
      <PlusCircleIcon className="size-4" />
      Tambah Rencana Belanja
    </button>
  );
}
