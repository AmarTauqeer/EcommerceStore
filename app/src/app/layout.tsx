import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "./Context/store";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Layout from "./components/Layout";
import { Suspense } from "react";
import Loading from "./loading";


const poppins = Poppins({ weight: ["300", "400", "400"], subsets: ["latin"] });

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
    <html lang="en">
      <body className={poppins.className}>
        <GlobalContextProvider>
          <main className="flex justify-center">
            <Suspense fallback={<Loading />}>
            <div className="container items-center md:w-[80%] lg:w-[80%]">
              <div className="container w-full"><Layout /></div>
              <div className="container w-full">
                {children}
              </div>
            </div>
            </Suspense>
          </main>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
