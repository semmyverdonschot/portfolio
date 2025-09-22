"use client";

import { ReactNode, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/NavBar";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  // Keep a simple splash gating state. We intentionally avoid any
  // page-transition wrapper here to prevent heavy runtime imports.
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <Navbar />

      {/* Render children only after the splash finishes */}
      <main className="relative">{!showSplash && children}</main>

      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
    </>
  );
}
