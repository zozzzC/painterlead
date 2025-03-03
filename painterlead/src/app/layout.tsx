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

const theme = createTheme({
  colors: {
    darkGrey: [
      "#6e6e6e",
      "#595959",
      "#474747",
      "#404040",
      "#3d3d3d",
      "#2e2e2e",
      "#2b2b2b",
      "#141414",
      "",
      "",
    ],
  },
  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={outfit.className}>
          <MantineProvider theme={theme}>
            <div className="h-full">{children}</div>
          </MantineProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
