"use client";

import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function DocumentTitleChanger() {
  useDocumentTitle({
    defaultTitle: "Semmy Verdonschot | Web Developer based in The Netherlands",
    onBlurTitle: "Still here when you’re ready 👋",
  });

  return null;
}
