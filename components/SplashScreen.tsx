"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const numberRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload assets
  useEffect(() => {
    const preloadAssets = async () => {
      const assets = [
        "/1.mp4",        // video
        "/WEB.svg",      // svg
        "/DEVELOPER.svg" // svg
      ];

      const promises = assets.map((src) => {
        if (src.endsWith(".mp4")) {
          return new Promise<void>((resolve) => {
            const video = document.createElement("video");
            video.src = src;
            video.preload = "auto";
            video.onloadeddata = video.onerror = () => resolve();
          });
        } else {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = img.onerror = () => resolve();
          });
        }
      });

      await Promise.all(promises);
      setLoaded(true);
    };

    preloadAssets();
  }, []);

  // Count animation
  useEffect(() => {
    if (!loaded) return;

    let current = 0;
    const timer = setInterval(() => {
      current++;
      setCount(current);
      if (current >= 100) clearInterval(timer);
    }, 15);

    return () => clearInterval(timer);
  }, [loaded]);

  // Animate splash out
  useEffect(() => {
    if (count >= 100 && loaded && numberRef.current && containerRef.current) {
      setTimeout(() => {
        // Animate number sliding up
        gsap.to(numberRef.current, { yPercent: -100, duration: 0.6, ease: "power3.inOut" });
        // Animate splash container sliding up
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          delay: 0.2,
          ease: "power4.inOut",
          onComplete: onFinish,
        });
      }, 200); // Slight delay to make it feel smoother
    }
  }, [count, loaded, onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--color-primary)] overflow-hidden"
    >
      <div className="overflow-hidden h-[20px]">
        <div ref={numberRef} className="text-[16px] font-bold text-[var(--color-dark)]">
          {count}
        </div>
      </div>
    </div>
  );
}
