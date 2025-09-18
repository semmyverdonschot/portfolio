"use client";

import { ReactNode, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/NavBar";
import { AppProvider } from "@/app/provider";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AppProvider>
      <Navbar />

      {/* Page content renders immediately for LCP */}
      <main className="relative">{children}</main>

      {/* Splash overlays visually but doesn’t block paint */}
      {showSplash && (
        <div
          className="fixed inset-0 z-50 bg-[var(--color-primary)] transition-opacity duration-700"
          // fade out when splash ends
        >
          <SplashScreen onFinish={() => setShowSplash(false)} />
        </div>
      )}
    </AppProvider>
  );
}
