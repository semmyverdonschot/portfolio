"use client";

import { useRef, useState, useEffect, useMemo } from "react";
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

  // Trigger animations after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Video autoplay
  useEffect(() => {
    const v = videoElRef.current;
    if (v) {
      const playPromise = v.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          /* ignore autoplay block */
        });
      }
    }
  }, [isMobile]);

  // Desktop mouse hover video effect
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
      const x = Math.max(
        minX,
        Math.min(
          maxX,
          e.clientX - parentRectRef.current.left - parentRectRef.current.width / 2
        )
      );
      targetX.current = x;
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

  // Assign image refs and reset transform on mount
  useEffect(() => {
    const resetImages = () => {
      if (webWrapperRef.current) {
        const img = webWrapperRef.current.querySelector("img");
        if (img) {
          webImgRef.current = img;
          img.style.transform = "translateY(100%)"; // reset animation
        }
      }
      if (devWrapperRef.current) {
        const img = devWrapperRef.current.querySelector("img");
        if (img) {
          devImgRef.current = img;
          img.style.transform = "translateY(100%)"; // reset animation
        }
      }
    };

    resetImages();
    const timeoutId = setTimeout(resetImages, 50); // for hydration
    return () => clearTimeout(timeoutId);
  }, []);

  // Animated refs
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

  useSlideTogether(animatedUpRefs, "up", 0.5);
  useSlideTogether(animatedDownRefs, "down", 0.8);

  return (
    <div className="min-h-screen bg-[var(--color-primary)] flex flex-col justify-start relative overflow-hidden">
      <div className="h-36 md:h-40 lg:h-44 w-full" />

      {/* Mobile "A VERY SECURE" */}
      {isMobile && (
        <div
          className={`flex w-full mb-2 text-base font-medium text-[var(--color-dark)] overflow-visible justify-center transition-opacity duration-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <span
            ref={mobileARef}
            className="flex-1 text-left transform translate-y-full transition-transform duration-1000 ease-out"
          >
            A
          </span>
          <span
            ref={mobileVeryRef}
            className="flex-1 text-center transform translate-y-full transition-transform duration-1000 ease-out"
          >
            VERY
          </span>
          <span
            ref={mobileSecureRef}
            className="flex-1 text-right transform translate-y-full transition-transform duration-1000 ease-out"
          >
            SECURE
          </span>
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
            className="transform translate-y-[-100%] transition-transform duration-1000 ease-out"
          >
            <video
              ref={videoElRef}
              src="/1.mp4"
              autoPlay
              playsInline
              preload="auto"
              muted={isMuted}
              loop
              className="w-full h-full rounded-2xl object-cover cursor-pointer pointer-events-auto"
              onClick={() => setIsMuted((m) => !m)}
            />
          </div>
        </div>
      </div>

      {/* Desktop "A VERY SECURE" */}
      {!isMobile && (
        <div
          className={`flex w-full mt-4 mb-6 text-[16px] font-normal overflow-visible justify-center transition-opacity duration-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <span
            ref={desktopARef}
            className="flex-1 text-left transform translate-y-full transition-transform duration-1000 ease-out"
          >
            A
          </span>
          <span
            ref={desktopVeryRef}
            className="flex-1 text-center transform translate-y-full transition-transform duration-1000 ease-out"
          >
            VERY
          </span>
          <span
            ref={desktopSecureRef}
            className="flex-1 text-right transform translate-y-full transition-transform duration-1000 ease-out"
          >
            SECURE
          </span>
        </div>
      )}

      {/* SVGs */}
      <div
        className={`w-full flex h-[20vw] md:h-[14vw] lg:h-[10vw] items-end mt-6 transition-opacity duration-300 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* WEB */}
        <div
          ref={webWrapperRef}
          className="overflow-hidden h-full flex justify-start"
        >
          <img
            src="/WEB.svg"
            alt="WEB"
            draggable={false}
            className="h-full w-auto transform translate-y-full transition-transform duration-1000 ease-out"
          />
        </div>

        <div className="w-12 md:w-12 lg:w-14" />

        {/* DEVELOPER */}
        <div
          ref={devWrapperRef}
          className="overflow-hidden h-full flex justify-end"
        >
          <img
            src="/DEVELOPER.svg"
            alt="DEVELOPER"
            draggable={false}
            className="h-full w-auto transform translate-y-full transition-transform duration-1000 ease-out"
          />
        </div>
      </div>
    </div>
  );
}
