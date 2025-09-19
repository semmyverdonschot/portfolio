"use client";

import { useEffect, useRef, useState } from "react";

interface SplashScreenProps {
  onFinish: () => void;
  visualDuration?: number;
  pause?: number;
}

export default function SplashScreen({
  onFinish,
  visualDuration = 1200,
  pause = 200,
}: SplashScreenProps) {
  const [count, setCount] = useState(0);
  const numberRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);
  const visualStartRef = useRef(performance.now());
  const assetsDoneRef = useRef(false);

  useEffect(() => {
    const mediaElements: (HTMLImageElement | HTMLVideoElement)[] = [];
    document.querySelectorAll("img, video").forEach((el) => {
      if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement)
        mediaElements.push(el);
    });

    let loadedCount = 0;
    const totalCount = mediaElements.length || 1;

    const onAssetLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalCount) assetsDoneRef.current = true;
    };

    mediaElements.forEach((el) => {
      if (
        (el instanceof HTMLImageElement && el.complete) ||
        (el instanceof HTMLVideoElement && el.readyState >= 3)
      ) {
        onAssetLoaded();
      } else {
        el.addEventListener("load", onAssetLoaded, { once: true });
        el.addEventListener("loadeddata", onAssetLoaded, { once: true });
        el.addEventListener("loadedmetadata", onAssetLoaded, { once: true });
      }
    });

    const updateCounter = (time: number) => {
      if (finishedRef.current) return;

      const elapsed = time - visualStartRef.current;
      const visualProgress = Math.min((elapsed / visualDuration) * 100, 100);

      setCount(visualProgress);

      if (visualProgress < 100 || !assetsDoneRef.current) {
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

    return () => {
      mediaElements.forEach((el) => {
        el.removeEventListener("load", onAssetLoaded);
        el.removeEventListener("loadeddata", onAssetLoaded);
        el.removeEventListener("loadedmetadata", onAssetLoaded);
      });
    };
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
