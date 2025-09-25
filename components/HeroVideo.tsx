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
      // Only disable mouse movement when video is fully scaled (scale >= 3.3)
      if (videoScale >= 2.6) return;

      if (!parentRectRef.current) return;

      const containerWidth = parentRectRef.current.width;
      const videoWidth = halfVideoWidthRef.current * 2;
      const scaledVideoWidth = videoWidth * videoScale;

      let maxX, minX;
      if (isVideoExpanded && videoScale < 3.3) {
        // When scaling, calculate boundaries based on scaled video size
        const overflow = Math.max(0, (scaledVideoWidth - containerWidth) / 2);
        const movementRange = Math.min(60, overflow * 0.9); // Increased range and percentage

        maxX = movementRange;
        minX = -movementRange;
      } else {
        // Normal movement - keep scaled video within container bounds
        const maxMovement = Math.max(
          0,
          (containerWidth - scaledVideoWidth) / 2,
        );
        maxX = maxMovement;
        minX = -maxMovement;
      }

      const mouseRelativeX =
        e.clientX -
        parentRectRef.current.left -
        parentRectRef.current.width / 2;

      // Increased sensitivity for more responsive movement
      targetX.current = Math.max(minX, Math.min(maxX, mouseRelativeX * 0.8));
    };

    const animate = () => {
      if (isVideoExpanded && videoScale > 1.1) {
        const centeringFactor = Math.min(1, (videoScale - 1.1) / 0.5); // Much more gradual
        targetX.current = targetX.current * (1 - centeringFactor);
      }

      // Clamp currentX to current scale boundaries to prevent going through
      const containerWidth = parentRectRef.current?.width || 0;
      const videoWidth = halfVideoWidthRef.current * 2;
      const scaledVideoWidth = videoWidth * videoScale;

      let maxX, minX;
      if (isVideoExpanded && videoScale < 3.3) {
        const overflow = Math.max(0, (scaledVideoWidth - containerWidth) / 2);
        const movementRange = Math.min(60, overflow * 0.9);
        maxX = movementRange;
        minX = -movementRange;
      } else {
        const maxMovement = Math.max(
          0,
          (containerWidth - scaledVideoWidth) / 2,
        );
        maxX = maxMovement;
        minX = -maxMovement;
      }

      // Clamp targetX to current boundaries
      targetX.current = Math.max(minX, Math.min(maxX, targetX.current));

      currentX.current += (targetX.current - currentX.current) * 0.08; // Slower, smoother movement

      if (Math.abs(targetX.current - currentX.current) < 0.1) {
        // Tighter tolerance
        currentX.current = targetX.current;
      }
      if (videoWrapperRef.current) {
        // Clamp currentX between -510 and 510
        const clampedX = Math.max(-510, Math.min(510, currentX.current));

        const roundedX = Math.round(clampedX * 10) / 10; // Smoother rounding
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
    <>
      {/* Mobile "A VERY SECURE" - NOT scaled */}
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

      {/* Video*/}
      <div
        className="relative w-full flex justify-center"
        style={{
          transform: `scale(${videoScale}) translateY(${videoScale > 1.1 ? `${(videoScale - 1.1) * 15}vh` : "0"})`,
          transformOrigin: "center top",
          zIndex: isVideoExpanded ? 40 : 10,
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          transition: "transform 0.5s ease-out",
        }}
      >
        <div
          ref={videoWrapperRef}
          className="relative"
          style={{
            aspectRatio: "16/9",
            width: isMobile ? "100%" : "40vw",
            maxWidth: isMobile ? "100%" : "600px",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <div
            ref={videoRef}
            className="w-full h-full" // Removed translate-y-[-100%] that was moving it out of view
            style={{
              borderRadius: "16px",
              transform: "translate(0px, 0px)", // Keep it in its natural position
            }}
          >
            {!videoLoaded && (
              <Image
                src="/placeholder.webp"
                alt="Hero placeholder"
                width={1200}
                height={675}
                className="w-full h-full rounded-2xl object-cover absolute top-0 left-0"
                style={{
                  borderRadius: "16px",
                  objectFit: "cover",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                priority
              />
            )}

            <video
              ref={videoElRef}
              poster="/placeholder.webp"
              autoPlay
              playsInline
              preload="auto"
              muted
              loop
              className="w-full h-full rounded-2xl object-cover cursor-pointer pointer-events-auto absolute top-0 left-0"
              style={{
                borderRadius: "16px",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
              }}
              onClick={() => {
                if (!videoElRef.current) return;
                videoElRef.current.muted = !videoElRef.current.muted;
                setIsMuted(videoElRef.current.muted);
              }}
            >
              <source
                src={
                  isMobile ? "/hero-video-480.webm" : "/hero-video-720p.webm"
                }
                type="video/webm"
              />
            </video>

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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-[var(--color-dark)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop "A VERY SECURE" - NOT scaled */}
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
    </>
  );
}
