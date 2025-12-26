import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skibidefense.com"),
  title: {
    template: "%s | Skibi Defense Value List",
    default: "Skibi Defense Value List & Trade Calculator 2025",
  },
  description:
    "The most accurate Skibi Defense value list and trade calculator. Check unit prices in gems and avoid scams. Updated daily with current trading values.",
  keywords: [
    "Skibi Defense",
    "value list",
    "trade calculator",
    "Roblox",
    "unit values",
    "trading",
    "gems",
  ],
  authors: [{ name: "SkibiValues" }],
  creator: "SkibiValues",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skibidefense.com",
    siteName: "SkibiValues",
    title: "Skibi Defense Value List & Trade Calculator 2025",
    description:
      "The most accurate Skibi Defense value list and trade calculator. Check unit prices in gems and avoid scams.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skibi Defense Value List & Trade Calculator 2025",
    description:
      "The most accurate Skibi Defense value list and trade calculator. Check unit prices in gems and avoid scams.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
