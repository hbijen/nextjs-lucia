import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

import { cn } from "@/lib/utils"
import { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "demo",
  description: "demo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
          {children}
      </body>
    </html>
  );
}
