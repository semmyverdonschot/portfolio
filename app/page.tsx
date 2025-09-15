"use client";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/NavBar";

import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);

  if (loading) return <SplashScreen onFinish={() => setLoading(false)} />;

  return (
    <div className="min-h-screen bg-[var(--color-primary)]">
      <Navbar />
    </div>
  );
}
