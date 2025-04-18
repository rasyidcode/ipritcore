"use client";

import { signIn } from "next-auth/react";
import { FormEvent } from "react";

const demoUser = {
  username: "demo@example.com",
  password: "demo",
};

export default function FormLogin() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await signIn("credentials", {
      email: (e.currentTarget.email as HTMLInputElement).value,
      password: (e.currentTarget.password as HTMLInputElement).value,
      callbackUrl: "/",
    });
  }
  return (
    <form onSubmit={handleSubmit} method="POST" className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-foreground"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={demoUser.username}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base
            text-foreground dark:text-background outline outline-1 -outline-offset-1 outline-gray-300
            placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2
            focus:outline-black/90 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-foreground"
          >
            Password
          </label>
          <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-foreground hover:text-[#383838]
              dark:hover:text-gray-400"
            >
              Forgot password?
            </a>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            defaultValue={demoUser.password}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base
            text-foreground dark:text-background outline outline-1 -outline-offset-1 outline-gray-300
            placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2
            focus:outline-black/90 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-foreground dark:bg-white px-3
              py-1.5 text-sm/6 font-semibold text-background shadow-sm hover:bg-[#383838]
              dark:hover:bg-[#f2f2f2]
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-black/90 transition-colors duration-150 ease-in-out"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
