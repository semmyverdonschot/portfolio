"use client";

import { ReactNode, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/NavBar";

const SplashScreen = dynamic(() => import("@/components/SplashScreen"), {
  ssr: false,
});

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const isReload = performance.navigation?.type === 1;
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
