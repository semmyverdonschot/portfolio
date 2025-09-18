"use client";

import { ReactNode, useState, useRef } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/NavBar";
import { AppProvider } from "@/app/provider";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleSplashFinish = () => {
    setLoading(false);

    if (overlayRef.current) {
      overlayRef.current.style.display = "none";
    }
  };

  return (
    <AppProvider>
      <Navbar />

      {/* Overlay on top of content */}
      {loading && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 bg-[var(--color-primary)] pointer-events-none"
        />
      )}

      {/* Content mounted behind overlay */}
      <div>{children}</div>

      {/* SplashScreen triggers finish */}
      {loading && <SplashScreen onFinish={handleSplashFinish} />}
    </AppProvider>
  );
}
