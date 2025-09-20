"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { useSlideTogether } from "@/hooks/useStaggerSlide";
/* eslint-disable @next/next/no-img-element */

export default function Page() {
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [desktopVideoVisible, setDesktopVideoVisible] = useState(false);
  const targetX = useRef(0);
  const currentX = useRef(0);

  const webWrapperRef = useRef<HTMLDivElement | null>(null);
  const devWrapperRef = useRef<HTMLDivElement | null>(null);
  const webImgRef = useRef<HTMLImageElement | null>(null);
  const devImgRef = useRef<HTMLImageElement | null>(null);

  const desktopARef = useRef<HTMLSpanElement | null>(null);
  const desktopVeryRef = useRef<HTMLSpanElement | null>(null);
  const desktopSecureRef = useRef<HTMLSpanElement | null>(null);

  const mobileARef = useRef<HTMLSpanElement | null>(null);
  const mobileVeryRef = useRef<HTMLSpanElement | null>(null);
  const mobileSecureRef = useRef<HTMLSpanElement | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Autoplay muted video
  useEffect(() => {
    const v = videoElRef.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }
  }, []);

  // Desktop parallax
  useEffect(() => {
    if (isMobile) return;
    const wrapper = videoWrapperRef.current;
    if (!wrapper) return;

    let parentWidth = wrapper.parentElement?.offsetWidth || 0;
    let halfWidth = wrapper.offsetWidth / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const maxX = parentWidth / 2 - halfWidth;
      const minX = -maxX;
      targetX.current = Math.max(minX, Math.min(maxX, e.clientX - (wrapper.parentElement?.getBoundingClientRect().left || 0) - parentWidth / 2));
    };

    const animate = () => {
      currentX.current += (targetX.current - currentX.current) * 0.08;
      wrapper.style.transform = `translateX(${currentX.current}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    const handleResize = () => {
      parentWidth = wrapper.parentElement?.offsetWidth || 0;
      halfWidth = wrapper.offsetWidth / 2;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  // Reset images for slide animation
  useEffect(() => {
    const resetImages = () => {
      if (webWrapperRef.current) {
        const img = webWrapperRef.current.querySelector("img");
        if (img) webImgRef.current = img;
        if (img) img.style.transform = "translateY(100%)";
        if (isMobile) webWrapperRef.current.style.height = `${webWrapperRef.current.offsetHeight}px`;
      }
      if (devWrapperRef.current) {
        const img = devWrapperRef.current.querySelector("img");
        if (img) devImgRef.current = img;
        if (img) img.style.transform = "translateY(100%)";
        if (isMobile) devWrapperRef.current.style.height = `${devWrapperRef.current.offsetHeight}px`;
      }
    };
    resetImages();
    const timeoutId = setTimeout(resetImages, 50);
    return () => clearTimeout(timeoutId);
  }, [isMobile]);

  // Animated refs for useSlideTogether
  const animatedUpRefs = useMemo(
    () => [
      webImgRef,
      devImgRef,
      ...(isMobile
        ? [mobileARef, mobileVeryRef, mobileSecureRef]
        : [desktopARef, desktopVeryRef, desktopSecureRef]),
    ] as React.RefObject<HTMLElement>[],
    [isMobile]
  );

  const animatedDownRefs = useMemo(() => [videoRef] as React.RefObject<HTMLElement>[], []);

  useSlideTogether(animatedUpRefs, "up", 0.8);
  useSlideTogether(animatedDownRefs, "down", 0.2);

  useEffect(() => {
    if (!isMobile) setDesktopVideoVisible(true);
  }, [isMobile]);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/placeholder.webp" />
        <link rel="preload" as="video" href="/hero-video-480.webm" type="video/webm" media="(max-width:767px)" />
        <link rel="preload" as="video" href="/hero-video-720.webm" type="video/webm" media="(min-width:768px)" />
        {desktopVideoVisible && (
          <link rel="preload" as="video" href="/hero-video-1080.webm" type="video/webm" media="(min-width:768px)" />
        )}
      </Head>

      <div className="min-h-screen bg-[var(--color-primary)] flex flex-col justify-start relative overflow-hidden">
        <div className="h-36 md:h-40 lg:h-44 w-full" />

        {/* Mobile text */}
        {isMobile && (
          <div className={`overflow-hidden w-full mb-2 transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <div className="flex w-full text-base font-medium text-[var(--color-dark)] justify-center">
              <span ref={mobileARef} className="flex-1 text-left translate-y-full">A</span>
              <span ref={mobileVeryRef} className="flex-1 text-center translate-y-full">VERY</span>
              <span ref={mobileSecureRef} className="flex-1 text-right translate-y-full">SECURE</span>
            </div>
          </div>
        )}

        {/* Video section */}
        <div className={`relative w-full flex justify-center overflow-hidden transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <div ref={videoWrapperRef} className="relative" style={{ aspectRatio: "16/9", width: isMobile ? "100%" : "40vw", maxWidth: isMobile ? "100%" : "600px" }}>
            <div ref={videoRef} className="translate-y-[-100%] transition-transform duration-1000 ease-out">
              {!videoLoaded && <img src="/placeholder.webp" alt="Hero placeholder" className="w-full h-full rounded-2xl object-cover" />}
              <video
                ref={videoElRef}
                poster="/placeholder.webp"
                autoPlay
                playsInline
                preload="auto"
                muted
                loop
                className="w-full h-full rounded-2xl object-cover cursor-pointer pointer-events-auto"
                onLoadedData={() => setVideoLoaded(true)}
                onClick={() => {
                  if (!videoElRef.current) return;
                  videoElRef.current.muted = !videoElRef.current.muted;
                  setIsMuted(videoElRef.current.muted);
                }}
              >
                <source src={isMobile ? "/hero-video-480.webm" : "/hero-video-720.webm"} type="video/webm" />
              </video>

              {/* Mobile mute/unmute */}
              {isMobile && (
                <div className="absolute bottom-2 right-2 pointer-events-auto">
                  <div
                    onClick={() => {
                      if (!videoElRef.current) return;
                      videoElRef.current.muted = !videoElRef.current.muted;
                      setIsMuted(videoElRef.current.muted);
                    }}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary)]/25 backdrop-blur-md cursor-pointer"
                  >
                    {isMuted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[var(--color-dark)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
                        <line x1="15" y1="9" x2="21" y2="15" stroke="currentColor" strokeWidth={2} />
                        <line x1="21" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth={2} />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[var(--color-dark)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.54 8.46a5 5 0 010 7.08" />
                      </svg>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop text */}
        {!isMobile && (
          <div className={`overflow-hidden w-full mt-4 mb-6 transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <div className="flex w-full text-[16px] font-normal justify-center">
              <span ref={desktopARef} className="flex-1 text-left translate-y-full">A</span>
              <span ref={desktopVeryRef} className="flex-1 text-center translate-y-full">VERY</span>
              <span ref={desktopSecureRef} className="flex-1 text-right translate-y-full">SECURE</span>
            </div>
          </div>
        )}

        {/* Web / Developer images */}
        <div className={`w-full flex h-[20vw] md:h-[14vw] lg:h-[10vw] items-end mt-6 transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <div ref={webWrapperRef} className="overflow-hidden h-full flex justify-start">
            <img src="/WEB.svg" alt="WEB" className="h-full w-auto max-w-[100%] object-contain translate-y-full" />
          </div>
          <div className="w-12 md:w-12 lg:w-14" />
          <div ref={devWrapperRef} className="overflow-hidden h-full flex justify-end">
            <img src="/DEVELOPER.svg" alt="DEVELOPER" className="h-full w-auto max-w-[100%] object-contain translate-y-full" />
          </div>
        </div>
      </div>
    </>
  );
}
