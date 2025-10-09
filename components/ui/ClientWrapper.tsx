"use client";

import { ReactNode, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/NavBar";

const SplashScreen = dynamic(() => import("@/components/ui/SplashScreen"), {
  ssr: false,
});

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const navigationEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    const isReload = navigationEntries.length > 0 && navigationEntries[0].type === "reload";
    const hasShownSplash = localStorage.getItem("splashShown");

    if (!isReload && hasShownSplash) {
      setShowSplash(false);
    }
  }, []);

  return (
    <>
      {!showSplash && <Navbar />}
      <main className="relative">{!showSplash && children}</main>
      {showSplash && (
        <SplashScreen
          onFinish={() => {
            setShowSplash(false);
            localStorage.setItem("splashShown", "true");
          }}
        />
      )}
    </>
  );
}
