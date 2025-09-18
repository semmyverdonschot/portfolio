"use client";

import { ReactNode, useState, useRef } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/NavBar";
import { AppProvider } from "@/app/provider";
import gsap from "gsap";

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [showSplash, setShowSplash] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleSplashFinish = () => {
    if (!overlayRef.current) return;

    // Slide overlay up out of view instead of fading
    gsap.to(overlayRef.current, {
      yPercent: -100, // slide up
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => setShowSplash(false),
    });
  };

  return (
    <AppProvider>
      {/* Navbar + page mounted immediately */}
      <div className="relative">
        <Navbar />
        <main>{children}</main>
      </div>

      {/* Splash overlay */}
      {showSplash && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
        >
          <SplashScreen onFinish={handleSplashFinish} />
        </div>
      )}
    </AppProvider>
  );
}
