import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Kerja-IT.com | Tech Jobs in Malaysia",
  description: "IT jobs in Malaysia sourced from various job boards.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <Suspense>{children}</Suspense>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
