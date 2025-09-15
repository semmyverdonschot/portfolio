"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const numberRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;

    const timer = setInterval(() => {
      current++;
      setCount(current);
      if (current >= 100) clearInterval(timer);
    }, 15);

    const preloadResources = async () => {
      const images = Array.from(document.images);
      const imagePromises = images.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) resolve();
            else img.onload = img.onerror = () => resolve();
          })
      );

      const stylesheets = Array.from(document.querySelectorAll("link[rel=stylesheet]")) as HTMLLinkElement[];
      const stylePromises = stylesheets.map(
        (link) =>
          new Promise<void>((resolve) => {
            if (link.sheet) resolve();
            else link.onload = link.onerror = () => resolve();
          })
      );

      await Promise.all([...imagePromises, ...stylePromises]);

      setLoaded(true);
    };

    preloadResources();

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (count >= 100 && loaded && numberRef.current && containerRef.current) {
      setTimeout(() => {
        gsap.to(numberRef.current, { yPercent: -100, duration: 0.6, ease: "power3.inOut" });
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          delay: 0.2,
          ease: "power4.inOut",
          onComplete: onFinish,
        });
      }, 1000);
    }
  }, [count, loaded, onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--color-primary)] overflow-hidden"
    >
      <div className="overflow-hidden h-[20px]">
        <div ref={numberRef} className="text-[16px] font-bold text-[var(--color-dark)]">
          {count}
        </div>
      </div>
    </div>
  );
}
