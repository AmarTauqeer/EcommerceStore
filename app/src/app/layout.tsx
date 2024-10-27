import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "./Context/store";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Layout from "./components/Layout";
import { Suspense } from "react";
import Loading from "./loading";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./components/ThemeProvider";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font--sans",
})

export const metadata: Metadata = {
  title: "Dotnetcore and NextJS Ecommerce Application",
  description: "An online store application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased", fontSans.variable
      )}>
        <GlobalContextProvider>
          <main className="">
            
              <Layout />
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange>
                  <Suspense fallback={<Loading />}>
                {children}
                </Suspense>
              </ThemeProvider>
            
          </main>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
