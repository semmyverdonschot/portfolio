import { ReactLenis } from "lenis/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import DocumentTitleChanger from "@/components/DocumentTitleChanger";
import ClientWrapper from "@/components/ui/ClientWrapper";
import { Analytics } from "@vercel/analytics/react";
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
          <DocumentTitleChanger />

          <div className="px-4 md:px-8" style={{ overflow: "visible" }}>
            <ClientWrapper>{children}</ClientWrapper>
          </div>
          <Analytics />
          <SpeedInsights />
        </body>
      </ReactLenis>
    </html>
  );
}
