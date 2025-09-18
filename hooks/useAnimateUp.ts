"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";

interface UseAnimateUpProps {
  ref: RefObject<HTMLElement>;
  mode?: "char" | "word" | "element"; // added "word"
  stagger?: number;
  duration?: number;
  delay?: number;
  fromY?: number;
}

export const useAnimateUp = ({
  ref,
  mode = "element",
  stagger = 0.05,
  duration = 0.5,
  delay = 0,
  fromY = 70,
}: UseAnimateUpProps) => {
  useEffect(() => {
    if (!ref.current) return;

    let targets: HTMLElement[] = [];

    if (mode === "char" && ref.current.textContent) {
      ref.current.style.overflow = "hidden";
      ref.current.style.display = "inline-block";
      ref.current.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

      const text = ref.current.textContent;
      ref.current.innerHTML = text
        .split("")
        .map((c) => `<span class="char">${c}</span>`)
        .join("");

      targets = Array.from(ref.current.querySelectorAll(".char"));
    } else if (mode === "word" && ref.current.textContent) {
      ref.current.style.overflow = "hidden";
      ref.current.style.display = "inline-block";
      ref.current.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

      const text = ref.current.textContent;
      ref.current.innerHTML = text
        .split(" ")
        .map((w) => `<span class="word">${w} </span>`)
        .join("");

      targets = Array.from(ref.current.querySelectorAll(".word"));
    } else {
      // Animate whole element
      targets = [ref.current];
    }

    gsap.fromTo(
      targets,
      { y: fromY, opacity: 0 },
      { y: 0, opacity: 1, stagger, delay, duration, ease: "power3.out" },
    );
  }, [ref, mode, stagger, duration, delay, fromY]);
};
