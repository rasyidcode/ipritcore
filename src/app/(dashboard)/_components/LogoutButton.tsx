"use client";

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="rounded-lg  border border-solid border-black/[.08]
      transition-colors duration-150 ease-linear px-2 py-1 hover:bg-[#f2f2f2]
      dark:hover:bg-[#1a1a1a] dark:border-white/[.145] font-semibold text-sm
      flex items-center gap-1 hover:border-transparent"
    >
      <ArrowLeftStartOnRectangleIcon className="size-5" />
      Keluar
    </button>
  );
}
