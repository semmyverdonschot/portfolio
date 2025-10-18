"use client";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";
import { useSlideTogether } from "@/hooks/useStaggerSlide";
import ScrollAnimate from "@/hooks/Scrollanimate";

const images = [
  "/img/ServiceDevelopment.jpg",
  "/img/ServiceSEO.png",
  "/Garagehansverdonschot/Homepage.png",
  "/img/ServiceExtra1.jpg",
];

const positions = [
  { marginTop: "-2vw", marginLeft: "6vw" },
  { marginTop: "8vw", marginLeft: "18vw" },
  { marginTop: "-8vw", marginLeft: "-4vw" },
  { marginTop: "18vw", marginLeft: "10vw" },
];

function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [locked, setLocked] = useState(true);
  const [canScroll, setCanScroll] = useState(true);

  // Smooth scroll handler with delay
  const handleScroll = (e: React.WheelEvent | React.TouchEvent) => {
    if (!canScroll) {
      e.preventDefault();
      return;
    }
    if (locked) {
      // Forward: show next image
      if ("deltaY" in e && e.deltaY > 0) {
        if (currentIndex < images.length - 1) {
          setCanScroll(false);
          setTimeout(() => setCanScroll(true), 120);
          setCurrentIndex(currentIndex + 1);
        } else {
          setLocked(false);
        }
        e.preventDefault();
      }
      // Backward: hide last image one by one
      if ("deltaY" in e && e.deltaY < 0) {
        if (currentIndex > 0) {
          setCanScroll(false);
          setTimeout(() => setCanScroll(true), 120);
          setCurrentIndex(currentIndex - 1);
        }
        e.preventDefault();
      }
      // Touch events: treat as forward only
      if (!("deltaY" in e)) {
        if (currentIndex < images.length - 1) {
          setCanScroll(false);
          setTimeout(() => setCanScroll(true), 120);
          setCurrentIndex(currentIndex + 1);
        } else {
          setLocked(false);
        }
        e.preventDefault();
      }
      return;
    }
  };

  // Relock and reset images when scrollbar hits the top
  useEffect(() => {
    if (!locked) {
      const onScroll = () => {
        if (window.scrollY === 0) {
          setLocked(true);
          setCurrentIndex(images.length - 1);
        }
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [locked]);

  const aboutRef = useRef<HTMLHeadingElement>(null);
  const animatedRefs = useMemo(
    () => [aboutRef] as unknown as React.RefObject<HTMLElement>[],
    [],
  );

  useSlideTogether(animatedRefs, "up", 0.8);

  return (
    <>
      <div
        className={`w-full min-h-screen ${locked ? "overflow-hidden h-screen" : "overflow-auto"} relative`}
        onWheel={handleScroll}
        onTouchMove={handleScroll}
      >
        {/* Dissapearing images  */}
        <div className="relative w-full md:min-h-screen flex flex-col items-center justify-start pt-60">
          {images.slice(0, currentIndex + 1).map((src, idx) => (
            <div
              key={idx}
              className={`z-50 pointer-events-none transition-all duration-500 about-img absolute`}
              style={{
                marginTop: positions[idx].marginTop,
                marginLeft: positions[idx].marginLeft,
                opacity: idx === 0 ? 0 : 1,
                visibility: idx === 0 ? "hidden" : "visible",
                animation:
                  idx === 0
                    ? "fadeUp 0.8s cubic-bezier(0.55, 0.06, 0.68, 0.19) 0.4s forwards"
                    : undefined,
                transition: "opacity 0.5s, margin 0.5s",
              }}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg mb-[-8vw]">
                <Image
                  src={src}
                  alt={`About photo ${idx + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          ))}
          <style jsx>{`
            .about-img {
              width: 80vw;
              height: 100vw;
              max-width: 380px;
              max-height: 580px;
              min-width: 120px;
              min-height: 180px;
            }
            @media (min-width: 768px) {
              .about-img {
                width: 24vw !important;
                height: 30vw !important;
                max-width: 260px !important;
                max-height: 340px !important;
                min-width: 140px !important;
                min-height: 140px !important;
              }
            }
            @keyframes fadeUp {
              from {
                opacity: 0;
                transform: translateY(12px);
                visibility: hidden;
              }
              to {
                opacity: 1;
                transform: translateY(0);
                visibility: visible;
              }
            }
          `}</style>
        </div>

        {/* ABOUT */}
        <div className="w-full flex justify-center pointer-events-none z-50 mt-[-24vw]">
          <h1
            ref={aboutRef}
            className="text-[25vw] md:text-[22vw] lg:text-[26vw] font-black uppercase leading-none select-none"
            style={{ color: "var(--color-primary-dark)" }}
          >
            ABOUT
          </h1>
        </div>

        {/* Normal scrollable content below this */}
        <div className="relative z-30 w-full max-w-4xl mx-auto px-4 py-72 md:py-24 mt-8"></div>

        {/* dark section*/}
        <section className="w-full min-h-[60vh] py-40 px-2 bg-[#171717] flex flex-col items-center justify-center mt-24 rounded-2xl">
          <ScrollAnimate>
            <p
              className="w-[90%] max-w-[1100px] text-center font-semibold leading-tight -tracking-normal mx-auto text-[6vw] md:text-[4vw] lg:text-[3vw]"
              style={{ color: "var(--color-primary)" }}
            >
              I’m a web developer who builds secure, scalable digital
              experiences that go beyond just looking good. I help brands solve
              problems, streamline tools and do more than they thought
              possible.{" "}
            </p>
          </ScrollAnimate>
          <div className="flex justify-center w-full mt-12">
            <a
              href="/projects"
              className="flex items-center overflow-hidden w-max group text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors text-lg md:text-lg"
              aria-label="see more about my work and projects"
            >
              <span>[PROJECTS</span>
              <svg
                className="w-5 h-5 ml-1 transform -rotate-45 transition-transform duration-300 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12h14M12 5l7 7-7 7"
                />
              </svg>
              <span>]</span>
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default AboutPage;
