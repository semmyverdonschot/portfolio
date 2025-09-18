"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function Page() {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const targetX = useRef(0);
  const currentX = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!videoRef.current) return;
      const rect = videoRef.current.parentElement!.getBoundingClientRect();
      const halfVideoWidth = videoRef.current.offsetWidth / 2;

      const maxX = rect.width / 2 - halfVideoWidth;
      const minX = -maxX;

      let x = e.clientX - rect.left - rect.width / 2;
      x = Math.max(minX, Math.min(maxX, x));

      targetX.current = x;
    };

    const animate = () => {
      currentX.current += (targetX.current - currentX.current) * 0.4;
      if (videoRef.current) {
        videoRef.current.style.transform = `translateX(${currentX.current}px)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-primary)] flex flex-col justify-start relative overflow-hidden">
      {/* Top spacer slightly smaller to move everything up */}
      <div className="h-32 md:h-36 lg:h-40 w-full"></div>

      {/* Video Section */}
      <div className="relative w-full flex justify-center">
        <div
          ref={videoRef}
          className="pointer-events-none transition-transform duration-150 ease-out"
        >
          <video
            src="/1.mp4"
            autoPlay
            muted={isMuted}
            loop
            className="w-96 md:w-[40vw] lg:w-[600px] rounded-2xl object-cover cursor-pointer pointer-events-auto"
            onClick={() => setIsMuted(!isMuted)}
          />
        </div>
      </div>

      {/* Text below video with flex positioning */}
      <div className="flex w-full mt-2 mb-2 text-xl md:text-2xl lg:text-3xl font-semibold">
        <span className="flex-1 text-left">A</span>
        <span className="flex-1 text-center">VERY</span>
        <span className="flex-1 text-right">GOOD</span>
      </div>

      {/* Bottom row with WEB + DEVELOPER, slightly closer to text */}
      <div className="w-full flex h-[26vw] md:h-[20vw] lg:h-[16vw] items-end">
        <div className="flex justify-start h-full">
          <Image
            src="/WEB.svg"
            alt="WEB"
            width={1000}
            height={400}
            className="h-full w-auto object-contain"
            draggable={false}
            priority
          />
        </div>
        <div className="w-28 md:w-32 lg:w-36"></div>
        <div className="flex justify-end h-full">
          <Image
            src="/DEVELOPER.svg"
            alt="DEVELOPER"
            width={1000}
            height={400}
            className="h-full w-auto object-fill"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
