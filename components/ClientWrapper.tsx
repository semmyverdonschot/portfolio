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

      {/* Page content mounts immediately */}
      <main className="relative">{children}</main>

      {/* Full-screen overlay hides content visually while splash plays */}
      {showSplash && (
        <div className="fixed inset-0 z-[9999] bg-[var(--color-primary)] pointer-events-none">
          <SplashScreen onFinish={() => setShowSplash(false)} />
        </div>
      )}
    </AppProvider>
  );
}
