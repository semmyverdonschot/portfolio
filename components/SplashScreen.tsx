"use client";

import { useEffect, useRef, useState } from "react";

interface SplashScreenProps {
  onFinish: () => void;
  visualDuration?: number;
  pause?: number;
  videoRef?: React.RefObject<HTMLVideoElement>; // optional ref to the real video
}

export default function SplashScreen({
  onFinish,
  visualDuration = 1000,
  pause = 400,
  videoRef,
}: SplashScreenProps) {
  const [count, setCount] = useState(0);
  const numberRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);
  const visualStartRef = useRef(0);

  useEffect(() => {
    // Preload images only
    ["/WEB.svg", "/DEVELOPER.svg"].forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    visualStartRef.current = performance.now();

    const updateCounter = (time: number) => {
      if (finishedRef.current) return;

      const elapsed = time - visualStartRef.current;
      const progress = Math.min((elapsed / visualDuration) * 100, 100);
      setCount(progress);

      if (progress < 100) {
        requestAnimationFrame(updateCounter);
      } else {
        waitForVideoAndFinish();
      }
    };

    const waitForVideoAndFinish = () => {
      if (videoRef?.current && videoRef.current.readyState < 4) {
        videoRef.current.addEventListener("canplaythrough", finishSplash, {
          once: true,
        });
      } else {
        finishSplash();
      }
    };

    const finishSplash = () => {
      setTimeout(() => {
        if (numberRef.current) {
          numberRef.current.style.transition = "transform 0.6s ease-in-out";
          numberRef.current.style.transform = "translateY(-100%)";
        }
        setTimeout(onFinish, 600);
        finishedRef.current = true;
      }, pause);
    };

    requestAnimationFrame(updateCounter);
  }, [visualDuration, pause, onFinish, videoRef]);

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
