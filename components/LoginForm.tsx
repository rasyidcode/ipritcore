"use client";

import { signIn } from "next-auth/react";

export default function SignInButtons() {
  function handleSignInWithDemo() {}

  function handleSignInWithGoogle() {}

  return (
    <div className="flex flex-col gap-4 flex-1 justify-center">
      <button
        className="border border-blue-200
                        px-3 py-1 flex justify-start items-center
                        gap-2 hover:bg-blue-100/70 transition-all
                        duration-150 ease-in-out text-blue-500"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <span className="font-bold flex-1">Sign with Google</span>
      </button>
    </div>
  );
}
