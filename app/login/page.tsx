import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Divider } from "@/components/tremor/Divider";
import LoginForm from "@/components/LoginForm";
import SignInWithGoogle from "@/components/SignInWithGoogle";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-4 lg:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h3 className="text-center text-lg font-semibold text-gray-900 dark:text-gray-50">
          Welcome Back
        </h3>
        <p className="text-center text-sm text-gray-500 dark:text-gray-500">
          Enter your credentials to access your account.
        </p>
        <LoginForm />
        <Divider>or with</Divider>
        <SignInWithGoogle />
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
          By signing in, you agree to our{" "}
          <a href="#" className="underline underline-offset-4">
            terms of service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4">
            privacy policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
