"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideoPage() {
  const videoRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!videoRef.current || !sectionRef.current) return;

    const video = videoRef.current;
    const section = sectionRef.current;

    ScrollTrigger.getAll().forEach((t) => t.kill());

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
      const padding = 32;
      const startWidth = 320;
      const startHeight = 200;
      const endWidth = window.innerWidth - padding * 2;
      const endHeight = window.innerHeight * 0.9;

      // Make the section tall enough to allow scroll
      section.style.height = `${window.innerHeight * 3}px`; // increase height for normal scroll

      gsap.set(video, {
        position: "fixed",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        width: startWidth,
        height: startHeight,
        borderRadius: "16px",
        zIndex: 50,
      });

      gsap.to(video, {
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=600", // scroll distance over which growth happens
          scrub: 1.5,
          pin: true,       // keep video fixed while growing
          pinSpacing: true // after growth, scroll continues normally
        },
        width: endWidth,
        height: endHeight,
        borderRadius: "16px",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
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
        <div
          ref={sectionRef}
          className="relative w-full flex justify-center"
        >
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

        {/* Bottom section */}
        <div className="h-screen flex items-center justify-center bg-white">
          <p className="text-xl text-gray-700">
            Now you can scroll normally! The video finished growing.
          </p>
        </div>

        <div className="h-screen flex items-center justify-center bg-gray-200">
          <p className="text-xl text-gray-700">
            Keep scrolling...
          </p>
        </div>
      </div>
    </div>
  );
}
