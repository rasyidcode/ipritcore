"use client";

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-red-500 rounded-lg transition-colors  duration-150 ease-linear
            px-2 py-1 hover:bg-red-500/90 active:bg-red-500/90 font-semibold text-sm
            flex items-center gap-1 text-white"
    >
      <ArrowLeftStartOnRectangleIcon className="size-5" />
      Keluar
    </button>
  );
}
