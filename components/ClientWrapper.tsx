"use client";

import { ReactNode, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/NavBar";
import { AppProvider } from "@/app/provider";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AppProvider>
      {/* Navbar */}
      <Navbar />
      <main className="relative">{children}</main>

      {/* Splash overlay */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
    </AppProvider>
  );
}
