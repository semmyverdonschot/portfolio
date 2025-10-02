import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Semmy Verdonschot | Web Developer based in The Netherlands",
  description:
    "Web developer from the Netherlands, studying at Fontys. Specializing in secure digital solutions, full-stack development with modern technology and user-focused design.",
  keywords:
    "web developer, full-stack developer, interactive design, secure applications, modern web development, digital solutions, cybersecurity, Next.js, React, TypeScript, Fontys, Netherlands",
  authors: [{ name: "Semmy Verdonschot" }],
  robots: "index, follow",
  themeColor: "#171717",
  openGraph: {
    title: "Semmy Verdonschot - Interactive Web Developer",
    description:
      "Interactive web developer from the Netherlands, studying at Fontys. Specializing in secure digital solutions.",
    type: "website",
    url: "https://semmyverdonschot.com",
    images: ["/placeholder.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Semmy Verdonschot - Web Developer",
    description: "Web developer from the Netherlands",
    images: ["/placeholder.webp"],
  },
  alternates: {
    canonical: "/",
  },
};

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

        {/* Critical resources first */}
        <link rel="preload" as="image" href="/WEB.svg" />
        <link rel="preload" as="image" href="/DEVELOPER.svg" />
        <link rel="preload" as="image" href="/INTERACTIVE.svg" />
        <link
          rel="preload"
          as="image"
          href="/placeholder.webp"
          type="image/webp"
          fetchPriority="high"
        />

        {/* Video resources */}
        <link
          rel="preload"
          as="video"
          href="/hero-video-720p.webm"
          type="video/webm"
        />
        <link
          rel="preload"
          as="video"
          href="/hero-video-480p.webm"
          type="video/webm"
        />

        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body
        className={`${albertSans.className} antialiased bg-[#171717] text-[var(--color-light)] transition-colors duration-300`}
      >
        {/* Lenis smooth scrolling */}
        <Script
          strategy="beforeInteractive"
          src="https://unpkg.com/@studio-freight/lenis@1.0.34/dist/lenis.min.js"
        />
        <Script id="lenis-init" strategy="afterInteractive">
          {`
            const lenis = new Lenis({
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              smooth: true,
              mouseMultiplier: 1,
              smoothTouch: false,
              touchMultiplier: 2,
              infinite: false,
            });

            function raf(time) {
              lenis.raf(time);
              requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);
          `}
        </Script>

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
        <SpeedInsights />
      </body>
    </html>
  );
}
