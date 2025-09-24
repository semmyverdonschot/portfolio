"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";

type Direction = "up" | "down";

export function useSlideTogether<T extends HTMLElement = HTMLElement>(
  refs: RefObject<T>[],
  direction: Direction = "up",
  duration = 0.2,
) {
  useEffect(() => {
    // Filter out nulls but keep type as T
    const elements = refs
      .map((ref) => ref.current)
      .filter((el): el is T => el !== null);

    if (!elements.length) return;

    elements.forEach((el) => {
      const parentHeight = el.parentElement?.offsetHeight ?? 0;
      gsap.set(el, {
        y: direction === "up" ? parentHeight : -parentHeight,
      });
    });

    gsap.to(elements, {
      y: 0,
      duration,
      ease: "cubic-bezier(0.55, 0.06, 0.68, 0.19)",
      stagger: 0.05,
    });
  }, [refs, direction, duration]);
}
