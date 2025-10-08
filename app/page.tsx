"use client";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { useSlideTogether } from "@/components/hooks/useStaggerSlide";
import HeroVideo from "@/components/HeroVideo";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Techstack from "@/components/sections/Techstack";
import Footer from "@/components/sections/Footer";

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);
  const [, setMounted] = useState(false);
  const [videoScale, setVideoScale] = useState(1);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [dynamicMaxScale, setDynamicMaxScale] = useState(2.715);
  const webWrapperRef = useRef<HTMLDivElement | null>(null);
  const devWrapperRef = useRef<HTMLDivElement | null>(null);
  const webImgRef = useRef<HTMLImageElement | null>(null);
  const devImgRef = useRef<HTMLImageElement | null>(null);

  const scrollLeftRef = useRef<HTMLDivElement | null>(null);
  const scrollRightRef = useRef<HTMLDivElement | null>(null);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  useEffect(() => {
    const calculateMaxScale = () => {
      const viewportWidth = window.innerWidth;
      const videoWidth = Math.min(600, viewportWidth * 0.4);
      const maxScale = (viewportWidth - 64) / videoWidth;
      setDynamicMaxScale(Math.max(1, Math.min(maxScale, 3.5)));
    };

    calculateMaxScale();
    window.addEventListener("resize", calculateMaxScale);
    return () => window.removeEventListener("resize", calculateMaxScale);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const startScale = 0.01;
          const endScale = 700;

          if (scrollY >= startScale && scrollY <= endScale) {
            const progress = (scrollY - startScale) / (endScale - startScale);
            const scale = 1 + progress * (dynamicMaxScale - 1);
            setVideoScale(scale);
            setIsVideoExpanded(progress > 0.01);
          } else if (scrollY > endScale) {
            setVideoScale(dynamicMaxScale);
            setIsVideoExpanded(true);
          } else {
            setVideoScale(1);
            setIsVideoExpanded(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, dynamicMaxScale]);

  useEffect(() => {
    const resetImages = () => {
      if (webWrapperRef.current) {
        const img = webWrapperRef.current.querySelector("img");
        if (img) {
          webImgRef.current = img;
          img.style.transform = "translateY(100%)";
        }
        if (isMobile)
          webWrapperRef.current.style.height = `${webWrapperRef.current.offsetHeight}px`;
      }
      if (devWrapperRef.current) {
        const img = devWrapperRef.current.querySelector("img");
        if (img) {
          devImgRef.current = img;
          img.style.transform = "translateY(100%)";
        }
        if (isMobile)
          devWrapperRef.current.style.height = `${devWrapperRef.current.offsetHeight}px`;
      }

      if (scrollLeftRef.current) {
        scrollLeftRef.current.style.transform = "translateY(100%)";
      }
      if (scrollRightRef.current) {
        scrollRightRef.current.style.transform = "translateY(100%)";
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
        scrollLeftRef,
        scrollRightRef,
      ] as unknown as React.RefObject<HTMLElement>[],
    [],
  );

  useSlideTogether(animatedUpRefs, "up", 0.8);

  return (
    <div className="min-h-screen bg-[var(--color-primary)] flex flex-col justify-start relative overflow-hidden">
      <h1 className="sr-only">Semmy Verdonschot | Web Developer</h1>

      <section className="relative" aria-label="Hero introduction">
        <div className="h-28 md:h-36 lg:h-44 w-full" />

        {/* Always load HeroVideo immediately for SEO */}
        <HeroVideo
          videoScale={isMobile ? 1 : videoScale}
          isVideoExpanded={isMobile ? false : isVideoExpanded}
        />

        {/* WEB / DEVELOPER images */}
        {isMobile ? (
          <div className="flex flex-col items-center mt-56 space-y-3">
            <div className="overflow-hidden w-full flex justify-center">
              <Image
                ref={webImgRef}
                src="/svg/INTERACTIVE.svg"
                alt="Interactive"
                width={800}
                height={267}
                className="w-[90vw] max-w-full object-contain"
                draggable={false}
                priority
                loading="eager"
              />
            </div>

            <div className="overflow-hidden w-full flex justify-center">
              <Image
                ref={devImgRef}
                src="/svg/DEVELOPER.svg"
                alt="Web Developer"
                width={800}
                height={267}
                className="w-[90vw] max-w-full object-contain"
                draggable={false}
                priority
                loading="eager"
              />
            </div>
          </div>
        ) : (
          <div className="w-full flex h-[20vw] md:h-[14vw] lg:h-[10vw] items-end">
            <div
              ref={webWrapperRef}
              className="overflow-hidden h-full flex justify-start"
            >
              <Image
                src="/svg/WEB.svg"
                alt="Web Solutions"
                width={1000}
                height={400}
                draggable={false}
                className="h-full w-auto max-w-[100%] object-contain"
                priority
              />
            </div>

            <div className="w-11 md:w-12 lg:w-12" />

            <div
              ref={devWrapperRef}
              className="overflow-hidden h-full flex justify-end"
            >
              <Image
                src="/svg/DEVELOPER.svg"
                alt="Developer"
                width={1000}
                height={400}
                draggable={false}
                className="h-full w-auto max-w-[100%] object-contain"
                priority
              />
            </div>
          </div>
        )}

        {/* Scroll indicators */}
        <div
          className={`w-full flex justify-between items-center ${isMobile ? "mt-8" : "mt-10"}`}
        >
          <div className="overflow-hidden">
            <div
              ref={scrollLeftRef}
              className={`flex items-center space-x-2 text-[var(--color-dark)] font-normal ${isMobile ? "text-base" : "text-base hover:text-[var(--color-dark)] transition-colors duration-300"}`}
            >
              <span className={isMobile ? "text-xl" : "text-2xl"}>↓</span>
              <span>Scroll for</span>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              ref={scrollRightRef}
              className={`flex items-center space-x-2 text-[var(--color-dark)] font-normal ${isMobile ? "text-base" : "text-base hover:text-[var(--color-dark)] transition-colors duration-300"}`}
            >
              <span>the good stuff</span>
              <span className={isMobile ? "text-xl" : "text-2xl"}>↓</span>
            </div>
          </div>
        </div>

        {/**/}
        {!isMobile && <div className="h-[100vh]" />}
      </section>
      <About />
      <Work />
      <Techstack />
      <Footer />
    </div>
  );
}
