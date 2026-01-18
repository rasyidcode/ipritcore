"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

const demoUser = {
  email: "demo@example.com",
  password: "demo",
};

export default function FormLogin() {
  const [email, setEmail] = useState(demoUser.email);
  const [password, setPassword] = useState(demoUser.password);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
    });
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900 dark:text-white/90"
        >
          Alamat Email
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded px-3 py-1.5 bg-black/5 dark:bg-white/5 text-base outline outline-1
            -outline-offset-1 outline-black/10 dark:outline-white/10 focus:outline-2 focus:-outline-offset-2
          focus:outline-black/90 dark:focus:outline-white/90 dark:text-white"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900 dark:text-white/90"
          >
            Kata Sandi
          </label>
          <a href="#" className="font-semibold text-sm dark:text-white">
            Lupa kata sandi?
          </a>
        </div>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded px-3 py-1.5 bg-black/5 dark:bg-white/5 text-base outline outline-1
            -outline-offset-1 outline-black/10 dark:outline-white/10 focus:outline focus:outline-2 focus:-outline-offset-2
            focus:outline-black/90 dark:focus:outline-white/90 dark:text-white"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded px-3 py-1.5 text-sm/6
          font-semibold shadow-sm focus-visible:outline focus-visible:outline-2
          focus-visible:outline-offset-2 focus-visible:outline-black/90 
          dark:focus-visible:outline-white/90 bg-black text-white 
          dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90
          transition-colors duration-150 ease-linear"
        >
          Masuk
        </button>
      </div>
    </form>
  );
}
