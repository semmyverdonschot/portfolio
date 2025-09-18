"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/NavBar";
import { AppProvider } from "@/app/provider";
import gsap from "gsap";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animate elements after splash ends
  useEffect(() => {
    if (!showSplash && contentRef.current) {
      const animatables =
        contentRef.current.querySelectorAll<HTMLElement>("[data-animate]");

      animatables.forEach((el) => {
        // Apply mask for text/images/div
        el.style.overflow = "hidden";
        el.style.display = "inline-block";
        el.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      });

      gsap.fromTo(
        animatables,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
      );
    }
  }, [showSplash]);

  return (
    <AppProvider>
      <Navbar />

      <main ref={contentRef} className="relative">
        {children}
      </main>

      {showSplash && (
        <div className="fixed inset-0 z-[9999] bg-[var(--color-primary)] pointer-events-none">
          <SplashScreen onFinish={() => setShowSplash(false)} />
        </div>
      )}
    </AppProvider>
  );
}
