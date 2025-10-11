"use client";

import { useEffect, useRef, useState } from "react";

interface SplashScreenProps {
  onFinish: () => void;
  visualDuration?: number;
  videoSources?: { src: string; media?: string }[];
  posterSrc?: string;
}

export default function SplashScreen({
  onFinish,
  visualDuration = 1600,
  posterSrc,
  videoSources = [],
}: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const assets = [
      posterSrc,
      "/svg/WEB.svg",
      "/svg/DEVELOPER.svg",
      "/svg/INTERACTIVE.svg",
      "/svg/INTERACTIVE.svg",
      "/videos/django.gif",
    ];
    videoSources.forEach((v) => assets.push(v.src));

    assets.forEach((src) => {
      if (!src) return;
      if (src.endsWith(".mp4") || src.endsWith(".webm")) {
        const video = document.createElement("video");
        video.src = src;
        video.preload = "auto";
      } else {
        const img = new Image();
        img.src = src;
      }
    });
  }, [posterSrc, videoSources]);

  useEffect(() => {
    const numberEl = numberRef.current;
    const loadingBar = loadingBarRef.current;

    if (!numberEl || !loadingBar) return;

    const numbers = [0, 25, 50, 75, 100];
    let currentNumberIndex = 0;
    const numberDuration = 400;

    const startTime = performance.now();

    const step = (time: number) => {
      const elapsed = time - startTime;
      const totalDuration = numbers.length * numberDuration;
      const progress = Math.min((elapsed / totalDuration) * 100, 100);

      loadingBar.style.width = `${progress}%`;

      const numberIndex = Math.min(
        Math.floor(elapsed / numberDuration),
        numbers.length - 1,
      );

      if (numberIndex !== currentNumberIndex && numberIndex < numbers.length) {
        currentNumberIndex = numberIndex;
      }

      if (currentNumberIndex < numbers.length) {
        const currentNumber = numbers[currentNumberIndex];
        if (currentNumber !== undefined) {
          numberEl.textContent = currentNumber.toString().padStart(2, "0");
        }
      }

      if (currentNumberIndex < numbers.length - 1) {
        requestAnimationFrame(step);
      } else {
        loadingBar.style.width = "100%";

        setTimeout(() => {
          numberEl.style.transition = "all 0.4s ease-in-out";
          numberEl.style.transform = "translateY(-150%)";

          setTimeout(() => {
            numberEl.textContent = "SEMMY VERDONSCHOT";
            numberEl.style.fontSize = "28px";
            numberEl.style.fontWeight = "900";
            numberEl.style.textAlign = "center";
            numberEl.style.lineHeight = "1.2";
            numberEl.style.transform = "translateY(100%)";
            numberEl.style.transition = "none";

            loadingBar.style.width = "100%";

            setTimeout(() => {
              numberEl.style.transition = "all 0.6s ease-in-out";
              numberEl.style.transform = "translateY(0)";

              setTimeout(() => {
                loadingBar.style.transition = "all 0.4s ease-in-out";
                loadingBar.style.width = "0%";

                numberEl.style.transition = "all 0.4s ease-in-out";
                numberEl.style.transform = "translateY(-120%)";

                setTimeout(() => {
                  setShow(false);
                  onFinish();
                }, 400);
              }, 800);
            }, 50);
          }, 400);
        }, 200);
      }
    };

    requestAnimationFrame(step);
  }, [visualDuration, onFinish]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[var(--color-primary)] flex items-center justify-center overflow-hidden font-[var(--font-albert-sans)]"
      aria-live="polite"
      role="status"
      style={{ pointerEvents: "auto" }} // allow interaction during splash
    >
      <div
        ref={containerRef}
        className="text-center flex flex-col items-center justify-center"
      >
        <div className="overflow-hidden h-[80px] w-[300px] flex justify-center items-center mb-4">
          <div
            ref={numberRef}
            className="text-2xl font-bold text-[var(--color-dark)] uppercase"
          >
            00
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-[3px] bg-[var(--color-dark)]/10">
        <div
          ref={loadingBarRef}
          className="h-full bg-[var(--color-dark)] transition-all duration-100 ease-out"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}
