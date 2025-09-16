import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";

import { ReactNode } from "react";
import { AppProvider } from "@/app/provider";
import Head from "next/head";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Semmy Verdonschot | Web Developer",
  description: "Semmy Verdonschot | Web Developer based in The Netherlands.",
  keywords: [
    "Web Developer",
    "Portfolio",
    "Next.js",
    "React",
    "JavaScript",
    "Animations",
    "Interactive",
  ],
  authors: [{ name: "Semmy Verdonschot" }],
  robots: "index, follow",
  openGraph: {
    title: "Semmy Verdonschot | Web Developer",
    description: "Semmy Verdonschot | Web Developer based in The Netherlands.",
    url: "https://semmyverdonschot.com",
    siteName: "Semmy Verdonschot Portfolio",
    images: [
      {
        url: "https://semmyverdonschot.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Semmy Verdonschot Portfolio",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={`${albertSans.variable}`}>
      <Head>
        {/* ✅ Ensures theme-color always shows */}
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f5f5f5" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#171717" />
      </Head>
      <body className="antialiased bg-white text-[var(--color-dark)] transition-colors duration-300">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
