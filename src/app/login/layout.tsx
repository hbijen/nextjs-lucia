import { ReactNode } from "react";

export default function LoginLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      {children}
    </div>
  );
}
