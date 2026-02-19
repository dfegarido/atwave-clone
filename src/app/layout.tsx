import type { Metadata } from "next";
import { Archivo_Black, Tangerine, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400"],
  display: "swap",
});

const tangerine = Tangerine({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexus | Strategic Digital Growth Platform",
  description:
    "Enterprise-grade demand generation and digital transformation. Drive measurable outcomes with data-driven strategy, precision targeting, and scalable execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${tangerine.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
