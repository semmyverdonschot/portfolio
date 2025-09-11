"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Page() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Collect card refs
  cardsRef.current = [];
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  useEffect(() => {
    // Animate headline and subtext
    gsap.from(headlineRef.current, { y: -30, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(subRef.current, { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.3 });

    // Floating / subtle motion for cards
    cardsRef.current.forEach((el, i) => {
      gsap.to(el, {
        y: `+=${Math.random() * 10 - 5}px`,
        x: `+=${Math.random() * 10 - 5}px`,
        repeat: -1,
        yoyo: true,
        duration: Math.random() * 3 + 2,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });

    // Mouse 3D rotation
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = clientX - left - width / 2;
      const y = clientY - top - height / 2;

      cardsRef.current.forEach((el, i) => {
        const rotationX = (-y / height) * 12;
        const rotationY = (x / width) * 12;
        gsap.to(el, { rotationX, rotationY, transformPerspective: 800, transformOrigin: "center", duration: 0.3 });
      });
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-50 overflow-hidden"
    >
      {/* Headline */}
      <h1 ref={headlineRef} className="text-5xl md:text-7xl font-extrabold mb-4">
        test pagina
      </h1>
      <p ref={subRef} className="text-lg md:text-xl mb-10 text-gray-300">
        test pagina
      </p>

      {/* Glassmorphic interactive cards */}
      <div className="relative flex flex-wrap justify-center gap-6 z-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={addToRefs}
            className="w-36 h-36 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center text-gray-100 text-xl font-medium cursor-pointer transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
          >
            {`#${i + 1}`}
          </div>
        ))}
      </div>

      {/* Floating soft particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full bg-white opacity-5 w-${4 + i * 2} h-${4 + i * 2}`}
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
          }}
        ></div>
      ))}
    </main>
  );
}
