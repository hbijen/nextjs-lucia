import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";

import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "  ",
  description: "demo App",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}>
          <div className="w-full h-screen flex items-center justify-center px-4">
            {children}
          </div>
        </body>
    </html>
  );
}
