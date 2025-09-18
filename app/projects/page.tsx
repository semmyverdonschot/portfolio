"use client";

import { useRef } from "react";
import { useAnimateUp } from "@/hooks/useAnimateUp";

export default function WorkPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  // Animate words instead of letters
  useAnimateUp({ ref: titleRef, mode: "word", stagger: 0.1 });
  useAnimateUp({ ref: descRef, mode: "word", stagger: 0.08, delay: 0.2 });

  return (
    <div className="p-10 flex flex-col items-center gap-6">
      <h1 ref={titleRef} className="text-4xl font-bold">
        testing animations
      </h1>
      <p ref={descRef} className="text-lg">
        Here’s a list of my projects.
      </p>
    </div>
  );
}
