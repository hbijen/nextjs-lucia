import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster";

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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        
        {children}
        <Toaster />
      </body>
    </html>
  );
}
