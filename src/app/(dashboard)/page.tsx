"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Divider } from "@/components/Divider";
import { TicketDrawer } from "@/components/ui/TicketDrawer";
import {
  RiAddLine,
  RiMoneyDollarCircleLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from "@remixicon/react";
import React from "react";
import { cx } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table";
import {
  ColumnMeta,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortDirection,
  useReactTable,
} from "@tanstack/react-table";

const data = [
  {
    name: "Pengeluaran hari ini",
    value: "Rp. 35.000",
  },
  {
    name: "Pengeluaran minggu ini",
    value: "Rp. 75.000",
  },
  {
    name: "Pengeluaran bulan ini",
    value: "Rp. 150.000",
  },
];

const transactions = [
  {
    name: "Beli bawang merah dan putih",
    amount: "Rp. 15.000",
    createdAt: "2025-03-26"
  },
  {
    name: "Dipinjamkan",
    amount: "Rp. 34.000",
    createdAt: "2025-03-26"
  },
  {
    name: "Beli bawang merah dan putih",
    amount: "Rp. 15.000",
    createdAt: "2025-03-26"
  },
  {
    name: "Beli bawang merah dan putih",
    amount: "Rp. 15.000",
    createdAt: "2025-03-26"
  },
  {
    name: "Beli bawang merah dan putih",
    amount: "Rp. 15.000",
    createdAt: "2025-03-26"
  },
];

const workspacesColumns = [
  {
    header: "Name",
  },
  {
    header: "Owner",
  },
  {
    header: "Status",
  },
  {
    header: "Region",
  },
  {
    header: "Capacity",
  },
  {
    header: "Costs",
    meta: {
      align: "text-right",
      displayName: "Costs",
    },
  },
  {
    header: "Last edited",
    accessorKey: "lastEdited",
    enableSorting: false,
    meta: {
      align: "text-right",
      displayName: "Last edited",
    },
  },
];

export default function Dashboard() {
  const [isOpen, setIsOpen] = React.useState(false);
  const table = useReactTable({
    data: workspaces,
    columns: workspacesColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: "workspace",
          desc: false,
        },
      ],
    },
  });

  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Dasbor
          </h1>
          <p className="text-gray-500 sm:text-sm/6 dark:text-gray-500">
            Dasbor menampilkan ringkasan tentang pengeluaran.
          </p>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-base sm:text-sm"
        >
          Buat Transaksi
          <RiAddLine className="-mr-0.5 size-5 shrink-0" aria-hidden="true" />
        </Button>
        <Button
          onClick={() => {}}
          className="flex items-center gap-2 text-base sm:text-sm"
          variant="secondary"
        >
          Budget Bulan Ini
          <RiMoneyDollarCircleLine
            className="-mr-0.5 size-5 shrink-0"
            aria-hidden="true"
          />
        </Button>
        <TicketDrawer open={isOpen} onOpenChange={setIsOpen} />
      </div>
      <Divider />
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <Card key={item.name}>
            <dd className="flex items-start justify-between">
              <span className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
                {item.value}
              </span>
            </dd>
            <dt className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              {item.name}
            </dt>
          </Card>
        ))}
      </dl>
      <Divider />
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
        Daftar Pengeluaran
      </h2>
      <TableRoot>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortingHandler =
                    header.column.getToggleSortingHandler?.();
                  const getAriaSortValue = (
                    isSorted: false | SortDirection
                  ) => {
                    switch (isSorted) {
                      case "asc":
                        return "ascending";
                      case "desc":
                        return "descending";
                      case false:
                      default:
                        return "none";
                    }
                  };

                  return (
                    <TableHeaderCell
                      key={header.id}
                      onClick={sortingHandler}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && sortingHandler) {
                          sortingHandler(event);
                        }
                      }}
                      className={cx(
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        "px-0.5 py-1.5"
                      )}
                      tabIndex={header.column.getCanSort() ? 0 : -1}
                      aria-sort={getAriaSortValue(header.column.getIsSorted())}
                    >
                      <div
                        className={cx(
                          header.column.columnDef.enableSorting === true
                            ? "flex items-center justify-between gap-2 hover:bg-gray-50 hover:dark:bg-gray-900"
                            : header.column.columnDef.meta?.align,
                          "rounded-md px-3 py-1.5"
                        )}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() ? (
                          <div className="-space-y-2">
                            <RiArrowUpSLine
                              className={cx(
                                "size-4 text-gray-900 dark:text-gray-50",
                                header.column.getIsSorted() === "desc"
                                  ? "opacity-30"
                                  : ""
                              )}
                              aria-hidden={true}
                            />
                            <RiArrowDownSLine
                              className={cx(
                                "size-4 text-gray-900 dark:text-gray-50",
                                header.column.getIsSorted() === "asc"
                                  ? "opacity-30"
                                  : ""
                              )}
                              aria-hidden={true}
                            />
                          </div>
                        ) : null}
                      </div>
                    </TableHeaderCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cx(cell.column.columnDef.meta?.align)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </main>
  );
}
