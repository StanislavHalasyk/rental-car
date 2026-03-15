import type { Metadata } from "next";

import { manrope } from "./fonts";
import "./globals.css";
import Header from "../components/Header/Header";

export const metadata: Metadata = {
  title: "Rental Car",
  description: "Reliable and budget-friendly rentals for any journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {}
      <body className={`${manrope.variable}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
