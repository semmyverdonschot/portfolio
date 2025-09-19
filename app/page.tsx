"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useSlideTogether } from "@/hooks/useStaggerSlide";

export default function Page() {
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
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

  const [mounted, setMounted] = useState(false);

  // Fade-in mounted state
  useEffect(() => setMounted(true), []);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Video autoplay & muted
  useEffect(() => {
    const v = videoElRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  // Desktop mouse-follow animation
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

  // Reset WEB / DEVELOPER images positions
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
    () => [videoRef] as React.RefObject<HTMLElement>[],
    [],
  );

  useSlideTogether(animatedUpRefs, "up", 0.8);
  useSlideTogether(animatedDownRefs, "down", 0.2);

  return (
    <div className="min-h-screen bg-[var(--color-primary)] flex flex-col justify-start relative overflow-hidden">
      <div className="h-36 md:h-40 lg:h-44 w-full" />

      {/* Mobile "A VERY SECURE" */}
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

      {/* Video Section */}
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
              src="/hero-video.mp4"
              poster="/placeholder.webp"
              autoPlay
              playsInline
              preload="metadata"
              muted
              loop
              className="w-full h-full rounded-2xl object-cover cursor-pointer pointer-events-auto"
              onClick={() => {
                if (!videoElRef.current) return;
                videoElRef.current.muted = !videoElRef.current.muted;
                setIsMuted(videoElRef.current.muted);
              }}
            />
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

      {/* Desktop "A VERY SECURE" */}
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

      {/* WEB / DEVELOPER images */}
      <div
        className={`w-full flex h-[20vw] md:h-[14vw] lg:h-[10vw] items-end mt-6 transition-opacity duration-300 ${
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
            unoptimized
            priority
            draggable={false}
            className="h-full w-auto max-w-[100%] object-contain translate-y-full"
          />
        </div>

        <div className="w-12 md:w-12 lg:w-14" />

        <div
          ref={devWrapperRef}
          className="overflow-hidden h-full flex justify-end"
        >
          <Image
            src="/DEVELOPER.svg"
            alt="DEVELOPER"
            width={1000}
            height={400}
            unoptimized
            priority
            draggable={false}
            className="h-full w-auto max-w-[100%] object-contain translate-y-full"
          />
        </div>
      </div>
    </div>
  );
}
