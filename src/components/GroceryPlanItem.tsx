import {
  ArrowRightCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";

export default function GroceryPlanItem({ i }: { i: number }) {
  return (
    <li className="p-2 flex items-center gap-2">
      <div className="flex flex-col rounded items-center w-16 border border-white/[0.09] py-1">
        <span className="uppercase font-bold">Jul</span>
        <span className="font-light">2025</span>
      </div>
      <div className="flex gap-1 flex-col flex-1">
        <p className="border border-white/[0.09] p-1 rounded flex items-center gap-2">
          <span className="text-sm">Budget</span>{" "}
          <ArrowRightCircleIcon className="size-4" />
          <span className="flex-1 text-end font-light">Rp. 500,000</span>
        </p>
        <p className="border border-white/[0.09] p-1 rounded flex items-center gap-2">
          <span className="text-sm">Sisa</span>{" "}
          <ArrowRightCircleIcon className="size-4" />
          <span className="flex-1 text-end font-light">Rp. 250,000</span>
        </p>
      </div>
      <Link
        href="/groceries-planning/2025-08"
        className="border rounded p-2 border-white/[0.09] hover:bg-white/10
        transition-colors duration-150 ease-linear"
      >
        <PaperAirplaneIcon className="size-4" />
      </Link>
    </li>
  );
}
