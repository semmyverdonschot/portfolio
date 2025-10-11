"use client";

import { useEffect, useRef } from "react";

interface InfiniteCarouselProps {
  items: string[];
  speed?: number;
  className?: string;
}

export default function InfiniteCarousel({
  items,
  speed = 40,
  className = "",
}: InfiniteCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let position = 0;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (lastTime !== 0) {
        const deltaTime = currentTime - lastTime;
        position -= (speed * deltaTime) / 1000;

        const singleSetWidth = scrollContainer.scrollWidth / 3;

        if (Math.abs(position) >= singleSetWidth) {
          position = position + singleSetWidth;
        }

        scrollContainer.style.transform = `translateX(${position}px)`;
      }

      lastTime = currentTime;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [items, speed]);

  return (
    <div
      className={`overflow-hidden w-full ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        ref={scrollRef}
        className="flex gap-2 md:gap-1 whitespace-nowrap will-change-transform"
        style={{ width: "max-content", maxWidth: "200%" }}
      >
        {/* tiple duper*/}
        {[...items, ...items, ...items].map((item, index) => (
          <span
            key={index}
            className="text-sm md:text-medium uppercase font-medium text-[var(--color-graylight)] tracking-wide flex-shrink-0 px-1"
            style={{ minWidth: "fit-content" }}
          >
            {item},
          </span>
        ))}
      </div>
    </div>
  );
}
