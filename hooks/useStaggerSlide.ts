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
    const elements = refs
      .map((r) => r.current)
      .filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    gsap.set(elements, {
      y: (i, target) => {
        if (!target.parentElement) return 0;
        const containerHeight = target.parentElement.offsetHeight;
        return direction === "up" ? containerHeight : -containerHeight;
      },
    });

    gsap.to(elements, {
      y: 0,
      duration,
      ease: "cubic-bezier(0.55, 0.06, 0.68, 0.19)",
      stagger: 0.05,
    });
  }, [refs, direction, duration]);
}
