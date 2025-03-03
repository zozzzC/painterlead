import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/layout/sidebar";
import "@mantine/core/styles.css";
import { Outfit } from "next/font/google";
import Footer from "@/components/layout/footer";
import React from "react";
import AuthProvider from "@/components/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQueryClient } from "react-query";
import { createTheme, MantineProvider } from "@mantine/core";

const outfit = Outfit({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "painterlead",
  description:
    "a new-era art search and commission platform. by artists, for artists.",
};

const theme = createTheme({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MantineProvider theme={theme}>
        <AuthProvider>
          <body className={outfit.className}>
            <div className="h-full">{children}</div>
          </body>
        </AuthProvider>
      </MantineProvider>
    </html>
  );
}
