import type { Metadata } from "next";
import { Lobster, Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";

const lobster = Lobster({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lobster",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "500",
  style: "italic",
  variable: "--font-cormorant",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Founders Need Friends",
  description:
    "A cold plunge, a hot sauna, and seven other founders who get it. May 29 at PLUNJ Herriman.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lobster.variable} ${cormorant.variable} ${spaceGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
