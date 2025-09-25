"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useSlideTogether } from "@/hooks/useStaggerSlide";

interface HeroVideoProps {
  videoScale?: number;
  isVideoExpanded?: boolean;
}

export default function HeroVideo({
  videoScale = 1,
  isVideoExpanded = false,
}: HeroVideoProps) {
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded] = useState(false);
  const targetX = useRef(0);
  const currentX = useRef(0);
  const parentRectRef = useRef<DOMRect | null>(null);
  const halfVideoWidthRef = useRef<number>(0);

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
      if (videoScale >= 3.3) return;
      
      if (!parentRectRef.current) return;

      const containerWidth = parentRectRef.current.width;
      const videoWidth = halfVideoWidthRef.current * 2;
      const actualScale = Math.min(videoScale, 2.25); // Cap at 90% instead of 100%
      const scaledVideoWidth = videoWidth * actualScale;
      
      let maxX, minX;
      if (isVideoExpanded && videoScale < 3.3) {
        const overflow = Math.max(0, (scaledVideoWidth - containerWidth) / 2);
        const movementRange = Math.min(40, overflow * 0.7); // Reduced range for better boundary control
        
        maxX = movementRange;
        minX = -movementRange;
      } else {
        // When not expanded, limit movement more strictly
        const maxMovement = Math.max(0, (containerWidth - scaledVideoWidth) / 2);
        const boundaryPadding = 20; // Add padding to prevent edge overflow
        maxX = Math.max(0, maxMovement - boundaryPadding);
        minX = Math.min(0, -maxMovement + boundaryPadding);
      }

      const mouseRelativeX =
        e.clientX - parentRectRef.current.left - parentRectRef.current.width / 2;

      targetX.current = Math.max(minX, Math.min(maxX, mouseRelativeX * 0.6)); // Reduced sensitivity
    };

    const animate = () => {
      if (isVideoExpanded && videoScale > 1.1) {
        const centeringFactor = Math.min(1, (videoScale - 1.1) / 0.5);
        targetX.current = targetX.current * (1 - centeringFactor);
      }

      const containerWidth = parentRectRef.current?.width || 0;
      const videoWidth = halfVideoWidthRef.current * 2;
      const actualScale = Math.min(videoScale, 2.25); // Cap at 90% instead of 100%
      const scaledVideoWidth = videoWidth * actualScale;
      
      let maxX, minX;
      if (isVideoExpanded && videoScale < 3.3) {
        const overflow = Math.max(0, (scaledVideoWidth - containerWidth) / 2);
        const movementRange = Math.min(40, overflow * 0.7);
        maxX = movementRange;
        minX = -movementRange;
      } else {
        const maxMovement = Math.max(0, (containerWidth - scaledVideoWidth) / 2);
        const boundaryPadding = 20;
        maxX = Math.max(0, maxMovement - boundaryPadding);
        minX = Math.min(0, -maxMovement + boundaryPadding);
      }

      targetX.current = Math.max(minX, Math.min(maxX, targetX.current));
      currentX.current += (targetX.current - currentX.current) * 0.08;

      if (Math.abs(targetX.current - currentX.current) < 0.1) {
        currentX.current = targetX.current;
      }

      if (videoWrapperRef.current) {
        const roundedX = Math.round(currentX.current * 10) / 10;
        videoWrapperRef.current.style.transform = `translateX(${roundedX}px)`;
        videoWrapperRef.current.style.willChange = "transform";
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", recalcSizes);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isMobile, isVideoExpanded, videoScale]);

  const animatedUpRefs = useMemo(
    () =>
      [
        ...(isMobile
          ? [mobileARef, mobileVeryRef, mobileSecureRef]
          : [desktopARef, desktopVeryRef, desktopSecureRef]),
      ] as React.RefObject<HTMLElement>[],
    [isMobile],
  );

  const animatedDownRefs = useMemo(
    () => [videoRef] as React.RefObject<HTMLElement>[],
    [],
  );

  useSlideTogether(animatedUpRefs, "up", 0.8);
  useSlideTogether(animatedDownRefs, "down", 0.8);

  return (
    <section itemScope itemType="https://schema.org/VideoObject" aria-label="Portfolio showcase">
      {isMobile && (
        <header
          className={`overflow-hidden w-full mb-2 transition-opacity duration-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          role="banner"
        >
          <h1 className="flex w-full text-base font-medium text-[var(--color-dark)] justify-center">
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
          </h1>
        </header>
      )}

      <div
        className="relative w-full flex justify-center"
        style={{
          transform: `scale(${Math.min(videoScale, 1.5)}) translateY(${videoScale > 1 ? `${Math.min((videoScale - 1.1) * 6, 20)}vh` : '0'})`,
          transformOrigin: "center top",
          zIndex: isVideoExpanded ? 40 : 10,
          position: "relative",
          borderRadius: '16px',
          overflow: 'visible',
          transition: 'transform 0.2s ease-out',
          maxWidth: '90vw',
          margin: '0 auto',
        }}
      >
        <div
          ref={videoWrapperRef}
          className="relative"
          style={{
            aspectRatio: "16/9",
            width: isMobile ? "100%" : "40vw",
            maxWidth: isMobile ? "100%" : "600px",
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={videoRef}
            className="translate-y-[-100%] transition-transform duration-1000 ease-out"
            style={{
              borderRadius: '16px',
            }}
          >
            {!videoLoaded && (
              <Image
                src="/placeholder.webp"
                alt="Secure web development portfolio showcase - professional software engineering"
                width={1200}
                height={675}
                className="w-full h-full rounded-2xl object-cover"
                priority
              />
            )}

            <video
              ref={videoElRef}
              poster="/placeholder.webp"
              autoPlay
              playsInline
              preload="metadata"
              muted
              loop
              className="w-full h-full rounded-2xl object-cover cursor-pointer pointer-events-auto absolute top-0 left-0"
              style={{
                borderRadius: '16px',
              }}
              onClick={() => {
                if (!videoElRef.current) return;
                videoElRef.current.muted = !videoElRef.current.muted;
                setIsMuted(videoElRef.current.muted);
              }}
              aria-label="Portfolio demonstration video - click to toggle audio"
              itemProp="contentUrl"
              title="Secure Web Development Portfolio Showcase"
            >
              <source
                src={isMobile ? "/hero-video-480.webm" : "/hero-video-720p.webm"}
                type="video/webm"
              />
            </video>

            {isMobile && (
              <div className="absolute bottom-2 right-2 pointer-events-auto">
                <button
                  onClick={() => {
                    if (!videoElRef.current) return;
                    videoElRef.current.muted = !videoElRef.current.muted;
                    setIsMuted(videoElRef.current.muted);
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary)]/25 backdrop-blur-md cursor-pointer"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  type="button"
                >
                  {isMuted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-[var(--color-dark)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5L6 9H2v6h4l5 4V5z"
                      />
                      <line
                        x1="15"
                        y1="9"
                        x2="21"
                        y2="15"
                        stroke="currentColor"
                        strokeWidth={2}
                      />
                      <line
                        x1="21"
                        y1="9"
                        x2="15"
                        y2="15"
                        stroke="currentColor"
                        strokeWidth={2}
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-[var(--color-dark)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5L6 9H2v6h4l5 4V5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.54 8.46a5 5 0 010 7.08"
                      />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isMobile && (
        <header
          className={`overflow-hidden w-full mt-4 mb-6 transition-opacity duration-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          role="banner"
        >
          <h1 className="flex w-full text-[16px] font-normal justify-center">
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
          </h1>
        </header>
      )}
    </section>
  );
}