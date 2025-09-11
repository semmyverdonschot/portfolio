"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  // Collect particle refs
  particlesRef.current = [];
  const addParticleRef = (el: HTMLDivElement) => {
    if (el && !particlesRef.current.includes(el)) particlesRef.current.push(el);
  };

  useEffect(() => {
    // Initialize particle positions randomly
    particlesRef.current.forEach((el) => {
      gsap.set(el, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.2 + 0.1,
      });
    });

    // Animate particles slowly floating
    particlesRef.current.forEach((el, i) => {
      gsap.to(el, {
        x: `+=${Math.random() * 100 - 50}px`,
        y: `+=${Math.random() * 100 - 50}px`,
        repeat: -1,
        yoyo: true,
        duration: Math.random() * 6 + 4,
        ease: "sine.inOut",
        delay: i * 0.1,
      });
    });

    // Mouse interaction
    const handleMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      particlesRef.current.forEach((el, i) => {
        const offsetX = (clientX - window.innerWidth / 2) * (0.02 + i * 0.001);
        const offsetY = (clientY - window.innerHeight / 2) * (0.02 + i * 0.001);
        gsap.to(el, { x: `+=${offsetX}`, y: `+=${offsetY}`, duration: 0.3, ease: "power1.out" });
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative w-screen h-screen bg-gray-900 overflow-hidden flex items-center justify-center"
    >
      {/* Spectacular particles */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          ref={addParticleRef}
          className="absolute bg-white rounded-full w-2 h-2"
        ></div>
      ))}

      {/* Overlay headline */}
      <div className="absolute z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-4 drop-shadow-lg">
          test pagina
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 drop-shadow-md">
          test pagina
        </p>
      </div>
    </main>
  );
}
