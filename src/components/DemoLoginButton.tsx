"use client";

import { signIn } from "next-auth/react";

export default function DemoLoginButton() {
  return (
    <button
      onClick={() =>
        signIn("credentials", {
          email: "demo@example.com",
          password: "demo",
          callbackUrl: "/",
        })
      }
      type="button"
      className="flex w-full justify-center rounded-md bg-foreground px-3
        py-1.5 text-sm/6 font-semibold text-background shadow-sm hover:bg-[#383838]
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-black/90 transition-colors duration-150 ease-in-out
        dark:bg-white dark:hover:bg-[#f2f2f2]"
    >
      Login using demo account
    </button>
  );
}
