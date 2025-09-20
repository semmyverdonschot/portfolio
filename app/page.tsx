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
  const [desktopVideoVisible, setDesktopVideoVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const targetX = useRef(0);
  const currentX = useRef(0);
  const parentRectRef = useRef<DOMRect | null>(null);
  const halfVideoWidthRef = useRef<number>(0);

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

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const v = videoElRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let rafId: number | null = null;

    const recalcSizes = () => {
      if (videoWrapperRef.current?.parentElement) {
        parentRectRef.current =
          videoWrapperRef.current.parentElement.getBoundingClientRect();
        halfVideoWidthRef.current = videoWrapperRef.current.offsetWidth / 2;
      }
    };
    recalcSizes();
    window.addEventListener("resize", recalcSizes);

    const handleMouseMove = (e: MouseEvent) => {
      if (!parentRectRef.current) return;
      const maxX = parentRectRef.current.width / 2 - halfVideoWidthRef.current;
      const minX = -maxX;
      targetX.current = Math.max(
        minX,
        Math.min(
          maxX,
          e.clientX -
            parentRectRef.current.left -
            parentRectRef.current.width / 2,
        ),
      );
    };

    const animate = () => {
      currentX.current += (targetX.current - currentX.current) * 0.06;
      if (videoWrapperRef.current)
        videoWrapperRef.current.style.transform = `translateX(${currentX.current}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", recalcSizes);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) setDesktopVideoVisible(true);
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
    () => [videoRef] as React.RefObject<HTMLElement>[],
    [],
  );

  useSlideTogether(animatedUpRefs, "up", 1.5);
  useSlideTogether(animatedDownRefs, "down", 0.1);

  return (
    <>
      <Head>
        {/* Preconnect to origin */}
        <link
          rel="preconnect"
          href="https://semmyverdonschot.com"
          crossOrigin=""
        />

        {/* Preload poster + video assets */}
        <link rel="preload" as="image" href="/placeholder.webp" />
        <link
          rel="preload"
          as="video"
          href="/hero-video-480.webm"
          type="video/webm"
          media="(max-width:767px)"
        />
        {desktopVideoVisible && (
          <link
            rel="preload"
            as="video"
            href="/hero-video-720.webm"
            type="video/webm"
            media="(min-width:768px)"
          />
        )}
      </Head>

      <div className="min-h-screen bg-[var(--color-primary)] flex flex-col justify-start relative overflow-hidden">
        <div className="h-36 md:h-40 lg:h-44 w-full" />

        {/* Mobile heading */}
        {isMobile && (
          <div
            className={`overflow-hidden w-full mb-2 transition-opacity duration-300 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex w-full text-base font-medium text-[var(--color-dark)] justify-center">
              <span
                ref={mobileARef}
                className="flex-1 text-left translate-y-full"
              >
                A
              </span>
              <span
                ref={mobileVeryRef}
                className="flex-1 text-center translate-y-full"
              >
                VERY
              </span>
              <span
                ref={mobileSecureRef}
                className="flex-1 text-right translate-y-full"
              >
                SECURE
              </span>
            </div>
          </div>
        )}

        {/* Video */}
        <div
          className={`relative w-full flex justify-center overflow-hidden transition-opacity duration-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            ref={videoWrapperRef}
            className="relative"
            style={{
              aspectRatio: "16/9",
              width: isMobile ? "100%" : "40vw",
              maxWidth: isMobile ? "100%" : "600px",
            }}
          >
            <div
              ref={videoRef}
              className="translate-y-[-100%] transition-transform duration-1000 ease-out"
            >
              <video
                ref={videoElRef}
                poster="/placeholder.webp"
                autoPlay
                playsInline
                preload="auto"
                muted
                loop
                className="w-full h-full rounded-2xl object-cover cursor-pointer pointer-events-auto absolute top-0 left-0"
                onClick={() => {
                  if (!videoElRef.current) return;
                  videoElRef.current.muted = !videoElRef.current.muted;
                  setIsMuted(videoElRef.current.muted);
                }}
              >
                <source
                  src={
                    isMobile ? "/hero-video-480.webm" : "/hero-video-720.webm"
                  }
                  type="video/webm"
                />
              </video>

              {/* Mobile mute toggle */}
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
                    {isMuted ? <span>🔇</span> : <span>🔊</span>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop heading */}
        {!isMobile && (
          <div
            className={`overflow-hidden w-full mt-4 mb-6 transition-opacity duration-300 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex w-full text-[16px] font-normal justify-center">
              <span
                ref={desktopARef}
                className="flex-1 text-left translate-y-full"
              >
                A
              </span>
              <span
                ref={desktopVeryRef}
                className="flex-1 text-center translate-y-full"
              >
                VERY
              </span>
              <span
                ref={desktopSecureRef}
                className="flex-1 text-right translate-y-full"
              >
                SECURE
              </span>
            </div>
          </div>
        )}

        {/* WEB / DEVELOPER */}
        <div
          className={`w-full flex h-[20vw] md:h-[14vw] lg:h-[10vw] items-end mt-6 transition-opacity duration-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            ref={webWrapperRef}
            className="overflow-hidden h-full flex justify-start"
          >
            <img
              src="/WEB.svg"
              alt="WEB"
              width={1000}
              height={400}
              draggable={false}
              className="h-full w-auto max-w-[100%] object-contain translate-y-full"
            />
          </div>

          <div className="w-12 md:w-12 lg:w-14" />

          <div
            ref={devWrapperRef}
            className="overflow-hidden h-full flex justify-end"
          >
            <img
              src="/DEVELOPER.svg"
              alt="DEVELOPER"
              width={1000}
              height={400}
              draggable={false}
              className="h-full w-auto max-w-[100%] object-contain translate-y-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
