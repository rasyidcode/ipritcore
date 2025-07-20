import LogoutButton from "./_components/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col max-w-md mx-auto md:justify-center">
      <div className="md:h-[768px] border border-white/[0.09] flex flex-col rounded p-4">
        <nav className="mb-4">
          <div className="flex items-center justify-between rounded-lg border dark:border-white/[.145] p-2">
            <h1 className="uppercase text-xl">
              Iprit<strong>Core</strong>
            </h1>
            <ul className="inline-flex gap-2 items-center">
              <li>
                <LogoutButton />
              </li>
            </ul>
          </div>
        </nav>
        <div className="flex-1 overflow-hidden flex flex-col">{children}</div>
      </div>
    </div>
  );
}
