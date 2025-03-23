import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Input } from "@/components/tremor/Input";
import { Divider } from "@/components/tremor/Divider";
import { Label } from "@/components/tremor/Label";
import { Button } from "@/components/tremor/Button";
import { RiGoogleFill } from "@remixicon/react";

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
        <form action="#" method="post" className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email" className="font-medium">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="john@company.com"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="password" className="font-medium">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              autoComplete="password"
              placeholder="Password"
              className="mt-2"
            />
          </div>
          <Button type="submit" className="mt-4 w-full">
            Sign in
          </Button>
        </form>
        <Divider>or with</Divider>
        <Button asChild variant="secondary" className="w-full">
          <a href="#" className="inline-flex items-center gap-2">
            <RiGoogleFill className="size-5" aria-hidden={true} />
            Sign in with Google
          </a>
        </Button>
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
