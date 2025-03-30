import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import FormLogin from "./_components/FormLogin";
import GoogleLogin from "./_components/GoogleLogin";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

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
        <h2 className="mt-10 text-base font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormLogin />

        <div className="mt-5 flex items-center gap-4">
          <hr className="flex-1" />
          <p className="text-sm">Or continue with</p>
          <hr className="flex-1" />
        </div>

        <div className="mt-5">
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
}
