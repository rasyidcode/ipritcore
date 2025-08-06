import AuthProvider from "@/components/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IpritCore",
  description: "Aplikasi milik gembul",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased flex items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-black/95`}
      >
        <AuthProvider>
          <main className="h-[640px] w-full max-w-xl shadow-lg bg-white dark:bg-black rounded">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
