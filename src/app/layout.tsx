import type { Metadata } from "next";
import { JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/effects/SmoothScroll";

// JetBrains Mono is the body/UI font; Cormorant stays for the display headings.
const jet = JetBrains_Mono({
  variable: "--font-jet",
  subsets: ["latin"],
  display: "swap",
});
const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vince Sarkis — Founder & Creator",
  description:
    "Founder and creator bringing ideas to life. Builder of Squiggle, TradoGotchi, and Mindfull Intel.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jet.variable} ${display.variable} h-full`}>
      <body className="min-h-full bg-black text-[#f0f0f0] antialiased overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
