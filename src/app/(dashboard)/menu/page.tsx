import {
  BanknotesIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function MenuPage() {
  return (
    <div
      className="flex-1 border border-white/[0.09] p-4 rounded flex flex-col
    items-center justify-center gap-4"
    >
      <Link
        href="/expense-tracker"
        className="w-[160px] bg-white text-black flex flex-col items-center
      px-4 py-2 rounded shadow hover:bg-white/75 transition-colors
      duration-150 ease-linear"
      >
        <BanknotesIcon className="size-9" />
        Catat Keuangan
      </Link>
      <Link
        href="/groceries-planning"
        className="w-[160px] bg-white text-black flex flex-col items-center
      px-4 py-2 rounded shadow hover:bg-white/75 transition-colors
      duration-150 ease-linear"
      >
        <QuestionMarkCircleIcon className="size-9" />
        Rencana Belanja
      </Link>
    </div>
  );
}
