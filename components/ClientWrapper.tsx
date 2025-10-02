"use client";

import { ReactNode, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/NavBar";

const SplashScreen = dynamic(() => import("@/components/SplashScreen"), {
  ssr: false,
});

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if this is a page reload vs navigation
    const isReload = performance.navigation?.type === 1;
    const hasShownSplash = localStorage.getItem("splashShown");

    // Show splash on reload or first visit
    if (isReload || !hasShownSplash) {
      setShowSplash(true);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const preloadImage = (src: string) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    };

    preloadImage("/WEB.svg");
    preloadImage("/DEVELOPER.svg");
    preloadImage("/INTERACTIVE.svg");

    if (!isMobile) {
      preloadImage("/placeholder.webp");
    }
  }, [isMobile]);

  return (
    <>
      <Navbar />
      <main className="relative">{!showSplash && children}</main>
      {showSplash && (
        <SplashScreen
          onFinish={() => {
            setShowSplash(false);
            // Mark splash as shown (persists across sessions)
            localStorage.setItem("splashShown", "true");
          }}
        />
      )}
    </>
  );
}
