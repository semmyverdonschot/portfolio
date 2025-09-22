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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!videoElRef.current) return;
    videoElRef.current.muted = true;
    videoElRef.current.play().catch(() => {});
  }, []);

  const animatedUpRefs = useMemo(
    () =>
      [
        webImgRef,
        devImgRef,
        ...(isMobile
          ? [mobileARef, mobileVeryRef, mobileSecureRef]
          : [desktopARef, desktopVeryRef, desktopSecureRef]),
      ] as unknown as React.RefObject<HTMLElement>[],
    [isMobile]
  );

  const animatedDownRefs = useMemo(
    () => [videoRef] as React.RefObject<HTMLElement>[],
    []
  );

  useSlideTogether(animatedUpRefs, "up", 0.8);
  useSlideTogether(animatedDownRefs, "down", 0.8);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/placeholder.webp" />
        <link
          rel="preload"
          as="video"
          href="/hero-video-480.webm"
          type="video/mp4"
          media="(max-width:767px)"
        />
        <link
          rel="preload"
          as="video"
          href="/hero-video-720.webm"
          type="video/mp4"
          media="(min-width:768px)"
        />
      </Head>

      <div className="bg-[var(--color-primary)] flex flex-col relative overflow-visible px-4 md:px-8 lg:px-16">
        <div className="h-36 md:h-40 lg:h-44 w-full" />

        {/* Mobile "A VERY SECURE" */}
        {isMobile && (
          <div className={`overflow-hidden w-full mb-2 transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <div className="flex w-full text-base font-medium text-[var(--color-dark)] justify-center">
              <span ref={mobileARef} className="flex-1 text-left translate-y-full">A</span>
              <span ref={mobileVeryRef} className="flex-1 text-center translate-y-full">VERY</span>
              <span ref={mobileSecureRef} className="flex-1 text-right translate-y-full">SECURE</span>
            </div>
          </div>
        )}

        {/* WEB / DEVELOPER images */}
        <div className="w-full flex h-[20vw] md:h-[14vw] lg:h-[10vw] items-end mt-6 relative z-10">
          <div ref={webWrapperRef} className="overflow-hidden h-full flex justify-start">
            <img src="/WEB.svg" alt="WEB" className="h-full w-auto max-w-[100%] object-contain translate-y-full" />
          </div>
          <div className="w-12 md:w-12 lg:w-14" />
          <div ref={devWrapperRef} className="overflow-hidden h-full flex justify-end">
            <img src="/DEVELOPER.svg" alt="DEVELOPER" className="h-full w-auto max-w-[100%] object-contain translate-y-full" />
          </div>
        </div>

        {/* Video Section */}
        <div ref={videoWrapperRef} className="relative w-full h-screen mt-12 flex justify-center">
          <div ref={videoRef} className="sticky top-0 w-[40vw] max-w-[600px] transform origin-top">
            <video
              ref={videoElRef}
              poster="/placeholder.webp"
              autoPlay
              playsInline
              preload="auto"
              muted
              loop
              className="w-full h-full rounded-2xl object-cover cursor-pointer pointer-events-auto"
              onClick={() => {
                if (!videoElRef.current) return;
                videoElRef.current.muted = !videoElRef.current.muted;
                setIsMuted(videoElRef.current.muted);
              }}
            >
              <source src={isMobile ? "/hero-video-480.webm" : "/hero-video-720.webm"} type="video/webm" />
            </video>
          </div>
        </div>

        {/* Scrollable Sections */}
        <section className="h-screen flex items-center justify-center text-3xl text-white">
          Section 1
        </section>
        <section className="h-screen flex items-center justify-center text-3xl text-white bg-gray-800">
          Section 2
        </section>
        <section className="h-screen flex items-center justify-center text-3xl text-white bg-gray-700">
          Section 3
        </section>
        <section className="h-screen flex items-center justify-center text-3xl text-white bg-gray-600">
          Section 4
        </section>
      </div>
    </>
  );
}
