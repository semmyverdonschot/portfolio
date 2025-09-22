"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const hasMounted = useRef(false); // Track first mount

  useEffect(() => {
    if (!hasMounted.current) {
      // Skip the transition on first mount
      hasMounted.current = true;
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Start off-screen bottom
    gsap.set(overlay, { y: "100%", opacity: 1 });

    const tl = gsap.timeline();
    tl.to(overlay, {
      y: "0%",
      duration: 0.5,
      ease: "power4.out",
    });
    tl.to(overlay, {
      y: "-100%",
      duration: 0.5,
      ease: "power4.in",
      delay: 0.3,
    });
  }, [pathname]);

  return (
    <div className="relative min-h-screen w-full">
      {children}

      <div
        ref={overlayRef}
        className="fixed inset-0 bg-[var(--color-primary)] z-[9999] pointer-events-none"
      />
    </div>
  );
}
