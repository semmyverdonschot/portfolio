"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideoPage() {
  const videoRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!videoRef.current || !wrapperRef.current) return;

    const video = videoRef.current;
    const wrapper = wrapperRef.current;

    ScrollTrigger.getAll().forEach((t) => t.kill());

    if (isMobile) {
      gsap.set(video, { scale: 1 });
    } else {
      // Make wrapper tall enough for scroll
      wrapper.style.height = `${window.innerHeight * 2.5}px`;

      gsap.set(video, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 1,
        transformOrigin: "center center",
      });

      gsap.to(video, {
        scale: 2, // video grows 2x
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=500", // growth scroll distance
          scrub: true,
          pin: true, // pin wrapper, not video
          pinSpacing: true, // allows normal scroll after growth
        },
        ease: "power1.out",
      });
    }
  }, [isMobile]);

  return (
    <div className="px-4 md:px-8">
      {/* Top section */}
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">
          Scroll to see the video grow
        </h1>
      </div>

      {/* Video wrapper */}
      <div
        ref={wrapperRef}
        className="relative w-full flex justify-center"
      >
        <div
          ref={videoRef}
          className="overflow-hidden shadow-lg rounded-[16px] w-[320px] h-[200px]"
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

      {/* Bottom sections */}
      <div className="h-screen flex items-center justify-center bg-white">
        <p className="text-xl text-gray-700">
          Video finished growing! Scroll continues normally.
        </p>
      </div>

      <div className="h-screen flex items-center justify-center bg-gray-200">
        <p className="text-xl text-gray-700">Keep scrolling...</p>
      </div>
    </div>
  );
}
