  "use client";

  import Image from "next/image";
  import { useRef, useState, useEffect } from "react";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  export default function Page() {
    const videoRef = useRef<HTMLDivElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const targetX = useRef(0);
    const currentX = useRef(0);

    // Check if mobile
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Horizontal mouse follow (disabled on mobile)
    useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!videoRef.current) return;
      const rect = videoRef.current.parentElement!.getBoundingClientRect();
      const halfVideoWidth = videoRef.current.offsetWidth / 2;

      const maxX = rect.width / 2 - halfVideoWidth;
      const minX = -maxX;

      let x = e.clientX - rect.left - rect.width / 2;
      x = Math.max(minX, Math.min(maxX, x));

      targetX.current = x;
    };

    const animate = () => {
      // very small lerp factor = super smooth lag
      currentX.current += (targetX.current - currentX.current) * 0.06;
      if (videoRef.current) {
        videoRef.current.style.transform = `translateX(${currentX.current}px)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

    // GSAP Scroll animation (disabled on mobile)
    useEffect(() => {
      if (!videoRef.current || isMobile) return;

      gsap.to(videoRef.current, {
        scale: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });
    }, [isMobile]);

    return (
      <div className="min-h-screen bg-[var(--color-primary)] flex flex-col justify-start relative overflow-hidden">
        {/* Top spacer */}
        <div className="h-36 md:h-40 lg:h-44 w-full"></div>

        {/* Mobile: Text above video */}
        {isMobile && (
          <div className="flex w-full mt-2 mb-2 text-xl font-semibold text-[var(--color-dark)]">
            <span className="flex-1 text-left">A</span>
            <span className="flex-1 text-center">VERY</span>
            <span className="flex-1 text-right">GOOD</span>
          </div>
        )}


  {/* Video Section */}
<div className="relative w-full flex justify-center">
  <div
    ref={videoRef}
    className={`transition-transform duration-150 ease-out relative ${
      isMobile ? "" : "pointer-events-none"
    }`}
  >
    <video
      src="/1.mp4"
      autoPlay
      muted={isMuted}
      loop
      className={`rounded-2xl object-cover cursor-pointer pointer-events-auto ${
        isMobile ? "w-full max-w-full" : "w-96 md:w-[40vw] lg:w-[600px]"
      }`}
      onClick={() => setIsMuted(!isMuted)}
    />

    {/* Mobile: Dynamic mute/unmute indicator */}
    {isMobile && (
      <div className="absolute bottom-2 right-2 pointer-events-none">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary)]/25 backdrop-blur-md transition-all duration-300 ease-out"
        >
          {isMuted ? (
            // Muted: speaker with X
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[var(--color-dark)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="15" y1="9" x2="21" y2="15" stroke="currentColor" strokeWidth={2} />
              <line x1="21" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth={2} />
            </svg>
          ) : (
            // Unmuted: speaker with small wave
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[var(--color-dark)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
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

        {/* Desktop: Text below video */}
        {!isMobile && (
          <div className="flex w-full mt-2 mb-2 text-xl md:text-2xl lg:text-3xl font-semibold">
            <span className="flex-1 text-left">A</span>
            <span className="flex-1 text-center">VERY</span>
            <span className="flex-1 text-right">GOOD</span>
          </div>
        )}

        {/* Bottom row / stacked on mobile */}
        <div
          className={`w-full flex ${
            isMobile
              ? "flex-col items-center justify-end h-[50vh] mt-2 space-y-4" // small upward shift
              : "h-[26vw] md:h-[20vw] lg:h-[16vw] items-end"
          }`}
        >
          {isMobile ? (
            <>
              <div className="h-[20vh] w-auto">
                <Image
                  src="/WEB.svg"
                  alt="WEB"
                  width={1000}
                  height={400}
                  className="h-full w-auto object-contain"
                  draggable={false}
                  priority
                />
              </div>
              <div className="max-h-[20vh] w-auto">
                <Image
                  src="/DEVELOPER.svg"
                  alt="DEVELOPER"
                  width={1000}
                  height={400}
                  className="h-full w-auto object-contain"
                  draggable={false}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-start h-full">
                <Image
                  src="/WEB.svg"
                  alt="WEB"
                  width={1000}
                  height={400}
                  className="h-full w-auto object-contain"
                  draggable={false}
                  priority
                />
              </div>
              <div className="w-28 md:w-32 lg:w-36"></div>
              <div className="flex justify-end h-full">
                <Image
                  src="/DEVELOPER.svg"
                  alt="DEVELOPER"
                  width={1000}
                  height={400}
                  className="h-full w-auto object-contain"
                  draggable={false}
                />
              </div>
            </>
          )}
        </div>


      {/* Extra spacer to allow scroll */}
      <div className="h-screen"></div>
  </div>
    );
  }
