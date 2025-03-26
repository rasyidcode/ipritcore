import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import AuthProvider from "@/components/ui/AuthProvider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IpritCore",
  description: "Aplikasi pencatatan pengeluaran sederhana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
