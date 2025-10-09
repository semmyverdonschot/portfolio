import { Albert_Sans } from "next/font/google";
import Script from "next/script";
import { ReactLenis } from "lenis/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import ClientWrapper from "@/components/ui/ClientWrapper";
import { Analytics } from "@vercel/analytics/react";
import CursorDot from "@/components/ui/CursorDot";
import { Viewport } from "next";
export { metadata } from "./metadata";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert-sans",
  display: "swap",
});

export function generateViewport() {
  return {
    themeColor: "#171717",
    colorScheme: "light dark",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={albertSans.variable}>
      <head>
        {/* Preconnect and preload assets */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <ReactLenis root>
        <body>
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

          <div className="px-4 md:px-8" style={{ overflow: "visible" }}>
            <ClientWrapper>{children}</ClientWrapper>
          </div>
          <Analytics />
          <SpeedInsights />
          <CursorDot />
        </body>
      </ReactLenis>
    </html>
  );
}
