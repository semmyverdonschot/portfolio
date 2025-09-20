"use client";

import { useEffect, useRef, useState } from "react";

export default function TestPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Test Page</h1>

      <div className="w-full max-w-xl aspect-video rounded-xl overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          src="/hero-video-720.webm"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <p className="mt-6 text-gray-700">routing test</p>
    </div>
  );
}
