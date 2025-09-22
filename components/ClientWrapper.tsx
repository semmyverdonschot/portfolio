"use client";

import { ReactNode, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/NavBar";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [splashPlayed, setSplashPlayed] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem("splashPlayed");
    } catch {
      return false;
    }
  });

  const [showSplash, setShowSplash] = useState<boolean>(() => !splashPlayed);

  // when the splash finishes, persist that it has been shown so future navigations skip it
  const handleSplashFinish = () => {
    try {
      localStorage.setItem("splashPlayed", "1");
    } catch {}
    setSplashPlayed(true);
    setShowSplash(false);
  };

  return (
    <>
      <Navbar />

      <main className="relative">
        {/* Only apply page transitions after the splash finishes */}
        {showSplash ? (
          children
        ) : (
          // only disable while the splash is actively showing
          <PageTransition disabled={showSplash}>{children}</PageTransition>
        )}
      </main>

      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
    </>
  );
}
