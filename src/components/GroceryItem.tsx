"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

export default function GroceryItem({ i }: { i: number }) {
  return (
    <li key={i} className="flex items-center gap-4 p-2">
      <span className="bg-white text-black w-6 flex items-center justify-center rounded-full">
        {i + 1}
      </span>
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center">
          <p className="font-semibold flex-1">Sabun Mandi</p>
          <Menu>
            <MenuButton
              as="button"
              className="rounded-full h-6 w-6 border border-solid border-black/[.08]
                flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#383838]
                hover:border-transparent text-foreground transition-colors
                duration-150 ease-linear dark:border-white/[.05]"
            >
              <EllipsisVerticalIcon className="w-4 h-4" />
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
                <button
                  onClick={() => {}}
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10
            dark:data-[focus]:bg-white/10"
                >
                  <PencilIcon className="size-4 fill-white/30" />
                  Edit
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => {}}
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10
            dark:data-[focus]:bg-white/10"
                >
                  <TrashIcon className="size-4 fill-white/30" />
                  Delete
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
        <div className="flex justify-between items-center font-light">
          <p>
            Rp. 12.000<span> x 1</span>
          </p>
          <p>Rp. 24.000</p>
        </div>
      </div>
    </li>
  );
}
