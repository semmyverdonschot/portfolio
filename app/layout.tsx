import Script from "next/script";
import { ReactLenis } from "lenis/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import ClientWrapper from "@/components/ui/ClientWrapper";
import { Analytics } from "@vercel/analytics/react";
import CursorDot from "@/components/ui/CursorDot";
import { albertSans } from "./fonts";
export { metadata, viewport } from "./metadata";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
        <body className={albertSans.variable}> {/* 👈 apply font here */}
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
