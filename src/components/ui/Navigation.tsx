"use client";

import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation";
import Link from "next/link";
import { Notifications } from "@/components/ui/Notifications";

import { usePathname } from "next/navigation";
import { DropdownUserProfile } from "./UserProfile";
import { RiCopperCoinLine } from "@remixicon/react";

function Navigation() {
  const pathname = usePathname();
  return (
    <div className="shadow-s sticky top-0 z-20 bg-white dark:bg-gray-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 pt-3">
        <div>
          <span className="sr-only">IpritCore</span>
          <div className="inline-flex items-center gap-1">
            <RiCopperCoinLine size={32} />
            <p className="uppercase">
              Iprit<strong>Core</strong>
            </p>
          </div>
        </div>
        <div className="flex h-[42px] flex-nowrap gap-1">
          <Notifications />
          <DropdownUserProfile />
        </div>
      </div>
      <TabNavigation className="mt-5">
        <div className="mx-auto flex w-full max-w-7xl items-center px-6">
          <TabNavigationLink
            className="inline-flex gap-2"
            asChild
            active={pathname === "/"}
          >
            <Link href="/">Dasbor</Link>
          </TabNavigationLink>
          <TabNavigationLink
            className="inline-flex gap-2"
            asChild
            active={pathname === "/transaction"}
          >
            <Link href="/transaction">Transaksi</Link>
          </TabNavigationLink>
          <TabNavigationLink
            className="inline-flex gap-2"
            asChild
            active={pathname === "/categories"}
          >
            <Link href="/categories">Kategori</Link>
          </TabNavigationLink>
        </div>
      </TabNavigation>
    </div>
  );
}

export { Navigation };
