"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface SplashScreenProps {
  onFinish: () => void;
  progress?: number; // optional, can sync with real data loading
}

export default function SplashScreen({ onFinish, progress }: SplashScreenProps) {
  const [count, setCount] = useState(0);
  const numberRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);

  useEffect(() => {
    const raf = () => {
      setCount((prev) => {
        const diff = targetRef.current - prev;
        const step = Math.max(0.5, diff * 0.1);
        const next = prev + step;
        return next >= 100 ? 100 : next;
      });
      requestAnimationFrame(raf);
    };
    raf();
  }, []);

  // Update target progress based on real loading or fallback
  useEffect(() => {
    if (progress !== undefined) targetRef.current = progress;
    else targetRef.current = 100;
  }, [progress]);

  useEffect(() => {
    if (count >= 100 && numberRef.current) {
      numberRef.current.style.transition = "transform 0.6s ease-in-out";
      numberRef.current.style.transform = "translateY(-100%)";
      setTimeout(onFinish, 600);
    }
  }, [count, onFinish]);

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
          Your website is loading...
        </div>
      </noscript>
    </div>
  );
}
