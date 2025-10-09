import Script from "next/script";
import { ReactLenis } from "lenis/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import DocumentTitleChanger from "@/components/DocumentTitleChanger";
import ClientWrapper from "@/components/ui/ClientWrapper";
import { Analytics } from "@vercel/analytics/react";
import CursorDot from "@/components/ui/CursorDot";
import { albertSans } from "./fonts";
export { metadata } from "./metadata";

export const viewport = {
  themeColor: "#f5f5f5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body className={albertSans.variable}>
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
                      <DocumentTitleChanger />

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
