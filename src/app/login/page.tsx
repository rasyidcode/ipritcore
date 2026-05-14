import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import DemoLoginButton from "@/components/DemoLoginButton";
import GoogleLogin from "@/components/GoogleLogin";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  const isDevelopment = process.env.NODE_ENV === "development";

  if (session?.user) {
    redirect("/");
  }

  return (
    <div
      className="flex min-h-screen flex-col justify-center
    px-6 py-12 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="uppercase max-w-max mx-auto text-xl">
          Iprit<strong>Core</strong>
        </h1>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        {isDevelopment && (
          <div className="mt-5">
            <DemoLoginButton />
          </div>
        )}
        <div className="mt-5">
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
}
