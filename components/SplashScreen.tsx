"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [count, setCount] = useState(0);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setCount(current);
      if (current >= 100) clearInterval(timer);
    }, 15); 

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (count >= 100 && numberRef.current) {
      const pause = setTimeout(() => {
        gsap.to(numberRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            onFinish();
          },
        });
      }, 200);

      return () => clearTimeout(pause);
    }
  }, [count, onFinish]);

  useEffect(() => {
    const fallback = setTimeout(() => onFinish(), 3500);
    return () => clearTimeout(fallback);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[var(--color-primary)] flex items-center justify-center overflow-hidden pointer-events-auto">
      <div className="overflow-hidden h-[24px]">
        <div
          ref={numberRef}
          className="text-[18px] font-bold text-[var(--color-dark)]"
        >
          {count}
        </div>
      </div>
    </div>
  );
}
