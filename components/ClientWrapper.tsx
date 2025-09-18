"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/NavBar";
import { AppProvider } from "@/app/provider";
import gsap from "gsap";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [showApp, setShowApp] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);

  const handleSplashFinish = () => {
    setLoading(false);
    // Wait for content to be "ready" but keep it invisible
    setShowApp(true);
  };

  useEffect(() => {
    if (showApp && appRef.current) {
      // Animate opacity from 0 to 1 smoothly
      gsap.fromTo(
        appRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, [showApp]);

  return (
    <>
      {/* Show SplashScreen until finished */}
      {loading && <SplashScreen onFinish={handleSplashFinish} />}

      {/* Main app, initially hidden but mounted so no content jump */}
      {showApp && (
        <AppProvider>
          <Navbar />
          <div ref={appRef} style={{ opacity: 0 }}>
            {children}
          </div>
        </AppProvider>
      )}
    </>
  );
}
