import { numberToIDRFormat } from "@/lib/stringUtils";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function TransactionItem({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <div className="p-2 flex items-center">
      <div className="flex-1 flex flex-col">
        <h4 className="font-light">{transaction.name}</h4>
        <p
          className={`${
            transaction.type === "income" ? "text-green-600" : "text-red-600"
          } font-semibold`}
        >
          {numberToIDRFormat(transaction.amount)}
        </p>
      </div>
      <Menu>
        <MenuButton
          as="button"
          className="rounded-full h-6 w-6 border border-solid border-black/[.08]
                flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#383838]
                hover:border-transparent text-foreground transition-colors
                duration-150 ease-linear dark:border-white/[.05]"
        >
          <EllipsisVerticalIcon className="w-5 h-5" />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom"
          className="w-40 origin-top-right rounded-xl border border-black/5
        bg-background p-1 text-sm text-foreground transition duration-100 ease-out [--anchor-gap:var(--spacing-1)]
        focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 mt-2 shadow-lg
        dark:border-white/5"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10
            dark:data-[focus]:bg-white/10">
              <PencilIcon className="size-4 fill-white/30" />
              Edit
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10
            dark:data-[focus]:bg-white/10">
              <TrashIcon className="size-4 fill-white/30" />
              Delete
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
