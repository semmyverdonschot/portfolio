"use client";

// PageTransition: DEPRECATED - minimal no-op kept for backward compatibility
// This file intentionally avoids importing heavy runtimes (gsap / next/navigation)
// so it doesn't bloat client bundles. It simply renders children.

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
