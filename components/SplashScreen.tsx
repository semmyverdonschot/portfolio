"use client";

import { useEffect, useRef, useState } from "react";

interface SplashScreenProps {
  onFinish: () => void;
  visualDuration?: number;
  pause?: number;
}

export default function SplashScreen({
  onFinish,
  visualDuration = 1000,
  pause = 200,
}: SplashScreenProps) {
  const [count, setCount] = useState(0);
  const numberRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);
  const visualStartRef = useRef(performance.now());

  useEffect(() => {
    const criticalAssets = ["/1.mp4", "/WEB.SVG", "/DEVELOPER.SVG"];

    criticalAssets.forEach((src) => {
      if (src.endsWith(".mp4")) {
        const video = document.createElement("video");
        video.src = src;
        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;
      } else {
        const img = new Image();
        img.src = src;
      }
    });
  }, []);

  useEffect(() => {
    const updateCounter = (time: number) => {
      if (finishedRef.current) return;

      const elapsed = time - visualStartRef.current;
      const progress = Math.min((elapsed / visualDuration) * 100, 100);

      setCount(progress);

      if (progress < 100) {
        requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => {
          if (numberRef.current) {
            numberRef.current.style.transition = "transform 0.6s ease-in-out";
            numberRef.current.style.transform = "translateY(-100%)";
          }
          setTimeout(onFinish, 600);
          finishedRef.current = true;
        }, pause);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [visualDuration, pause, onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[var(--color-primary)] flex items-center justify-center overflow-hidden pointer-events-auto">
      <div className="overflow-hidden h-[24px]">
        <div
          ref={numberRef}
          className="text-[18px] font-bold text-[var(--color-dark)]"
        >
          {Math.floor(count)}
        </div>
      </div>
      <noscript>
        <div className="text-[var(--color-dark)] font-bold absolute">
          loading...
        </div>
      </noscript>
    </div>
  );
}
