"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/categories", label: "Kategori" },
];

export default function DashboardNavLinks() {
  const pathname = usePathname();

  return (
    <>
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
    </>
  );
}
