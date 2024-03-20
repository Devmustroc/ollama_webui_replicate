import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ollama ChatWeb",
  description: "Generated your ideas with Ollama",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
          <html lang="en">
            <body className={inter.className}>
            <div
                className="h-full relative"
            >
                <div
                    className="hidden h-full md:flex md:w-72  md:flex-col md:fixed md:inset-y-0"
                >
                    <Sidebar />
                </div>
                <main className="md:pl-72">
                    <Navbar />
                    {children}
                </main>
            </div>
            </body>
          </html>
  );
}
