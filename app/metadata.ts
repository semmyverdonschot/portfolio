import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Semmy Verdonschot | Web Developer based in The Netherlands",
  description:
    "Web developer from the Netherlands, studying at Fontys. Specializing in secure digital solutions, full-stack development with modern technology and user-focused design.",
  keywords:
    "web developer, full-stack developer, interactive design, secure applications, modern web development, digital solutions, cybersecurity, Next.js, React, TypeScript, Fontys, Netherlands",
  authors: [{ name: "Semmy Verdonschot" }],
  robots: "index, follow",
  openGraph: {
    title: "Semmy Verdonschot | Web Developer",
    description: "Web developer based in the Netherlands",
    type: "website",
    url: "https://semmyverdonschot.com",
    images: ["/og_image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Semmy Verdonschot | Web Developer",
    description: "Web developer based in the Netherlands",
    images: ["/og_image.png"],
  },
  alternates: {
    canonical: "https://semmyverdonschot.com",
  },
};

export const viewport = {
  themeColor: "#171717",
};
