"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";

interface SplashScreenProps {
  onFinish: () => void;
  visualDuration?: number;
  videoSources?: { src: string; media?: string }[];
  posterSrc?: string;
}

export default function SplashScreen({
  onFinish,
  visualDuration = 1000,
  posterSrc,
  videoSources = [],
}: SplashScreenProps) {
  const numberRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  // Preload assets
  useEffect(() => {
    const assets = [posterSrc, "/WEB.svg", "/DEVELOPER.svg"];
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

  // Counter logic with pause at 100 and slide-up animation
  useEffect(() => {
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
        // Pause at 100, then slide up
        setTimeout(() => {
          numberEl.style.transition = "transform 0.6s ease-in-out";
          numberEl.style.transform = "translateY(-100%)";

          setTimeout(() => {
            setShow(false);
            onFinish();
            // Removed videoRef play, since video is handled elsewhere
          }, 600);
        }, 200);
      }
    };

    requestAnimationFrame(step);
  }, [visualDuration, onFinish]);

  if (!show) return null;

  return (
    <>
      <Head>
        {posterSrc && <link rel="preload" as="image" href={posterSrc} />}
        {videoSources.map((v) => (
          <link key={v.src} rel="preload" as="video" href={v.src} />
        ))}
        <link rel="preload" as="image" href="/WEB.svg" />
        <link rel="preload" as="image" href="/DEVELOPER.svg" />
      </Head>

      <div className="fixed inset-0 z-[9999] bg-[var(--color-primary)] flex items-center justify-center pointer-events-none">
        <div className="overflow-hidden h-[24px] w-[40px] flex justify-center items-center">
          <div
            ref={numberRef}
            className="text-[18px] font-bold text-[var(--color-dark)]"
          >
            0
          </div>
        </div>
      </div>
    </>
  );
}
