"use client";

import { signOut } from "next-auth/react";

export default function SignOutPage() {
  return <button onClick={() => signOut()}>sign out</button>;
}
