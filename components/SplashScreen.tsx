"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";

interface SplashScreenProps {
  onFinish: () => void;
  visualDuration?: number;
  pause?: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  videoSources?: { src: string; media?: string }[];
  posterSrc: string;
}

export default function SplashScreen({
  onFinish,
  visualDuration = 1000,
  pause = 500,
  videoRef,
  videoSources = [],
  posterSrc,
}: SplashScreenProps) {
  const numberRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const assets: string[] = [posterSrc, "/WEB.svg", "/DEVELOPER.svg"];
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
            numberEl.style.transition =
              "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";
            numberEl.style.transform = "translateY(-100%)";
            numberEl.style.opacity = "0";
            setTimeout(() => {
              setShow(false);
              onFinish();
              if (videoRef.current) videoRef.current.play().catch(() => {});
            }, 300);
          }, pause);
        }
      };
      requestAnimationFrame(step);
    };

    const waitForVideo = () => {
      if (videoRef?.current) {
        if (videoRef.current.readyState >= 3) {
          startCounter();
        } else {
          const timeout = setTimeout(startCounter, 200);
          videoRef.current.addEventListener(
            "canplaythrough",
            () => {
              clearTimeout(timeout);
              startCounter();
            },
            { once: true },
          );
        }
      } else {
        startCounter();
      }
    };

    waitForVideo();
  }, [visualDuration, pause, onFinish, videoRef]);

  if (!show) return null;

  return (
    <>
      {/* Preload assets for LCP */}
      <Head>
        {posterSrc && <link rel="preload" as="image" href={posterSrc} />}
        {videoSources.map((v) => (
          <link key={v.src} rel="preload" as="video" href={v.src} />
        ))}
        <link rel="preload" as="image" href="/WEB.svg" />
        <link rel="preload" as="image" href="/DEVELOPER.svg" />
      </Head>

      <div
        aria-hidden="true"
        className="fixed inset-0 z-[9999] bg-[var(--color-primary)]flex items-center justify-center overflow-hidden pointer-events-none"
      >
        {/* Counter */}
        <div className="overflow-hidden h-[24px] w-[40px] flex justify-center items-center">
          <div ref={numberRef} className="text-[18px] font-bold text-black">
            0
          </div>
        </div>
      </div>
    </>
  );
}
