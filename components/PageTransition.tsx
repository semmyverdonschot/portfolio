"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current) return;

    // Initial state: start below viewport
    gsap.set(containerRef.current, { y: "100%", opacity: 0 });

    const tl = gsap.timeline();

    // Animate new page in
    tl.to(containerRef.current, {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      ease: "power4.out",
    });

    return () => {
      // Animate old page out when unmounting
      gsap.to(containerRef.current, {
        y: "-20%",
        opacity: 0,
        duration: 0.6,
        ease: "power4.inOut",
      });
    };
  }, [pathname]);

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-white">
      {children}
    </div>
  );
}
