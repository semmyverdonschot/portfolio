"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import SplitType from "split-type";

interface UseAnimateUpProps {
  ref: RefObject<HTMLElement | null>;
  duration?: number;
  delay?: number;
  fromY?: number;
  mode?: "sentence" | "char"; // new mode for SplitType
}

export const useAnimateUp = ({
  ref,
  duration = 0.5,
  delay = 0,
  fromY = 70,
  mode = "sentence",
}: UseAnimateUpProps) => {
  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    // Apply mask for text or element
    el.style.overflow = "hidden";
    el.style.display = "inline-block";
    el.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

    if (mode === "char" && el.textContent) {
      // Split text into chars
      const split = new SplitType(el, { types: "chars" });
      gsap.fromTo(
        split.chars,
        { y: 115, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          delay,
          duration: 0.1,
          ease: "power3.out",
        },
      );
    } else {
      // Wrap text node in span if needed
      if (
        el.childNodes.length === 1 &&
        el.childNodes[0].nodeType === Node.TEXT_NODE
      ) {
        const text = el.textContent || "";
        el.innerHTML = `<span class="sentence">${text}</span>`;
      }
      const target = el.querySelector<HTMLElement>(".sentence") || el;

      gsap.fromTo(
        target,
        { y: fromY, opacity: 0 },
        { y: 0, opacity: 1, duration, delay, ease: "power3.out" },
      );
    }
  }, [ref, duration, delay, fromY, mode]);
};
