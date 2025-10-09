import type { Metadata} from "next";

export const metadata: Metadata = {
  title: "Semmy Verdonschot | Web Developer based in The Netherlands",
  description:
    "Web developer from the Netherlands, studying at Fontys. Specializing in secure digital solutions, full-stack development with modern technology and user-focused design.",
  keywords: [
    "web developer",
    "full-stack developer",
    "interactive design",
    "secure applications",
    "modern web development",
    "digital solutions",
    "cybersecurity",
    "Next.js",
    "React",
    "TypeScript",
    "Fontys",
    "Netherlands",
  ],
  authors: [{ name: "Semmy Verdonschot", url: "https://semmyverdonschot.com" }],
  creator: "Semmy Verdonschot",
  publisher: "Semmy Verdonschot",
  openGraph: {
    title: "Semmy Verdonschot | Web Developer",
    description: "Web developer based in the Netherlands",
    url: "https://semmyverdonschot.com",
    siteName: "semmyverdonschot.com",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Semmy Verdonschot - Web Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Semmy Verdonschot | Web Developer",
    description: "Web developer based in the Netherlands",
    creator: "@semmyverdonschot",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 675,
        alt: "Semmy Verdonschot - Web Developer",
      },
    ],
  },
  alternates: {
    canonical: "https://semmyverdonschot.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "google-site-verification-code-123456",
    yandex: "yandex-verification-code-123456",
    yahoo: "yahoo-verification-code-123456",
    other: {
      me: ["https://linkedin.com/in/semmyverdonschot"],
    },
  },
  appleWebApp: {
    title: "Semmy Verdonschot Portfolio",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  category: "Portfolio",
  colorScheme: "light dark",
};
