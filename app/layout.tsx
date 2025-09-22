import { Albert_Sans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import ClientWrapper from "@/components/ClientWrapper";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next"

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
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
        url: "https://semmyverdonschot.com/webdeveloper.png",
        width: 1200,
        height: 630,
        alt: "Semmy Verdonschot Portfolio",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export function generateViewport() {
  return {
    viewport: {
      width: "device-width",
      initialScale: 1,
    },
    themeColor: "#171717",
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={albertSans.variable}>
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Preload Albert Sans font */}
        <link
          rel="preload"
          as="font"
          href="/_next/static/fonts/Albert_Sans-*.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preload LCP video */}
        <link
          rel="preload"
          as="video"
          href="/hero-video-720.mp4"
          type="video/mp4"
        />
        {/* Preload LCP video */}
        <link
          rel="preload"
          as="video"
          href="/hero-video-480.mp4"
          type="video/mp4"
        />

        {/* Preload LCP poster */}
        <link
          rel="preload"
          as="image"
          href="/placeholder.webp"
          type="image/webp"
          fetchPriority="high"
        />

        {/* Dark translucent status bar for iOS Safari */}
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
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
      </body>
    </html>
  );
}
