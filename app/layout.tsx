import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/Header/Header";

// Подключаем шрифт из макета
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  ),
  title: "RentalCar | Найди свое идеальное авто",
  description:
    "Надежная и бюджетная аренда автомобилей для любых поездок. Быстро, удобно и выгодно.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "RentalCar | Аренда авто",
    description: "Платформа для легкой и удобной аренды автомобилей.",
    url: "https://localhost:3000",
    siteName: "RentalCar",
    images: [
      {
        url: "/hero-bg.jpg", // Используем твою картинку с главной страницы
        width: 1200,
        height: 630,
        alt: "RentalCar App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        {/* Компонент для всплывающих уведомлений */}
        <Toaster position="top-right" reverseOrder={false} />

        <Header />

        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
