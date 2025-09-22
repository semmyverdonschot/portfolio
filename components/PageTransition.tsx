"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
  // when true, skip transitions (used during splash)
  disabled?: boolean;
}

export default function PageTransition({ children, disabled }: PageTransitionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (disabled) return;
    if (!hasMounted.current) {
      hasMounted.current = true;
      return; // skip initial mount animation
    }

    const el = contentRef.current;
    if (!el) return;

      // Prepare element to act as a full-screen fixed overlay that will
      // slide in from the bottom and cover the whole viewport (including navbar)
      Object.assign(el.style, {
        position: "fixed",
        inset: "0px",
        width: "100%",
        height: "100%",
        zIndex: "9999",
        pointerEvents: "none",
        background: "transparent",
        borderRadius: "16px",
        overflow: "hidden",
      });

      // Start off-screen bottom as a rounded card and animate to full-screen
      gsap.set(el, { yPercent: 100, scale: 0.98, borderRadius: 16 });
      const tl = gsap.timeline({ defaults: { duration: 0.45, ease: "back.out(0.4)" } });
      // block pointer events during the animation to avoid accidental clicks
      el.style.pointerEvents = "auto";
      // slide up while removing border radius to 0
      tl.to(el, { yPercent: 0, scale: 1, borderRadius: 0, ease: "back.out(0.45)" });
      // release pointer-events shortly after animation completes
      tl.call(() => {
        el.style.pointerEvents = "none";
      }, [], ">+=0.05");


    return () => {
      tl.kill();
      if (el) {
        // clear inline styles we set
        el.style.position = "";
        el.style.inset = "";
        el.style.width = "";
        el.style.height = "";
        el.style.zIndex = "";
        el.style.pointerEvents = "";
        el.style.background = "";
        gsap.set(el, { clearProps: "all" });
      }
    };
  }, [pathname, disabled]);

  return (
    <div className="relative min-h-screen w-full">
      <div ref={contentRef} className="w-full h-full">
        {children}
      </div>
    </div>
  );
}
