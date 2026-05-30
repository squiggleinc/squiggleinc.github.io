import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Italiana } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/effects/SmoothScroll";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
const wordmark = Italiana({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vincent Sarkis — Founder & Creator",
  description:
    "Founder and creator bringing ideas to life. Builder of Squiggle, TradoGotchi, and Mindfull Intel.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${wordmark.variable} h-full`}>
      <body className="min-h-full bg-black text-[#f0f0f0] antialiased overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
