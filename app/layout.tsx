import type { Metadata } from "next";
import { Lexend, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import FooterWrapper from "@/components/FooterWrapper";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VISUA X | Digital Agency",
  description: "Futuristic Digital Agency Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${lexend.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-purple-500 selection:text-white overflow-x-hidden`}
        suppressHydrationWarning
      >
        <Header />
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
