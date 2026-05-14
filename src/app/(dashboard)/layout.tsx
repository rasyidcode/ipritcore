import DashboardNavLinks from "@/components/DashboardNavLinks";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col max-w-md mx-auto md:justify-center">
      <nav className="p-4 space-y-2">
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
        <div className="rounded-lg border dark:border-white/[.145] p-2">
          <ul className="flex items-center gap-2">
            <DashboardNavLinks />
          </ul>
        </div>
      </nav>
      {children}
    </div>
  );
}
