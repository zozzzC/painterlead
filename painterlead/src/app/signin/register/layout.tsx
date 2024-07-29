import type { Metadata } from "next";
import { Inter } from "next/font/google";



export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-full">
       {children}
    </section>   
  );
}

