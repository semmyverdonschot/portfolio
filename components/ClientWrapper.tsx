"use client";

import { ReactNode, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/NavBar";
import { AppProvider } from "@/app/provider";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AppProvider>
      {/* Navbar rendered immediately */}
      <Navbar />

      {/* Page content renders immediately for LCP */}
      <main className="relative">{children}</main>

      {/* Splash overlays visually; Splash handles its own animation */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
    </AppProvider>
  );
}
