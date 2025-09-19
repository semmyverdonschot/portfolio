"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useSlideTogether } from "@/hooks/useStaggerSlide";

export default function Page() {
  // Video refs and state
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const targetX = useRef(0);
  const currentX = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  const parentRectRef = useRef<DOMRect | null>(null);
  const halfVideoWidthRef = useRef<number>(0);

  // SVG refs
  const webRef = useRef<HTMLImageElement>(null);
  const devRef = useRef<HTMLImageElement>(null);

  // Text refs
  const aRef = useRef<HTMLSpanElement>(null);
  const veryRef = useRef<HTMLSpanElement>(null);
  const secureRef = useRef<HTMLSpanElement>(null);

  // Animate SVGs and text together
  useSlideTogether(
    [webRef, devRef, aRef, veryRef, secureRef] as React.RefObject<HTMLElement>[],
    "up",
    1.5
  );

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto play video
  useEffect(() => {
    const v = videoElRef.current;
    if (v) {
      const playPromise = v.play();
      if (playPromise && typeof playPromise.then === "function")
        playPromise.catch(() => {});
    }
  }, [isMobile]);

  // Video follow mouse
  useEffect(() => {
    if (isMobile) return;

    const recalcSizes = () => {
      if (videoRef.current?.parentElement) {
        parentRectRef.current =
          videoRef.current.parentElement.getBoundingClientRect();
        halfVideoWidthRef.current = videoRef.current.offsetWidth / 2;
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
          e.clientX -
            parentRectRef.current.left -
            parentRectRef.current.width / 2
        )
      );
      targetX.current = x;
    };

    const animate = () => {
      currentX.current += (targetX.current - currentX.current) * 0.06;
      if (videoRef.current)
        videoRef.current.style.transform = `translateX(${currentX.current}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", recalcSizes);
    };
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-[var(--color-primary)] flex flex-col justify-start relative overflow-hidden">
      <div className="h-36 md:h-40 lg:h-44 w-full" />

      {isMobile && (
        <div className="flex w-full mt-2 mb-2 text-base md:text-xl font-medium text-[var(--color-dark)]">
          <span ref={aRef} className="flex-1 text-left transform">
            A
          </span>
          <span ref={veryRef} className="flex-1 text-center transform">
            VERY
          </span>
          <span ref={secureRef} className="flex-1 text-right transform">
            SECURE
          </span>
        </div>
      )}

      <div className="relative w-full flex justify-center">
        <div
          ref={videoRef}
          className={`transition-transform duration-150 ease-out relative ${
            isMobile ? "" : "pointer-events-none"
          }`}
          style={{
            aspectRatio: "16/9",
            width: isMobile ? "100%" : "40vw",
            maxWidth: isMobile ? "100%" : "600px",
          }}
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
            onClick={() => setIsMuted(!isMuted)}
          />
          {isMobile && (
            <div className="absolute bottom-2 right-2 pointer-events-none">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary)]/25 backdrop-blur-md transition-all duration-300 ease-out">
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

      {!isMobile && (
        <div className="flex w-full mt-2 mb-2 text-[16px] font-normal">
          <span ref={aRef} className="flex-1 text-left transform">
            A
          </span>
          <span ref={veryRef} className="flex-1 text-center transform">
            VERY
          </span>
          <span ref={secureRef} className="flex-1 text-right transform">
            SECURE
          </span>
        </div>
      )}

      <div className="w-full flex h-[20vw] md:h-[14vw] lg:h-[10vw] items-end mt-6">
        <div className="overflow-hidden h-full flex justify-start">
          <Image
            ref={webRef}
            src="/WEB.svg"
            alt="WEB"
            width={1000}
            height={400}
            fetchPriority="high"
            className="h-full w-auto object-contain transform"
            draggable={false}
            priority
          />
        </div>

        <div className="w-12 md:w-12 lg:w-14" />

        <div className="overflow-hidden h-full flex justify-end">
          <Image
            ref={devRef}
            src="/DEVELOPER.svg"
            alt="DEVELOPER"
            width={1000}
            height={400}
            fetchPriority="high"
            className="h-full w-auto object-contain transform"
            draggable={false}
            priority
          />
        </div>
      </div>
    </div>
  );
}
