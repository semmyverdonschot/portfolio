"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";

type Direction = "up" | "down";

export function useSlideTogether<T extends HTMLElement = HTMLElement>(
  refs: RefObject<T>[],
  direction: Direction = "up",
  duration = 0.8,
) {
  useEffect(() => {
    const elements = refs
      .map((ref) => ref.current)
      .filter((el): el is T => el !== null);

    if (!elements.length) return;

    gsap.set(elements, {
      y: direction === "up" ? "100%" : "-100%",
      force3D: true,
    });

    const handleTransitionComplete = () => {
      setTimeout(() => {
        gsap.to(elements, {
          y: 0,
          duration,
          ease: "cubic-bezier(0.55, 0.06, 0.68, 0.19)",
          stagger: 0.05,
        });
      }, 200);
    };

    // Check if we're on initial load (no page transition)
    const isInitialLoad = !document.querySelector("[data-template]");

    if (isInitialLoad) {
      // For initial load, start animations immediately
      setTimeout(() => {
        gsap.to(elements, {
          y: 0,
          duration,
          ease: "cubic-bezier(0.55, 0.06, 0.68, 0.19)",
          stagger: 0.05,
        });
      }, 200);
    } else {
      // For page transitions, wait for transition complete event
      window.addEventListener(
        "pageTransitionComplete",
        handleTransitionComplete,
      );
    }

    return () => {
      window.removeEventListener(
        "pageTransitionComplete",
        handleTransitionComplete,
      );
    };
  }, [refs, direction, duration]);
}
