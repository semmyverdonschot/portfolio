"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import { useSlideTogether } from "@/hooks/useStaggerSlide";
import HeroVideo from "@/components/HeroVideo";

export default function Page() {
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
    const resetImages = () => {
      if (webWrapperRef.current) {
        const img = webWrapperRef.current.querySelector("img");
        if (img) webImgRef.current = img;
        if (isMobile)
          webWrapperRef.current.style.height = `${webWrapperRef.current.offsetHeight}px`;
      }
      if (devWrapperRef.current) {
        const img = devWrapperRef.current.querySelector("img");
        if (img) devImgRef.current = img;
        if (isMobile)
          devWrapperRef.current.style.height = `${devWrapperRef.current.offsetHeight}px`;
      }
    };
    resetImages();
    const timeoutId = setTimeout(resetImages, 50);
    return () => clearTimeout(timeoutId);
  }, [isMobile]);

  const animatedUpRefs = useMemo(
    () =>
      [
        webImgRef,
        devImgRef,
        ...(isMobile
          ? [mobileARef, mobileVeryRef, mobileSecureRef]
          : [desktopARef, desktopVeryRef, desktopSecureRef]),
      ] as unknown as React.RefObject<HTMLElement>[],
    [isMobile],
  );

  const animatedDownRefs = useMemo(
    () => [] as React.RefObject<HTMLElement>[],
    [],
  );

  useSlideTogether(animatedUpRefs, "up", 0.8);
  useSlideTogether(animatedDownRefs, "down", 0.8);

  const [videoScale, setVideoScale] = useState(1);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only apply scroll effect on desktop
      if (isMobile) {
        setVideoScale(1);
        setIsVideoExpanded(false);
        return;
      }

      const scrollY = window.scrollY;

      // Start scaling much earlier
      const startScale = 0.01; // Much earlier start
      const endScale = 700;

      if (scrollY >= startScale && scrollY <= endScale) {
        const progress = (scrollY - startScale) / (endScale - startScale);
        const scale = 1 + progress * 2.5; // Scale from 1 to 3.5
        setVideoScale(scale);
        setIsVideoExpanded(progress > 0.01); // Very early expansion
      } else if (scrollY > endScale) {
        setVideoScale(3.2);
        setIsVideoExpanded(true);
      } else {
        setVideoScale(1);
        setIsVideoExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/placeholder.webp" />
        <link
          rel="preload"
          as="video"
          href="/hero-video-480.webm"
          type="video/webm"
          media="(max-width:767px)"
        />
      </Head>

      <div className="min-h-screen bg-[var(--color-primary)] flex flex-col justify-start relative overflow-hidden">
        <div className="h-36 md:h-40 lg:h-44 w-full" />

        {/* Hero video */}
        <HeroVideo
          videoScale={isMobile ? 1 : videoScale}
          isVideoExpanded={isMobile ? false : isVideoExpanded}
        />

        {/* WEB / DEVELOPER images */}
        {isMobile ? (
          <div className="flex flex-col items-center mt-20 mb-16 space-y-4">
            {/* WEB */}
            <div className="overflow-hidden w-full flex justify-center">
              <Image
                ref={webImgRef}
                src="/INTERACTIVE.svg"
                alt="WEB"
                width={1200}
                height={400}
                className="w-[95vw] max-w-full object-contain"
                draggable={false}
              />
            </div>

            {/* DEVELOPER */}
            <div className="overflow-hidden w-full flex justify-center">
              <Image
                ref={devImgRef}
                src="/DEVELOPER.svg"
                alt="DEVELOPER"
                width={1200}
                height={400}
                className="w-[95vw] max-w-full object-contain"
                draggable={false}
              />
            </div>
          </div>
        ) : (
          <div
            className={`w-full flex h-[20vw] md:h-[14vw] lg:h-[10vw] items-end transition-opacity duration-300 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              ref={webWrapperRef}
              className="overflow-hidden h-full flex justify-start"
            >
              <Image
                src="/WEB.svg"
                alt="WEB"
                width={1000}
                height={400}
                draggable={false}
                className="h-full w-auto max-w-[100%] object-contain translate-y-full"
              />
            </div>

            {/* spacer - increased widths for more separation */}
            <div className="w-11 md:w-14 lg:w-14" />

            <div
              ref={devWrapperRef}
              className="overflow-hidden h-full flex justify-end"
            >
              <Image
                src="/DEVELOPER.svg"
                alt="DEVELOPER"
                width={1000}
                height={400}
                draggable={false}
                className="h-full w-auto max-w-[100%] object-contain translate-y-full"
              />
            </div>
          </div>
        )}

        {/* Extra scroll space for video scaling effect - only on desktop */}
        {!isMobile && <div className="h-[100vh]" />}

        {/* Test section for normal scrolling */}
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Normal Scroll Section</h2>
            <p className="text-xl">This is a test section to verify normal scrolling works after the video scaling effect.</p>
          </div>
        </div>

        {/* Another test section */}
        <div className="min-h-screen bg-slate-700 text-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Another Section</h2>
            <p className="text-xl">Keep scrolling to test that everything works normally.</p>
          </div>
        </div>

      </div>
    </>
  );
}
