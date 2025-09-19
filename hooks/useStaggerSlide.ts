"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";

type Direction = "up" | "down";

/**
 * Slides elements in simultaneously from completely hidden behind a mask
 * Uses container height to ensure nothing is visible initially
 */
export function useSlideTogether<T extends HTMLElement = HTMLElement>(
  refs: RefObject<T>[],
  direction: Direction = "up",
  duration = 2,
) {
  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref.current || !ref.current.parentElement) return;

      const containerHeight = ref.current.parentElement.offsetHeight;
      const yStart = direction === "up" ? containerHeight : -containerHeight;

      // Set initial position off-screen
      gsap.set(ref.current, { y: yStart });

      // Animate into view
      gsap.to(ref.current, { y: -0, duration, ease: "power3.out" });
    });
  }, [refs, direction, duration]);
}
