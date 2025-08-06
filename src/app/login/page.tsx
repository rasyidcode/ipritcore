import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import FormLogin from "@/components/FormLogin";
import GoogleLogin from "@/components/GoogleLogin";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col justify-center p-4 w-full">
        <h1
          className={`uppercase max-w-max mx-auto text-2xl text-center relative
            after:content-[""] after:w-full after:absolute after:top-full after:left-0
            after:h-[2px] after:bg-black after:mt-1 dark:text-white dark:after:bg-white`}
        >
          Iprit<strong>Core</strong>
        </h1>
        <h2 className="text-base font-semibold tracking-tight mt-10 dark:text-white">
          Silahkan login di bawah ini
        </h2>
        <div className="mt-3">
          <FormLogin />

          <div className="mt-5 flex items-center gap-4">
            <hr className="flex-1 dark:border-white/10" />
            <p className="text-sm dark:text-white">atau lanjutkan dengan</p>
            <hr className="flex-1 dark:border-white/10" />
          </div>

          <div className="mt-5">
            <GoogleLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
