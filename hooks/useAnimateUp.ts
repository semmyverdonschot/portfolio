"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";

interface UseAnimateUpProps {
  ref: RefObject<HTMLElement | null>;
  duration?: number;
  delay?: number;
  fromY?: number;
}

export const useAnimateUp = ({
  ref,
  duration = 0.5,
  delay = 0,
  fromY = 70,
}: UseAnimateUpProps) => {
  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { y: fromY, opacity: 0 },
      { y: 0, opacity: 1, duration, delay, ease: "power3.out" }
    );
  }, [ref, duration, delay, fromY]);
};
