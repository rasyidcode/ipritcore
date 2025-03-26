"use client";

import { signIn } from "next-auth/react";
import { FormEvent } from "react";

export default function LoginForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      callbackUrl: "/",
    })
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }

  return (
    <form onSubmit={handleSubmit} method="post">
      <h1>Login form</h1>
    </form>
  );
}
