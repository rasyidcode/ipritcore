import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uang Kemana",
  description: "Aplikasi pencatatan keuangan sederhana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased dark:bg-gray-950`}>
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
