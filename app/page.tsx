"use client"; // Must be first line

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Page() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const floatingRefs = useRef<HTMLDivElement[]>([]);

  // Initialize floating elements
  floatingRefs.current = [];

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !floatingRefs.current.includes(el)) {
      floatingRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Animate headline and subtext
    gsap.from(headlineRef.current, { y: -50, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(subRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.3 });

    // Floating elements hover effect
    floatingRefs.current.forEach((el, i) => {
      gsap.to(el, {
        y: `+=${Math.random() * 20 + 10}px`,
        x: `+=${Math.random() * 20 - 10}px`,
        repeat: -1,
        yoyo: true,
        duration: Math.random() * 4 + 2,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });

    // Mouse movement interaction
    const handleMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      floatingRefs.current.forEach((el, i) => {
        const speed = (i + 1) * 0.02;
        const offsetX = (clientX - window.innerWidth / 2) * speed;
        const offsetY = (clientY - window.innerHeight / 2) * speed;
        gsap.to(el, { x: offsetX, y: offsetY, duration: 0.5, ease: "power1.out" });
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 overflow-hidden text-white">
      {/* Floating background circles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          ref={addToRefs}
          className={`absolute rounded-full bg-white opacity-${i % 2 === 0 ? 10 : 20} w-${8 + i * 4} h-${8 + i * 4} top-${10 + i * 5} left-${i * 12}`}
        ></div>
      ))}

      <div className="z-10 text-center px-4">
        <h1 ref={headlineRef} className="text-6xl md:text-8xl font-bold mb-4">
          Coming Soon
        </h1>
        <p ref={subRef} className="text-xl md:text-2xl">
          testing page
        </p>
      </div>
    </main>
  );
}
