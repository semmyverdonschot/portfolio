"use client";

import { ReactNode, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/NavBar";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <Navbar />

      <main className="relative">
        {/* Only render children after splash is done */}
        {!showSplash && children}
      </main>

      {/* Splash overlay */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
    </>
  );
}
