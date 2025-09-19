"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";

type Direction = "up" | "down";


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

      gsap.set(ref.current, { y: yStart });

      gsap.to(ref.current, {
        y: 0,
        duration,
        ease: "cubic-bezier(0.5, 0, 1, 1)",
      });
    });
  }, [refs, direction, duration]);
}
