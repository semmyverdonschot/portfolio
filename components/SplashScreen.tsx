"use client";

import { useEffect, useRef, useState } from "react";

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [count, setCount] = useState(0);
  const numberRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    const DURATION = 1500;
    const start = performance.now();

    const updateCounter = (time: number) => {
      if (finishedRef.current) return;

      const elapsed = time - start;
      const progress = Math.min((elapsed / DURATION) * 100, 100);
      setCount(progress);

      if (progress < 100) {
        requestAnimationFrame(updateCounter);
      } else {
        // pause 200ms at 100
        setTimeout(() => {
          if (numberRef.current) {
            numberRef.current.style.transition = "transform 0.6s ease-in-out";
            numberRef.current.style.transform = "translateY(-100%)";
          }
          setTimeout(onFinish, 600);
          finishedRef.current = true;
        }, 200);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [onFinish]);

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
    </div>
  );
}
