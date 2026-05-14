"use client";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/reports", label: "Laporan" },
  { href: "/budgets", label: "Anggaran" },
  { href: "/categories", label: "Kategori" },
];

export default function DashboardNavLinks() {
  const pathname = usePathname();
  const activeLink = links.find((link) => link.href === pathname) ?? links[0];

  return (
    <div className="relative">
      <Menu>
        <MenuButton
          className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold transition-colors duration-150
            hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] sm:hidden"
        >
          <span className="flex min-w-0 items-center gap-2">
            <Bars3Icon className="size-5 shrink-0" aria-hidden="true" />
            <span className="truncate">{activeLink.label}</span>
          </span>
          <ChevronDownIcon className="size-4 shrink-0" aria-hidden="true" />
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="z-10 mt-2 w-[var(--button-width)] origin-top rounded-lg border bg-background p-1 shadow-lg focus:outline-none
            dark:border-white/[.145]"
        >
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <MenuItem key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-md px-2 py-2 text-sm font-semibold transition-colors duration-150
                    ${isActive
                      ? "bg-foreground text-background dark:bg-white"
                      : "hover:bg-[#f2f2f2] data-[focus]:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] dark:data-[focus]:bg-[#1a1a1a]"
                    }`}
                >
                  {link.label}
                </Link>
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>

      <ul className="hidden items-center gap-2 sm:flex justify-center">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-lg px-2 py-1 text-sm font-semibold transition-colors duration-150
                  ${isActive
                    ? "bg-foreground text-background dark:bg-white"
                    : "hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
                  }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
