"use client";

import { Albert_Sans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import ClientWrapper from "@/components/ClientWrapper";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={albertSans.variable}>
      <head>
        <title>Semmy Verdonschot | Web Developer</title>
        <meta
          name="description"
          content="Semmy Verdonschot | Web Developer based in The Netherlands."
        />
        <meta
          name="keywords"
          content="Web Developer, Portfolio, Next.js, React, JavaScript, Animations, Interactive"
        />
        <meta name="robots" content="index, follow" />

        {/* Preconnect and preload assets */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          href="/_next/static/fonts/Albert_Sans-*.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preload" as="video" href="/hero-video-720.mp4" type="video/mp4" />
        <link rel="preload" as="video" href="/hero-video-480.mp4" type="video/mp4" />
        <link
          rel="preload"
          as="image"
          href="/placeholder.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
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
            gtag('config', 'G-0CS17B888C', { send_page_view: false });
          `}
        </Script>

        <div className="px-4 md:px-8">
          <ClientWrapper>{children}</ClientWrapper>
        </div>

        <SpeedInsights />
      </body>
    </html>
  );
}
