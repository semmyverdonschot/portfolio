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

  // Helper: add timeout fallback to any promise
  const withTimeout = (promise: Promise<void>, ms: number) =>
    new Promise<void>((resolve) => {
      const timer = setTimeout(resolve, ms);
      promise.finally(() => {
        clearTimeout(timer);
        resolve();
      });
    });

  // Preload assets
  useEffect(() => {
    const preloadAssets = async () => {
      const assets = ["/1.mp4", "/WEB.svg", "/DEVELOPER.svg"];
      const promises = assets.map((src) => {
        if (src.endsWith(".mp4")) {
          const videoPromise = new Promise<void>((resolve) => {
            const video = document.createElement("video");
            video.src = src;
            video.preload = "auto";
            video.onloadeddata = video.onerror = () => resolve();
          });
          return withTimeout(videoPromise, 3000);
        } else {
          const imgPromise = new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = img.onerror = () => resolve();
          });
          return withTimeout(imgPromise, 3000);
        }
      });
      await Promise.all(promises);
      setLoaded(true);
    };

    preloadAssets();
  }, []);

  // Count animation (always runs)
  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setCount(current);
      if (current >= 100) clearInterval(timer);
    }, 15);
    return () => clearInterval(timer);
  }, []);

  // GSAP exit animation once both loaded + count finished
  useEffect(() => {
    if (count >= 100 && loaded && numberRef.current && containerRef.current) {
      setTimeout(() => {
        // Slide number up
        gsap.to(numberRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.inOut",
        });

        // Slide splash container up
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          delay: 0.2,
          ease: "power4.inOut",
          onComplete: onFinish,
        });
      }, 200);
    }
  }, [count, loaded, onFinish]);

  // Force splash to exit after 6s no matter what
  useEffect(() => {
    const fallback = setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          onComplete: onFinish,
        });
      }
    }, 6000);
    return () => clearTimeout(fallback);
  }, [onFinish]);

  return (
    <>
      {/* Splash */}
      <div
        ref={containerRef}
        className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--color-primary)] overflow-hidden"
      >
        <div className="overflow-hidden h-[20px]">
          <div
            ref={numberRef}
            className="text-[16px] font-bold text-[var(--color-dark)]"
          >
            {count}
          </div>
        </div>
      </div>
    </>
  );
}
