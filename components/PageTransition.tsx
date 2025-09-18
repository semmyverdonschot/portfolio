"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    gsap.set(element, { y: "100%", opacity: 0 });

    const tl = gsap.timeline();
    tl.to(element, {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      ease: "power4.out",
    });

    return () => {
      if (!element) return;
      gsap.to(element, {
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
