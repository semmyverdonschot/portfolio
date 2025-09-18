"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function useTextReveal(selector: string, play: boolean = true) {
  const tlRef = useRef<GSAPTween | null>(null);

  useEffect(() => {
    if (!play) return;

    const elements = document.querySelectorAll<HTMLElement>(selector);

    elements.forEach((el) => {
      // Ensure the element acts as a mask
      el.style.display = "block";
      el.style.overflow = "hidden";

      const text = el.textContent || "";

      // Wrap text in a span for uniform masking
      el.innerHTML = `<span class="masked-word">${text}</span>`;
    });

    const maskedWords = document.querySelectorAll<HTMLElement>(
      `${selector} .masked-word`,
    );

    // Set initial position for all masked spans
    maskedWords.forEach((word) => {
      word.style.display = "inline-block";
      word.style.transform = "translateY(100%)"; // start hidden under mask
      word.style.willChange = "transform"; // GPU optimized
    });

    // Animate all spans in one smooth motion
    tlRef.current = gsap.to(maskedWords, {
      y: "0%",
      duration: 1.5, // smooth
      ease: "cubic-bezier(.4, 0, .2, 1)", // snappy yet smooth
    });

    return () => {
      tlRef.current?.kill();
    };
  }, [selector, play]);

  const restart = () => {
    tlRef.current?.restart();
  };

  return { restart };
}
