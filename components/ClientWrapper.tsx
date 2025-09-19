"use client";

import { ReactNode, useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/NavBar";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Preload LCP video
    const video = document.createElement("link");
    video.rel = "preload";
    video.as = "video";
    video.href = "/hero-video.mp4";
    video.type = "video/mp4";
    document.head.appendChild(video);

    // Preload poster
    const poster = document.createElement("link");
    poster.rel = "preload";
    poster.as = "image";
    poster.href = "/placeholder.webp";
    poster.type = "image/webp";
    poster.fetchPriority = "high";
    document.head.appendChild(poster);

    // Preload SVGs
    ["/WEB.svg", "/DEVELOPER.svg"].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      <Navbar />

      <main className="relative">
        {/* Render children immediately after splash */}
        {!showSplash && children}
      </main>

      {/* Splash overlay */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
    </>
  );
}
