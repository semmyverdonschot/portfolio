"use client";

import { useEffect, useRef } from "react";

interface SplashScreenProps {
  onFinish: () => void;
  visualDuration?: number;
  pause?: number;
  videoRef?: React.RefObject<HTMLVideoElement>;
}

export default function SplashScreen({
  onFinish,
  visualDuration = 1000,
  pause = 400,
  videoRef,
}: SplashScreenProps) {
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ["/WEB.svg", "/DEVELOPER.svg", "/placeholder.webp"].forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const startCounter = () => {
      const numberEl = numberRef.current;
      if (!numberEl) return;

      const startTime = performance.now();

      const step = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min((elapsed / visualDuration) * 100, 100);
        numberEl.textContent = Math.floor(progress).toString();

        if (progress < 100) {
          requestAnimationFrame(step);
        } else {
          setTimeout(() => {
            numberEl.style.transition = "transform 0.6s ease-in-out";
            numberEl.style.transform = "translateY(-100%)";
            setTimeout(onFinish, 600);
          }, pause);
        }
      };

      requestAnimationFrame(step);
    };

    const waitForVideo = () => {
      if (videoRef?.current) {
        if (videoRef.current.readyState >= 4) {
          startCounter();
        } else {
          videoRef.current.addEventListener("canplaythrough", startCounter, {
            once: true,
          });
        }
      } else {
        startCounter();
      }
    };

    waitForVideo();
  }, [visualDuration, pause, onFinish, videoRef]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[var(--color-primary)] flex items-center justify-center overflow-hidden pointer-events-none">
      <div className="overflow-hidden h-[24px] w-[40px] flex justify-center items-center">
        <div
          ref={numberRef}
          className="text-[18px] font-bold text-[var(--color-dark)]"
        >
          0
        </div>
      </div>
    </div>
  );
}
