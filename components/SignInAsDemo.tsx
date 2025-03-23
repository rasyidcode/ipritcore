"use client";

import { signIn } from "next-auth/react";

export default function SignInAsDemo() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        signIn("credentials", {
          email: "user@demo.com",
          callbackUrl: "/",
        })
          .then((response) => {
            console.log("response: ", response);
          })
          .catch((error) => {
            console.log("error: ", error);
          });
      }}
    >
      <button
        className="border border-yellow-300 px-3 py-1 flex justify-start
        items-center gap-2 hover:bg-yellow-100/70 transition-all duration-150
        ease-in-out text-yellow-600 w-full"
        type="submit"
      >
        Login as Demo
      </button>
    </form>
  );
}
