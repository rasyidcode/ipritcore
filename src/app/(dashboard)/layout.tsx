import LogoutButton from "./_components/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <nav className="p-4">
        <div className="flex items-center justify-between rounded-lg border p-2">
          <h1 className="uppercase text-xl">
            Iprit<strong>Core</strong>
          </h1>
          <ul className="inline-flex gap-2 items-center">
            {/* <li>
              <Link
                href="/"
                className="font-semibold rounded-lg
            px-2 py-1 hover:bg-gray-100 transition-colors
            duration-150 ease-linear text-sm  underline
            underline-offset-4"
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
            </li> */}
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </nav>
      {children}
    </div>
  );
}
