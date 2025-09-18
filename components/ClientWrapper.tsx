"use client";

import { ReactNode, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/NavBar";
import { AppProvider } from "@/app/provider";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  // Show splash screen only on full refresh
  if (loading) return <SplashScreen onFinish={() => setLoading(false)} />;

  return (
    <AppProvider>
      <Navbar />
        {children}
    </AppProvider>
  );
}
