import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <nav className="p-4 flex items-center justify-between">
        <h1 className="uppercase text-xl">
          Iprit<strong>Core</strong>
        </h1>
        <ul className="inline-flex gap-4 p-2 rounded-lg border">
          <li>
            <Link
              href="/"
              className="font-semibold bg-gray-100 rounded-lg
            px-2 py-1 hover:bg-gray-100 transition-colors
            duration-150 ease-linear text-sm"
            >
              Dasbor
            </Link>
          </li>
          <li>
            <Link
              href="/transactions"
              className="rounded-lg transition-colors duration-150 ease-linear
            px-2 py-1 hover:bg-gray-100 font-semibold text-sm"
            >
              Transaksi
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
