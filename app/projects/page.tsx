"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideoPage() {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    if (isMobile) {
      gsap.set(video, {
        position: "relative",
        width: "100%",
        height: 200,
        borderRadius: "16px",
        top: 0,
        left: 0,
      });
    } else {
      const padding = 32; // px: matches px-8 (md)
      gsap.set(video, {
        position: "fixed",
        top: "100px",
        left: "50%",
        xPercent: -50,
        width: 320,
        height: 200,
        borderRadius: "16px",
        zIndex: 50,
      });

      gsap.to(video, {
        scrollTrigger: {
          trigger: video,
          start: "top top+=100",
          end: "+=1800",
          scrub: 1.8,
        },
        width: `calc(100vw - ${padding * 2}px)`, // respect container padding
        height: "90vh",
        top: "100px",
        xPercent: -50,
        borderRadius: "16px",
        ease: "power1.out",
      });
    }
  }, [isMobile]);

  return (
    <div className="px-4 md:px-8">
      <div className="relative min-h-[450vh] bg-gray-100">
        {/* Top spacer */}
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Scroll to see the video grow
          </h1>
        </div>

        {/* Video Section */}
        <div className="relative w-full h-[60vh] flex justify-center">
          <div
            ref={videoRef}
            className="overflow-hidden shadow-lg rounded-[16px]"
          >
            <video
              src="/hero-video-720.webm"
              autoPlay
              muted
              loop
              className="w-full h-full object-cover rounded-[16px]"
            />
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-screen flex items-center justify-center">
          <p className="text-xl text-gray-700">Video reached its final size!</p>
        </div>
      </div>
    </div>
  );
}
