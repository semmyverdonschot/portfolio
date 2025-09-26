"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import { useSlideTogether } from "@/hooks/useStaggerSlide";
import HeroVideo from "@/components/HeroVideo";

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);

  // Image refs for animation
  const webWrapperRef = useRef<HTMLDivElement | null>(null);
  const devWrapperRef = useRef<HTMLDivElement | null>(null);
  const webImgRef = useRef<HTMLImageElement | null>(null);
  const devImgRef = useRef<HTMLImageElement | null>(null);

  const [mounted, setMounted] = useState(false);

  // Component initialization
  useEffect(() => setMounted(true), []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Image setup for animations
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

  // Animation setup
  const animatedUpRefs = useMemo(
    () => [webImgRef, devImgRef] as unknown as React.RefObject<HTMLElement>[],
    [],
  );

  useSlideTogether(animatedUpRefs, "up", 0.8);

  // Video scaling state
  const [videoScale, setVideoScale] = useState(1);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

  // Scroll-based video scaling (desktop only)
  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) {
        setVideoScale(1);
        setIsVideoExpanded(false);
        return;
      }

      const scrollY = window.scrollY;

      const startScale = 0.01;
      const endScale = 700;

      if (scrollY >= startScale && scrollY <= endScale) {
        const progress = (scrollY - startScale) / (endScale - startScale);
        const scale = 1 + progress * 1.715;
        setVideoScale(scale);
        setIsVideoExpanded(progress > 0.01);
      } else if (scrollY > endScale) {
        setVideoScale(2.715);
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
      {/* SEO and preloading */}
      <Head>
        <title>Interactive Web Developer - Secure Digital Solutions</title>
        <meta name="description" content="Professional web developer specializing in interactive, secure digital solutions. Modern web applications with cutting-edge technology and user-focused design." />
        <meta name="keywords" content="web developer, interactive design, secure applications, modern web development, digital solutions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Interactive Web Developer - Secure Digital Solutions" />
        <meta property="og:description" content="Professional web developer specializing in interactive, secure digital solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/placeholder.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Interactive Web Developer" />
        <meta name="twitter:description" content="Professional web developer specializing in interactive, secure digital solutions." />
        <meta name="twitter:image" content="/placeholder.webp" />
        <link rel="canonical" href="/" />
        <link rel="preload" as="image" href="/placeholder.webp" />
        <link rel="preload" as="image" href="/WEB.svg" />
        <link rel="preload" as="image" href="/DEVELOPER.svg" />
        <link rel="preload" as="image" href="/INTERACTIVE.svg" />
        <link rel="preload" as="video" href="/hero-video-720p.webm" type="video/webm" media="(min-width:768px)" />
        <link rel="preload" as="video" href="/hero-video-480p.webm" type="video/webm" media="(max-width:767px)" />
      </Head>

      <div className="min-h-screen bg-[var(--color-primary)] flex flex-col justify-start relative overflow-hidden">
        {/* Top spacing */}
        <div className="h-36 md:h-40 lg:h-44 w-full" />

        {/* Hero video section */}
        <HeroVideo
          videoScale={isMobile ? 1 : videoScale}
          isVideoExpanded={isMobile ? false : isVideoExpanded}
        />

        {/* WEB / DEVELOPER images */}
        {isMobile ? (
          // Mobile layout - stacked
          <div className="flex flex-col items-center mt-20 mb-16 space-y-4">
            <div className="overflow-hidden w-full flex justify-center">
              <Image
                ref={webImgRef}
                src="/INTERACTIVE.svg"
                alt="Interactive Web Solutions"
                width={1200}
                height={400}
                className="w-[95vw] max-w-full object-contain"
                draggable={false}
                priority
              />
            </div>

            <div className="overflow-hidden w-full flex justify-center">
              <Image
                ref={devImgRef}
                src="/DEVELOPER.svg"
                alt="Web Developer"
                width={1200}
                height={400}
                className="w-[95vw] max-w-full object-contain"
                draggable={false}
                priority
              />
            </div>
          </div>
        ) : (
          // Desktop layout - side by side
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
                alt="Web Solutions"
                width={1000}
                height={400}
                draggable={false}
                className="h-full w-auto max-w-[100%] object-contain translate-y-full"
                priority
              />
            </div>

            <div className="w-11 md:w-14 lg:w-14" />

            <div
              ref={devWrapperRef}
              className="overflow-hidden h-full flex justify-end"
            >
              <Image
                src="/DEVELOPER.svg"
                alt="Developer"
                width={1000}
                height={400}
                draggable={false}
                className="h-full w-auto max-w-[100%] object-contain translate-y-full"
                priority
              />
            </div>
          </div>
        )}

        {/* Extra scroll space for video scaling (desktop only) */}
        {!isMobile && <div className="h-[100vh]" />}

        {/* Content sections */}
        <section className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">een section</h1>
            <p className="text-xl max-w-2xl mx-auto">
              scroll test
            </p>
          </div>
        </section>

        <section className="min-h-screen bg-slate-700 text-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">nog een section</h2>
            <p className="text-xl max-w-2xl mx-auto">
              scroll test
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
