import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";

import { ReactNode } from "react";
import ClientWrapper from "@/components/ClientWrapper"; // our client component

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${albertSans.variable}`}>
      <body className="antialiased bg-white text-[var(--color-dark)] transition-colors duration-300">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
