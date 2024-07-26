import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/layout/sidebar";
import { Outfit } from "next/font/google";
import Footer from "@/components/layout/footer";

const outfit = Outfit({
  weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "painterlead",
  description: "a new-era art search and commission platform. by artists, for artists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
      <div className="h-full flex flex-row">
          <div className="h-full mr-10"><Sidebar/></div>
          <div className="flex-grow">{children}</div>
      </div>
     </body>
    </html>
  );
}

