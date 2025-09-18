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
  const textRef = useRef<HTMLDivElement>(null);

  /**
   * Count animation: 0 → 100
   */
  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setCount(current);
      if (current >= 100) clearInterval(timer);
    }, 15);

    return () => clearInterval(timer);
  }, []);

  /**
   * Entry animation: fade in logo/name
   */
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }
  }, []);

  /**
   * Exit animation: once counter finishes
   */
  useEffect(() => {
    if (count >= 100 && numberRef.current && containerRef.current) {
      setTimeout(() => {
        // Slide number up
        gsap.to(numberRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.inOut",
        });

        // Fade + slide logo up
        gsap.to(textRef.current, {
          yPercent: -100,
          opacity: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.inOut",
        });

        // Slide container up
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

  /**
   * Fallback: force splash to exit after 6s
   */
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
      className="fixed inset-0 flex flex-col items-center justify-center z-[9999] bg-[var(--color-primary)] overflow-hidden"
    >
      {/* Big Name */}
      <div
        ref={textRef}
        className="text-white text-4xl md:text-6xl font-extrabold tracking-wide mb-6"
      >
        SEMMY VERDONSCHOT
      </div>

      {/* Counter */}
      <div className="overflow-hidden h-[24px]">
        <div
          ref={numberRef}
          className="text-[18px] font-bold text-[var(--color-dark)]"
        >
          {count}%
        </div>
      </div>
    </div>
  );
}
