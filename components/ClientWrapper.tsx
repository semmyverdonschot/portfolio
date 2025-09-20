"use client";

import { ReactNode, useRef, useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/NavBar";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
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
        {!showSplash && children}

        {/* Hidden main video to start playing after splash */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto hidden"
        >
          <source src="/hero-video-480.webm" type="video/webm" />
          <source
            src="/hero-video-720.webm"
            type="video/webm"
            media="(min-width:768px)"
          />
        </video>
      </main>

      {/* Splash overlay */}
      {showSplash && (
        <SplashScreen
          onFinish={() => setShowSplash(false)}
          videoRef={videoRef}
          posterSrc="/placeholder.webp"
          videoSources={[
            { src: "/hero-video-480.webm" },
            { src: "/hero-video-720.webm", media: "(min-width:768px)" },
          ]}
        />
      )}
    </>
  );
}
