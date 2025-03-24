"use client";

import { signIn } from "next-auth/react";
import { Label } from "../Label";
import { Input } from "../Input";
import { Button } from "../Button";
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
    <form
      onSubmit={handleSubmit}
      action="#"
      method="post"
      className="mt-6 space-y-4"
    >
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
          defaultValue="demo@example.com"
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
          defaultValue="demo"
        />
      </div>
      <Button type="submit" className="mt-4 w-full">
        Sign in
      </Button>
    </form>
  );
}
