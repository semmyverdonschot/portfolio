"use client";

import { Albert_Sans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import ClientWrapper from "@/components/ClientWrapper";
import Script from "next/script";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${albertSans.variable}`}>
      <body className="antialiased bg-[#171717] text-[var(--color-light)] transition-colors duration-300">
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-0CS17B888C"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0CS17B888C');
          `}
        </Script>

        <div className="px-4 md:px-8">
          <ClientWrapper>{children}</ClientWrapper>
        </div>
      </body>
    </html>
  );
}
