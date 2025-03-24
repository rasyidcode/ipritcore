"use client";

import { RiGoogleFill } from "@remixicon/react";
import { Button } from "@/components/Button";

export default function SignInWithGoogle() {
  function handleSignInWithGoogle() {}

  return (
    <Button
      variant="secondary"
      onClick={handleSignInWithGoogle}
      className="inline-flex items-center gap-2 w-full"
    >
      <RiGoogleFill className="size-5" aria-hidden={true} />
      Sign in with Google
    </Button>
  );
}
