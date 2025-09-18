"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  // Count animation 0 → 100
  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setCount(current);
      if (current >= 100) clearInterval(timer);
    }, 15);

    return () => clearInterval(timer);
  }, []);

  // Exit animation once counter finishes
  useEffect(() => {
    if (count >= 100 && numberRef.current && containerRef.current) {
      setTimeout(() => {
        gsap.to(numberRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.inOut",
        });

        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          delay: 0.3,
          ease: "power4.inOut",
          onComplete: onFinish,
        });
      }, 200);
    }
  }, [count, onFinish]);

  // Fallback exit after 6s
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
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[var(--color-primary)] flex items-center justify-center overflow-hidden pointer-events-auto"
    >
      {/* Counter */}
      <div className="overflow-hidden h-[24px] pointer-events-none">
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
